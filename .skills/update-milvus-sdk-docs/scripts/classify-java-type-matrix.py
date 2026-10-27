#!/usr/bin/env python3
"""Classify Java type-placement candidates against source declarations at tags."""
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


def git_show(repo: Path, tag: str, path: str) -> str:
    try:
        return subprocess.check_output(
            ["git", "-C", str(repo), "show", f"{tag}:{path}"],
            text=True,
            errors="replace",
        )
    except subprocess.CalledProcessError:
        return ""


def source_paths(repo: Path, tag: str) -> list[str]:
    lines = subprocess.check_output(
        ["git", "-C", str(repo), "ls-tree", "-r", "--name-only", tag],
        text=True,
    ).splitlines()
    prefixes = (
        "sdk-core/src/main/java/io/milvus/",
        "sdk-bulkwriter/src/main/java/io/milvus/",
    )
    return [p for p in lines if p.endswith(".java") and p.startswith(prefixes)]


def classify(name: str, definitions: list[dict]) -> tuple[str, str]:
    if not definitions:
        return "FALSE_POSITIVE", "Name is absent from the target Java tag."
    if any(
        d.get("nested")
        and d["package"].startswith("io.milvus.v2.")
        and name in DEDICATED_NESTED_ALLOWLIST
        for d in definitions
    ):
        return (
            "DEDICATED_NESTED_ALLOWLIST",
            "Explicit Java V2 allowlisted nested type; preserve its dedicated standalone page.",
        )
    if any(
        d.get("nested")
        and d["package"].startswith("io.milvus.v2.")
        for d in definitions
    ):
        return (
            "NESTED_REQUEST_RESPONSE_TYPE",
            "Non-allowlisted nested request/response subtype; expand on its owner page and do not create a standalone page.",
        )
    if any("/request/data/" in d["path"] or "/request/ranker/" in d["path"] or "/request/aggregation/" in d["path"] for d in definitions):
        return "REQUEST_DATA_MODEL", "Reusable request data/ranker/aggregation model; eligible for a standalone page when shared."
    if any("/request/" in d["path"] for d in definitions) or name.endswith(("Req", "Request")):
        return "REQUEST_WRAPPER", "Operation/request parameter type; document fields in the owning operation page."
    if any("/response/" in d["path"] for d in definitions) or name.endswith(("Resp", "Response", "Wrapper")):
        return "RESPONSE_WRAPPER", "Operation/response wrapper or helper; document in RETURNS unless a global cross-cutting model."
    kinds = {d["kind"] for d in definitions}
    if "enum" in kinds:
        return "ENUM", "Public enum; eligible for a standalone Constants page when shared."
    if any("/common/" in d["path"] for d in definitions):
        return "DOMAIN_MODEL", "Reusable common/domain model; eligible for a standalone page when shared."
    if any("/exception/" in d["path"] for d in definitions):
        return "EXCEPTION", "SDK exception type; classify as global/cross-cutting when shared."
    if any("/pool/" in d["path"] for d in definitions):
        return "CLIENT_POOL", "Client pool API class; apply Step 10 to low-reference standalone pages."
    if any("/iterator/" in d["path"] for d in definitions):
        return "ITERATOR", "Reusable iterator domain model; eligible for a standalone page when shared."
    return "API_CLASS", "Public SDK class; classify by cross-page API role."


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sdk", required=True)
    parser.add_argument("--matrix", required=True)
    parser.add_argument("--v26-tag", default="v2.6.27")
    parser.add_argument("--v30-tag", default="v3.0.12")
    parser.add_argument("--output")
    args = parser.parse_args()
    repo = Path(args.sdk)
    matrix = json.loads(Path(args.matrix).read_text())
    inventory: dict[str, dict[str, dict]] = {}
    result: dict[str, dict] = {}
    for row in matrix:
        ver = row["version"]
        tag = args.v26_tag if ver == "v2.6.x" else args.v30_tag
        if ver not in inventory:
            inventory[ver] = {}
            for path in source_paths(repo, tag):
                source = git_show(repo, tag, path)
                package_match = re.search(r"^package\s+([\w.]+);", source, re.M)
                package = package_match.group(1) if package_match else ""
                for match in re.finditer(
                    r"\b(?:public\s+|protected\s+|private\s+|static\s+|final\s+|abstract\s+|sealed\s+)*(class|interface|enum|record)\s+([A-Za-z_][A-Za-z0-9_]*)",
                    source,
                ):
                    line_start = source.rfind("\n", 0, match.start()) + 1
                    nested = bool(source[line_start:match.start()])
                    inventory[ver].setdefault(match.group(2), []).append(
                        {
                            "path": path,
                            "kind": match.group(1),
                            "package": package,
                            "nested": nested,
                        }
                    )
        result[ver] = {"candidates": [], "counts": {}}
        for candidate in matrix:
            if candidate["version"] != ver:
                continue
            name = candidate["type"]
            definitions = inventory[ver].get(name, [])
            classification, reason = classify(name, definitions)
            result[ver]["candidates"].append(
                {
                    "name": name,
                    "classification": classification,
                    "reason": reason,
                    "references": candidate["page_count"],
                    "pages": candidate["referencing_pages"],
                    "definitions": [d["path"] for d in definitions],
                }
            )
        counts: dict[str, int] = {}
        for candidate in result[ver]["candidates"]:
            counts[candidate["classification"]] = counts.get(candidate["classification"], 0) + 1
        result[ver]["counts"] = dict(sorted(counts.items()))
    output = json.dumps(result, indent=2)
    if args.output:
        Path(args.output).write_text(output + "\n")
    else:
        print(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
