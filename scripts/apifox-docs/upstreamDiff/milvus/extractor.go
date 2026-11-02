// REST upstream source-tree skeleton extractor (design §6.1).
//
// Parses a pinned milvus httpserver checkout — the constant route table in
// RegisterRoutesToV2 (handler_v2.go) and the request structs of the same
// package (request_v2.go) — into a deterministic skeleton JSON. The Node
// rest-upstream diff consumes that skeleton for source-tree lock sources
// (`--skeleton`), so the extractor only produces structural truth: paths,
// methods, handler names, request field names, Go-level types, and
// binding:"required" membership. Prose, response shapes, map value types, and
// doc-layer constraints are deliberately out of scope (fragments win those).
//
// Run: go run extractor.go --dir <httpserver checkout dir> --out skeleton.json
// Only the Go standard library is used so the file runs without a module.
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

const schemaVersion = "1.0"

// Struct tag shape: space-separated key:"value" pairs.
var tagPairPattern = regexp.MustCompile(`(\w+):"([^"]*)"`)

type extractedFrom struct {
	Repository  string `json:"repository"`
	SourceDir   string `json:"sourceDir"`
	MountPrefix string `json:"mountPrefix"`
}

type operation struct {
	Path          string  `json:"path"`
	Method        string  `json:"method"`
	Handler       string  `json:"handler"`
	RequestStruct string  `json:"requestStruct"`
	Deprecated    bool    `json:"deprecated,omitempty"`
	RequestSchema *schema `json:"requestSchema"`
}

type skeleton struct {
	SchemaVersion string         `json:"schemaVersion"`
	ExtractedFrom extractedFrom  `json:"extractedFrom"`
	Operations    []operation    `json:"operations"`
	Components    map[string]any `json:"components"`
}

type schema struct {
	Type       string             `json:"type,omitempty"`
	Items      *schema            `json:"items,omitempty"`
	Properties map[string]*schema `json:"properties,omitempty"`
	Required   []string           `json:"required,omitempty"`
	Ref        string             `json:"$ref,omitempty"`
	// Opaque marks containers whose JSON content the route-table structs
	// cannot enumerate: generic maps (map[string]…) forward their entries to
	// gRPC verbatim (e.g. params.enableDynamicField, elementTypeParams.
	// max_length), and interface{}/json.RawMessage accept arbitrary JSON.
	// Downstream, the fragment's hand-authored documentation is the authority
	// below an opaque node; the mirror must never retire it as upstream-deleted.
	Opaque bool `json:"x-milvus-opaque,omitempty"`
}

type fieldDef struct {
	jsonName string
	required bool
	goType   ast.Expr
}

type structDef struct {
	fields []fieldDef
}

type extractor struct {
	files       []*ast.File
	structs     map[string]*structDef
	constValues map[string]string
	deprecated  map[string]bool
}

func fail(code string, format string, args ...any) error {
	return fmt.Errorf("%s: %s", code, fmt.Sprintf(format, args...))
}

func loadPackage(dir string) (*extractor, error) {
	entries, err := os.ReadDir(dir)
	if err != nil {
		return nil, fail("REST_UPSTREAM_EXTRACT_DIR_UNREADABLE", "%s: %v", dir, err)
	}
	ex := &extractor{
		files:       []*ast.File{},
		structs:     map[string]*structDef{},
		constValues: map[string]string{},
		deprecated:  map[string]bool{},
	}
	parsed := 0
	for _, entry := range entries {
		name := entry.Name()
		if entry.IsDir() || !strings.HasSuffix(name, ".go") || strings.HasSuffix(name, "_test.go") {
			continue
		}
		file, err := parser.ParseFile(token.NewFileSet(), filepath.Join(dir, name), nil, parser.ParseComments)
		if err != nil {
			return nil, fail("REST_UPSTREAM_EXTRACT_PARSE_FAILED", "%s: %v", name, err)
		}
		ex.files = append(ex.files, file)
		ex.collectDeclarations(file)
		parsed++
	}
	if parsed == 0 {
		return nil, fail("REST_UPSTREAM_EXTRACT_NO_GO_FILES", "%s contains no non-test Go files", dir)
	}
	return ex, nil
}

