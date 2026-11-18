# AGENTS.md — milvus-docs

Guidance for AI coding agents and human contributors working in this repository.

## Reserved markers (`doc:block`)

Many markdown pages under `site/en/` contain paired HTML-comment markers:

```markdown
<!-- doc:block:start id="some-lowercase-id" -->
...page content...
<!-- doc:block:end id="some-lowercase-id" -->
```

**These markers are load-bearing. Never delete or restructure them as "comment cleanup".**

- **What they are**: invisible region anchors. They do not render on milvus.io and have no effect on the site build or the published page.
- **Who consumes them**: the Zilliz Cloud documentation pipeline ([zilliztech/zdoc](https://github.com/zilliztech/zdoc), shared-docs renderer). It pins commits of this repository and applies content transforms (insert / replace / remove) *inside* these named regions to produce the Zilliz Cloud variants of these pages on docs.zilliz.com and docs.zilliz.com.cn. A deleted or renamed marker breaks that build on the next re-pin.
- **Rules**:
  - Never delete a `doc:block:start` / `doc:block:end` pair — not when reflowing, reformatting, renaming headings, or "tidying up" leftover comments.
  - Never change a marker `id`, move content across markers, or reorder marked regions relative to surrounding content without coordinating with the Zilliz Cloud docs team.
  - Keep markers as standalone lines (they may be indented); a marker line carries nothing else.
  - A marker pair must not split a fenced code block: `start` and `end` sit outside the fence or fully contain it.
- **Editing inside a marked region is welcome** — the content is normal documentation. If a change substantially rewrites a marked region (or removes content that a downstream transform replaces), note it in the PR description so the downstream consumer can re-pin.
- **Adding new markers**: coordinate with the Zilliz Cloud docs team first. Use a lowercase kebab-case `id` that is unique within the page (`<topic>-<thing>`), and wrap exactly the region a downstream transform targets.

As of this note, 56 pages under `site/en/` carry about 235 marker pairs. Treat any diff that deletes more markers than it adds as a regression and call it out in review.
