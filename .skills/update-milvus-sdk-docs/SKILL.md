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

No slash command is needed — describe the task in natural language. The skill
loads when the request mentions SDK reference docs, `API_Reference/`, an SDK
name, and a version bump or audit. State the **scope** (which SDK / version
line), the **mode** (below), and — if you want the result on the remote — the
**push intent**.

### Scope

- **One SDK, one version line**: name the SDK and the version-line directory,
  e.g. `API_Reference/milvus-sdk-java/v3.0.x/`.
- **All SDKs**: "update all SDKs to latest" — iterates every SDK in
  `.skills/update-milvus-sdk-docs/references/sdk-map.md`.

### Modes (diff and reconciliation can be combined)

| Intent | Prompt example | Behavior |
|---|---|---|
| **Diff** (default) — bump to a specific newer version | "Update cpp SDK docs to v3.0.2" / "把 milvus-sdk-cpp 的 API_Reference 更新到 v3.0.2" | diff old..new, update only affected pages |
| **Diff + reconciliation** — bump AND fix omissions/errors | "Update the Java SDK docs to v3.0.9 and reconcile for omissions and errors" | diff + full-tree audit/backfill/fix |
| **Latest** — resolve from the repo's newest release tag | "Update the Java SDK docs to latest" / "更新 java sdk 到 latest 版本" | resolves latest tag; skips if already current |
| **All SDKs to latest** | "Update all SDKs to latest" / "更新所有sdk到latest"（可加"except go sdk"/"除了go sdk之外"排除；加"对账/纠错"则同时审计错漏） | per-SDK: create a **per-SDK branch** only for SDKs with actual changes; skip SDKs already current (or, if reconciliation was requested, those with no omissions/errors to fix) |
| **Reconciliation only** — audit existing pages | "Audit the cpp API_Reference against v3.0.2 for missing methods or errors" / "对账一下 cpp 的 API_Reference 文档，补遗漏、纠错" | no version bump; backfill + correct |

### Pushing (only when you ask for it)

The skill **never commits, pushes, or opens a PR unless the instruction says so**.
Without a push intent it stops at local edits for review.

- Add "commit and push to the remote" / "提交到远程仓库" → creates a **per-SDK**
  branch `sdk/<project-name>-<version>-doc`, one **signed** commit each, and
  pushes only the branches that were actually created.
- Add "open a PR" / "提交 PR" → opens one PR per created branch (against `master`).
- Requires `gh` to be authenticated (`gh auth status`); if not, you get the
  local commands to run yourself.

**Common combined prompt** (multi-SDK + latest + reconcile + separate PRs):

- 中文: "更新 cpp 和 java sdk 的文档到最新版本，勘察错误和遗漏并纠正，然后分别提交 PR。"
- English: "Update the cpp and java SDK docs to the latest versions, reconcile for omissions and errors, and open a PR for each."

Both resolve the latest version per SDK, run diff + reconciliation, process the
SDKs strictly one at a time, and create one branch + one PR per SDK.

### What you get back

A per-page change list, the edited pages, a validation report (leftover version
strings, broken links, signature consistency), and a summary — all for your
review before anything is merged.

### Version sanity

Target versions must be **newer** than what the docs currently show (a version
line always documents its latest patch). Asking for an older version stops the
run with a clarification instead of downgrading.

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

> **Multi-SDK runs are processed STRICTLY one SDK at a time.** When the user
> asks to update several SDKs (e.g. "update cpp/java sdk docs"), run the whole
> Steps 1–7 for ONE SDK (analyze → edit → branch → commit → push → PR), then
> clean the working tree back to `origin/master` (`git checkout origin/master`,
> which carries any changes; the prior SDK's edits are already committed on its
> branch), then start the NEXT SDK. Never edit two SDKs' docs in the working tree
> at once — that risks mixing edits across branches. This applies from the very
> first analysis step, not just at push time.

> **Before starting**: read `.skills/update-milvus-sdk-docs/references/sdk-map.md` and follow the section for the
> SDK you are working on (repo path, public API surface, page-mapping rules,
> extraction/validation commands, version-pin conventions, known pitfalls). This
> file holds the universal workflow; all per-SDK details live in `sdk-map.md`.

### Step 0 — Pre-flight: refresh the local web-content checkout

Before touching any docs, bring the local web-content working copy up to date —
but **only when it is safe to do so**:

```bash
# any uncommitted/staged changes, or a merge in progress?
git status --porcelain | wc -l        # expect 0
git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1 && echo "mid-merge" || true
```