// collectDeclarations gathers package-level string constants (route path
// building blocks) and struct type declarations. Const comments carrying
// "deprecated" mark the constant so routes built from it inherit the flag.
func (ex *extractor) collectDeclarations(file *ast.File) {
	for _, decl := range file.Decls {
		genDecl, ok := decl.(*ast.GenDecl)
		if !ok {
			continue
		}
		for _, spec := range genDecl.Specs {
			switch typed := spec.(type) {
			case *ast.ValueSpec:
				comment := commentText(typed.Doc) + " " + commentText(typed.Comment)
				if strings.Contains(strings.ToLower(comment), "deprecated") {
					for _, name := range typed.Names {
						ex.deprecated[name.Name] = true
					}
				}
				if typed.Type != nil || len(typed.Values) != 1 {
					continue
				}
				for _, name := range typed.Names {
					literal, ok := typed.Values[0].(*ast.BasicLit)
					if !ok || literal.Kind != token.STRING {
						continue
					}
					value, err := strconv.Unquote(literal.Value)
					if err != nil {
						continue
					}
					ex.constValues[name.Name] = value
				}
			case *ast.TypeSpec:
				structType, ok := typed.Type.(*ast.StructType)
				if !ok {
					continue
				}
				def := &structDef{}
				for _, field := range structType.Fields.List {
					jsonName, required, skip := parseFieldTag(field.Tag)
					if skip {
						continue
					}
					if len(field.Names) == 0 {
						// Embedded struct: keep the type expression; schema
						// building merges the referenced struct's fields.
						def.fields = append(def.fields, fieldDef{goType: field.Type})
						continue
					}
					if jsonName == "" {
						// encoding/json marshals untagged fields under their
						// exact Go field name.
						jsonName = field.Names[0].Name
					}
					def.fields = append(def.fields, fieldDef{
						jsonName: jsonName,
						required: required,
						goType:   field.Type,
					})
				}
				ex.structs[typed.Name.Name] = def
			}
		}
	}
}

func commentText(groups *ast.CommentGroup) string {
	if groups == nil {
		return ""
	}
	return strings.TrimSpace(groups.Text())
}

// parseFieldTag decodes a struct tag into (json name, required, skip).
// Struct tags are a space-separated list of key:"value" pairs; absent json
// tags fall back to the Go field name, matching encoding/json.
func parseFieldTag(tag *ast.BasicLit) (string, bool, bool) {
	if tag == nil {
		return "", false, false
	}
	raw, err := strconv.Unquote(tag.Value)
	if err != nil {
		return "", false, false
	}
	jsonName := ""
	required := false
	skip := false
	for _, match := range tagPairPattern.FindAllStringSubmatch(raw, -1) {
		key, value := match[1], match[2]
		switch key {
		case "json":
			name := strings.Split(value, ",")[0]
			if name == "-" {
				skip = true
			} else if name != "" {
				jsonName = name
			}
		case "binding":
			for _, option := range strings.Split(value, ",") {
				if strings.TrimSpace(option) == "required" {
					required = true
				}
			}
		}
	}
	return jsonName, required, skip
}

func (ex *extractor) structSchema(name string, depth int) (*schema, error) {
	if depth > 16 {
		return nil, fail("REST_UPSTREAM_EXTRACT_STRUCT_DEPTH", "%s: nesting limit exceeded", name)
	}
	def, ok := ex.structs[name]
	if !ok {
		return nil, fail("REST_UPSTREAM_EXTRACT_STRUCT_UNKNOWN", "%s is not a struct in the parsed package", name)
	}
	result := &schema{Type: "object"}
	properties := map[string]*schema{}
	required := []string{}
	for _, field := range def.fields {
		if field.jsonName == "" {
			// Embedded in-package struct: merge its fields into the parent.
			embeddedName, err := identOfType(field.goType)
			if err != nil {
				return nil, fail("REST_UPSTREAM_EXTRACT_EMBEDDED_UNSUPPORTED", "in struct %s: %v", name, err)
			}
			embedded, err := ex.structSchema(embeddedName, depth+1)
			if err != nil {
				return nil, err
			}
			for propertyName, propertySchema := range embedded.Properties {
				properties[propertyName] = propertySchema
			}
			required = append(required, embedded.Required...)
			continue
		}
		fieldSchema, err := ex.typeSchema(field.goType, depth+1)
		if err != nil {
			return nil, fmt.Errorf("field %s.%s: %w", name, field.jsonName, err)
		}
		properties[field.jsonName] = fieldSchema
		if field.required {
			required = append(required, field.jsonName)
		}
	}
	if len(properties) > 0 {
		result.Properties = properties
	}
	if len(required) > 0 {
		sort.Strings(required)
		result.Required = required
	}
	return result, nil
}

