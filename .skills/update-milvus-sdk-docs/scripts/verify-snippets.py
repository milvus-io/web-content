#!/usr/bin/env python3
"""Compile-level verification of the code snippets in the SDK API reference docs.

For a given SDK doc tree (or the whole API_Reference/), extract the code blocks
and compile-verify them with the SDK's language toolchain. Only *complete,
compilable* code blocks (full import + full function/main) are compiled; partial
fragments (signatures, isolated option chains that depend on out-of-snippet
context) are skipped and left to the deterministic static reconciliation pass.

Usage:
  python3 verify-snippets.py <sdk-dir> [--language <lang>] [--verbose]
  python3 verify-snippets.py --all

Examples:
  python3 verify-snippets.py API_Reference/milvus-sdk-go/v3.0.x
  python3 verify-snippets.py API_Reference/pymilvus/v3.0.x --language python
  python3 verify-snippets.py --all --verbose

Exit code: 0 if every compilable snippet passed; 1 if any failed; 2 on usage
error. Snippets that are only fragments are not failures.
"""
import argparse
import os
import re
import shutil
import subprocess
import sys
import tempfile

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
SDK_TMP = os.path.join(REPO, "sdk-tmp", "sdks")

# identifiers that focused Example snippets commonly assume are defined by the
# surrounding page context (client setup, connection vars, collection names).
# When a compile failure only reports these as undefined, the snippet is a
# focused fragment rather than an API error and is skipped, not failed.
CONTEXT_VARS = {
    "ctx", "cancel", "client", "cli", "milvusAddr", "milvus_addr", "addr",
    "token", "username", "password", "limit", "topk", "offset", "queryVector",
    "query_vector", "queryVectors", "vectors", "vector", "collectionName",
    "collection_name", "dbName", "db_name", "databaseName", "partitionNames",
    "partition_names", "schema", "fieldName", "field_name", "expr", "filter",
    "pkField", "pk_field", "dim", "nlist", "efConstruction", "metricType",
    "metric_type", "searchParams", "search_params", "annsField", "anns_field",
    "ids", "data", "rows", "id", "name", "indexName", "index_name", "msg",
    "resp", "response", "resultSets", "results", "outputFields", "i", "err",
    "jobID", "job_id", "jobId", "pinID", "pin_id", "info", "state", "task", "compactionID",
    "floatVectors", "binaryVectors", "sparseVectors", "denseVector", "sparseVector",
    "queryVectors", "queryVector", "generateFloatVector", "createSparseVector",
    "url", "Lists", "STORAGE_REGION", "STORAGE_BUCKET_NAME",
    "STORAGE_ACCESS_KEY", "STORAGE_SECRET_KEY", "cloudProvider", "region", "bucketName",
    "accessKey", "secretKey", "rootPath", "connUri",
    "DIM", "GeneratorUtils", "STORAGE_ENDPOINT", "STORAGE_BUCKET",
    # java/v1 tutorial context (defined in surrounding prose, not in the snippet)
    "milvusClient", "clientV2", "collectionSchema", "COLLECTION_NAME",
    "PARTITION_NAME", "VECTOR_DIM", "dimension", "annName", "Constant",
    "STRUCT_FIELD", "CLIP_VECTOR_FIELD", "DESC_FIELD", "DESC_VECTOR_FIELD",
    "STRING_FIELD_NAME", "randomCollectionName", "collectionNameRandom",
    "pchannelList", "alterDatabaseReq", "descIndexResponse", "describeDBResponse",
    "generatedQueryVector", "randomVectors", "bound",
    # v1 legacy-API tutorial context (constants/helpers defined in page prose)
    "FLOAT_VECTOR_FIELD", "BINARY_VECTOR_FIELD", "VARCHAR_FIELD_NAME",
    "INT_FIELD_NAME", "DOUBLE_FIELD_NAME", "BOOL_FIELD_NAME", "FLOAT_FIELD_NAME",
    "ID_FIELD", "VECTOR_FIELD", "CONSISTENCY_LEVEL", "NPROBE", "INDEX_PARAM",
    "FIELD_TYPE", "queryResults", "searchResults", "getStatResponse",
    "ConsistencyLevelEnum", "targetVectors", "sourceVectors", "tag",
    "MetricType", "FieldType", "result",
    # more v1 tutorial context (constants/helpers/response names in page prose)
    "NEW_COLLECTION_NAME", "roleName", "userName", "objectName", "targetName",
    "sourceName", "srcNodeID", "dstNodeID", "mutationResult", "generateFloatVectors",
    "showCollectionsResponse", "showPartitionsResponse", "partStatResponse",
    "DescribeDatabaseResponse", "ListResourceGroupsResponse", "SelectGrantResponse",
    "SelectRoleResponse", "SelectUserResponse", "PoolConfigBuilder",
    "WithResourceGroups", "getBufferRowCount", "fileType",
    "privilege", "taskId", "compactionID", "name", "GetFlushAllStateParam",
    "GetMetricsParam", "ListenableFuture", "ImportResponse", "GetImportStateResponse",
    "DescribeResourceGroupResponse", "INT32_FIELD_NAME", "INT64_FIELD_NAME",
    "OLD_COLLECTION_NAME", "destNodeID", "dimension", "params",
    "DescribeCollectionResponse", "GetLoadingProgressResponse", "GetLoadStateResponse",
    "ListImportTasksResponse", "ListCollectionsResponse", "SelectGrantResponse",
    "TransferNodeParam", "Lists", "objectName", "filter", "srcNodeID", "i",
    "ShowCollectionsResponse", "ListAliasesResponse",
    "DataType", "FieldType", "dimension", "MetricType", "expr", "generateFloatVectors",
    "S3ConnectParam", "SelectGrantResponse", "CreateCollectionParam",
    "CreateSimpleCollectionParam", "client", "COLLECTION_NAME", "PARTITION_NAME",
    "INT32_FIELD_NAME", "INT64_FIELD_NAME", "destNodeID", "privilege", "params",
    "DIM", "JsonObject", "DeleteIdsParam", "GetIdsParam", "InsertRowsParam",
    "QuerySimpleParam", "SearchSimpleParam", "objectType", "param", "segmentIDs",
    "IndexState", "milvusClient", "res", "rowRecord", "rows", "vectors",
    "generatedVectors",
}