- If the working tree is **clean** (and not mid-merge): `git fetch origin` so
  `origin/master` is fresh. The doc updates are based on **`origin/master`**
  content, regardless of which branch you happen to be on. **Verify the target
  doc tree matches `origin/master`** before editing:
  `git diff --stat origin/master -- API_Reference/<sdk>/<version-line>/` should
  be empty. If the current branch has diverged on those files, stop and ask the
  user (edits would be based on stale content and the later
  `git checkout -b ... origin/master` would fail).
- If the working tree has **local changes**: **STOP and do not update.** Tell the
  user the update cannot run because the working tree has uncommitted changes —
  ask them to commit or stash them first, so the doc edits are not mixed with
  (and do not pollute) their work. Do not pull and do not proceed.
- If `origin/master` cannot be fetched (no network / no remote): note it and
  fall back to the current checkout.

### Step 0b — Fetch the SDK repo into sdk-tmp/ (once per run)

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
  fi
  # Always refresh tags/commits even when the clone already exists, so
  # "latest" resolution sees releases cut since the last run.
  git -C "$dir" fetch --tags --force origin
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

4. **Validate the target version.** Within one version-line directory the docs
   always describe the **latest patch**, so the target must be **newer** than the
   currently documented version. If the user asks for a version that is older
   than or equal to the documented one (e.g. docs at `v3.0.5`, user says
   `v3.0.0`), STOP and clarify — do not run a backwards diff or downgrade
   `About.md`. Explain that:
   - the version-line dir tracks the latest patch, so an older patch is not a
     valid target for this directory;
   - if they actually mean a different release line (e.g. `v2.6.x`), that is a
     **different directory** (`API_Reference/<sdk>/v2.6.x/`), and confirm before
     touching it;
   - if they want a brand-new line, confirm the directory name (e.g. `v3.1.x`)
     and that a matching SDK tag exists.

5. **Resolving "latest"** — when the user says "latest" (no explicit version),
   derive the target from the SDK repo itself:

   ```bash
   # newest release tag for the CURRENT version line (tags are ground truth;
   # cross-check GitHub Releases if a release exists but a tag is missing).
   # For Go, filter to the client/* namespace — the milvus repo also carries
   # server tags (v3.0.1, v2.6.24, ...) that must not win the "latest" race:
   git -C sdk-tmp/sdks/<sdk-repo> tag --sort=-v:refname \
     | grep '^client/' | head -1          # Go only; otherwise drop the grep
   ```

   Then compare with the documented version from About.md:
   - **Prefer stable tags.** Filter out pre-releases (`-beta`, `-rc`, `-alpha`,
     `-preview`) when resolving "latest"; if the newest tag for a line is a
     pre-release, ask the user whether to document it (e.g. Go's 3.0 line only
     has `client/v3.0.0-beta`).
   - target newer than documented → proceed with the diff;
   - target equals documented → **skip this SDK** and report "already up to date";
   - target belongs to a different/newer line → confirm the directory name before
     creating it.
   - For **"update all SDKs to latest"** (or a single SDK "update X to latest"):
      iterate every SDK section in
      `.skills/update-milvus-sdk-docs/references/sdk-map.md`, run the above per SDK,
      and decide **per SDK** whether it actually changes:
      - **already current** (documented version equals the latest stable tag) →
        **no branch**, report "already up to date";
      - **reconciliation requested and no omissions/errors found** → **no branch**,
        report "no changes needed";
      - otherwise (a newer version exists, or fixes were found) → this SDK gets
        **its own branch** `sdk/<name>-<version>-doc` with the changes.
      There is **no single all-SDKs branch**. Each changed SDK is committed on
      its own branch; only those branches are pushed (and, if requested, get
      their own PR). For `milvus-sdk-node` (no version pin in About.md) and
      `milvus-sdk-csharp` (preview tags), ask the user before assuming what
      "latest" means. Honor **exclusions**: if the user says "all SDKs except
      <sdk>" (e.g. "更新所有sdk到latest，除了go sdk之外"), drop that SDK from the
      iteration and report it as excluded.
   - **Validate `About.md` version links** resolve to a real tag; a link to a
     nonexistent tag (e.g. `client/v3.0.0` that was never cut) is a
     reconciliation finding to fix.

### Step 2 — Diff and extract API changes (deterministic)

Diff the two tags restricted to the SDK's **public API surface** (paths per
`.skills/update-milvus-sdk-docs/references/sdk-map.md`):

