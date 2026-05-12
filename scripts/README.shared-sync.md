# Shared Scripts Sync

## Purpose

This repository consumes shared script code from upstream source-of-truth repositories to avoid manual duplication.

## Source of truth

- `milvus-io/milvus-docs` (**default branch**) -> `scripts/lib`
- `zilliztech/zdoc` (`master`) -> `scripts/apifox-docs`

Sync mappings are defined in:

- `scripts/sync-shared-scripts.manifest.js`

## Local commands

Run from repo root:

```bash
npm --prefix scripts run sync:shared-scripts
```

Applies remote content to local targets and prints summary rows:

- `OK | <entry> | +<added> ~<changed> -<deleted>`
- `DRIFT | ...`
- `TOTAL | entries=<n> | ...`

Check-only mode (no writes):

```bash
npm --prefix scripts run check:shared-scripts
```

Returns non-zero when drift exists.

## Auth requirements

The sync tool uses GitHub API requests. To avoid 403/rate-limit issues, provide auth via one of:

1. `GITHUB_TOKEN`
2. `GH_TOKEN`
3. authenticated GitHub CLI session (`gh auth login`)

CI workflows pass `${{ secrets.GITHUB_TOKEN }}` for drift checks.

## Ownership model

- `scripts/lib/**` is synced from `milvus-docs` and should not be hand-edited.
- `scripts/apifox-docs/**` is synced from `zdoc` and should not be hand-edited.

If a behavior fix is needed, patch upstream first, then re-sync here.

## Upstream-first update workflow

### For `scripts/lib` changes

1. Make and merge/push the change in `milvus-docs` default branch.
2. In this repo:

```bash
npm --prefix scripts run sync:shared-scripts
npm --prefix scripts run check:shared-scripts
```

3. Commit resulting changes.

### For `scripts/apifox-docs` changes

1. Make and merge/push the change in `zdoc/master`.
2. In this repo:

```bash
npm --prefix scripts run sync:shared-scripts
npm --prefix scripts run check:shared-scripts
```

3. Commit resulting changes.

## Verification checklist

Before merge:

```bash
npm --prefix scripts run test:shared-sync
npm --prefix scripts run check:shared-scripts
node scripts/lark-docs/index.js --help
node scripts/apifox-docs/index.js --help
```

Expected:

- tests pass
- check shows zero drift (`OK` for both entries)
- both CLIs print usage and exit 0

## Usage after sync

After `sync:shared-scripts` is complete and `check:shared-scripts` shows zero drift, use the synced scripts through the existing entrypoints.

### Lark docs

Help:

```bash
node scripts/lark-docs/index.js --help
```

Example run:

```bash
node scripts/lark-docs/index.js \
  -c scripts/config.json \
  -m pymilvus-v2.6.x \
  --all --skipImageDown
```

### Apifox docs

Help:

```bash
node scripts/apifox-docs/index.js --help
```

Example run:

```bash
node scripts/apifox-docs/index.js \
  -s scripts/apifox-docs/meta/openapi/01-import-operations.json \
  -l en-US \
  -o reference/api/restful/restful \
  -t zilliz
```

### NPM aliases

You can also run via package scripts:

```bash
npm --prefix scripts run fetch-lark-docs
npm --prefix scripts run fetch-apifox-docs
```

Use `--` to pass options through npm scripts, for example:

```bash
npm --prefix scripts run fetch-lark-docs -- --help
npm --prefix scripts run fetch-apifox-docs -- --help
```

## Troubleshooting

### `Missing script: sync:shared-scripts`

You are not on a branch/checkout that includes sync tooling. Use the correct branch/worktree.

### `403 Forbidden` during sync/check

Auth missing or rate-limited. Ensure `GITHUB_TOKEN`/`GH_TOKEN` or `gh auth login` is configured.

### Drift remains after local fix

You likely patched local synced files directly. Move the fix upstream (`milvus-docs` or `zdoc`), push upstream, then re-run sync.