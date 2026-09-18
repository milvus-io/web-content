#!/usr/bin/env python3
"""Run the cpp snippets of a user-guide page against a live Milvus server using a
prebuilt milvus-sdk-cpp binary from the `default-conan-local2` Conan repo.

If a prebuilt binary matching the requested version/system is available, it is
installed with `--build=never` and the page's ```cpp blocks are compiled and
run against it. If no prebuilt binary is found, cpp verification is SKIPPED
(reported, not failed).

Usage: python3 run_page_cpp.py <page.md> [<version>]
"""
import os
import re
import shutil
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
PROJ = os.path.join(REPO, "sdk-tmp", "snippet-run", "cpp")
DEPLOY = os.path.join(PROJ, "deploy")
REMOTE = "default-conan-local2"
CONAN_HOME = os.environ.get("CONAN_HOME", os.path.join(os.path.expanduser("~"), "work", ".conan2"))


def install_prebuilt(version):
    """Try to fetch a prebuilt milvus-sdk-cpp/<version> binary. Return True on success.
    The published binaries are built with cppstd=14 — match that setting."""
    attempts = [
        ["-s", "compiler.cppstd=14"],
        ["-s", "compiler.version=11", "-s", "compiler.cppstd=14"],
        ["-s", "compiler.version=12", "-s", "compiler.cppstd=14", "-s", "build_type=Release"],
    ]
    for extra in attempts:
        cmd = ["conan", "install", f"--requires=milvus-sdk-cpp/{version}@milvus/dev",
               "--build=never", f"--deployer=full_deploy",
               f"--output-folder={DEPLOY}"] + extra
        r = subprocess.run(cmd, capture_output=True, text=True, env={**os.environ, "CONAN_HOME": CONAN_HOME})
        if r.returncode == 0:
            return True
    return False


def latest_remote_version():
    """Query the remote for the newest milvus-sdk-cpp version."""
    r = subprocess.run(["conan", "search", "milvus-sdk-cpp/*", "-r", REMOTE],
                       capture_output=True, text=True, env={**os.environ, "CONAN_HOME": CONAN_HOME})
    vers = re.findall(r"milvus-sdk-cpp/([0-9]+\.[0-9]+\.[0-9]+)@milvus/dev", r.stdout)
    vers.sort(key=lambda v: [int(x) for x in v.split(".")])
    return vers[-1] if vers else None


def main():
    page = sys.argv[1]
    version = sys.argv[2] if len(sys.argv) > 2 else latest_remote_version()
    if not version:
        print("cpp: no milvus-sdk-cpp recipe on the remote — skipping cpp verification")
        sys.exit(0)
    if not shutil.which("conan"):
        print("cpp: conan not installed — SKIPPING cpp verification")
        sys.exit(0)

    if not install_prebuilt(version):
        print(f"cpp: no prebuilt milvus-sdk-cpp/{version} binary for this system on {REMOTE} — SKIPPING cpp verification")
        sys.exit(0)
    print(f"cpp: using prebuilt milvus-sdk-cpp/{version} from {REMOTE}")

    md = open(page).read()
    blocks = re.findall(r"```cpp\n(.*?)```", md, re.S)

    inc = os.path.join(DEPLOY, "include")
    lib = os.path.join(DEPLOY, "lib")
    if not os.path.isdir(inc):
        print("cpp: deployed package has no include/ dir — skipping cpp verification")
        sys.exit(0)

    # assemble: hoist includes, strip per-block client init, wrap block bodies
    # in scoped braces, and create one shared client in main() so blocks that
    # each start with `auto client = MilvusClientV2::Create();` do not clash.
    includes = []
    bodies = []
    for b in blocks:
        kept = []
        for line in b.split("\n"):
            if line.strip().startswith("#include"):
                includes.append(line.strip())
                continue
            kept.append(line)
        bodies.append("\n".join(kept))
    includes = list(dict.fromkeys(includes))
    cleaned = []
    for b in bodies:
        b = re.sub(
            r"auto\s+client\s*=\s*MilvusClientV2::Create\(\s*\);",
            "", b)
        b = re.sub(
            r"util::CheckStatus\(\s*client->Connect\(\s*ConnectParam\([^)]*\)\.WithToken\([^)]*\)\s*\)\s*\)\s*;",
            "", b, flags=re.S)
        cleaned.append(b)
    bodies = cleaned
    prog = "\n".join(includes) + "\n\nint main() {\n"
    prog += '    auto client = milvus::MilvusClientV2::Create();\n'
    prog += '    util::CheckStatus(client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus")));\n'
    for i, b in enumerate(bodies):
        prog += f"    // === block {i} ===\n    {{\n"
        prog += "\n".join("        " + ln for ln in b.split("\n")) + "\n"
        prog += "    }\n"
    prog += "    return 0;\n}\n"

    os.makedirs(PROJ, exist_ok=True)
    src = os.path.join(PROJ, "run_page.cpp")
    out = os.path.join(PROJ, "a.out")
    with open(src, "w") as f:
        f.write(prog)

    # link against the deployed library (find the milvus .a/.so)
    if not shutil.which("g++"):
        print("cpp: g++ not installed — SKIPPING cpp verification")
        sys.exit(0)
    libs = [f for f in os.listdir(lib) if f.startswith("libmilvus")] if os.path.isdir(lib) else []
    link = f"-L{lib} -lmilvus_client" if libs else ""
    print(f"cpp blocks: {len(blocks)}")
    c = subprocess.run(["g++", "-std=c++14", "-o", out, src, f"-I{inc}"] + (link.split() if link else []),
                       capture_output=True, text=True, cwd=PROJ)
    if c.returncode != 0:
        sys.stderr.write(c.stderr[-3000:])
        print(f"\n=== {page} === cpp compile FAILED ({len(blocks)} blocks)")
        sys.exit(1)
    r = subprocess.run([out], capture_output=True, text=True)
    sys.stdout.write(r.stdout)
    sys.stderr.write(r.stderr[-3000:] if r.returncode else "")
    print(f"\n=== {page} === cpp run {'OK' if r.returncode == 0 else 'FAILED'} ({len(blocks)} blocks)")
    sys.exit(r.returncode)


if __name__ == "__main__":
    main()
