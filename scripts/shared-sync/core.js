const path = require('node:path');
const fs = require('node:fs/promises');

const ALLOWED_TARGETS = ['scripts/lib', 'scripts/apifox-docs'];

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

    const ref = await resolveRef(entry, fetchImpl);
    plan.push({ ...entry, ref, targetAbsPath });
  }

  return plan;
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
      tree[rel] = content;
    }
  }

  await walk(entry.source);
  return Object.fromEntries(Object.entries(tree).sort(([a], [b]) => a.localeCompare(b)));
}

async function readLocalTree(absTarget) {
  const tree = {};

  async function walk(currentDir) {
    let entries = [];
    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true });
    } catch (error) {
      if (error && error.code === 'ENOENT') {
        return;
      }
      throw error;
    }

    const sorted = entries.slice().sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of sorted) {
      const absPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(absPath);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      const rel = path.relative(absTarget, absPath).split(path.sep).join('/');
      tree[rel] = await fs.readFile(absPath, 'utf8');
    }
  }

  await walk(absTarget);
  return Object.fromEntries(Object.entries(tree).sort(([a], [b]) => a.localeCompare(b)));
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
    const localTree = await readLocalTreeImpl(entry.targetAbsPath);
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

async function applyTree(absTarget, remoteTree) {
  const parentDir = path.dirname(absTarget);
  const nonce = `${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const stagingDir = path.join(parentDir, `.shared-sync-stage-${nonce}`);
  const backupDir = path.join(parentDir, `.shared-sync-backup-${nonce}`);

  await fs.mkdir(parentDir, { recursive: true });
  await fs.mkdir(stagingDir, { recursive: true });

  try {
    for (const rel of Object.keys(remoteTree).sort()) {
      const absPath = path.join(stagingDir, rel);
      await fs.mkdir(path.dirname(absPath), { recursive: true });
      await fs.writeFile(absPath, remoteTree[rel], 'utf8');
    }

    let hadExistingTarget = false;
    try {
      await fs.access(absTarget);
      hadExistingTarget = true;
    } catch (error) {
      if (!(error && error.code === 'ENOENT')) {
        throw error;
      }
    }

    if (hadExistingTarget) {
      await fs.rename(absTarget, backupDir);
    }

    try {
      await fs.rename(stagingDir, absTarget);
      if (hadExistingTarget) {
        await fs.rm(backupDir, { recursive: true, force: true });
      }
    } catch (error) {
      if (hadExistingTarget) {
        await fs.rename(backupDir, absTarget);
      }
      throw error;
    }
  } catch (error) {
    await fs.rm(stagingDir, { recursive: true, force: true });
    await fs.rm(backupDir, { recursive: true, force: true });
    throw error;
  }
}

async function runApply({ plan, fetchRemoteTreeImpl = fetchRemoteTree, readLocalTreeImpl = readLocalTree, logger = console }) {
  const rows = [];

  for (const entry of plan) {
    const remoteTree = await fetchRemoteTreeImpl(entry);
    const localTree = await readLocalTreeImpl(entry.targetAbsPath);
    const diff = diffTrees(localTree, remoteTree);
    await applyTree(entry.targetAbsPath, remoteTree);
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
  readLocalTree,
  diffTrees,
  runCheck,
  runApply,
};
