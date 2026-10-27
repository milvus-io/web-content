#!/usr/bin/env python3
"""Audit Java API-reference type pages against the nested-subtype placement rule."""
from __future__ import annotations

import argparse
import json
import re
import subprocess
from pathlib import Path

DEDICATED_NESTED_ALLOWLIST = {
    "CollectionSchema",
    "FieldSchema",
    "StructFieldSchema",
    "Function",
    "MetricType",
    "IndexType",
}

DECLARATION = re.compile(
    r"^(\s*)(?:public |protected |private )?(?:static )?(?:final )?"
    r"(class|interface|enum|record)\s+([A-Za-z_][A-Za-z0-9_]*)"
)


def declarations(repo: Path, tag: str) -> dict[str, list[dict]]:
    files = subprocess.check_output(
        [
            "git",
            "-C",
            str(repo),
            "ls-tree",
            "-r",
            "--name-only",
            f"{tag}^{{commit}}",
            "sdk-core/src/main/java",
            "sdk-bulkwriter/src/main/java",
        ],
        text=True,
    ).splitlines()
    result: dict[str, list[dict]] = {}
    for path in files:
        if not path.endswith(".java"):
            continue
        source = subprocess.check_output(
            ["git", "-C", str(repo), "show", f"{tag}^{{commit}}:{path}"],
            text=True,
        )
        package_match = re.search(r"^package\s+([\w.]+);", source, re.M)
        package = package_match.group(1) if package_match else ""
        for number, line in enumerate(source.splitlines(), 1):
            match = DECLARATION.match(line)
            if not match:
                continue
            name = match.group(3)
            result.setdefault(name, []).append(
                {
                    "path": path,
                    "line": number,
                    "package": package,
                    "kind": match.group(2),
                    "nested": bool(match.group(1)),
                }
            )
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--docs-root", required=True)
    parser.add_argument("--sdk", required=True)
    parser.add_argument("--v26-tag", default="v2.6.27")
    parser.add_argument("--v30-tag", default="v3.0.12")
    parser.add_argument("--output")
    args = parser.parse_args()
    docs = Path(args.docs_root)
    repo = Path(args.sdk)
    versions = (
        ("v2.6.x", args.v26_tag),
        ("v3.0.x", args.v30_tag),
    )
    violations: list[dict] = []
    page_counts: dict[str, int] = {}
    allowlist_pages = {
        "v2/Collections/CollectionSchema/CollectionSchema.md",
        "v2/Collections/FieldSchema.md",
        "v2/Collections/StructFieldSchema/StructFieldSchema.md",
        "v2/Collections/Function/Function.md",
        "v2/Management/MetricType.md",
        "v2/Management/IndexType.md",
    }
    for version, tag in versions:
        inventory = declarations(repo, tag)
        pages = list((docs / version).rglob("*.md"))
        page_counts[version] = len(pages)
        page_set = {page.resolve().as_posix() for page in pages}
        version_prefix = (docs / version).resolve().as_posix()
        for relative in sorted(allowlist_pages):
            expected = f"{version_prefix}/{relative}"
            if expected not in page_set:
                violations.append(
                    {
                        "version": version,
                        "type": "missing_dedicated_allowlist_page",
                        "page": expected,
                    }
                )
        for page in pages:
            all_declarations = inventory.get(page.stem, [])
            if "/v2/" in page.as_posix():
                scoped = [
                    item
                    for item in all_declarations
                    if item["package"].startswith("io.milvus.v2.")
                ]
            else:
                scoped = [
                    item
                    for item in all_declarations
                    if item["package"].startswith("io.milvus.param.")
                    or item["package"].startswith("io.milvus.response.")
                ]
            # Explicit doc-architecture allowlist overrides source nesting.
            if page.stem in DEDICATED_NESTED_ALLOWLIST:
                continue
            # A same-named top-level declaration in the documented generation wins
            # over a nested declaration in the other generation.
            if not any(not item["nested"] for item in scoped):
                for declaration in scoped:
                    if declaration["nested"]:
                        violations.append(
                            {
                                "version": version,
                                "type": "nested_standalone_page",
                                "page": str(page),
                                "declaration": declaration,
                            }
                        )
    report = {
        "rule": "Java V2 dedicated nested allowlist pages are required; other nested request/response subtypes are inline-only",
        "pages_inspected": page_counts,
        "violation_count": len(violations),
        "violations": violations,
    }
    output = json.dumps(report, indent=2) + "\n"
    if args.output:
        Path(args.output).write_text(output)
    else:
        print(output, end="")
    return 1 if violations else 0


if __name__ == "__main__":
    raise SystemExit(main())