// typeSchema maps Go type expressions to the skeleton's minimal JSON schema
// vocabulary: {type}, {type, items}, {type, properties, required}, $ref, and
// the empty schema for untyped values. Constraints (formats, bounds,
// additionalProperties) are documentation territory and stay out of the
// skeleton; the raw Go type remains visible in the source checkout.
func (ex *extractor) typeSchema(expr ast.Expr, depth int) (*schema, error) {
	switch typed := expr.(type) {
	case *ast.StarExpr:
		return ex.typeSchema(typed.X, depth)
	case *ast.Ident:
		switch typed.Name {
		case "string":
			return &schema{Type: "string"}, nil
		case "bool":
			return &schema{Type: "boolean"}, nil
		case "int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16", "uint32", "uint64", "byte", "rune":
			return &schema{Type: "integer"}, nil
		case "float32", "float64":
			return &schema{Type: "number"}, nil
		case "any":
			return &schema{}, nil
		}
		return ex.namedSchema(typed.Name, depth)
	case *ast.SelectorExpr:
		if pkg, ok := typed.X.(*ast.Ident); ok && pkg.Name == "json" && typed.Sel.Name == "RawMessage" {
			return &schema{Opaque: true}, nil
		}
		return nil, fail("REST_UPSTREAM_EXTRACT_EXTERNAL_TYPE", "%s: external package types carry no extractable JSON contract", goTypeName(expr))
	case *ast.InterfaceType:
		return &schema{Opaque: true}, nil
	case *ast.ArrayType:
		if typed.Len != nil {
			return nil, fail("REST_UPSTREAM_EXTRACT_TYPE_UNSUPPORTED", "%s: fixed-length arrays are not JSON shapes", goTypeName(expr))
		}
		items, err := ex.typeSchema(typed.Elt, depth+1)
		if err != nil {
			return nil, err
		}
		return &schema{Type: "array", Items: items}, nil
	case *ast.MapType:
		if keyIdent, ok := typed.Key.(*ast.Ident); !ok || keyIdent.Name != "string" {
			return nil, fail("REST_UPSTREAM_EXTRACT_TYPE_UNSUPPORTED", "%s: only map[string]… maps to JSON objects", goTypeName(expr))
		}
		// Uniformly opaque, even when the value type is a known struct: the
		// map keys are dynamic (metric names, parameter names), so the JSON
		// shape is not enumerable from the struct declaration alone.
		return &schema{Type: "object", Opaque: true}, nil
	default:
		return nil, fail("REST_UPSTREAM_EXTRACT_TYPE_UNSUPPORTED", "%s", goTypeName(expr))
	}
}

func (ex *extractor) namedSchema(name string, depth int) (*schema, error) {
	if _, ok := ex.structs[name]; !ok {
		return nil, fail("REST_UPSTREAM_EXTRACT_TYPE_UNKNOWN", "%s is neither a basic Go type nor a struct in the parsed package", name)
	}
	return &schema{Ref: "#/components/schemas/" + name}, nil
}

func identOfType(expr ast.Expr) (string, error) {
	if star, ok := expr.(*ast.StarExpr); ok {
		expr = star.X
	}
	ident, ok := expr.(*ast.Ident)
	if !ok {
		return "", fail("REST_UPSTREAM_EXTRACT_EMBEDDED_UNSUPPORTED", "%s", goTypeName(expr))
	}
	return ident.Name, nil
}

func goTypeName(expr ast.Expr) string {
	return fmt.Sprintf("%T", expr)
}

// resolvePathExpr evaluates a route path expression: an addition chain of
// string constants and literals. Unknown identifiers fail closed so renamed
// constants force an explicit extractor review.
func (ex *extractor) resolvePathExpr(expr ast.Expr) (string, error) {
	switch typed := expr.(type) {
	case *ast.BasicLit:
		if typed.Kind != token.STRING {
			return "", fail("REST_UPSTREAM_EXTRACT_PATH_UNSUPPORTED", "%s", typed.Value)
		}
		value, err := strconv.Unquote(typed.Value)
		if err != nil {
			return "", fail("REST_UPSTREAM_EXTRACT_PATH_UNSUPPORTED", "%s: %v", typed.Value, err)
		}
		return value, nil
	case *ast.Ident:
		value, ok := ex.constValues[typed.Name]
		if !ok {
			return "", fail("REST_UPSTREAM_EXTRACT_PATH_UNKNOWN_IDENT", "%s is not a package string constant", typed.Name)
		}
		return value, nil
	case *ast.BinaryExpr:
		if typed.Op != token.ADD {
			return "", fail("REST_UPSTREAM_EXTRACT_PATH_UNSUPPORTED", "operator %s in path expression", typed.Op)
		}
		left, err := ex.resolvePathExpr(typed.X)
		if err != nil {
			return "", err
		}
		right, err := ex.resolvePathExpr(typed.Y)
		if err != nil {
			return "", err
		}
		return left + right, nil
	default:
		return "", fail("REST_UPSTREAM_EXTRACT_PATH_UNSUPPORTED", "%s", goTypeName(expr))
	}
}

