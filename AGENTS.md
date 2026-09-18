# milvus-io/web-content

## Repository purpose

This repository is the **content source for the milvus.io website**. It holds the
technical documentation, SDK API references, bootcamp resources, and community
pages rendered on https://www.milvus.io. It is the single source of truth for
Milvus user-guide and SDK reference content; markdown here is consumed by the
`milvus-io/milvus.io` site build.

## Layout

- `v0.x`, `v1.1.1`, `v2.0.x`–`v2.6.x`, `v3.0.x/` — versioned user-guide
  markdown, one directory per Milvus release line. English source lives under
  `<version>/site/en/`.
- `localization/<version>/site/en/` — **generated** EN pages (HTML + JSON)
  produced by `yarn generate:en`; the site renders these.
- `API_Reference/<sdk>/<version-line>/` — hand-curated SDK API reference
  markdown (`pymilvus`, `milvus-sdk-java`, `milvus-sdk-go`, `milvus-sdk-node`,
  `milvus-sdk-cpp`, `milvus-sdk-csharp`).
- `API_Reference_MDX/milvus-restful/` — REST API reference, generated from
  Apifox via `scripts/fetch-restful-docs.js`.
- `scripts/` — content-import tooling for Feishu/Lark (`lark-docs/`) and Apifox.
- `tools/` — `generate-en.js`, `translate.js`, `glossary.js`.
- `preview/`, `bootcamp/`, `community/`, `components/` — site assets and extras.

## Build and publish

- **Local generation**: `yarn generate:en` runs `tools/generate-en.js`, which
  converts `site/en` markdown into HTML + JSON under `localization/`, rebuilds
  the menu-structure locales, and (for new files) triggers `translate.js`.
  `version.json` pins the current release line (e.g. `v3.0.x`).
- **Production deploy**: a push to `master` triggers `.github/workflows/master.yml`
  → `yarn generate:en` → commit → `repository_dispatch` (`prod-deploy`) to
  `milvus-io/milvus.io`, which builds and deploys the site.
- **Preview deploy**: a push to the `preview` branch triggers the analogous
  preview build. Changes to preview **Markdown** (`preview/**.md`) do not trigger
  either build (other preview files still do, per the workflow `paths-ignore`).
