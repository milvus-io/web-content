// Shared-script sync sources.
//
// FROZEN (2026-09-23): zdoc removed its `plugins/` directory in commit
// 1e9ae4723c and moved the tooling into a pnpm-workspace package
// (packages/docs-tooling/src/...). The new modules depend on ~15 sibling
// files (canonicalLinkAuditor, incrementalFetchPlanner, sourceSnapshot, ...)
// and a TypeScript manual registry, so they no longer work as loose drop-in
// file copies. The copies under `scripts/lark-docs/`, the lark/feishu files
// under `scripts/lib/`, and `scripts/mdx-parse/` are therefore an in-repo
// fork, last synced from zdoc on 2026-07-01 (d54db7a0a "Sync upstream Lark
// docs scripts"). Fix Feishu-fetch bugs by editing those copies in place;
// do not re-add sync entries pointing at ../zdoc/plugins/* (the path no
// longer exists):
//   - plugins/lark-docs  -> packages/docs-tooling/src/lark/
//   - plugins/mdx-parse  -> packages/docs-tooling/src/mdx/
//
// RETARGETED (2026-09-23): the apifox-docs entry now syncs from the
// post-refactor location (packages/docs-tooling/src/reference/rest, since
// zdoc 1e9ae4723c). Unlike the lark files, the rest tooling is
// self-contained (CommonJS, own package.json, runtime files have no
// cross-package requires), so a whole-directory sync works. Requires the
// `ajv` and `js-yaml` dependencies in scripts/package.json (the latter is
// pulled in by upstreamDiff/cli.js, which index.js loads at startup). Files
// that cannot work as loose copies are kept out via `exclude` below — see
// the "Shared script copies" section in scripts/README.md.

module.exports = [
  {
    name: 'milvus-lib',
    sourceType: 'local',
    source: '../milvus-docs/scripts/lib',
    target: 'scripts/lib',
    include: [/^milvus.*\.js$/],
  },
  {
    name: 'apifox-docs',
    repo: 'zilliztech/zdoc',
    ref: 'master',
    source: 'packages/docs-tooling/src/reference/rest',
    target: 'scripts/apifox-docs',
    exclude: [
      // Requires a zdoc-generated sidebar artifact that does not exist here.
      /^on-demand-cluster-segment\.test\.js$/,
      // zdoc-side track-attribution evidence (2.5 MB). The contents API does
      // not inline files over 1 MB, so the sync would write it as 0 bytes
      // (that is how the empty file landed here originally); nothing in this
      // copy reads it, so keep it out entirely.
      /^meta\/lifecycle-evidence\//,
      // zdoc-side live-verification tooling and evidence (4.2 MB: runners,
      // suites, goldens, schema inventory, reports). Nothing in this copy
      // reads it; it is zdoc-internal conformance workflow, so keep it out.
      /^conformance\//,
    ],
  },
];
