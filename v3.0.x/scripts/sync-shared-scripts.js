#!/usr/bin/env node

const path = require('node:path');

const manifest = require('./sync-shared-scripts.manifest');
const { buildSyncPlan, readLocalSourceTree, runCheck, runApply } = require('./shared-sync/core');

function createFetchSourceTree(repoRoot) {
  return (entry) => {
    if (entry.sourceType === 'local') {
      return readLocalSourceTree(entry, repoRoot);
    }

    throw new Error(`Unsupported sourceType for ${entry.name}: ${entry.sourceType || 'remote'}`);
  };
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

  const plan = await buildSyncPlan({ manifest, repoRoot });
  const fetchRemoteTreeImpl = createFetchSourceTree(repoRoot);

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