- **Site consumption**: `milvus.io` pulls this repo as the `src/docs` git
  submodule and reads specific paths only (`localization/`, `API_Reference/`,
  `API_Reference_MDX/`, version dirs' `site/en`, `version.json`, menu structures).
  Extra top-level directories are ignored by the site build.
- **Note**: `.github/workflows/publish-ref-docs.yml` is **schedule-disabled** —
  it no longer runs weekly from Feishu (only manual `workflow_dispatch` remains).
  SDK reference docs are now maintained directly in this repo via the
  `update-milvus-sdk-docs` skill, so its auto-PR can no longer overwrite manual
  edits.

## update-milvus-sdk-docs skill

When the user asks to **update, bump, or audit the SDK API reference docs** in
`API_Reference/`, load the `update-milvus-sdk-docs` skill. Canonical files live
in `skills/update-milvus-sdk-docs/` (`SKILL.md` + `references/sdk-map.md`) and
are mirrored by symlink into `.opencode/`, `.claude/`, and `.codex/` so every
agent tool discovers it.

Purpose and rules:

- Ground truth for "what changed" is the SDK repository's git tags — **not**
  Feishu and **not** any local SDK checkout.
- **Modes** (diff and reconciliation can be combined):
  - *Diff mode* (default): update the version line to a new release (e.g.
    `v3.0.1` → `v3.0.2`), applying only the changes between the two tags.
  - *Latest mode*: resolve the target from the SDK repo's newest release tag;
    skip any SDK already at the latest version.
  - *Reconciliation mode*: audit the whole doc tree against one tag and backfill
    missing methods/parameters, fix typos/errors, and correct drift.
- **How to invoke**: describe the task in natural language — name the SDK
  (and version line, e.g. `v3.0.x`), then choose a mode by wording:
  - "Update cpp SDK docs to v3.0.2" → diff mode
  - "Update the Java SDK docs to latest" → latest mode
  - "Update all SDKs to latest" → latest mode for every SDK, a **per-SDK branch
    only for SDKs that actually change**
  - "... and reconcile for omissions and errors" / "audit ... for missing
    methods" → reconciliation (can be added to any of the above)
  - To actually **push**: append "commit and push to the remote" / "提交到远程
    仓库", or "open a PR" / "提交 PR". Without this the skill stops at local
    edits and does not even commit.
- **Workflow** (details in the skill): clone the SDK repo into the gitignored
  `sdk-tmp/sdks/` (partial clone, Step 0) → diff the public API surface between
  tags (Step 2) → cross-check the merged PRs between the tags (Step 2b) → map
  changes to pages (Step 3) → update prose matching existing page style and
  verbosity (Step 4) → validate version pins, links, and signature consistency
  (Step 5). Step 1 refuses targets that are not newer than the documented
  version.
- **Conventions**:
  - New content must match the existing pages' level of detail — do not inflate
    one-sentence request-method entries into paragraphs.
  - Branch name: `sdk/<project-name>-<version>-doc` (e.g.
    `sdk/milvus-sdk-cpp-3.0.2-doc`). An **"update all SDKs to latest"** run creates
    a **per-SDK branch** only for SDKs that actually change — SDKs already current
    (or with no omissions/errors to fix, when reconciliation was requested) get
    no branch. There is no single all-SDKs branch.
  - Single commit per update, **signed off** (`git commit -sm`), title
    `Update <project-name> docs to v<version>` with a body listing the per-page
    changes.
  - Push to the remote or open a PR only when the user explicitly asks; never
    force-push or delete a remote branch without approval.
- Example prompts: "Update the Java SDK docs to v3.0.9", "Update all SDKs to
  latest and push to the remote", or "Update the cpp SDK docs to v3.0.2 and
  reconcile for omissions and errors."

## update-user-guide-snippet skill

When the user asks to **update, fix, or check the code snippets in the Milvus
user guide**, load the `update-user-guide-snippet` skill. Canonical files live in
`skills/update-user-guide-snippet/` (`SKILL.md` + `references/snippet-conventions.md`),
mirrored by symlink into `.opencode/`, `.claude/`, and `.codex/`.

Purpose and rules:

- The user guide is versioned by **Milvus major version**: `v3.0.x/site/en/userGuide/`
  (Milvus 3.0), `v2.6.x/site/en/userGuide/` (Milvus 2.6), etc.
- Without a version, the skill updates only the **latest major version line**
  (currently `v3.0.x`). Naming a version (e.g. "更新2.6的user guide脚本") limits it
  to that line.
- It detects each SDK's latest API, checks the guide's snippets against it, adds
  missing SDK snippets (notably **cpp**, currently absent), and fixes
  syntax/usage errors. The **pymilvus snippet is the reference baseline** for the
  operation flow; other SDKs mirror it.
- Every written/edited snippet is **syntax-checked** (parse-only, no execution):
  `py_compile`, `node --check`, `g++ -fsyntax-only`, `gofmt -e`, `javac`,
  `bash -n`.
- After updating, it **runs the pymilvus snippets for real** (mandatory when a
  Milvus server is reachable at localhost:19530). It never starts a Milvus
  server itself; if none is running it explicitly says the pymilvus snippets
  were NOT executed.
- Snippet language mapping: `python` = pymilvus (baseline), `java` =
  milvus-sdk-java, `javascript` = milvus-sdk-node, `go` = milvus-sdk-go, `cpp` =
  milvus-sdk-cpp, `bash` = REST (kept, not an SDK).
- Push/PR behavior matches the other skill: only when the user explicitly asks
  ("commit and push to the remote" / "提交到远程仓库", or "open a PR" / "提交 PR");
  branch `docs/user-guide-snippets`, one **signed** commit.
- Example prompts: "Update the user guide scripts" / "更新user guide里的脚本",
  or "更新2.6的user guide脚本".

## Agent rules

- Commit with `git commit -s` so every commit carries a `Signed-off-by:` trailer
  (GitHub DCO).
- In milvus-organization repositories, **each PR must contain exactly one commit**
  — squash or amend before opening a PR.
- Never commit secrets; `.env` and tool scaffolding are gitignored.
- Follow the fork-and-pull workflow (see `CONTRIBUTING.md`) for upstream
  contributions.
- Write documentation prose following the Google Developer Documentation Style
  Guide.
