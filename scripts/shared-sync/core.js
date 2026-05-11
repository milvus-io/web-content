const path = require('node:path');

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

module.exports = {
  ALLOWED_TARGETS,
  assertAllowedTarget,
  buildSyncPlan,
};