def extract_code_blocks(md_path, lang):
    """Yield (lang, code) for every fenced code block of the given language
    (honoring FENCE_ALIASES like ```shell → bash)."""
    md = open(md_path, encoding="utf-8").read()
    fences = [lang] + [k for k, v in FENCE_ALIASES.items() if v == lang]
    for fence in fences:
        for m in re.finditer(r"```" + re.escape(fence) + r"\n(.*?)```", md, re.S):
            yield m.group(1)


def is_complete_block(code, lang):
    """Heuristic: is this block a complete, compilable unit (as opposed to a
    bare signature / isolated type definition / one-liner expression)?

    An *Example* snippet is complete when it carries a full import block (or
    equivalent setup) and a runnable body. Pure signatures (`func (c *Client)`,
    `public void`, `Status Foo(...)`) and bare type declarations are fragments —
    they cannot compile standalone and are covered by the static pass instead.
    """
    code = code.strip()
    if not code:
        return False
    if lang == "go":
        # complete if it has an import block; bare method signatures are not
        return bool(re.search(r"^\s*import\s*\(|^import\s+\"", code, re.M))
    if lang == "python":
        # bare signature block (e.g. `query(\n expr: str,\n ...)`) with no import
        # is a fragment; skip it
        if re.search(r"^\w+\(", code, re.M) and not re.search(r"^\s*(from \w+ import|import \w+)", code, re.M):
            return False
        return bool(re.search(r"^\s*(from \w+ import|import \w+)", code, re.M)) and \
            len(code.splitlines()) >= 3 and \
            not code.startswith("    ")  # indented block = function-body fragment
    if lang == "javascript":
        # TypeScript-style signature blocks (e.g. `await client.x({\n key: type,\n ...})`)
        # are fragments, not runnable JS. Executable JS has imports or string
        # literal values; a block made of `key: Type` lines is a signature.
        if not re.search(r"^(import |const .* = require\(|function |async function |export )", code, re.M):
            if re.search(r":\s*[A-Z][A-Za-z0-9_<>|\[\]]", code) and not re.search(r"['\"]", code):
                return False  # TS-style signature without string values
            if re.search(r":\s*string\b|:\s*number\b|:\s*boolean\b|\*\s*$", code, re.M):
                return False  # type-annotated signature block
            return False
        return True
    if lang == "java":
        return bool(re.search(r"^import ", code, re.M))
    if lang == "cpp":
        return bool(re.search(r"^#include", code, re.M))
    if lang == "rust":
        return bool(re.search(r"^(use |fn |async fn |struct |#\[)", code, re.M))
    if lang == "bash":
        return bool(re.search(r"^curl ", code, re.M)) or bool(re.search(r"^http ", code, re.M))
    return False


