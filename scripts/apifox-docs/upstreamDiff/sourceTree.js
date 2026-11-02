const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020')

// Source-tree skeleton loader and converter (design §6). The Go extractor
// (milvus/extractor.go) produces the skeleton; this module is the Node-side
// gate that validates it against the contract, re-checks the invariants the
// schema cannot express, and converts it into the minimal OpenAPI document
// shape the branch-aware diff consumes for source-tree lock sources.

const skeletonSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-upstream-source-tree-skeleton.schema.json'), 'utf8'))

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function compileSchema(schema) {
    return new Ajv2020({allErrors: true, strict: false}).compile(schema)
}

const validateSkeleton = compileSchema(skeletonSchema)

// Invariants beyond the JSON schema: deterministic ordering, reference
// integrity, and mount-prefix consistency. All extractor guarantees, re-checked
// here so a hand-edited skeleton cannot smuggle drift past the diff.
function assertSkeletonInvariants(skeleton) {
    const schemas = skeleton.components.schemas
    // The extractor sorts by the (path, method) tuple; compare the same way.
    // String order on "method path" would invert the tuple order across methods
    // ("get /z" sorts before "post /a"; the tuple puts /a first) and reject a
    // correctly sorted mixed-method skeleton. Equal neighbors are a duplicated
    // route, not a sort order, and fail with their own code.
    for (let index = 1; index < skeleton.operations.length; index++) {
        const previous = skeleton.operations[index - 1]
        const current = skeleton.operations[index]
        if (previous.path === current.path && previous.method === current.method) {
            fail('REST_UPSTREAM_SKELETON_DUPLICATE_ROUTE', `${current.method} ${current.path}`)
        }
        const ordered = previous.path < current.path || (previous.path === current.path && previous.method <= current.method)
        if (!ordered) fail('REST_UPSTREAM_SKELETON_ORDER', `${current.method} ${current.path} follows ${previous.method} ${previous.path}: operations must be sorted by (path, method)`)
    }
    for (const op of skeleton.operations) {
        // The extractor always composes prefix + relative, and the relative
        // path starts with "/" — a bare startsWith would let "/v2/vectordbentities"
        // through as if it were mounted under "/v2/vectordb".
        if (op.path !== skeleton.extractedFrom.mountPrefix && !op.path.startsWith(`${skeleton.extractedFrom.mountPrefix}/`)) {
            fail('REST_UPSTREAM_SKELETON_MOUNT_PREFIX', `${op.path} is not mounted under ${skeleton.extractedFrom.mountPrefix}`)
        }
        const ref = op.requestSchema?.$ref
        if (ref) {
            const name = ref.replace('#/components/schemas/', '')
            if (!schemas[name]) fail('REST_UPSTREAM_SKELETON_REF_DANGLING', `${op.path}: ${ref}`)
        }
    }
    for (const [name, schema] of Object.entries(schemas)) {
        for (const member of schema.required ?? []) {
            if (!(member in (schema.properties ?? {}))) {
                fail('REST_UPSTREAM_SKELETON_REQUIRED_DANGLING', `${name}: required member ${member} has no property`)
            }
        }
        // The minimal vocabulary allows arbitrarily nested items ([][]Struct is
        // golden coverage), so ref collection must recurse the whole subtree —
        // a dangling $ref below the first items level would otherwise slip through.
        for (const ref of collectRefs(schema)) {
            if (!schemas[ref.replace('#/components/schemas/', '')]) {
                fail('REST_UPSTREAM_SKELETON_REF_DANGLING', `${name}: ${ref}`)
            }
        }
    }
}

function collectRefs(value, seen = new Set()) {
    if (Array.isArray(value)) {
        for (const item of value) collectRefs(item, seen)
        return seen
    }
    if (!value || typeof value !== 'object') return seen
    if (typeof value.$ref === 'string') seen.add(value.$ref)
    for (const child of Object.values(value)) collectRefs(child, seen)
    return seen
}

function parseRestUpstreamSkeleton(text, label = 'skeleton.json') {
    let skeleton
    try {
        skeleton = JSON.parse(text)
    } catch (error) {
        fail('REST_UPSTREAM_SKELETON_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    if (!validateSkeleton(skeleton)) {
        const details = validateSkeleton.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_UPSTREAM_SKELETON_SCHEMA_INVALID', details)
    }
    assertSkeletonInvariants(skeleton)
    return skeleton
}

function loadRestUpstreamSkeleton(filePath) {
    return parseRestUpstreamSkeleton(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

// Convert the skeleton into the OpenAPI document shape the diff expects.
// Every operation carries its handler and request struct as x-milvus-*
// evidence; no responses are emitted because a source-tree skeleton has no
// extractable response contract — the diff's structure-only mode (source-tree
// sources) skips response comparison instead of reporting the gap.
function skeletonToUpstreamDocument(skeleton) {
    const paths = {}
    for (const op of skeleton.operations) {
        const item = paths[op.path] || (paths[op.path] = {})
        if (item[op.method]) fail('REST_UPSTREAM_SKELETON_DUPLICATE_ROUTE', `${op.method} ${op.path}`)
        item[op.method] = {
            'x-milvus-handler': op.handler,
            'x-milvus-request-struct': op.requestStruct,
            ...(op.deprecated ? {deprecated: true} : {}),
            ...(op.requestSchema ? {requestBody: {content: {'application/json': {schema: op.requestSchema}}}} : {}),
        }
    }
    return {
        openapi: '3.0.3',
        info: {title: 'REST upstream source-tree skeleton', version: skeleton.extractedFrom.mountPrefix},
        paths,
        components: skeleton.components,
    }
}

// The skeleton must come from the same repository the lock pins; a skeleton
// from any other tree must not drive fragment refresh decisions.
function assertSkeletonMatchesSource(skeleton, source) {
    if (skeleton.extractedFrom.repository !== source.repository) {
        fail('REST_UPSTREAM_SKELETON_SOURCE_MISMATCH', `${skeleton.extractedFrom.repository} != lock ${source.repository}`)
    }
}

module.exports = {parseRestUpstreamSkeleton, loadRestUpstreamSkeleton, skeletonToUpstreamDocument, assertSkeletonMatchesSource}