```bash
git -C sdk-tmp/sdks/<sdk-repo> diff --stat <old-tag>..<new-tag> -- <public-api-path>
git -C sdk-tmp/sdks/<sdk-repo> diff <old-tag>..<new-tag> -- <public-api-path>
```

Categorize each changed symbol:

- **Builder/getter surface**: new/changed request parameters and methods. The
  naming pattern differs **per SDK** — C++ uses `WithXxx`/`SetXxx`/`AddXxx`,
  java uses Lombok `@Builder` (an added `private` field = a new builder method),
  Python uses new `def` params, Go uses new `XxxOption` members. Always use the
  per-SDK extraction commands in `.skills/update-milvus-sdk-docs/references/sdk-map.md` — do NOT assume every SDK
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
OLD_DATE=$(git -C sdk-tmp/sdks/<sdk-repo> log -1 --format='%ad' --date=short <old-tag>)
NEW_DATE=$(git -C sdk-tmp/sdks/<sdk-repo> log -1 --format='%ad' --date=short <new-tag>)

# merged PRs in that window (search with a merge-date range, then paginate)
# so active repos don't drop changes past the first 100 results.
gh pr list --repo milvus-io/<sdk-repo> --state merged \
  --search "merged:${OLD_DATE}..${NEW_DATE}" --limit 100 \
  --json number,title,mergedAt
# if 100 results returned, paginate with --page 2, 3, ... until fewer than 100
```

For every API-relevant PR (titles like "feat:", "support", "add ...", "align ...
parity"), inspect its diff (`gh pr diff <n> --repo milvus-io/<sdk-repo>`) and
verify the docs cover its new public surface: new enum values, new request
fields, new client methods (e.g. async variants, `searchAsync`), and new result
fields. Ignore PRs that only touch tests, Javadoc, telemetry, or internal
machinery.

### Step 3 — Map changes to pages

Follow the page-mapping rules for the SDK in `.skills/update-milvus-sdk-docs/references/sdk-map.md`. The general
shape: operation pages ↔ request/operation classes; type pages ↔ public types;
`About.md` ↔ version stamp + compatibility table + install commands.

Produce a change list: `page → what changed`.

**New public API → create a new page by default.** `API_Reference/` is organized
as one page per API, so a newly added public operation/method/class/type gets its
own new page automatically (no need to ask the user). Exceptions:
- **new enum values** → add to the existing enum page (do NOT create a page per
  enum value);
- **new request parameters/fields** → add to the existing operation page;
- **internal-only symbols** → skip (no page);
- only ask the user when a new symbol does not fit the one-page-per-API shape.

**Follow the SDK's directory convention for new type pages.** The convention
differs per SDK — always match the SDK's existing tree (see the per-SDK
page-mapping rules in `references/sdk-map.md`):
- **java**: related-type clusters go in a **subdirectory named after the primary
  type**, main type at `<Type>/<Type>.md` (e.g.
  `Vector/FunctionScore/FunctionScore.md`, `Vector/Highlighter/Highlighter.md`,
  `Collections/Function/`); single standalone types are flat
  (`Vector/DataType.md`). So a `FunctionChain` cluster (+
  `FunctionChainArg`/`Expr`/`Op`/`Stage`/`ParamValue`) goes under
  `Vector/FunctionChain/FunctionChain.md` + sibling pages — NOT flattened.
- **cpp**: a header's primary type **plus its related classes are all documented
  in ONE `<Type>.md` page**, with a full `##` section per related type (see
  `Collections/Function.md` — `Function` + `RRFRerank`/`WeightedRerank`/...).
  Do NOT create separate pages, and do NOT reduce related types to a one-line
  list — give each a proper `##` section.

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
- **Clobbering risk**: `.github/workflows/publish-ref-docs.yml` is
  **schedule-disabled** (no more weekly Feishu runs; only manual
  `workflow_dispatch` remains), so it no longer overwrites manual edits. If the
  user ever re-enables it, warn that its PR would regenerate `API_Reference/`
  from Feishu and overwrite manual edits.

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

