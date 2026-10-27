#!/usr/bin/env python3
"""Check explicit Java protected dedicated pages, including interface/implementation splits."""
from __future__ import annotations

import argparse
import json
from pathlib import Path

REQUIRED = {
    "v2/Collections/CollectionSchema/CollectionSchema.md",
    "v2/Collections/FieldSchema.md",
    "v2/Collections/StructFieldSchema/StructFieldSchema.md",
    "v2/Collections/Function/Function.md",
    "v2/Collections/Function/FunctionType.md",
    "v2/Collections/Function/BoostRanker.md",
    "v2/Collections/Function/DecayRanker.md",
    "v2/Collections/Function/ModelRanker.md",
    "v2/Collections/Function/RRFRanker.md",
    "v2/Collections/Function/WeightedRanker.md",
    "v2/Collections/DataType.md",
    "v2/Collections/ConsistencyLevel.md",
    "v2/Collections/EmbeddingList/EmbeddingList.md",
    "v2/Management/IndexParam.md",
    "v2/Management/MetricType.md",
    "v2/Management/IndexType.md",
    "v2/Management/CompactionState.md",
    "v2/Vector/FunctionScore/FunctionScore.md",
    "v2/Vector/Highlighter/Highlighter.md",
    "v2/Vector/Highlighter/LexicalHighlighter.md",
    "v2/Vector/Highlighter/SemanticHighlighter.md",
    "v2/DataImport/BulkFileType.md",
    "v2/DataImport/LocalBulkWriter/LocalBulkWriter.md",
    "v2/DataImport/RemoteBulkWriter/RemoteBulkWriter.md",
    "v2/DataImport/VolumeBulkWriter/VolumeBulkWriter.md",
}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--docs-root", required=True, help="Java API reference root")
    parser.add_argument("--output")
    args = parser.parse_args()
    root = Path(args.docs_root)
    violations = []
    pages = 0
    for version in ("v2.6.x", "v3.0.x"):
        version_root = root / version
        page_set = {
            page.resolve().as_posix()
            for page in version_root.rglob("*.md")
        }
        pages += len(page_set)
        for relative in sorted(REQUIRED):
            expected = (version_root / relative).resolve()
            if expected.as_posix() not in page_set:
                violations.append(
                    {
                        "version": version,
                        "type": "missing_protected_dedicated_page",
                        "page": expected.as_posix(),
                    }
                )
    report = {
        "rule": "explicit protected Java dedicated pages remain split one page per type",
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
