const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const fsSync = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  buildSyncPlan,
  assertAllowedTarget,
  diffTrees,
  runCheck,
  runApply,
} = require('../shared-sync/core');

test('lark-docs entrypoint and translator import shared scripts/lib modules', () => {
  const scriptsDir = path.resolve(__dirname, '..');
  const larkDocsDir = path.join(scriptsDir, 'lark-docs');

  const entrypointPath = path.join(larkDocsDir, 'index.js');
  const translatorPath = path.join(larkDocsDir, 'larkTranslator.js');

  const entrypointSource = fsSync.readFileSync(entrypointPath, 'utf8');
  const translatorSource = fsSync.readFileSync(translatorPath, 'utf8');

  assert.match(entrypointSource, /require\('\.\.\/lib\/milvusDocsGen\.js'\)/);
  assert.match(entrypointSource, /require\('\.\.\/lib\/milvusSdkDocsGen\.js'\)/);
  assert.match(translatorSource, /require\('\.\.\/lib\/larkTokenFetcher\.js'\)/);

  const docsGenResolved = require.resolve('../lib/milvusDocsGen.js', { paths: [larkDocsDir] });
  const sdkDocsGenResolved = require.resolve('../lib/milvusSdkDocsGen.js', { paths: [larkDocsDir] });
  const tokenFetcherResolved = require.resolve('../lib/larkTokenFetcher.js', { paths: [larkDocsDir] });

  assert.equal(docsGenResolved, path.join(scriptsDir, 'lib', 'milvusDocsGen.js'));
  assert.equal(sdkDocsGenResolved, path.join(scriptsDir, 'lib', 'milvusSdkDocsGen.js'));
  assert.equal(tokenFetcherResolved, path.join(scriptsDir, 'lib', 'larkTokenFetcher.js'));
});

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

test('diffTrees returns deterministic sorted added/changed/deleted', () => {
  const localTree = {
    'b.txt': 'old-b',
    'a.txt': 'same',
    'remove.txt': 'gone',
  };
  const remoteTree = {
    'c.txt': 'new-c',
    'a.txt': 'same',
    'b.txt': 'new-b',
  };

  const diff = diffTrees(localTree, remoteTree);

  assert.deepEqual(diff, {
    added: ['c.txt'],
    changed: ['b.txt'],
    deleted: ['remove.txt'],
    hasDrift: true,
  });
});

test('runCheck reports drift and exit code 1 when differences exist', async () => {
  const rows = [];
  const logger = { log: (line) => rows.push(line) };

  const plan = [
    { name: 'sync-a', targetAbsPath: '/tmp/a' },
    { name: 'sync-b', targetAbsPath: '/tmp/b' },
  ];

  const result = await runCheck({
    plan,
    fetchRemoteTreeImpl: async (entry) => ({
      'shared.js': `remote-${entry.name}`,
      'keep.js': 'same',
    }),
    readLocalTreeImpl: async (targetAbsPath) => {
      if (targetAbsPath.endsWith('/a')) {
        return { 'shared.js': 'local-a', 'old.js': 'remove' };
      }
      return { 'shared.js': 'remote-sync-b', 'keep.js': 'same' };
    },
    logger,
  });

  assert.equal(result.exitCode, 1);
  assert.equal(result.hasDrift, true);
  assert.deepEqual(
    result.rows.map((x) => ({ name: x.name, status: x.status, diff: x.diff })),
    [
      {
        name: 'sync-a',
        status: 'DRIFT',
        diff: { added: ['keep.js'], changed: ['shared.js'], deleted: ['old.js'], hasDrift: true },
      },
      {
        name: 'sync-b',
        status: 'OK',
        diff: { added: [], changed: [], deleted: [], hasDrift: false },
      },
    ]
  );
  assert.deepEqual(rows, ['DRIFT | sync-a | +1 ~1 -1', 'OK    | sync-b | +0 ~0 -0']);
});