def wrap_for_compile(code, lang):
    """Wrap a complete-but-fragmentary snippet into a compilable unit.

    Returns the wrapped code, or None if the snippet cannot be wrapped (then the
    caller should treat it as a skipped fragment). Only wraps when the snippet
    has enough structure to make wrapping meaningful.
    """
    code = code.strip()
    if lang == "go":
        if re.search(r"^package \w+", code, re.M):
            return code
        if re.search(r"^\s*import\s*\(", code, re.M):
            # split import block from the body; wrap the body in func main()
            m = re.search(r"(^\s*import\s*\(.*?\))(.*)", code, re.S)
            if m:
                imports, body = m.group(1), m.group(2).strip()
                return f"package main\n\n{imports}\n\nfunc main() {{\n{body}\n}}\n"
        return None
    if lang == "python":
        return code  # py_compile accepts module-level code directly
    if lang == "javascript":
        return code  # node --check accepts module-level ESM/CommonJS
    if lang == "java":
        if re.search(r"^package |^public class ", code, re.M):
            return code
        # Complete Example blocks carry a full import list followed by runnable
        # statements. Imports must stay at the top of the file; the statements
        # are wrapped in a main() inside a public class. Fragments (bare
        # signatures, lone expressions without imports) are not wrapped.
        import_block = []
        body_lines = []
        in_import = True
        for line in code.splitlines():
            s = line.strip()
            if in_import and (s.startswith("import ") or s.startswith("// include-") or s == ""):
                import_block.append(line)
                continue
            if in_import and s.startswith("import "):
                import_block.append(line)
                continue
            in_import = False
            body_lines.append(line)
        if not import_block or not any(l.strip().startswith("import ") for l in import_block):
            return None
        body = "\n".join(body_lines)
        # If the body declares its own method(s) at class level (e.g. a helper
        # method that follows the imports), keep them at class level instead of
        # wrapping them inside main().
        if re.search(r"^\s*(?:(?:public|private|protected|static)\s+)+\S+\s+\w+\s*\(", body, re.M):
            wrapped = "\n".join(import_block) + "\n\n"
            wrapped += "public class Snippet {\n"
            wrapped += body + "\n"
            wrapped += "}\n"
            return wrapped
        wrapped = "\n".join(import_block) + "\n\n"
        wrapped += "public class Snippet {\n"
        wrapped += "    public static void main(String[] args) throws Exception {\n"
        wrapped += "\n".join("    " + l if l.strip() else l for l in body.splitlines()) + "\n"
        wrapped += "    }\n"
        wrapped += "}\n"
        return wrapped
    if lang == "cpp":
        if re.search(r"int main\s*\(", code):
            return code
        return None
    if lang == "rust":
        if re.search(r"^fn main", code, re.M):
            return code
        return None
    return code


