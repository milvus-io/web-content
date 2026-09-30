const REF_PREFIX = '#/components/';

function clone(value) {
  return structuredClone(value);
}

function isLocalComponentRef(value) {
  return typeof value === 'string' && value.startsWith(REF_PREFIX);
}

function walkRefs(node, visitRef) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const child of node) walkRefs(child, visitRef);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === '$ref' && isLocalComponentRef(value)) visitRef(value);
    else walkRefs(value, visitRef);
  }
}

function resolveJsonPointer(spec, ref) {
  if (typeof ref !== 'string' || !ref.startsWith('#/')) return undefined;
  const rawParts = ref.substring(2).split('/');
  let current = spec;
  for (const rawPart of rawParts) {
    let part;
    try {
      part = decodeURIComponent(rawPart);
    } catch {
      part = rawPart;
    }
    part = part.replace(/~1/g, '/').replace(/~0/g, '~');
    if (!current || typeof current !== 'object' || !Object.hasOwn(current, part)) return undefined;
    current = current[part];
  }
  return current;
}

function collectReachableRefs(spec) {
  const reachable = new Set();
  const queued = new Set();

  function normalizeComponentRef(ref) {
    const parts = ref.substring(REF_PREFIX.length).split('/');
    if (parts.length < 2) return ref;
    return `${REF_PREFIX}${parts[0]}/${parts[1]}`;
  }

  function enqueue(ref) {
    const componentRef = normalizeComponentRef(ref);
    if (!queued.has(componentRef)) {
      queued.add(componentRef);
      reachable.add(componentRef);
    }
  }

  function walk(node) {
    walkRefs(node, enqueue);
  }

  walk(spec.paths);
  walk(spec.webhooks);
  walk(spec.security);

  const queue = [...queued];
  for (let index = 0; index < queue.length; index++) {
    const ref = queue[index];
    walk(resolveJsonPointer(spec, ref));
    for (const next of queued) {
      if (!queue.includes(next)) queue.push(next);
    }
  }

  return reachable;
}

function pruneUnreachableComponents(spec) {
  const cloned = clone(spec);
  const stats = {kept: 0, removed: 0};

  if (!cloned.components || typeof cloned.components !== 'object' || Array.isArray(cloned.components)) {
    return {spec: cloned, stats};
  }

  const reachable = collectReachableRefs(cloned);

  for (const category of Object.keys(cloned.components)) {
    const entries = cloned.components[category];
    if (category === 'securitySchemes' || category.startsWith('x-') || !entries || typeof entries !== 'object' || Array.isArray(entries)) {
      stats.kept += entries && typeof entries === 'object' && !Array.isArray(entries) ? Object.keys(entries).length : 1;
      continue;
    }

    const pruned = {};
    for (const [name, body] of Object.entries(entries)) {
      const refPath = `${REF_PREFIX}${category}/${name}`;
      if (reachable.has(refPath)) {
        pruned[name] = body;
        stats.kept++;
      } else {
        stats.removed++;
      }
    }

    if (Object.keys(pruned).length === 0) delete cloned.components[category];
    else cloned.components[category] = pruned;
  }

  return {spec: cloned, stats};
}

function assertNoDanglingLocalRefs(spec) {
  function walk(node, pointer) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((child, index) => walk(child, `${pointer}[${index}]`));
      return;
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === '$ref' && typeof value === 'string' && value.startsWith('#/')) {
        if (resolveJsonPointer(spec, value) === undefined) {
          throw new Error(`REST_OPENAPI_REF_MISSING ${value} at ${pointer}`);
        }
      } else {
        walk(value, /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? `${pointer}.${key}` : `${pointer}[${JSON.stringify(key)}]`);
      }
    }
  }

  walk(spec, '$');
  return true;
}

module.exports = {
  collectReachableRefs,
  pruneUnreachableComponents,
  assertNoDanglingLocalRefs,
};
