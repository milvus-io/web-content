const path = require('node:path');
const fs = require('node:fs/promises');

const ALLOWED_TARGETS = ['scripts/lib', 'scripts/apifox-docs', 'scripts/lark-docs'];

function assertAllowedTarget(absTargetPath, repoRoot) {
  const allowedAbsTargets = ALLOWED_TARGETS.map((target) => path.resolve(repoRoot, target));

  if (!allowedAbsTargets.includes(path.resolve(absTargetPath))) {
    throw new Error(`Target path is not allowed: ${absTargetPath}`);
  }
}

async function resolveRef(entry, fetchImpl) {
  if (entry.ref !== 'DEFAULT_BRANCH') {
    return entry.ref;
  }

  const response = await fetchImpl(`https://api.github.com/repos/${entry.repo}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch default branch for ${entry.repo}: ${response.status}`);
  }

  const repoMeta = await response.json();
  if (!repoMeta.default_branch) {
    throw new Error(`Missing default_branch for ${entry.repo}`);
  }

  return repoMeta.default_branch;
}

async function buildSyncPlan({ manifest, repoRoot, fetchImpl }) {
  const plan = [];

  for (const entry of manifest) {
    const targetAbsPath = path.resolve(repoRoot, entry.target);
    assertAllowedTarget(targetAbsPath, repoRoot);

    if (entry.sourceType === 'local') {
      plan.push({ ...entry, targetAbsPath });
      continue;
    }

    const ref = await resolveRef(entry, fetchImpl);
    plan.push({ ...entry, ref, targetAbsPath });
  }

  return plan;
}

function matchesInclude(entry, rel) {
  if (!entry || !entry.include) {
    return true;
  }

  return entry.include.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(rel);
    }
    if (typeof pattern === 'string') {
      return pattern === rel;
    }
    if (typeof pattern === 'function') {
      return pattern(rel);
    }

    throw new Error(`Unsupported include pattern for ${entry.name || entry.target}: ${String(pattern)}`);
  });
}

function hasInclude(entry) {
  return !!(entry && entry.include && entry.include.length > 0);
}

async function fetchRemoteTree(entry, fetchImpl) {
  const tree = {};

  async function walk(remotePath) {
    const encodedPath = remotePath.split('/').map(encodeURIComponent).join('/');
    const url = `https://api.github.com/repos/${entry.repo}/contents/${encodedPath}?ref=${encodeURIComponent(entry.ref)}`;
    const response = await fetchImpl(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch contents for ${entry.repo}:${remotePath}@${entry.ref}: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error(`Expected directory listing for ${remotePath}`);
    }

    const sorted = data.slice().sort((a, b) => a.path.localeCompare(b.path));
    for (const item of sorted) {
      if (item.type === 'dir') {
        await walk(item.path);
        continue;
      }
      if (item.type !== 'file') {
        continue;
      }

      const fileResponse = await fetchImpl(item.url);
      if (!fileResponse.ok) {
        throw new Error(`Failed to fetch file ${item.path}: ${fileResponse.status}`);
      }
      const fileData = await fileResponse.json();
      const base64Content = (fileData.content || '').replace(/\n/g, '');
      const content = Buffer.from(base64Content, 'base64').toString('utf8');
      const rel = path.posix.relative(entry.source, item.path);
      if (!matchesInclude(entry, rel)) {
        continue;
      }
      tree[rel] = content;
    }
  }

  await walk(entry.source);
  return Object.fromEntries(Object.entries(tree).sort(([a], [b]) => a.localeCompare(b)));
}

async function readLocalTree(absTarget, entry = undefined, fsImpl = fs) {
  const tree = {};

  async function walk(currentDir) {
    let entries = [];
    try {
      entries = await fsImpl.readdir(currentDir, { withFileTypes: true });
    } catch (error) {
      if (error && error.code === 'ENOENT') {
        return;
      }
      throw error;
    }

    const sorted = entries.slice().sort((a, b) => a.name.localeCompare(b.name));
    for (const dirEntry of sorted) {
      const absPath = path.join(currentDir, dirEntry.name);
      if (dirEntry.isDirectory()) {
        await walk(absPath);
        continue;
      }
      if (!dirEntry.isFile()) {
        continue;
      }
      const rel = path.relative(absTarget, absPath).split(path.sep).join('/');
      if (!matchesInclude(entry, rel)) {
        continue;
      }
      tree[rel] = await fsImpl.readFile(absPath, 'utf8');
    }
  }

  await walk(absTarget);
  return Object.fromEntries(Object.entries(tree).sort(([a], [b]) => a.localeCompare(b)));
}