test('runApply writes remote tree and removes drifted local files', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'shared-sync-'));
  const target = path.join(tempDir, 'scripts/lib');
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, 'old.js'), 'remove-me\n', 'utf8');
  await fs.writeFile(path.join(target, 'same.js'), 'same\n', 'utf8');

  const result = await runApply({
    plan: [{ name: 'sync-a', targetAbsPath: target }],
    fetchRemoteTreeImpl: async () => ({
      'same.js': 'same\n',
      'new.js': 'new\n',
    }),
    readLocalTreeImpl: async (absTarget) => {
      const current = {};
      for (const file of await fs.readdir(absTarget)) {
        current[file] = await fs.readFile(path.join(absTarget, file), 'utf8');
      }
      return current;
    },
  });

  assert.equal(result.exitCode, 0);
  assert.equal(result.hasDrift, true);
  assert.deepEqual(result.rows[0].diff.deleted, ['old.js']);
  assert.deepEqual(result.rows[0].diff.added, ['new.js']);

  const files = (await fs.readdir(target)).sort();
  assert.deepEqual(files, ['new.js', 'same.js']);
  assert.equal(await fs.readFile(path.join(target, 'new.js'), 'utf8'), 'new\n');
});

test('runApply keeps original target unchanged when apply fails mid-write', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'shared-sync-'));
  const target = path.join(tempDir, 'scripts/lib');
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, 'stable.js'), 'stable\n', 'utf8');
  await fs.writeFile(path.join(target, 'old.js'), 'old\n', 'utf8');

  let writes = 0;
  const fsImpl = {
    ...fs,
    writeFile: async (filePath, data, encoding) => {
      writes += 1;
      if (writes === 2) {
        throw new Error('injected write failure');
      }
      return fs.writeFile(filePath, data, encoding);
    },
  };

  await assert.rejects(
    runApply({
      plan: [{ name: 'sync-a', targetAbsPath: target }],
      fetchRemoteTreeImpl: async () => ({
        'stable.js': 'stable-updated\n',
        'new.js': 'new\n',
      }),
      readLocalTreeImpl: async (absTarget) => {
        const current = {};
        for (const file of await fs.readdir(absTarget)) {
          current[file] = await fs.readFile(path.join(absTarget, file), 'utf8');
        }
        return current;
      },
      fsImpl,
    }),
    /injected write failure/
  );

  const files = (await fs.readdir(target)).sort();
  assert.deepEqual(files, ['old.js', 'stable.js']);
  assert.equal(await fs.readFile(path.join(target, 'old.js'), 'utf8'), 'old\n');
  assert.equal(await fs.readFile(path.join(target, 'stable.js'), 'utf8'), 'stable\n');
  await assert.rejects(fs.access(path.join(target, 'new.js')));
});

test('runApply preserves backup directory when rollback restore fails', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'shared-sync-'));
  const target = path.join(tempDir, 'scripts/lib');
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, 'stable.js'), 'stable\n', 'utf8');

  const fsImpl = {
    ...fs,
    rename: async (fromPath, toPath) => {
      if (fromPath.includes('.shared-sync-stage-') && toPath === target) {
        throw new Error('injected swap failure');
      }
      if (fromPath.includes('.shared-sync-backup-') && toPath === target) {
        throw new Error('injected restore failure');
      }
      return fs.rename(fromPath, toPath);
    },
  };

  await assert.rejects(
    runApply({
      plan: [{ name: 'sync-a', targetAbsPath: target }],
      fetchRemoteTreeImpl: async () => ({
        'stable.js': 'stable-updated\n',
      }),
      readLocalTreeImpl: async (absTarget) => {
        const current = {};
        for (const file of await fs.readdir(absTarget)) {
          current[file] = await fs.readFile(path.join(absTarget, file), 'utf8');
        }
        return current;
      },
      fsImpl,
    }),
    /injected swap failure/
  );

  await assert.rejects(fs.access(target));

  const parentEntries = await fs.readdir(path.dirname(target));
  const backupDirName = parentEntries.find((name) => name.startsWith('.shared-sync-backup-'));
  assert.ok(backupDirName, 'backup directory should be preserved when rollback fails');

  const stageDirName = parentEntries.find((name) => name.startsWith('.shared-sync-stage-'));
  assert.equal(stageDirName, undefined);

  const backupFile = path.join(path.dirname(target), backupDirName, 'stable.js');
  assert.equal(await fs.readFile(backupFile, 'utf8'), 'stable\n');
});

test('check-shared-scripts workflow exists and runs drift check command', () => {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const workflowPath = path.join(repoRoot, '.github/workflows/check-shared-scripts.yml');

  assert.equal(fsSync.existsSync(workflowPath), true);

  const workflow = fsSync.readFileSync(workflowPath, 'utf8');
  assert.match(workflow, /npm --prefix scripts run check:shared-scripts/);
});
