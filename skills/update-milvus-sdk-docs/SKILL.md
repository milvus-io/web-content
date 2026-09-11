---
name: update-milvus-sdk-docs
description: Update the Milvus SDK API reference documentation under API_Reference/ in the web-content repository so it reflects a new SDK release, using the SDK repository's git tags as ground truth. Also audit/reconcile existing pages against a tag to fix omissions and errors. Use when the user asks to bump/update/refresh SDK reference docs, publish a new SDK version's API docs, audit/check/backfill/reconcile API_Reference for missing methods or wrong signatures, or mentions API_Reference, milvus-sdk-cpp, pymilvus, milvus-sdk-java, milvus-sdk-go, milvus-sdk-node, and a version bump (e.g. "update cpp docs to v3.0.2").
---

# Update Milvus SDK Reference Docs

Update the hand-curated Markdown API reference for a Milvus SDK inside the
`web-content` repository. This repo is the **single source of truth** — do not
pull SDK docs from Feishu. Ground truth for "what changed in the API" comes from
the SDK repository's git tags.

## Usage

Trigger the skill by describing the task in natural language; no slash command
is needed. State the SDK and version, and pick a mode:

- **Diff mode (default)** — bump a version line to a new patch:
  - "Update cpp SDK docs to v3.0.2" / "把 milvus-sdk-cpp 的 API_Reference 更新到 v3.0.2"
- **Reconciliation mode** — audit/backfill existing pages against a tag:
  - "Audit the cpp API_Reference against v3.0.2 for missing methods or errors"
  - "对账一下 cpp 的 API_Reference 文档，补遗漏、纠错"

You will receive: a per-page change list, the edited pages, a validation report,
and a summary for review. Nothing is merged or pushed without confirmation.

