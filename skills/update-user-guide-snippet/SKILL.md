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

## Usage

No slash command — describe the task in natural language. State the version line
if you don't want the default (latest major version), and add a push intent if
you want the result on the remote.

| Intent | Prompt example |
|---|---|
| Basic update (default latest line) | "更新user guide里的脚本" / "Update the user guide scripts" |
| Add missing SDK snippets | "补上缺失的cpp和rust片段" / "add missing cpp and rust snippets" |
| Pin a version line | "更新2.6的user guide脚本" / "update the 2.6 user guide" |
| Fix errors/usage only | "修正 user guide 里过时的用法" / "fix outdated usage in the user guide" |
| Push + PR | "更新user guide里的脚本，补上缺失的cpp和rust片段，修复错误用法，校验后提交到远程仓库并创建PR" / "Update the user guide snippets, add missing cpp/rust, fix errors, then commit, push and open a PR" |

**Combined example** (covers the common full flow):

- 中文: "更新 user guide 里的脚本，补上缺失的 cpp 和 rust 片段，修复过时或错误的用法，并进行语法校验。"
- English: "Update the user guide snippets: add missing cpp and rust snippets, fix outdated or incorrect usage, and run the syntax checks."

Both default to the latest major version line and Core pages only, and only push
(or open a PR) when the push intent is explicit.

## Ground rules

- **Do not stop to ask for scope confirmation before a large backfill.** Once the
  version line and page coverage are determined (default: latest line +
  **Core pages only**), proceed automatically without prompting — adding missing
  SDK snippets across many pages is the expected, routine behavior. Only ask the
  user when the request itself is genuinely ambiguous (e.g. the version line
  cannot be determined, or the intent is unclear).
- **pymilvus is the logic reference.** When writing or fixing a snippet, first read
  the `python` block for the section, then translate that exact operation flow to
  each SDK using that SDK's conventions.
- Ground truth for "latest API" is the SDK repository's git tags — clone into the
  gitignored `sdk-tmp/sdks/` (see Step 0 below) and verify method
  names/signatures against the tag's public API. Per-SDK repo names, clone paths,
  public API surfaces, tag formats, and verify commands live in
  `skills/update-user-guide-snippet/references/sdk-map.md` — read it before
  working on an SDK. Do not guess.
- Only touch **code snippets**; never rewrite surrounding prose or headings.
- Within one section the snippets across SDKs must follow the **same logical
  flow and sub-step numbering** (e.g. "1. Connect", "3. Create collection", "3.1
  Create schema") as the pymilvus block.
- Match each page's existing per-SDK style (imports, client initialization,
  variable naming); do not introduce a new style mid-page.
- **Ignore `DataType.String`**: when an SDK's `DataType` enum contains a `String`
  value (e.g. java `io.milvus.v2.common.DataType.String`), never write it into a
  snippet — use `DataType.VarChar` instead. It is a legacy/internal value.

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
  | `cpp` | milvus-sdk-cpp — **usually missing; the typical gap to fill**. Live-run
    uses a prebuilt binary from `default-conan-local2`; skipped if none matches |
  | `csharp` | milvus-sdk-csharp — auto-added like cpp **once a released version
    ≥ `3.0.0` exists**; otherwise skip adding csharp snippets |
  | `rust` | milvus-sdk-rust — auto-added like cpp |
  | `bash` | RESTful API (do not remove; not an SDK) |