2. **Create a branch only for SDKs that actually changed.** Base it on
   **`origin/master`** (NOT the current branch), so the doc branch never carries
   skill/AGENTS files or other unrelated commits:
   `sdk/<sdk-name>-<version>-doc` where
   `<sdk-name>` is the SDK's **project name** — i.e. its directory name under
   `API_Reference/` (`milvus-sdk-cpp`, `milvus-sdk-java`, `milvus-sdk-go`,
   `milvus-sdk-node`, `milvus-sdk-csharp`, `pymilvus`, ...) — and `<version>` is
   the plain version without the `v` prefix (e.g. `3.0.2`):

   ```bash
   git fetch origin
   git checkout -b sdk/milvus-sdk-cpp-3.0.2-doc origin/master
   ```

   The uncommitted doc edits carry over from the current working tree (the
   `API_Reference/` files are identical between your branch and `origin/master`);
   the skill/AGENTS files that live only on your current branch are left behind,
   which is what we want. Verify with `git log --oneline -1` that the new branch
   is rooted at the latest `origin/master`.

   For an **"update all SDKs to latest"** (or "update X to latest") run, each SDK
   that has real changes gets **its own branch**; SDKs already current, or with
   no omissions/errors to fix (when reconciliation was requested), get **no
   branch** and are simply reported. There is no `sdk/milvus-sdk-all-doc` branch.
   Only branches actually created are pushed; if the user asked for PRs, open one
   PR per created branch.

   **SDKs were already processed one at a time** (see the Workflow header) — by
   the time you are here, the working tree holds only the current SDK's edits.
   Commit them with `git add` **scoped to this SDK's directory**:

   ```bash
   git add API_Reference/<sdk-A>/        # ONLY this SDK's directory
   git commit -sm "..."
   git push -u origin sdk/<sdk-A>-<ver>-doc
   # open PR if requested
   ```

   Then move on to SDK-B **without destroying uncommitted work**: `git checkout
   origin/master` (which carries over uncommitted changes that don't conflict).
   NEVER use `git reset --hard` between SDKs — it would erase SDK-B's edits if
   they are not yet committed.

   Because each branch is created with `git checkout -b ... origin/master`,
   which carries over *all* uncommitted working-tree changes, `git add` must
   always be scoped to the SDK's own directory — otherwise edits would leak
   into the wrong branch and PR.

   The `sdk/` prefix is a ref namespace on `origin` (like the `auto/` weekly
   branch namespace) — do NOT create a bare branch named `sdk`, and do NOT use
   short names like `cpp` (use the full project name).

   **If the branch already exists, never overwrite it silently.** `git checkout
   -b <name>` fails when the local branch exists, and a plain push refuses to
   overwrite diverged remote history — treat that as a signal to stop and check:
   - branch exists **locally**: check whether its commits are already merged into
     `master` (`git log master..<branch> --oneline`). If empty → the work was
     merged; delete the stale local branch (after confirming) and re-create
     fresh. If it has unmerged commits → check whether an **open PR** exists for
     this branch (`gh pr list --repo milvus-io/web-content --head <branch>`):
     - open PR covering the same target version → **reuse the branch**: checkout
       it, apply any missing fixes (e.g. reconciliation additions) on top, commit
       (amend keeps one commit), push to the same branch so the open PR updates.
       Do NOT overwrite or create a new branch.
     - no open PR, or the user prefers → **ask the user** whether to reuse,
       overwrite (force), or pick a new branch name.
   - branch exists **only on remote**: if its commits are fully merged into
     `master`, deleting the remote branch and pushing a fresh one is safe but
     destructive — **ask the user first** (e.g. `gh pr status`/`git ls-remote
     origin <branch>` to confirm merge state), then delete + re-push. If the
     remote branch is unmerged or diverged, do NOT force-push without explicit
     user approval.

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

   For an **"update all SDKs to latest"** run, each changed SDK is committed on
   its **own branch** with its own per-SDK title (e.g. `Update milvus-sdk-cpp
   docs to v3.0.2`); SDKs with no changes get no branch and no commit.

   Always pass `-s` (`--signoff`) so the commit carries a `Signed-off-by:`
   trailer and passes GitHub's DCO check. The committer email must be verified
   on GitHub — if `git config user.email` is not the account's verified email,
   tell the user before committing.

4. **Push**:
   - If the user has **push access to `origin`** (e.g. the repo admin/contributor
     case): `git push -u origin sdk/milvus-sdk-cpp-3.0.2-doc`.
   - **External contributors (fork-and-pull)**: they cannot push `sdk/...` to
     `milvus-io/web-content`. Detect this (e.g. `git push --dry-run` failing, or
     `gh api repos/milvus-io/web-content -H "Accept:..."` returning 403), then
     push to their **fork** remote instead and open the PR with
     `--head <owner>:sdk/milvus-sdk-cpp-3.0.2-doc`. Ask the user which remote is
     their fork if ambiguous.

5. **Open a PR** (only if the user asked for a PR):

   ```bash
   gh pr create --base master --head sdk/milvus-sdk-cpp-3.0.2-doc \
     --title "Update milvus-sdk-cpp docs to v3.0.2" \
     --body "Documentation update for milvus-sdk-cpp v3.0.2."
   ```

   For a fork-based PR, use `--head <fork-owner>:sdk/milvus-sdk-cpp-3.0.2-doc`.
   Return the PR URL.

## Reconciliation mode (audit and backfill existing pages)

Use when the user wants the existing pages verified against a tag — e.g. before
bumping a version line, or because docs were hand-written and may be missing or
wrong. Do this in two passes.

### Pass 1 — Deterministic gap report (cheap, zero hallucination)

For every operation page, extract the documented builder/getter surface and
compare it against the actual class at the target tag. Use the side-A/side-B
extraction commands for the SDK in `.skills/update-milvus-sdk-docs/references/sdk-map.md`. **Include inherited
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
   `git show <tag>:<path>` per `.skills/update-milvus-sdk-docs/references/sdk-map.md`),
