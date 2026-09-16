#!/usr/bin/env python3
"""Run the java snippets of a user-guide page against a live Milvus server.

Extracts every ```java block, hoists imports from the first block, wraps the
block bodies in a RunPage.main() and compiles/runs it with Maven against the
milvus-sdk-java dependency.

Usage: python3 run_page_java.py <page.md>
"""
import os
import shutil
import re
import subprocess
import sys
import urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
PROJ = os.path.join(REPO, "sdk-tmp", "snippet-run", "java")
SRC = os.path.join(PROJ, "src", "main", "java")


def latest_version():
    """Query Maven Central for the latest published milvus-sdk-java version."""
    url = "https://repo1.maven.org/maven2/io/milvus/milvus-sdk-java/maven-metadata.xml"
    req = urllib.request.Request(url, headers={"User-Agent": "web-content-snippet-runner/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        xml = resp.read().decode()
    m = re.search(r"<release>([^<]+)</release>", xml)
    return m.group(1) if m else re.search(r"<latest>([^<]+)</latest>", xml).group(1)


def pom(version):
    return f"""<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>snippet</groupId>
  <artifactId>run</artifactId>
  <version>1.0</version>
  <properties><maven.compiler.source>8</maven.compiler.source><maven.compiler.target>8</maven.compiler.target></properties>
  <dependencies>
    <dependency>
      <groupId>io.milvus</groupId>
      <artifactId>milvus-sdk-java</artifactId>
      <version>{version}</version>
    </dependency>
  </dependencies>
</project>
"""


def main():
    if not shutil.which("mvn"):
        print("java: mvn not installed — SKIPPING java verification")
        sys.exit(0)
    page = sys.argv[1]
    md = open(page).read()
    blocks = re.findall(r"```java\n(.*?)```", md, re.S)

    first_imports = []
    bodies = []
    for b in blocks:
        kept = []
        for line in b.split("\n"):
            if line.strip().startswith("import ") or line.strip().startswith("package "):
                first_imports.append(line.strip())
                continue
            kept.append(line)
        bodies.append("\n".join(kept))
    # hoist all unique imports (java requires them at the top)
    first_imports = list(dict.fromkeys(first_imports))

    # strip per-block client/connection init so a single shared client can be
    # created in main() — java forbids inner-block shadowing of outer locals.
    client_init = (
        'MilvusClientV2 client = new MilvusClientV2('
        'ConnectConfig.builder().uri("http://localhost:19530")'
        '.token("root:Milvus").build());'
    )
    cleaned = []
    for b in bodies:
        # remove whole multi-line `MilvusClientV2 client = new MilvusClientV2(...);`
        b = re.sub(r"MilvusClientV2\s+client\s*=\s*new\s+MilvusClientV2\(.*?\);", "", b, flags=re.S)
        # remove whole multi-line `ConnectConfig <x> = ConnectConfig.builder()...;`
        b = re.sub(r"ConnectConfig\s+\w+\s*=\s*ConnectConfig\.builder\(\).*?\);", "", b, flags=re.S)
        cleaned.append(b)
    bodies = cleaned

    prog = "\n".join(first_imports) + "\n\npublic class RunPage {\n"
    prog += "    public static void main(String[] args) throws Exception {\n"
    prog += f"        {client_init}\n"
    for i, b in enumerate(bodies):
        prog += f"        // === block {i} ===\n"
        prog += "        {\n"
        prog += "\n".join("            " + ln for ln in b.split("\n")) + "\n"
        prog += "        }\n"
    prog += "    }\n}\n"

    os.makedirs(SRC, exist_ok=True)
    try:
        ver = latest_version()
    except Exception as e:
        print(f"java: could not resolve latest milvus-sdk-java from Maven Central ({e}) — SKIPPING java verification")
        sys.exit(0)
    with open(os.path.join(SRC, "RunPage.java"), "w") as f:
        f.write(prog)
    with open(os.path.join(PROJ, "pom.xml"), "w") as f:
        f.write(pom(ver))

    print(f"java blocks: {len(blocks)} | verifying milvus-sdk-java {ver} (Maven Central)")
    r = subprocess.run(
        ["mvn", "-q", "-f", os.path.join(PROJ, "pom.xml"), "compile", "exec:java",
         "-Dexec.mainClass=RunPage"],
        capture_output=True, text=True)
    sys.stdout.write(r.stdout)
    sys.stderr.write(r.stderr[-3000:] if r.returncode else "")
    print(f"\n=== {page} === java run {'OK' if r.returncode == 0 else 'FAILED'} ({len(blocks)} blocks)")
    sys.exit(r.returncode)


if __name__ == "__main__":
    main()