- **Page coverage — "Core pages only" by default.** A **core page** is a user
  guide page that already contains `python` + `java` + `javascript` + `go`
  blocks (the four baseline SDKs). Missing-SDK snippets (cpp, **rust**, and —
  once it reaches ≥ `3.0.0` — **csharp**) are added **only on core pages** — do
  NOT ask the user; this is the default. Pages that lack the
  python/java/javascript/go baseline are left untouched for missing-SDK
  additions.
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
0b. **Clone the SDK repos you need** (once per run) into the gitignored
   `sdk-tmp/sdks/`, using the repo names in
   `skills/update-user-guide-snippet/references/sdk-map.md`:

   ```bash
   SDK_URL_BASE=https://github.com/milvus-io
   prepare_sdk() {
     local dir="sdk-tmp/sdks/$1"
     if [ ! -d "$dir/.git" ]; then
       git clone --filter=blob:none --no-checkout "$SDK_URL_BASE/$1.git" "$dir"
     fi
     git -C "$dir" fetch --tags --force origin   # always refresh tags
   }
   prepare_sdk milvus-sdk-cpp    # repeat per SDK you will touch
   ```

   The Go SDK is an exception: it lives inside `milvus-io/milvus` — use
   `prepare_sdk milvus` and diff under `client/` (per `sdk-map.md`).
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
   - **SDK does not implement the feature**: if a section's feature is not (yet)
     supported by a given SDK (verified against that SDK's latest tag — the
     methods/options simply do not exist), do **NOT** invent a snippet. Instead,
     still add that SDK's code block and tab anchor, but leave the block empty
     except for a comment stating the feature is not supported yet, e.g.:

     ```cpp
     // Note: Not yet supported in milvus-sdk-cpp as of v3.0.2.
     ```

     Use the SDK's comment syntax (e.g. `#` for python, `//` for cpp/java,
     `//` for go, `//` for javascript, `#` for bash). This makes readers see
     the SDK intentionally lacks the feature. Record it in the report too (e.g.
     "cpp: <feature> not supported as of <tag>"). Never write code for APIs that
     do not exist.
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
 4. **Run the snippets for real (mandatory, if a Milvus server exists).** This
    step does NOT start a Milvus server itself.
    - First **probe** whether a Milvus server is reachable (e.g.
      `python3 -c "from pymilvus import connections; connections.connect(host='localhost', port=19530, token='root:Milvus'); connections.disconnect('default')"`,
      or probe the REST health endpoint `curl -s http://localhost:9091/healthz`).
    - **Server reachable** → run every updated page's snippets for each SDK whose
      snippets are present, via the bundled runners in
      `skills/update-user-guide-snippet/scripts/`:

      ```bash
      # python (pymilvus) — logic baseline
      python3 skills/update-user-guide-snippet/scripts/run_page.py <page.md> [seed.py ...]
      # node
      node skills/update-user-guide-snippet/scripts/run_page_node.mjs <page.md>
      # go (needs client/v2 module; run from sdk-tmp/snippet-run/go)
      python3 skills/update-user-guide-snippet/scripts/run_page_go.py <page.md>
      # java (needs maven + milvus-sdk-java)
      python3 skills/update-user-guide-snippet/scripts/run_page_java.py <page.md>
      # rust (resolves the latest milvus-sdk-rust version from crates.io)
      python3 skills/update-user-guide-snippet/scripts/run_page_rust.py <page.md>
      # cpp (uses a prebuilt milvus-sdk-cpp binary from default-conan-local2)
      python3 skills/update-user-guide-snippet/scripts/run_page_cpp.py <page.md> [<version>]
      ```

      The cpp runner installs a **prebuilt** `milvus-sdk-cpp/<version>@milvus/dev`
      binary from the `default-conan-local2` Conan repo with `--build=never`. If
      a binary matching the version/system exists, the cpp blocks are compiled
      and run against it; if **no usable prebuilt binary is found, cpp
      verification is SKIPPED** (reported as skipped — never a hard failure and
      never a from-source build).

      Each runner hoists the snippet's imports, chains the block bodies against a
      shared client, executes them, and reports pass/fail. The python runner
      auto-seeds and cleans up collections; the others rely on the page's own
      setup (use `run_page.py`'s seed first if collections are assumed).
    - **Go env**: the go runner needs a toolchain satisfying the client module's
      `go.mod` requirement and a reachable module proxy. On this machine use
      `GOTOOLCHAIN=go1.25.8 GOPROXY=https://goproxy.cn,direct` (both cached/
      reachable); set them in the environment before running
      `run_page_go.py`.
    - **Per-SDK readiness**: each SDK runner needs its dependency environment
      (npm pkg / go module / maven jar / cargo crate) and toolchain. If the SDK's
      dependency fetch fails (e.g. no network to the registry) or the toolchain is
      missing, **explicitly report** that SDK's snippets were NOT executed and why
      — never silently skip.
    - **Server NOT reachable** → do NOT run the snippets, but **explicitly tell
      the user** in the report: "No Milvus server detected at
      localhost:19530/9091 — snippets were NOT executed. Start a Milvus
      instance (e.g. docker standalone) to enable this check." Never silently
      skip it.
    - **Failures are findings**: when a block fails (syntax error, wrong API
      usage, wrong data shape), fix the snippet so the live run passes — this is
      the point of the check.
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