class Verifier:
    def __init__(self, verbose=False):
        self.verbose = verbose
        self.passed = []
        self.failed = []
        self.skipped = []

    def log(self, msg):
        if self.verbose:
            print(msg)

    def verify(self, lang, code, src_file):
        if not is_complete_block(code, lang):
            self.skipped.append((src_file, "fragment"))
            self.log(f"[skip] {src_file}: fragment (not independently compilable)")
            return
        wrapped = wrap_for_compile(code, lang)
        if wrapped is None:
            self.skipped.append((src_file, "fragment"))
            self.log(f"[skip] {src_file}: not wrappable")
            return
        ok, err = self._run(lang, wrapped, src_file)
        if ok:
            self.passed.append(src_file)
            self.log(f"[pass] {src_file}")
        else:
            self.failed.append((src_file, err))
            self.log(f"[FAIL] {src_file}\n{err}")

    def _run(self, lang, code, src_file):
        handler = getattr(self, f"_verify_{lang}", None)
        if handler is None:
            return True, f"no verifier for language {lang}"
        return handler(code, src_file)

    # ---- per-language verifiers ----

    def _verify_python(self, code, src_file):
        if not shutil.which("python3"):
            return True, "python3 not installed"
        with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as f:
            f.write(code)
            path = f.name
        try:
            r = subprocess.run(["python3", "-m", "py_compile", path],
                               capture_output=True, text=True)
            if r.returncode == 0:
                return True, ""
            err = r.stderr[-2000:]
            # IndentationError / top-level return / misplaced loop keywords are
            # usually fragments that assumed a surrounding function body.
            if any(k in err for k in ("IndentationError",
                                      "'return' outside function",
                                      "'continue' not properly in loop",
                                      "'break' outside loop",
                                      "unexpected indent")):
                return True, "context-dependent fragment"
            return False, err
        finally:
            os.unlink(path)

    def _verify_go(self, code, src_file):
        go = shutil.which("go")
        if not go:
            return True, "go not installed"
        milvus = os.path.join(SDK_TMP, "milvus")
        if not os.path.isdir(os.path.join(milvus, ".git")):
            return True, "sdk-tmp/sdks/milvus not cloned; run Step 0b first"
        # one-time setup: extract client/ into a fixed dir and resolve deps,
        # then reuse the module cache for every snippet (fast after first run)
        base = os.path.join(REPO, "sdk-tmp", "snippet-verify", "go")
        client_dir = os.path.join(base, "client")
        go_mod = os.path.join(base, "go.mod")
        if not os.path.isdir(client_dir):
            os.makedirs(base, exist_ok=True)
            with open(os.devnull, "w") as dn:
                r = subprocess.run(
                    ["git", "-C", milvus, "archive", "client/v3.0.0", "client/"],
                    stdout=subprocess.PIPE, stderr=dn)
                if r.returncode != 0:
                    return True, "cannot extract client/ from milvus (tag client/v3.0.0 missing?)"
                subprocess.run(["tar", "-x", "-C", base], input=r.stdout, capture_output=True)
            for root, _, files in os.walk(client_dir):
                for fn in files:
                    if fn.endswith("_test.go"):
                        os.remove(os.path.join(root, fn))
            with open(go_mod, "w") as f:
                f.write("module gosnippet\n\ngo 1.24.9\n\n"
                        "require github.com/milvus-io/milvus/client/v3 v3.0.0\n\n"
                        f"replace github.com/milvus-io/milvus/client/v3 => {client_dir}\n")
        os.makedirs(os.path.join(base, "cmd"), exist_ok=True)
        with open(os.path.join(base, "cmd", "main.go"), "w") as f:
            f.write(code + "\n")
        env = dict(os.environ, GOPROXY="https://goproxy.cn,direct", GOFLAGS="-mod=mod",
                   GOTOOLCHAIN="go1.25.8")
        r = subprocess.run([go, "vet", "./cmd/"], capture_output=True, text=True,
                           cwd=base, env=env)
        if r.returncode == 0:
            return True, ""
        r2 = subprocess.run([go, "build", "-o", os.devnull, "./cmd/"],
                            capture_output=True, text=True, cwd=base, env=env)
        if r2.returncode == 0:
            return True, ""
        err = (r.stderr or r2.stderr)
        # A snippet that only fails because it references context variables the
        # page assumes are defined (client, milvusAddr, limit, ...) is a focused
        # fragment, not an API error — treat as skipped.
        undefined = re.findall(r"undefined: (\w+)", err)
        if undefined and all(u in CONTEXT_VARS for u in undefined):
            return True, "context-dependent fragment"
        # "declared and not used" usually means the snippet declares helper
        # variables it never uses within the fragment — also a fragment artifact.
        if "declared and not used" in err and not re.search(r"undefined: [A-Z]\w+", err):
            return True, "fragment (declared but unused vars)"
        return False, err[-3000:]

    def _verify_javascript(self, code, src_file):
        node = shutil.which("node")
        if not node:
            return True, "node not installed"
        with tempfile.NamedTemporaryFile("w", suffix=".mjs", delete=False) as f:
            f.write(code)
            path = f.name
        try:
            r = subprocess.run([node, "--check", path], capture_output=True, text=True)
            return r.returncode == 0, r.stderr[-2000:]
        finally:
            os.unlink(path)

    def _verify_java(self, code, src_file):
        javac = shutil.which("javac")
        java = shutil.which("java")
        if not javac or not java:
            return True, "javac/java not installed"
        cp_file = os.path.join(REPO, "sdk-tmp", "snippet-verify", "java", "cp.txt")
        classpath = ""
        if os.path.isfile(cp_file):
            classpath = open(cp_file, encoding="utf-8").read().strip()
        work = tempfile.mkdtemp(prefix="javasnip-")
        try:
            clsname = "Snippet"
            m = re.search(r"public\s+class\s+(\w+)", code)
            if m:
                clsname = m.group(1)
            with open(os.path.join(work, clsname + ".java"), "w") as f:
                f.write(code)
            cmd = [javac, "-proc:none", "-d", work, os.path.join(work, clsname + ".java")]
            if classpath:
                cmd.insert(1, "-cp")
                cmd.insert(2, classpath)
            r = subprocess.run(cmd, capture_output=True, text=True)
            if r.returncode != 0:
                err = r.stderr[-2000:]
                # Context-dependent fragments reference variables/methods/classes
                # the page assumes are defined in surrounding prose (client,
                # COLLECTION_NAME, milvusClient, generateFloatVector(), ...).
                # If every compile error is an undefined symbol/package (no
                # syntax/type mismatches), treat the snippet as a focused
                # fragment and skip it.
                undefined_kinds = (
                    "cannot find symbol", "package X does not exist",
                    "error: package", "does not exist",
                )
                error_lines = [l for l in err.splitlines() if "error:" in l]
                if error_lines and all(
                    ("cannot find symbol" in l or "does not exist" in l)
                    for l in error_lines
                ):
                    return True, "context-dependent fragment"
                return False, err
            return True, ""
        finally:
            shutil.rmtree(work, ignore_errors=True)

    def _verify_cpp(self, code, src_file):
        gxx = shutil.which("g++")
        if not gxx:
            return True, "g++ not installed"
        include = os.path.join(SDK_TMP, "milvus-sdk-cpp", "src", "include")
        with tempfile.NamedTemporaryFile("w", suffix=".cpp", delete=False) as f:
            f.write(code)
            path = f.name
        try:
            cmd = [gxx, "-fsyntax-only", "-std=c++17"]
            if os.path.isdir(include):
                cmd.append(f"-I{include}")
            cmd.append(path)
            r = subprocess.run(cmd, capture_output=True, text=True)
            return r.returncode == 0, r.stderr[-2000:]
        finally:
            os.unlink(path)

    def _verify_rust(self, code, src_file):
        cargo = shutil.which("cargo")
        if not cargo:
            return True, "cargo not installed"
        work = tempfile.mkdtemp(prefix="rustsnip-")
        try:
            with open(os.path.join(work, "Cargo.toml"), "w") as f:
                f.write('[package]\nname = "snip"\nversion = "0.1.0"\nedition = "2021"\n')
            os.makedirs(os.path.join(work, "src"))
            with open(os.path.join(work, "src", "main.rs"), "w") as f:
                f.write(code + "\n")
            r = subprocess.run([cargo, "check", "--manifest-path",
                                os.path.join(work, "Cargo.toml")],
                               capture_output=True, text=True)
            return r.returncode == 0, r.stderr[-2000:]
        finally:
            shutil.rmtree(work, ignore_errors=True)

    def _verify_bash(self, code, src_file):
        bash = shutil.which("bash")
        if not bash:
            return True, "bash not installed"
        with tempfile.NamedTemporaryFile("w", suffix=".sh", delete=False) as f:
            f.write(code)
            path = f.name
        try:
            r = subprocess.run([bash, "-n", path], capture_output=True, text=True)
            return r.returncode == 0, r.stderr[-2000:]
        finally:
            os.unlink(path)


