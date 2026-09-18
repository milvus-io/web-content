#!/usr/bin/env python3
"""Run the go snippets of a user-guide page against a live Milvus server.

Extracts every ```go block, hoists the imports, strips per-block client init,
and wraps the block bodies in scoped braces inside main() with a single shared
client. Compiles and runs with `go run`.

Usage: python3 run_page_go.py <page.md>
"""
import os
import shutil
import re
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
PROJ = os.path.join(REPO, "sdk-tmp", "snippet-run", "go")
GO = os.environ.get("GO_BIN", "/usr/local/go/bin/go")

GO_MOD = "module snippet-run\n\ngo 1.24.7\n\n"


def main():
    if not shutil.which(GO) and not os.path.exists(GO):
        print("go: go toolchain missing — SKIPPING go verification")
        sys.exit(0)
    page = sys.argv[1]
    md = open(page).read()
    blocks = re.findall(r"```go\n(.*?)```", md, re.S)

    imports = []
    import_paths = set()
    bodies = []
    for b in blocks:
        in_import = False
        kept = []
        for line in b.split("\n"):
            s = line.strip()
            if s == "import (":
                in_import = True
                continue
            if in_import:
                if s == ")":
                    in_import = False
                    continue
                if s:
                    # dedupe by import path (ignore alias differences)
                    p = s.split()[-1]
                    if p not in import_paths:
                        import_paths.add(p)
                        imports.append(s)
                continue
            if s.startswith("import"):
                # single-line import "path"
                p = s.split()[-1]
                if p not in import_paths:
                    import_paths.add(p)
                    imports.append(s)
                continue
            kept.append(line)
        bodies.append("\n".join(kept))
    # guide go snippets carry no imports — add the standard ones (by path)
    default_imports = [
        'milvusclient "github.com/milvus-io/milvus/client/v2/milvusclient"',
        '"context"',
        '"log"',
    ]
    for imp in default_imports:
        p = imp.split()[-1]
        if p not in import_paths:
            import_paths.add(p)
            imports.append(imp)

    # strip per-block client/addr/ctx init (var name may be `cli` or `client`) so
    # one shared client is created in main(); also drop the now-unused
    # milvusAddr / context.WithCancel / defer lines that accompany it.
    cleaned = []
    for b in bodies:
        b = re.sub(r"\w+,\s*err\s*[:=]=\s*milvusclient\.New\(.*?\)", "", b, flags=re.S)
        b = re.sub(r"\w+Addr\s*[:=]=\s*\"[^\"]*19530[^\"]*\"", "", b)
        b = re.sub(r"(_,?\s*cancel|ctx,\s*cancel)\s*[:=]=\s*context\.WithCancel\([^)]*\)", "", b)
        b = re.sub(r"defer\s+cancel\(\)", "", b)
        b = re.sub(r"defer\s+(?:client|cli)\.Close\(ctx\)", "", b)
        cleaned.append(b)
    bodies = cleaned

    prog = "package main\n\nimport (\n"
    prog += "\n".join(imports)
    if imports:
        prog += "\n"
    prog += ')\n\nfunc main() {\n'
    prog += '    ctx := context.Background()\n'
    prog += '    client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{\n'
    prog += '        Address:  "localhost:19530",\n'
    prog += '        Username: "root",\n'
    prog += '        Password: "Milvus",\n'
    prog += '    })\n'
    prog += '    if err != nil {\n        log.Fatal(err)\n    }\n'
    prog += '    defer client.Close(ctx)\n'
    for i, b in enumerate(bodies):
        prog += f"    // === block {i} ===\n    {{\n"
        prog += "\n".join("        " + ln for ln in b.split("\n")) + "\n"
        prog += "    }\n"
    prog += "}\n"

    os.makedirs(PROJ, exist_ok=True)
    with open(os.path.join(PROJ, "go.mod"), "w") as f:
        f.write(GO_MOD)
    with open(os.path.join(PROJ, "main.go"), "w") as f:
        f.write(prog)

    print(f"go blocks: {len(blocks)}")
    r = subprocess.run(
        [GO, "-C", PROJ, "get", "github.com/milvus-io/milvus/client/v2@latest"],
        capture_output=True,
        text=True,
    )
    if r.returncode != 0:
        sys.stderr.write(r.stderr[-2000:])
        print("\ngo: dependency fetch failed (network) — snippets NOT executed")
        sys.exit(1)
    # resolve transitive deps and write go.sum
    r = subprocess.run([GO, "-C", PROJ, "mod", "tidy"], capture_output=True, text=True)
    if r.returncode != 0:
        sys.stderr.write(r.stderr[-2000:])
        print("\ngo: mod tidy failed (network) — snippets NOT executed")
        sys.exit(1)
    r = subprocess.run([GO, "-C", PROJ, "run", "."], capture_output=True, text=True)
    sys.stdout.write(r.stdout)
    sys.stderr.write(r.stderr[-3000:] if r.returncode else "")
    print(f"\n=== {page} === go run {'OK' if r.returncode == 0 else 'FAILED'} ({len(blocks)} blocks)")
    sys.exit(r.returncode)


if __name__ == "__main__":
    main()