// requestStructName extracts the request struct from a wrapperPost call's
// request factory: func() any { return &XReq{...} }.
func requestStructName(call *ast.CallExpr) (string, error) {
	if len(call.Args) == 0 {
		return "", fail("REST_UPSTREAM_EXTRACT_REQUEST_MISSING", "wrapperPost has no request factory argument")
	}
	literal, ok := call.Args[0].(*ast.FuncLit)
	if !ok {
		return "", fail("REST_UPSTREAM_EXTRACT_REQUEST_MISSING", "wrapperPost first argument is not a func literal")
	}
	for _, stmt := range literal.Body.List {
		returnStmt, ok := stmt.(*ast.ReturnStmt)
		if !ok || len(returnStmt.Results) != 1 {
			continue
		}
		unary, ok := returnStmt.Results[0].(*ast.UnaryExpr)
		if !ok || unary.Op != token.AND {
			continue
		}
		composite, ok := unary.X.(*ast.CompositeLit)
		if !ok {
			continue
		}
		name, err := identOfType(composite.Type)
		if err != nil {
			return "", fail("REST_UPSTREAM_EXTRACT_REQUEST_MISSING", "wrapperPost request literal %s", goTypeName(composite.Type))
		}
		return name, nil
	}
	return "", fail("REST_UPSTREAM_EXTRACT_REQUEST_MISSING", "wrapperPost func literal returns no request literal")
}

// handlerName resolves the wrapperPost handler argument to a method name,
// unwrapping intermediate wrappers such as wrapperTraceLog(h.listCollections).
func handlerName(expr ast.Expr) (string, error) {
	switch typed := expr.(type) {
	case *ast.SelectorExpr:
		return typed.Sel.Name, nil
	case *ast.CallExpr:
		for index := len(typed.Args) - 1; index >= 0; index-- {
			name, err := handlerName(typed.Args[index])
			if err == nil {
				return name, nil
			}
		}
		return "", fail("REST_UPSTREAM_EXTRACT_HANDLER_MISSING", "%s", goTypeName(expr))
	default:
		return "", fail("REST_UPSTREAM_EXTRACT_HANDLER_MISSING", "%s", goTypeName(expr))
	}
}

var httpMethodNames = map[string]bool{
	"GET": true, "POST": true, "PUT": true, "DELETE": true, "PATCH": true,
}

// routeCalls walks the top-level statements of RegisterRoutesToV2 for
// router.<METHOD>(...) calls. Two delegation shapes fail closed because their
// registrations are invisible to this body and would silently under-report the
// route set: the router handed to a helper as a call argument, and a
// router.<non-METHOD> call such as router.Group splitting the surface onto a
// sub-router. The walk does not descend into function literals — closures run
// at request time, so a router reference inside a handler is not a
// registration delegation.
func routeCalls(fn *ast.FuncDecl) ([]*ast.CallExpr, error) {
	var calls []*ast.CallExpr
	for _, stmt := range fn.Body.List {
		var fatal error
		ast.Inspect(stmt, func(node ast.Node) bool {
			if fatal != nil {
				return false
			}
			if _, ok := node.(*ast.FuncLit); ok {
				return false
			}
			call, ok := node.(*ast.CallExpr)
			if !ok {
				return true
			}
			for _, arg := range call.Args {
				ident, ok := arg.(*ast.Ident)
				if ok && ident.Name == "router" {
					fatal = fail("REST_UPSTREAM_EXTRACT_ROUTER_DELEGATED", "%s: the router is passed to %s; registrations outside this function body are not visible to the extractor", fn.Name.Name, exprName(call.Fun))
					return false
				}
			}
			selector, ok := call.Fun.(*ast.SelectorExpr)
			if !ok {
				return true
			}
			receiver, ok := selector.X.(*ast.Ident)
			if !ok || receiver.Name != "router" {
				return true
			}
			if !httpMethodNames[selector.Sel.Name] {
				fatal = fail("REST_UPSTREAM_EXTRACT_ROUTER_GROUP", "%s: router.%s splits the registration surface; the extractor only reads direct router.<METHOD> calls", fn.Name.Name, selector.Sel.Name)
				return false
			}
			calls = append(calls, call)
			return true
		})
		if fatal != nil {
			return nil, fatal
		}
	}
	return calls, nil
}

