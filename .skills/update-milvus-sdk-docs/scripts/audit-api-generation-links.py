#!/usr/bin/env python3
"""Check that SDK documentation pages do not cross-link API generations."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

HREF = re.compile(r"(?<!!)\]\(([^)#?]+)(?:#[^)]*)?\)")


def generation(path: Path, docs_root: Path) -> str | None:
    try:
        relative = path.relative_to(docs_root).parts
    except ValueError:
        return None
    candidate = relative[1] if len(relative) > 2 else None
    return candidate if re.fullmatch(r"v\d+", candidate or "") else None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--docs-root", required=True, help="e.g. API_Reference/milvus-sdk-java")
    parser.add_argument("--output")
    args = parser.parse_args()
    docs_root = Path(args.docs_root).resolve()
    violations: list[dict] = []
    pages = 0
    for page in docs_root.rglob("*.md"):
        pages += 1
        source_generation = generation(page, docs_root)
        if not source_generation:
            continue
        text = page.read_text()
        for match in HREF.finditer(text):
            href = match.group(1)
            if href.startswith(("http://", "https://", "/", "mailto:")):
                continue
            target = (page.parent / href.split("#", 1)[0]).resolve()
            if not target.exists() or target.suffix != ".md":
                continue
            target_generation = generation(target, docs_root)
            if target_generation and target_generation != source_generation:
                violations.append(
                    {
                        "page": str(page),
                        "source_generation": source_generation,
                        "href": href,
                        "target": str(target),
                        "target_generation": target_generation,
                    }
                )
    report = {
        "rule": "API generation documentation surfaces are independent",
        "docs_root": str(docs_root),
        "pages_inspected": pages,
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