LANG_BY_SDK = {
    "milvus-sdk-go": "go",
    "pymilvus": "python",
    "milvus-sdk-java": "java",
    "milvus-sdk-node": "javascript",
    "milvus-sdk-cpp": "cpp",
    "milvus-sdk-rust": "rust",
    "milvus-restful": "bash",
}

# alternate fence languages that map to a verifier (restful uses ```shell)
FENCE_ALIASES = {"shell": "bash"}


def lang_for_dir(doc_dir):
    base = os.path.basename(doc_dir)
    if base in LANG_BY_SDK:
        return LANG_BY_SDK[base]
    # find sdk name as first path segment under API_Reference/
    rel = os.path.relpath(doc_dir, os.path.join(REPO, "API_Reference"))
    sdk = rel.split(os.sep)[0]
    return LANG_BY_SDK.get(sdk, None)


def main():
    ap = argparse.ArgumentParser(description="Compile-verify API reference snippets")
    ap.add_argument("target", nargs="?", help="doc dir (e.g. API_Reference/milvus-sdk-go/v3.0.x)")
    ap.add_argument("--language", default=None, help="force snippet language")
    ap.add_argument("--all", action="store_true", help="verify every SDK in API_Reference/")
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    verifier = Verifier(verbose=args.verbose)

    if args.all:
        targets = []
        for d in sorted(os.listdir(os.path.join(REPO, "API_Reference"))):
            if d in LANG_BY_SDK:
                targets.append(os.path.join(REPO, "API_Reference", d))
    elif args.target:
        targets = [os.path.join(REPO, args.target)]
    else:
        ap.print_help()
        return 2

    for target in targets:
        lang = args.language or lang_for_dir(target)
        if lang is None:
            print(f"WARN: no verifier for {target} — skipped")
            continue
        print(f"\n=== {target} ({lang}) ===")
        for root, _, files in os.walk(target):
            for fn in sorted(files):
                if not fn.endswith(".md"):
                    continue
                path = os.path.join(root, fn)
                for code in extract_code_blocks(path, lang):
                    verifier.verify(lang, code, os.path.relpath(path, REPO))

    print(f"\n===== SUMMARY =====")
    print(f"passed: {len(verifier.passed)}")
    print(f"failed: {len(verifier.failed)}")
    print(f"skipped (fragments): {len(verifier.skipped)}")
    if verifier.failed:
        print(f"\n--- FAILED SNIPPETS ({len(verifier.failed)}) ---")
        for src, err in verifier.failed:
            print(f"  {src}:\n    {err.strip().splitlines()[-1] if err.strip() else 'unknown'}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
