const test = require('node:test');
const assert = require('node:assert/strict');

const { buildSyncPlan, assertAllowedTarget } = require('../shared-sync/core');

test('buildSyncPlan resolves milvus-docs default branch dynamically via fetch', async () => {
  const manifest = [
    {
      name: 'milvus-lib',
      repo: 'milvus-io/milvus-docs',
      ref: 'DEFAULT_BRANCH',
      source: 'scripts/lib',
      target: 'scripts/lib',
    },
  ];

  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    return {
      ok: true,
      status: 200,
      json: async () => ({ default_branch: 'master' }),
    };
  };

  const repoRoot = '/tmp/repo';
  const plan = await buildSyncPlan({ manifest, repoRoot, fetchImpl });

  assert.equal(calls.length, 1);
  assert.equal(calls[0], 'https://api.github.com/repos/milvus-io/milvus-docs');
  assert.equal(plan.length, 1);
  assert.equal(plan[0].ref, 'master');
  assert.equal(plan[0].targetAbsPath, '/tmp/repo/scripts/lib');
});

test('assertAllowedTarget rejects non-whitelisted target', () => {
  assert.throws(
    () => assertAllowedTarget('/tmp/repo/scripts/evil', '/tmp/repo'),
    /Target path is not allowed/
  );
});