async function readLocalSourceTree(entry, repoRoot, fsImpl = fs) {
  const sourceAbsPath = path.resolve(repoRoot, entry.source);
  return readLocalTree(sourceAbsPath, entry, fsImpl);
}

function diffTrees(localTree, remoteTree) {
  const added = [];
  const changed = [];
  const deleted = [];

  const localKeys = new Set(Object.keys(localTree));
  const remoteKeys = new Set(Object.keys(remoteTree));

  for (const key of Array.from(remoteKeys).sort()) {
    if (!localKeys.has(key)) {
      added.push(key);
    } else if (localTree[key] !== remoteTree[key]) {
      changed.push(key);
    }
  }

  for (const key of Array.from(localKeys).sort()) {
    if (!remoteKeys.has(key)) {
      deleted.push(key);
    }
  }

  return {
    added,
    changed,
    deleted,
    hasDrift: added.length > 0 || changed.length > 0 || deleted.length > 0,
  };
}

function formatSummaryRow(name, diff) {
  const status = diff.hasDrift ? 'DRIFT' : 'OK';
  const statusCell = status.padEnd(5, ' ');
  return `${statusCell} | ${name} | +${diff.added.length} ~${diff.changed.length} -${diff.deleted.length}`;
}

async function runCheck({ plan, fetchRemoteTreeImpl = fetchRemoteTree, readLocalTreeImpl = readLocalTree, logger = console }) {
  const rows = [];

  for (const entry of plan) {
    const remoteTree = await fetchRemoteTreeImpl(entry);
    const localTree = await readLocalTreeImpl(entry.targetAbsPath, entry);
    const diff = diffTrees(localTree, remoteTree);
    const row = { name: entry.name, status: diff.hasDrift ? 'DRIFT' : 'OK', diff };
    rows.push(row);
    logger.log(formatSummaryRow(entry.name, diff));
  }

  const hasDrift = rows.some((row) => row.diff.hasDrift);
  return {
    rows,
    hasDrift,
    exitCode: hasDrift ? 1 : 0,
  };
}

