---
name: update-user-guide-snippet
description: Create, update, and fix the code snippets in the Milvus user guide pages under <version>/site/en/userGuide/ so they match each SDK's latest API, using the pymilvus snippets as the reference baseline. Defaults to the latest major version line (v3.0.x) unless a version is named (e.g. "更新2.6的user guide脚本" → v2.6.x). Use when the user asks to update/refresh/fix/check the scripts or code snippets in the user guide, mentions "user guide" / userGuide, or asks to add missing SDK snippets (e.g. cpp).
---

# Update User Guide Snippets

Keep the multi-SDK code snippets in the user guide pages correct and complete.

- detect each SDK's latest API state (from the SDK repo git tags);
- check the user guide snippets against it;
- add snippets for any SDK that is missing (notably **cpp**, which is absent from
  most pages today);
- fix snippets that are syntactically wrong or use outdated/incorrect APIs;
- the **pymilvus snippet is the reference baseline** for what the code should do —
  every other SDK mirrors its flow.

## Ground rules

- **pymilvus is the logic reference.** When writing or fixing a snippet, first read
  the `python` block for the section, then translate that exact operation flow to
  each SDK using that SDK's conventions.
- Ground truth for "latest API" is the SDK repository's git tags — clone into the
  gitignored `sdk-tmp/sdks/` (same Step 0 as the `update-milvus-sdk-docs` skill) and
  verify method names/signatures against the tag's public API. Do not guess.
- Only touch **code snippets**; never rewrite surrounding prose or headings.
- Within one section the snippets across SDKs must follow the **same logical
  flow and sub-step numbering** (e.g. "1. Connect", "3. Create collection", "3.1
  Create schema") as the pymilvus block.
- Match each page's existing per-SDK style (imports, client initialization,
  variable naming); do not introduce a new style mid-page.

## Scope

- **Version selection is by Milvus major version.** Each major line has its own
  user guide: `v3.0.x/site/en/userGuide/` (Milvus 3.0), `v2.6.x/site/en/userGuide/`
  (Milvus 2.6), etc.
  - If the user does **not** specify a version → update only the **latest major
    version** line (currently `v3.0.x`). Never touch older lines by default.
  - If the user names a version (e.g. "更新2.6的user guide脚本" / "update the 2.6
    user guide") → update only that line's `site/en/userGuide/` (e.g.
    `v2.6.x/site/en/userGuide/`).
  - The snippets live under `<version>/site/en/userGuide/**/*.md`.
- **SDK ↔ snippet language** mapping:

  | Language tag | SDK |
  |---|---|
  | `python` | pymilvus (reference baseline) |
  | `java` | milvus-sdk-java (`MilvusClientV2`) |
  | `javascript` | milvus-sdk-node |
  | `go` | milvus-sdk-go (`client/` module) |
  | `cpp` | milvus-sdk-cpp — **usually missing; the typical gap to fill** |
  | `bash` | RESTful API (do not remove; not an SDK) |

- **Page coverage — "Core pages only" by default.** A **core page** is a user
  guide page that already contains `python` + `java` + `javascript` + `go`
  blocks (the four baseline SDKs). Missing-SDK snippets (notably **cpp**) are
  added **only on core pages** — do NOT ask the user; this is the default. Pages
  that lack the python/java/javascript/go baseline are left untouched for
  missing-SDK additions.
  - "All pages" (add missing SDKs on every user guide page) and "Fix existing
    only, no cpp" (never add cpp) are supported if the user explicitly requests
    them — otherwise default to Core pages.

## Workflow

0. **Pre-flight: refresh the local web-content checkout** (same rule as the
   `update-milvus-sdk-docs` skill's Step 0). If the working tree is clean (and
   not mid-merge) and the branch has an upstream, `git pull --ff-only` first. If
   the working tree has **local changes**, **STOP and do not update** — tell the
   user to commit or stash them first, so the doc edits do not mix with (and do
   not pollute) their work.
1. **Determine scope**: resolve the version line per the Scope rules (default
   latest major version, e.g. `v3.0.x`; or the explicitly named line, e.g.
   `v2.6.x`), then which SDKs. Only that line's `site/en/userGuide/` is touched.