3. the **Doc style guide** below,
4. for new pages, 1–2 sibling pages from the same category as style exemplars,

and ask it to correct: factual errors vs. implementation, typos, wrong defaults,
outdated constraints, and to flag (but not silently fix) code comments that are
themselves wrong. Never invent APIs that are not in the code.

**When doc comments are sparse or missing**, derive the description from, in
order of preference:
1. the actual code implementation (method body, parameter names/types, defaults,
   control flow);
2. the docs for the **same operation in another SDK** (e.g. pymilvus/java pages)
   — they often describe the same server-side behavior;
3. sibling pages in the same SDK tree.

Structure (signatures, parameter lists, return types) stays reliable because it
is code-derived and validated. For **semantic** claims that cannot be confirmed
from code, other SDKs, or existing pages, mark them as "to be confirmed" in the
review summary instead of asserting them — do not fabricate default values,
side effects, or constraints.

Prioritize pages touched by the version diff first, then run the rest in batches.
Report a per-page summary of every correction for review.

## New SDK bootstrap mode

Use when the user asks to create the initial doc tree for an SDK that has no
`API_Reference/<sdk>/` directory yet (e.g. rust, or a future SDK). This mode
scaffolds a tree whose **structure and style match the existing SDK trees**.

1. **Confirm scope with the user**: which SDK, which version line (e.g.
   `v3.0.x`), and which existing SDK to use as the **structure template**
   (pick the closest match — e.g. for rust use `milvus-sdk-cpp` or
   `milvus-sdk-java`).
2. **Add an `sdk-map.md` entry** for the new SDK first: repo name, public API
   surface paths, tag format, page-mapping rules, verify commands. (The SDK
   must have a released tag; resolve the target version.)
3. **Clone the SDK repo** (Step 0b) and inventory its public API from the target
   tag's source.
4. **Scaffold the tree**: `API_Reference/<sdk>/<version-line>/` with `About.md`
   (intro, compatibility table, install commands) and the category/operation/
   type pages following the template SDK's layout and one-page conventions.
5. **Generate each page** from the new SDK's source, matching the template's
   style, verbosity, and page shapes (see the **Doc style guide** and the
   template's own pages).
6. **Validate**: version pins, cross-links, signature consistency, and that the
   page set matches the SDK's public API.
7. **Report** the tree for review; push/PR only when the user asks (per Step 7).

Bootstrap a single SDK per run, and confirm with the user before creating pages
whose API semantics are uncertain from the source alone.

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
- **New API placement**: new public APIs get a **new page by default** (one page
  per API); new enum values go into the existing enum page. Only ask the user
  when a symbol does not fit the one-page-per-API shape.
- **Internal types** (e.g. C++ `BloomFilter.h`): skip unless exposed publicly.
- **Legacy/private enum values**: ignore values that exist in the SDK but are not
  meant for public use. Notably, when a `DataType` enum contains a `String`
  value (e.g. `io.milvus.v2.common.DataType.String(20)` in milvus-sdk-java), do
  **not** document it — readers should use `VarChar` instead.
- **Scope**: confirm the user wants every SDK updated, or just one (e.g. C++).
- **New SDK with no doc tree**: creating the initial tree is handled by the
  **New SDK bootstrap mode** (above) — scaffold `API_Reference/<sdk>/` using an
  existing SDK as the structure template. Do not silently refuse, and do not
  fabricate pages from an SDK that has no released tag.
