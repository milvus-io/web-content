#!/usr/bin/env node

const path = require('node:path');
const fetchImplRuntime = globalThis.fetch ? globalThis.fetch.bind(globalThis) : require('node-fetch');

const manifest = require('./sync-shared-scripts.manifest');
const { buildSyncPlan, fetchRemoteTree, runCheck, runApply } = require('./shared-sync/core');

function createFetch() {
  return (url) =>
    fetchImplRuntime(url, {
      headers: {
        'User-Agent': 'shared-scripts-sync',
        Accept: 'application/vnd.github+json',
      },
    });
}

function createFetchRemoteTree(fetchImpl) {
  return (entry) => fetchRemoteTree(entry, fetchImpl);
}

function printTotals(result) {
  const totals = result.rows.reduce(
    (acc, row) => {
      acc.added += row.diff.added.length;
      acc.changed += row.diff.changed.length;
      acc.deleted += row.diff.deleted.length;
      return acc;
    },
    { added: 0, changed: 0, deleted: 0 }
  );

  console.log(`TOTAL | entries=${result.rows.length} | +${totals.added} ~${totals.changed} -${totals.deleted}`);
}

async function main() {
  const checkMode = process.argv.includes('--check');
  const repoRoot = path.resolve(__dirname, '..');
  const fetchImpl = createFetch();

  const plan = await buildSyncPlan({ manifest, repoRoot, fetchImpl });
  const fetchRemoteTreeImpl = createFetchRemoteTree(fetchImpl);

  const result = checkMode
    ? await runCheck({ plan, fetchRemoteTreeImpl })
    : await runApply({ plan, fetchRemoteTreeImpl });

  printTotals(result);

  process.exitCode = result.exitCode;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