func exprName(expr ast.Expr) string {
	switch inner := expr.(type) {
	case *ast.Ident:
		return inner.Name
	case *ast.SelectorExpr:
		return exprName(inner.X) + "." + inner.Sel.Name
	default:
		return "expression"
	}
}

func extractSkeleton(dir, repository, sourceDir, mountPrefix string) (*skeleton, error) {
	ex, err := loadPackage(dir)
	if err != nil {
		return nil, err
	}
	if mountPrefix == "" || !strings.HasPrefix(mountPrefix, "/") {
		return nil, fail("REST_UPSTREAM_EXTRACT_MOUNT_PREFIX", "%q", mountPrefix)
	}
	var register *ast.FuncDecl
	for _, file := range ex.files {
		for _, decl := range file.Decls {
			fn, ok := decl.(*ast.FuncDecl)
			if !ok || fn.Name.Name != "RegisterRoutesToV2" || fn.Recv == nil {
				continue
			}
			register = fn
		}
	}
	if register == nil {
		return nil, fail("REST_UPSTREAM_EXTRACT_ROUTE_TABLE_MISSING", "no (*HandlersV2) RegisterRoutesToV2 found")
	}
	operations := []operation{}
	calls, err := routeCalls(register)
	if err != nil {
		return nil, err
	}
	for _, call := range calls {
		if len(call.Args) < 1 {
			return nil, fail("REST_UPSTREAM_EXTRACT_PATH_MISSING", "route call without arguments")
		}
		method := strings.ToLower(call.Fun.(*ast.SelectorExpr).Sel.Name)
		relative, err := ex.resolvePathExpr(call.Args[0])
		if err != nil {
			return nil, err
		}
		fullPath := mountPrefix + relative
		var requestWrapper *ast.CallExpr
		var handler ast.Expr
		var fatal error
		ast.Inspect(call, func(node ast.Node) bool {
			inner, ok := node.(*ast.CallExpr)
			if !ok || inner == call {
				return true
			}
			ident, ok := inner.Fun.(*ast.Ident)
			if !ok || ident.Name != "wrapperPost" {
				return true
			}
			// Two wrapperPost calls in one route registration are ambiguous:
			// picking one silently would extract an arbitrary contract.
			if requestWrapper != nil {
				fatal = fail("REST_UPSTREAM_EXTRACT_WRAPPER_AMBIGUOUS", "%s %s: route registers more than one wrapperPost", strings.ToUpper(method), fullPath)
				return false
			}
			if len(inner.Args) >= 2 {
				requestWrapper = inner
				handler = inner.Args[len(inner.Args)-1]
			}
			return false
		})
		if fatal != nil {
			return nil, fatal
		}
		if requestWrapper == nil {
			return nil, fail("REST_UPSTREAM_EXTRACT_WRAPPER_MISSING", "%s %s: route is not registered through wrapperPost", strings.ToUpper(method), fullPath)
		}
		structName, err := requestStructName(requestWrapper)
		if err != nil {
			return nil, fmt.Errorf("%s %s: %w", strings.ToUpper(method), fullPath, err)
		}
		name, err := handlerName(handler)
		if err != nil {
			return nil, fmt.Errorf("%s %s: %w", strings.ToUpper(method), fullPath, err)
		}
		if _, err := ex.structSchema(structName, 0); err != nil {
			return nil, fmt.Errorf("%s %s: %w", strings.ToUpper(method), fullPath, err)
		}
		operations = append(operations, operation{
			Path:          fullPath,
			Method:        method,
			Handler:       name,
			RequestStruct: structName,
			Deprecated:    ex.routeDeprecated(call.Args[0]),
			RequestSchema: &schema{Ref: "#/components/schemas/" + structName},
		})
	}
	if len(operations) == 0 {
		return nil, fail("REST_UPSTREAM_EXTRACT_ROUTES_EMPTY", "no routes found in RegisterRoutesToV2")
	}
	sort.Slice(operations, func(left, right int) bool {
		if operations[left].Path != operations[right].Path {
			return operations[left].Path < operations[right].Path
		}
		return operations[left].Method < operations[right].Method
	})

	seeds := []string{}
	for _, op := range operations {
		seeds = append(seeds, op.RequestStruct)
	}
	schemas := map[string]*schema{}
	for _, name := range ex.reachableStructNames(seeds) {
		built, err := ex.structSchema(name, 0)
		if err != nil {
			// Anything reachable from a route request must resolve; an
			// unsupported shape in that closure is an extractor gap.
			return nil, fmt.Errorf("component %s: %w", name, err)
		}
		schemas[name] = built
	}
	return &skeleton{
		SchemaVersion: schemaVersion,
		ExtractedFrom: extractedFrom{Repository: repository, SourceDir: sourceDir, MountPrefix: mountPrefix},
		Operations:    operations,
		Components:    map[string]any{"schemas": schemas},
	}, nil
}