2. **For each user guide page** (`<version>/site/en/userGuide/**/*.md`):
   - Read the page and enumerate the snippet sections by heading.
   - For each section, record which SDKs already have a block
     (`python`, `java`, `javascript`, `go`, `cpp`, `bash`).
   - **Missing SDKs** → draft the snippet using the pymilvus block as the logic
     baseline, translated per the conventions in
     `skills/update-user-guide-snippet/references/snippet-conventions.md`. Also add
     the corresponding tab anchor (e.g. `<a href="#cpp">C++</a>`) if the page uses
     anchor tabs. **By default only do this on core pages** (pages that already
     have python+java+javascript+go) — do not ask the user (see Scope).
   - **Existing snippets** → check against the SDK's latest tag: deprecated or
     renamed methods, changed builder signatures, wrong imports, missing steps.
     Fix in place, keeping the pymilvus-mirrored flow.
3. **Syntax-check every written or edited snippet (mandatory — no execution).**
   Each modified snippet must pass a parse-only syntax check with the SDK's
   toolchain (no live Milvus server or runtime execution needed):
   - `python` → `python -m py_compile <file>` (or `ast.parse`); write the snippet
     to a temp file first.
   - `javascript` → `node --check <file>`.
   - `cpp` → `g++ -fsyntax-only -std=c++17 <file>` with the SDK's include paths
     (mirror the `sdk-tmp/sdks/milvus-sdk-cpp/src/include` include dir).
   - `go` → `gofmt -e <file>` (parses the file and reports syntax errors; works
     outside a module and does not require the SDK's `go.mod` version). Do NOT
     rely on `go vet` — snippets are fragments, not a buildable package.
   - `java` → `javac` with the SDK jars on the classpath (if the toolchain is
     available); otherwise report that javac was skipped.
   - `bash` → `bash -n <file>`.
   Fix any reported syntax error and re-run until clean. If a toolchain is
   missing, say so explicitly in the report rather than silently skipping.
4. **Run the pymilvus snippets for real (mandatory, if a Milvus server exists).**
   pymilvus is the logic baseline, so executing its snippets catches most logic
   problems in the update. This step does NOT start a Milvus server itself.
   - First **probe** whether a Milvus server is reachable (e.g.
     `python3 -c "from pymilvus import connections; connections.connect(host='localhost', port=19530, token='root:Milvus'); connections.disconnect('default')"`,
     or probe the REST health endpoint `curl -s http://localhost:9091/healthz`).
   - **Server reachable** → assemble and run the updated pages' `python`
     fragments (extract the `python` blocks in order, prepend missing imports,
     join them into one runnable script per page, execute it, and require each
     step to succeed). Requires a Python env with `pymilvus` installed; if
     `pymilvus` is missing, install it into the env or report it as skipped.
     Drop collections/databases the snippets create before/after so re-runs are
     idempotent.
   - **Server NOT reachable** → do NOT run the snippets, but **explicitly tell
     the user** in the report: "No Milvus server detected at
     localhost:19530/9091 — pymilvus snippets were NOT executed. Start a Milvus
     instance (e.g. docker standalone) to enable this check." Never silently
     skip it.
5. **Validate** before reporting done:
   - every section has the full SDK set the page claims (tabs vs blocks match);
   - imports/client init in each snippet are consistent with the latest API;
   - sub-step numbering matches across SDKs in the same section;
   - snippets are syntactically plausible (balanced braces/parens, no stray
     placeholders unless intentional).
6. **Report** a per-page/per-snippet change list for review, including which
   syntax checks passed/skipped and whether the pymilvus snippets were actually
   run (and, if not, why not).

## Pushing / PR (only when the user asks)

Follow the same rules as the `update-milvus-sdk-docs` skill (its Step 7):
- without an explicit "commit and push to the remote" / "提交到远程仓库" (or
  "open a PR" / "提交 PR"), stop at local edits;
- when asked, create a branch named `docs/user-guide-snippets`, one **signed**
  commit (`git commit -sm`, title `Update user guide code snippets`), push, and
  open a PR if requested. Never force-push or delete a remote branch without
  approval.

## Known context

- As of the v3.0.x user guide, snippet counts are roughly: `python` 814,
  `java` 407, `javascript` 398, `bash` 394, `go` 383, and **`cpp` 0** — filling
  in cpp is the main "missing SDK" work. Keep the pymilvus flow when adding it.
- Per-SDK client-init and common-operation patterns live in
  `skills/update-user-guide-snippet/references/snippet-conventions.md`.