async function applyPartialTree(absTarget, remoteTree, entry, fsImpl = fs) {
  const parentDir = path.dirname(absTarget);
  const nonce = `${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const stagingDir = path.join(parentDir, `.shared-sync-stage-${nonce}`);
  const backupDir = path.join(parentDir, `.shared-sync-backup-${nonce}`);

  await fsImpl.mkdir(absTarget, { recursive: true });
  await fsImpl.mkdir(stagingDir, { recursive: true });
  await fsImpl.mkdir(backupDir, { recursive: true });

  const localTree = await readLocalTree(absTarget, entry, fsImpl);
  const affectedFiles = Array.from(new Set([...Object.keys(localTree), ...Object.keys(remoteTree)])).sort();
  const backedUpFiles = [];
  const writtenFiles = [];
  let preserveBackup = false;

  try {
    for (const rel of Object.keys(remoteTree).sort()) {
      const absPath = path.join(stagingDir, rel);
      await fsImpl.mkdir(path.dirname(absPath), { recursive: true });
      await fsImpl.writeFile(absPath, remoteTree[rel], 'utf8');
    }

    for (const rel of affectedFiles) {
      if (!Object.prototype.hasOwnProperty.call(localTree, rel)) {
        continue;
      }

      const targetPath = path.join(absTarget, rel);
      const backupPath = path.join(backupDir, rel);
      await fsImpl.mkdir(path.dirname(backupPath), { recursive: true });
      await fsImpl.rename(targetPath, backupPath);
      backedUpFiles.push(rel);
    }

    for (const rel of Object.keys(remoteTree).sort()) {
      const targetPath = path.join(absTarget, rel);
      await fsImpl.mkdir(path.dirname(targetPath), { recursive: true });
      await fsImpl.rename(path.join(stagingDir, rel), targetPath);
      writtenFiles.push(rel);
    }

    await fsImpl.rm(backupDir, { recursive: true, force: true });
  } catch (error) {
    try {
      for (const rel of writtenFiles.reverse()) {
        await fsImpl.rm(path.join(absTarget, rel), { force: true });
      }

      for (const rel of backedUpFiles.reverse()) {
        const backupPath = path.join(backupDir, rel);
        const targetPath = path.join(absTarget, rel);
        await fsImpl.mkdir(path.dirname(targetPath), { recursive: true });
        await fsImpl.rename(backupPath, targetPath);
      }
    } catch {
      preserveBackup = true;
    }

    throw error;
  } finally {
    await fsImpl.rm(stagingDir, { recursive: true, force: true });
    if (!preserveBackup) {
      await fsImpl.rm(backupDir, { recursive: true, force: true });
    }
  }
}

async function applyTree(absTarget, remoteTree, fsImpl = fs, entry = undefined) {
  if (hasInclude(entry)) {
    await applyPartialTree(absTarget, remoteTree, entry, fsImpl);
    return;
  }

  const parentDir = path.dirname(absTarget);
  const nonce = `${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const stagingDir = path.join(parentDir, `.shared-sync-stage-${nonce}`);
  const backupDir = path.join(parentDir, `.shared-sync-backup-${nonce}`);

  await fsImpl.mkdir(parentDir, { recursive: true });
  await fsImpl.mkdir(stagingDir, { recursive: true });

  let hadExistingTarget = false;
  let backupExists = false;

  try {
    for (const rel of Object.keys(remoteTree).sort()) {
      const absPath = path.join(stagingDir, rel);
      await fsImpl.mkdir(path.dirname(absPath), { recursive: true });
      await fsImpl.writeFile(absPath, remoteTree[rel], 'utf8');
    }

    try {
      await fsImpl.access(absTarget);
      hadExistingTarget = true;
    } catch (error) {
      if (!(error && error.code === 'ENOENT')) {
        throw error;
      }
    }

    if (hadExistingTarget) {
      await fsImpl.rename(absTarget, backupDir);
      backupExists = true;
    }

    try {
      await fsImpl.rename(stagingDir, absTarget);
    } catch (swapError) {
      if (backupExists) {
        try {
          await fsImpl.rename(backupDir, absTarget);
          backupExists = false;
        } catch {
          throw swapError;
        }
      }
      throw swapError;
    }

    if (backupExists) {
      await fsImpl.rm(backupDir, { recursive: true, force: true });
      backupExists = false;
    }
  } catch (error) {
    await fsImpl.rm(stagingDir, { recursive: true, force: true });
    throw error;
  }
}

async function runApply({
  plan,
  fetchRemoteTreeImpl = fetchRemoteTree,
  readLocalTreeImpl = readLocalTree,
  logger = console,
  fsImpl = fs,
}) {
  const rows = [];

  for (const entry of plan) {
    const remoteTree = await fetchRemoteTreeImpl(entry);
    const localTree = await readLocalTreeImpl(entry.targetAbsPath, entry);
    const diff = diffTrees(localTree, remoteTree);
    await applyTree(entry.targetAbsPath, remoteTree, fsImpl, entry);
    rows.push({ name: entry.name, status: diff.hasDrift ? 'DRIFT' : 'OK', diff });
    logger.log(formatSummaryRow(entry.name, diff));
  }

  return {
    rows,
    hasDrift: rows.some((row) => row.diff.hasDrift),
    exitCode: 0,
  };
}

module.exports = {
  ALLOWED_TARGETS,
  assertAllowedTarget,
  buildSyncPlan,
  fetchRemoteTree,
  readLocalSourceTree,
  readLocalTree,
  diffTrees,
  runCheck,
  runApply,
};