If the instruction also says to push to the remote or open a PR (e.g. "提交到远程
仓库", "提交 PR"), the changes are committed to a branch
`sdk/<sdk-name>-<version>-doc` on `origin` (and a PR is opened on request),
provided `gh` is authenticated — see Step 7.

## Ground rules

- Each `API_Reference/<sdk>/<version-line>/` directory (e.g. `milvus-sdk-cpp/v3.0.x/`)
  documents the **latest patch of that version line**. When a new patch is released,
  update the docs **in place** in that directory.
- Do NOT rely on a local checkout of the SDK repo — other users may not have
  one. Fetch the SDK repo from GitHub into `sdk-tmp/sdks/` (gitignored) and compare
  tags there. Clean it up when done (see Step 0).
- Split the work into **deterministic** and **generative** parts:
  - Deterministic: git diff, extracting signatures/enum values, mapping symbols to
    pages, validating. Do these with shell commands, not by guessing.
  - Generative: writing/rewriting the prose, descriptions, examples. Use the exact
    diff hunks as the factual basis — never invent signatures, parameters, or defaults.
- Unless the user says otherwise, always confirm before changing. Keep every edit
  reviewable; produce a per-page change summary.

## Two modes

- **Diff mode** (default): update only the pages affected by changes between two
  SDK tags (old version → new version). Fast; does NOT touch pre-existing issues.
- **Reconciliation mode**: audit the whole doc tree against one target tag and fix
  omissions, errors, and drift (missing methods, wrong signatures, typos, stale
  descriptions). Use when the user wants existing pages verified, not just bumped.
  See [Reconciliation mode](#reconciliation-mode-audit-and-backfill-existing-pages).

## Repo layout & page conventions

```
API_Reference/<sdk>/<version-line>/
  About.md                          # intro, compatibility table, install commands, license
  <Category>/<Operation>.md         # one file per operation, e.g. Vector/Search.md
  <Category>/<Type>.md              # class/struct pages, e.g. Collections/CollectionSchema.md
```

Operation page format (C++ example):

````markdown
# Query()

<one-line description>

```cpp
Status Query(const QueryRequest& request, QueryResponse& response)
```

## Request Syntax

```cpp
auto request = QueryRequest()
    .WithCollectionName(collection_name)
    ...
```

**REQUEST METHODS:**

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded.

**ERROR HANDLING:**
## Example

```cpp
...
```
````

Type page format: `# <Type>`, description, a ```` ```cpp ```` block with
constructors/aliases, `**PARAMETERS:**`, then `## Methods` grouping related
methods. Cross-page links are relative (e.g. `../Collections/DataType.md`).

## Workflow

> **Before starting**: read `skills/update-milvus-sdk-docs/references/sdk-map.md` and follow the section for the
> SDK you are working on (repo path, public API surface, page-mapping rules,
> extraction/validation commands, version-pin conventions, known pitfalls). This
> file holds the universal workflow; all per-SDK details live in `sdk-map.md`.

### Step 0 — Fetch the SDK repo into sdk-tmp/ (once per run)

Clone the SDK repo from GitHub into the gitignored `sdk-tmp/sdks/` directory (relative to the repo root — **not** the system `/tmp`) as a
partial, no-checkout clone (commits + trees only; blobs download on demand).
Reuse it if it already exists.

```bash
SDK_URL_BASE=https://github.com/milvus-io
SDK_TMP_DIR=sdk-tmp/sdks

# $1 = SDK repo name, e.g. milvus-sdk-cpp
prepare_sdk() {
  local dir="$SDK_TMP_DIR/$1"
  if [ ! -d "$dir/.git" ]; then
    git clone --filter=blob:none --no-checkout "$SDK_URL_BASE/$1.git" "$dir"
    git -C "$dir" fetch --tags origin
  fi
}

prepare_sdk <sdk-repo>
```

All later `git -C ...` commands for that SDK run inside `sdk-tmp/sdks/<sdk-repo>`.
Remove the clone when the work is done:

```bash
rm -rf sdk-tmp/sdks/<sdk-repo>
```

### Step 1 — Determine the versions

1. Identify SDK + version line (e.g. `milvus-sdk-cpp`, `v3.0.x`).
2. Read `API_Reference/<sdk>/<version-line>/About.md` — the compatibility table
   shows the currently documented SDK version (e.g. `v3.0.1`).
3. List tags to find the new release:

```bash
git -C sdk-tmp/sdks/<sdk-repo> tag --sort=-v:refname | head
```

### Step 2 — Diff and extract API changes (deterministic)

Diff the two tags restricted to the SDK's **public API surface** (paths per
`skills/update-milvus-sdk-docs/references/sdk-map.md`):

```bash
git -C sdk-tmp/sdks/<sdk-repo> diff --stat <old-tag>..<new-tag> -- <public-api-path>
git -C sdk-tmp/sdks/<sdk-repo> diff <old-tag>..<new-tag> -- <public-api-path>
```

Categorize each changed symbol:

- **Builder/getter surface**: new/changed request parameters and methods. The
  naming pattern differs **per SDK** — C++ uses `WithXxx`/`SetXxx`/`AddXxx`,
  java uses Lombok `@Builder` (an added `private` field = a new builder method),
  Python uses new `def` params, Go uses new `XxxOption` members. Always use the
  per-SDK extraction commands in `skills/update-milvus-sdk-docs/references/sdk-map.md` — do NOT assume every SDK
  exposes `WithXxx` methods.
- **Enum values**: added/removed enum entries (e.g. `IndexType`, `DataType`).
- **Doc-comment changes**: only prose was rewritten — decide whether the page
  description should be refreshed.
- **Internal-only additions**: new symbols not exposed through public request/response
  or client methods (e.g. C++ `BloomFilter.h` is an internal cache type) — **skip**,
  do not create a page unless it surfaces in a public API.
- **Response/result changes**: modified output members.

### Step 2b — Cross-check the merged PRs between the tags

A `git diff` misses whole features that land as new request classes, new client
methods, or new result fields — especially for java (Lombok `@Builder`, and
large release windows where features land across minor versions). Always
cross-check the PRs merged between the two tags:

```bash
# tag dates, to bound the PR window
git -C sdk-tmp/sdks/<sdk-repo> log -1 --format='%ad %h %s' --date=short <old-tag>
git -C sdk-tmp/sdks/<sdk-repo> log -1 --format='%ad %h %s' --date=short <new-tag>

# merged PRs in that window (dedupe [cherry-pick] duplicates)
gh pr list --repo milvus-io/<sdk-repo> --state merged --limit 100 \
  --json number,title,mergedAt
```

For every API-relevant PR (titles like "feat:", "support", "add ...", "align ...
parity"), inspect its diff (`gh pr diff <n> --repo milvus-io/<sdk-repo>`) and
verify the docs cover its new public surface: new enum values, new request
fields, new client methods (e.g. async variants, `searchAsync`), and new result
fields. Ignore PRs that only touch tests, Javadoc, telemetry, or internal
machinery.

### Step 3 — Map changes to pages

Follow the page-mapping rules for the SDK in `skills/update-milvus-sdk-docs/references/sdk-map.md`. The general
shape: operation pages ↔ request/operation classes; type pages ↔ public types;
`About.md` ↔ version stamp + compatibility table + install commands.

Produce a change list: `page → what changed`. If a changed symbol has no obvious
page, ask the user where it should land.

### Step 4 — Update pages (generative, AI-edited)

For each affected page:

1. Read the current page in full — its prose is the baseline style to preserve.
2. Read the precise diff hunks for the symbols it documents.
3. Apply the **Doc style guide** below; keep unrelated prose untouched.
4. For **new pages** (a new operation/type that has no existing page): before
   writing, read 1–2 sibling pages in the same category (or the same operation
   shape in another category) as **style exemplars**, and mimic their voice,
   sentence patterns, heading flow, terminology, **and level of detail**. Existing
   pages are the ground truth for style — the style guide below only generalizes
   them.
5. **Match the existing verbosity.** Write at the same granularity as the page
   you are editing: a new `**REQUEST METHODS:**` entry should be about one
   sentence long, like its siblings; do not expand every code comment into a
   paragraph, and do not pad entries with extra explanation the existing page
   omits. If a code comment is far more verbose than the page's style, condense
   it to the page's conventions while keeping the factual constraints (e.g.
   "IDs and filter cannot be set at the same time"). After editing, the page
   should read as if the new content had always been there — a reader should not
   notice a density difference.
6. Add "Since vX.Y.Z or later" notes for newly introduced features (follow the
   existing convention; skip if the SDK pages don't use such notes).
7. For a new builder method, also update the `## Request Syntax` chain block to
   match reality.

### Step 5 — Validate (deterministic)

Run these before calling the work done:

```bash
# leftover old version literals (About.md now shows the new version)
grep -rn "3\.0\.1" API_Reference/<sdk>/<version-line>/   # adjust for the actual old version

# broken relative links / empty files / misplaced anchors
# (check every edited page's relative links resolve to an existing .md)

# signature consistency: every WithXxx/SetXxx that exists in the new tag and is
# documented on the page appears exactly once; page mentions nothing that does
# not exist in the new tag
```

Report results explicitly. Fix anything flagged before proceeding.

### Step 6 — Publish

- SDK reference Markdown is consumed directly by milvus.io — no
  generate-en / localization step. A PR merged to `master` triggers
  `.github/workflows/master.yml`, which fires a `prod-deploy` dispatch to
  `milvus-io/milvus.io`.
- Push to the `preview` branch to deploy to the preview site instead.
- **Clobbering risk**: `.github/workflows/publish-ref-docs.yml` still regenerates
  `API_Reference/` from Feishu every Sunday and opens a PR. If that workflow is
  still enabled, tell the user their manual edits will be overwritten once that
  PR merges, and recommend disabling it (or removing the SDK entries from
  `scripts/config.json`).

### Step 7 — Push to remote / open PR (optional, only when the user asks)

Perform this step **only** when the user's instruction explicitly says to push
to the remote or open a PR (e.g. "提交到远程仓库", "提交 PR"). Otherwise stop at
the local edits and present them for review.

1. **Check `gh` is authenticated**:

   ```bash
   gh auth status
   ```

   If `gh` is not logged in, do NOT push. Tell the user pushing requires
   `gh auth login`, and provide the local branch + commit commands instead.

2. **Create the branch**. Name it `sdk/<sdk-name>-<version>-doc` where
   `<sdk-name>` is the SDK's **project name** — i.e. its directory name under
   `API_Reference/` (`milvus-sdk-cpp`, `milvus-sdk-java`, `milvus-sdk-go`,
   `milvus-sdk-node`, `milvus-sdk-csharp`, `pymilvus`, ...) — and `<version>` is
   the plain version without the `v` prefix (e.g. `3.0.2`):

   ```bash
   git checkout -b sdk/milvus-sdk-cpp-3.0.2-doc
   ```

   The `sdk/` prefix is a ref namespace on `origin` (like the `auto/` weekly
   branch namespace) — do NOT create a bare branch named `sdk`, and do NOT use
   short names like `cpp` (use the full project name).

3. **Stage and commit only the doc changes** for this SDK (never `git add .`) as
   a **single commit** with a title and a description body, **signed off**:

   ```bash
   git add API_Reference/<sdk-version-dir>/
   git commit -sm "Update milvus-sdk-cpp docs to v3.0.2" \
     -m "- Bump About.md version pin to v3.0.2
- Add WithIDs/SetIDs to Vector/Query.md
- ..."
   ```

   Title format: `Update <sdk-project-name> docs to v<version>`. The body lists
   the concrete per-page changes made in this update (derive it from the actual
   edits; the bullets above are a template, not a fixed list).

   Always pass `-s` (`--signoff`) so the commit carries a `Signed-off-by:`
   trailer and passes GitHub's DCO check. The committer email must be verified
   on GitHub — if `git config user.email` is not the account's verified email,
   tell the user before committing.

4. **Push to origin**:

   ```bash
   git push -u origin sdk/milvus-sdk-cpp-3.0.2-doc
   ```

5. **Open a PR** (only if the user asked for a PR):

   ```bash
   gh pr create --base master --head sdk/milvus-sdk-cpp-3.0.2-doc \
     --title "Update milvus-sdk-cpp docs to v3.0.2" \
     --body "Documentation update for milvus-sdk-cpp v3.0.2."
   ```

   Return the PR URL.

## Reconciliation mode (audit and backfill existing pages)

Use when the user wants the existing pages verified against a tag — e.g. before
bumping a version line, or because docs were hand-written and may be missing or
wrong. Do this in two passes.

### Pass 1 — Deterministic gap report (cheap, zero hallucination)

For every operation page, extract the documented builder/getter surface and
compare it against the actual class at the target tag. Use the side-A/side-B
extraction commands for the SDK in `skills/update-milvus-sdk-docs/references/sdk-map.md`. **Include inherited
members from base classes** (e.g. for C++: `RequestBase.h`,
`CollectionRequestBase.h`, `DMLRequestBase.h`, `DQLRequestBase.h`,
`SearchRequestBase.h`, `IndexRequestBase.h`, ...), not just the header that
shares the page's name.

Report three categories:

- **Missing on page but present in code** → add, following the style guide.
- **Present on page but absent in code** → remove, or keep with a deprecation note
  (confirm with the user).
- **Signature mismatches** → parameter names/types/defaults differ between page and
  header; fix to match the code.

Also check: enum values missing from type pages, stale version pins, missing
`@deprecated` markers.

### Pass 2 — AI prose audit

Existing docs were originally transcribed from code comments, so typos and
imprecise wording flowed from the code into the docs (e.g. both
`QueryRequest.h` and `Vector/Query.md` contain "only avaiable when expression is
empty"). For each page, feed the AI:

1. the current page Markdown (its prose is the style baseline),
2. the doc comments for the corresponding class/methods at the target tag (use
   `git show <tag>:<path>` per `skills/update-milvus-sdk-docs/references/sdk-map.md`),
3. the **Doc style guide** below,
4. for new pages, 1–2 sibling pages from the same category as style exemplars,

and ask it to correct: factual errors vs. implementation, typos, wrong defaults,
outdated constraints, and to flag (but not silently fix) code comments that are
themselves wrong. Never invent APIs that are not in the code.

Prioritize pages touched by the version diff first, then run the rest in batches.
Report a per-page summary of every correction for review.

## Doc style guide

- Titles: `# <Operation>()` for operations, `# <Type>` for classes/types.
- Language tags: code blocks use `cpp` (or the SDK's language) — never leave it
  blank or wrong.
- Operation pages: `## Request Syntax` block shows a chained-builder example; the
  `**REQUEST METHODS:**` list uses `- \`WithXxx(...)\`` + a short description.
- `**PARAMETERS:**` for constructor/type params; `**RETURNS:**` describes the
  return type; `**ERROR HANDLING:**` describes exceptions/Status failure.
- One page per operation / per class. Refer to related types with relative links.
- Match the tone, sentence patterns, terminology, **and verbosity** of existing
  sibling pages — before writing new content, study 1–2 sibling pages as style
  exemplars (Google developer-style, concise). New entries should be about the
  same length as their siblings (typically one sentence per request method); do
  not expand every code comment into a paragraph or pad entries with explanation
  the existing pages omit. Do not introduce a new voice or jargon the existing
  pages do not use. Do not add code comments or commentary to the Markdown
  itself.
- Keep `About.md` compatibility table and install commands accurate for the new
  version (watch for `v`-prefix vs plain version differences between SDKs).

## Edge cases & decisions to confirm with the user

- **Removed/deprecated API**: mark as deprecated on the page, or delete the page?
  Ask.
- **New enum values with no dedicated page**: add to an existing type page, or
  create a new page? Ask.
- **Internal types** (e.g. C++ `BloomFilter.h`): skip unless exposed publicly.
- **Scope**: confirm the user wants every SDK updated, or just one (e.g. C++).
- **New SDKs**: when an SDK gains its first doc tree, add a section to
  `skills/update-milvus-sdk-docs/references/sdk-map.md` before starting.
