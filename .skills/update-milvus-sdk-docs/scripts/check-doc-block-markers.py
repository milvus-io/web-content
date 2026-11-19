#!/usr/bin/env python3
"""Reserved-markers guard for SDK reference refreshes.

Some pages under ``API_Reference/`` carry paired HTML-comment markers:

    <!-- doc:block:start id="some-lowercase-id" -->
    ...page content...
    <!-- doc:block:end id="some-lowercase-id" -->

They are load-bearing region anchors consumed by the Zilliz Cloud docs
pipeline (zilliztech/zdoc, shared-docs renderer), which pins commits of this
repository and applies content transforms inside the named regions. The SDK
sources this skill refreshes pages from do NOT contain markers, so a
wholesale page rewrite silently drops them — the repo ``AGENTS.md`` therefore
requires a refresh PR touching a marked page to re-add the pairs at the
equivalent regions in the same PR.

This script enforces that mechanically. Two kinds of checks:

1. Structural (always): every ``doc:block:start`` has a matching
   ``doc:block:end`` with the same id (and vice versa), marker lines are
   standalone, and no marker sits inside a fenced code block (a pair must not
   split a fence: both markers sit outside it or fully contain it).
2. Diff (with ``--diff REV``): for every page changed between ``REV`` (the
   upstream base the refresh started from) and the working tree, the set of
   marker ids must not shrink. A page that loses a marker pair, or a deleted
   page that carried markers, fails the run.

Exit code is non-zero when any violation is found. Run it as part of Step 5
(validation) before committing or pushing, e.g.:

    python3 .skills/update-milvus-sdk-docs/scripts/check-doc-block-markers.py \
        API_Reference/milvus-sdk-node/v3.0.x/ --diff origin/master
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

MARKER = re.compile(r'^\s*<!--\s*doc:block:(start|end)\s+id="([^"]+)"\s*-->\s*$')
MARKER_ANY = re.compile(r'<!--\s*doc:block:(start|end)\s+id="([^"]+)"')


def git(*args: str) -> str:
    return subprocess.run(["git", *args], capture_output=True, text=True).stdout


def scan(text: str) -> tuple[dict[str, int], dict[str, int], list[tuple[int, str]]]:
    """Scan one page: (start ids -> line, end ids -> line, structural issues)."""
    starts: dict[str, int] = {}
    ends: dict[str, int] = {}
    issues: list[tuple[int, str]] = []
    in_fence = False
    for lineno, raw in enumerate(text.splitlines(), start=1):
        stripped = raw.strip()
        if stripped.startswith("```"):
            in_fence = not in_fence
        match = MARKER.match(raw)
        if match:
            kind, mid = match.groups()
            table = starts if kind == "start" else ends
            if mid in table:
                issues.append((lineno, f"duplicate doc:block:{kind} id {mid!r}"))
            table[mid] = lineno
            if in_fence:
                issues.append(
                    (
                        lineno,
                        "doc:block marker inside a fenced code block — a pair must sit "
                        "outside the fence or fully contain it",
                    )
                )
            continue
        if "doc:block:" not in stripped or "`" in stripped:
            continue
        hit = MARKER_ANY.search(raw)
        if hit and not stripped.startswith("<!--"):
            # prose mentioning the syntax without inline-code escaping; rare —
            # only flag when the comment is clearly being authored, not quoted
            continue
        if hit:
            issues.append((lineno, "marker line carries other content — keep the marker standalone"))
    for mid, lineno in starts.items():
        if mid not in ends:
            issues.append((lineno, f"doc:block:start {mid!r} has no matching doc:block:end"))
    for mid, lineno in ends.items():
        if mid not in starts:
            issues.append((lineno, f"doc:block:end {mid!r} has no matching doc:block:start"))
    return starts, ends, issues


def markdown_files(paths: list[Path]) -> list[Path]:
    files: list[Path] = []
    for p in paths:
        if p.is_file() and p.suffix == ".md":
            files.append(p)
        elif p.is_dir():
            files.extend(sorted(q for q in p.rglob("*.md") if q.is_file()))
    return sorted(set(files))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("paths", nargs="*", default=["API_Reference"],
                        help="files or directories to scan (default: API_Reference/)")
    parser.add_argument("--diff", metavar="REV",
                        help="also enforce marker preservation against REV (e.g. origin/master): "
                             "a changed page must not lose a marker id it had at REV")
    args = parser.parse_args()

    paths = [Path(p) for p in args.paths]
    missing = [str(p) for p in paths if not p.exists()]
    if missing:
        print(f"check-doc-block-markers: FAIL: path(s) not found: {', '.join(missing)}", file=sys.stderr)
        return 2

    violations: list[str] = []
    pages = markdown_files(paths)
    scanned = 0
    marked = 0
    for page in pages:
        scanned += 1
        text = page.read_text(encoding="utf-8", errors="replace")
        starts, _ends, issues = scan(text)
        if starts or _ends:
            marked += 1
        for lineno, message in issues:
            violations.append(f"{page}:{lineno}: {message}")

    if args.diff:
        name_status = git("diff", "--name-status", args.diff, "--", *[str(p) for p in paths])
        changed = 0
        for line in name_status.splitlines():
            parts = line.split("\t", 1)
            if len(parts) != 2:
                continue
            status, rel = parts[0].strip(), parts[1].strip()
            if not rel.endswith(".md"):
                continue
            page = Path(rel)
            if status.startswith("D"):
                base_text = git("show", f"{args.diff}:{rel}")
                base_starts, _base_ends, _base_issues = scan(base_text)
                if base_starts:
                    changed += 1
                    violations.append(
                        f"{rel}: page deleted but carried doc:block marker pair(s) "
                        f"{sorted(base_starts)} — coordinate with the Zilliz Cloud docs team before removing"
                    )
                continue
            if not page.exists():
                continue
            base_text = git("show", f"{args.diff}:{rel}")
            base_starts, _b, _i = scan(base_text)
            cur_starts, _c, _j = scan(page.read_text(encoding="utf-8", errors="replace"))
            dropped = sorted(set(base_starts) - set(cur_starts))
            if dropped:
                changed += 1
                violations.append(
                    f"{rel}: refresh dropped doc:block marker pair(s) {dropped} present at {args.diff} "
                    f"— re-add them at the equivalent regions (repo AGENTS.md, 'SDK reference refreshes "
                    f"must preserve markers')"
                )
        print(f"check-doc-block-markers: diff check vs {args.diff}: {changed} marked page(s) changed")

    if violations:
        for v in violations:
            print(f"check-doc-block-markers: FAIL: {v}", file=sys.stderr)
        return 1
    print(f"check-doc-block-markers: OK (scanned {scanned} page(s), {marked} carry doc:block markers)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
