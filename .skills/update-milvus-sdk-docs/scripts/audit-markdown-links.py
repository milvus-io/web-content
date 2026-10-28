#!/usr/bin/env python3
"""Validate Markdown link syntax and relative targets in API reference docs."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

LINK = re.compile(r"(?<!!)\]\(([^)#?]+)(?:#[^)]*)?\)")
BAD_CLOSE = re.compile(r"\]\]\(")
FENCE = re.compile(r"(?ms)^(?:```|~~~).*?^(?:```|~~~)[ \t]*$")
INLINE_CODE = re.compile(r"`[^`\n]+`")


def strip_code(text: str) -> str:
    """Remove code while preserving line positions so reports keep line numbers."""
    text = FENCE.sub(lambda match: "\n" * match.group(0).count("\n"), text)
    return INLINE_CODE.sub(lambda match: "`" + " " * max(0, len(match.group(0)) - 2) + "`", text)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--docs-root", required=True)
    parser.add_argument("--output")
    args = parser.parse_args()
    root = Path(args.docs_root)
    broken: list[dict] = []
    malformed: list[dict] = []
    pages = 0
    links = 0
    for page in root.rglob("*.md"):
        pages += 1
        text = strip_code(page.read_text())
        for match in BAD_CLOSE.finditer(text):
            malformed.append(
                {
                    "page": str(page),
                    "line": text.count("\n", 0, match.start()) + 1,
                    "snippet": text[max(0, match.start() - 40):match.end() + 40],
                }
            )
        for match in LINK.finditer(text):
            href = match.group(1).strip()
            links += 1
            if href.startswith(("http://", "https://", "/", "mailto:")):
                continue
            target = (page.parent / href.split("#", 1)[0]).resolve()
            if not target.exists():
                broken.append(
                    {
                        "page": str(page),
                        "href": href,
                        "line": text.count("\n", 0, match.start()) + 1,
                    }
                )
    report = {
        "pages_inspected": pages,
        "links_checked": links,
        "broken_relative_links": len(broken),
        "malformed_link_closers": len(malformed),
        "violations": broken + malformed,
    }
    output = json.dumps(report, indent=2) + "\n"
    if args.output:
        Path(args.output).write_text(output)
    else:
        print(output, end="")
    return 1 if broken or malformed else 0


if __name__ == "__main__":
    raise SystemExit(main())