// reachableStructNames walks named struct references outwards from the route
// request structs. Structs the route table cannot reach (package helpers) are
// irrelevant to the API surface and never enter the skeleton.
func (ex *extractor) reachableStructNames(seeds []string) []string {
	seen := map[string]bool{}
	queue := []string{}
	enqueue := func(name string) {
		if _, isStruct := ex.structs[name]; isStruct && !seen[name] {
			seen[name] = true
			queue = append(queue, name)
		}
	}
	for _, seed := range seeds {
		enqueue(seed)
	}
	for index := 0; index < len(queue); index++ {
		for _, field := range ex.structs[queue[index]].fields {
			if field.jsonName == "" {
				if name, err := identOfType(field.goType); err == nil {
					enqueue(name)
				}
				continue
			}
			ex.eachNamedType(field.goType, enqueue)
		}
	}
	sort.Strings(queue)
	return queue
}

// eachNamedType visits every named type reference in the expression,
// descending through pointers, slices, and map values.
func (ex *extractor) eachNamedType(expr ast.Expr, visit func(string)) {
	switch typed := expr.(type) {
	case *ast.StarExpr:
		ex.eachNamedType(typed.X, visit)
	case *ast.ArrayType:
		ex.eachNamedType(typed.Elt, visit)
	case *ast.Ident:
		if _, isStruct := ex.structs[typed.Name]; isStruct {
			visit(typed.Name)
		}
	case *ast.SelectorExpr:
		// External package types never map to in-package structs.
	}
}

// routeDeprecated reports whether any path constant in the expression carries
// a "deprecated" comment (e.g. GetProgressAction in constant.go).
func (ex *extractor) routeDeprecated(expr ast.Expr) bool {
	switch typed := expr.(type) {
	case *ast.Ident:
		return ex.deprecated[typed.Name]
	case *ast.BinaryExpr:
		return ex.routeDeprecated(typed.X) || ex.routeDeprecated(typed.Y)
	default:
		return false
	}
}

func (ex *extractor) structNames() []string {
	names := make([]string, 0, len(ex.structs))
	for name := range ex.structs {
		names = append(names, name)
	}
	sort.Strings(names)
	return names
}

func main() {
	dir := flag.String("dir", "", "pinned httpserver checkout directory (required)")
	out := flag.String("out", "", "output skeleton JSON path; - for stdout")
	repository := flag.String("repository", "milvus-io/milvus", "upstream repository recorded in the skeleton")
	sourceDir := flag.String("source-dir", "internal/distributed/proxy/httpserver", "source directory recorded in the skeleton")
	mountPrefix := flag.String("mount-prefix", "/v2/vectordb", "mount prefix prepended to relative route paths")
	flag.Parse()
	if *dir == "" || *out == "" {
		fmt.Fprintln(os.Stderr, "Usage: go run extractor.go --dir <dir> --out <path>")
		os.Exit(2)
	}
	built, err := extractSkeleton(*dir, *repository, *sourceDir, *mountPrefix)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}
	encoded, err := json.MarshalIndent(built, "", "  ")
	if err != nil {
		fmt.Fprintf(os.Stderr, "REST_UPSTREAM_EXTRACT_MARSHAL_FAILED: %v\n", err)
		os.Exit(1)
	}
	encoded = append(encoded, '\n')
	if *out == "-" {
		_, _ = os.Stdout.Write(encoded)
		return
	}
	if err := os.WriteFile(*out, encoded, 0o644); err != nil {
		fmt.Fprintf(os.Stderr, "REST_UPSTREAM_EXTRACT_WRITE_FAILED: %v\n", err)
		os.Exit(1)
	}
}
