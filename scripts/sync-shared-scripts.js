#!/usr/bin/env node

const path = require('node:path');
const { execSync } = require('node:child_process');

const manifest = require('./sync-shared-scripts.manifest');
const { buildSyncPlan, fetchRemoteTree, runCheck, runApply } = require('./shared-sync/core');

function resolveGithubToken() {
  if (process.env.GITHUB_TOKEN) {
    return process.env.GITHUB_TOKEN;
  }

  if (process.env.GH_TOKEN) {
    return process.env.GH_TOKEN;
  }

  try {
    return execSync('gh auth token', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function createFetch() {
  if (typeof globalThis.fetch !== 'function') {
    throw new Error('Fetch API is unavailable in this runtime. Please run this script with Node.js 20+');
  }

  const token = resolveGithubToken();
  const headers = {
    'User-Agent': 'shared-scripts-sync',
    Accept: 'application/vnd.github+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchImpl = globalThis.fetch.bind(globalThis);
  return (url) =>
    fetchImpl(url, {
      headers,
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
