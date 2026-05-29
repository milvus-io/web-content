const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const manifest = require('../sync-shared-scripts.manifest');
const {
  buildSyncPlan,
  assertAllowedTarget,
  readLocalSourceTree,
  runApply,
} = require('../shared-sync/core');

test('manifest syncs only zdoc lark files into scripts/lib', () => {
  assert.equal(manifest.length, 1);
  assert.equal(manifest[0].name, 'zdoc-lark-files');
  assert.equal(manifest[0].sourceType, 'local');
  assert.equal(manifest[0].source, '../zdoc/plugins/lark-docs');
  assert.equal(manifest[0].target, 'scripts/lib');
  assert.equal(manifest[0].include.some((pattern) => pattern.test('larkDocWriter.js')), true);
  assert.equal(manifest[0].include.some((pattern) => pattern.test('milvusDocsGen.js')), false);
});

test('buildSyncPlan resolves only allowed scripts/lib target', async () => {
  const plan = await buildSyncPlan({
    manifest,
    repoRoot: '/tmp/repo',
  });

  assert.equal(plan.length, 1);
  assert.equal(plan[0].targetAbsPath, '/tmp/repo/scripts/lib');
});

test('assertAllowedTarget rejects non-whitelisted target', () => {
  assert.throws(
    () => assertAllowedTarget('/tmp/repo/scripts/evil', '/tmp/repo'),
    /Target path is not allowed/
  );
});

test('readLocalSourceTree filters lark source files', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'shared-sync-'));
  const repoRoot = path.join(tempDir, 'repo');
  const sourceDir = path.join(tempDir, 'zdoc/plugins/lark-docs');
  await fs.mkdir(sourceDir, { recursive: true });
  await fs.writeFile(path.join(sourceDir, 'larkDocWriter.js'), 'writer\n', 'utf8');
  await fs.writeFile(path.join(sourceDir, 'index.js'), 'index\n', 'utf8');

  const tree = await readLocalSourceTree(
    {
      source: '../zdoc/plugins/lark-docs',
      include: [/^lark.*\.js$/],
    },
    repoRoot
  );

  assert.deepEqual(tree, {
    'larkDocWriter.js': 'writer\n',
  });
});

test('runApply syncs matching files and preserves non-lark shared files', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'shared-sync-'));
  const target = path.join(tempDir, 'scripts/lib');
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, 'larkDocWriter.js'), 'old-writer\n', 'utf8');
  await fs.writeFile(path.join(target, 'larkStale.js'), 'remove-me\n', 'utf8');
  await fs.writeFile(path.join(target, 'milvusDocsGen.js'), 'keep-milvus\n', 'utf8');

  const result = await runApply({
    plan: [
      {
        name: 'local-lark',
        targetAbsPath: target,
        include: [/^lark.*\.js$/],
      },
    ],
    fetchRemoteTreeImpl: async () => ({
      'larkDocWriter.js': 'new-writer\n',
      'larkUtils.js': 'new-utils\n',
    }),
  });

  assert.equal(result.exitCode, 0);
  assert.deepEqual(result.rows[0].diff.changed, ['larkDocWriter.js']);
  assert.deepEqual(result.rows[0].diff.added, ['larkUtils.js']);
  assert.deepEqual(result.rows[0].diff.deleted, ['larkStale.js']);

  assert.equal(await fs.readFile(path.join(target, 'larkDocWriter.js'), 'utf8'), 'new-writer\n');
  assert.equal(await fs.readFile(path.join(target, 'larkUtils.js'), 'utf8'), 'new-utils\n');
  await assert.rejects(fs.access(path.join(target, 'larkStale.js')));
  assert.equal(await fs.readFile(path.join(target, 'milvusDocsGen.js'), 'utf8'), 'keep-milvus\n');
});
