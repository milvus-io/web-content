const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Same-endpoint dual-implementation modeling contract (CUSTOM_ATTRIBUTES §1.2).
// When one route is implemented by both publication targets with divergent
// payloads (import family: open-source Milvus data plane vs Zilliz Cloud
// control plane), the divergence is modeled inside the single operation:
// the branch axis is the implementation and every branch is scoped
// explicitly. These gates keep the 2026-11 import restructuring from
// regressing: field-level marks must never smuggle one implementation's
// fields into the other implementation's rendered page.

const openapiDir = path.join(__dirname, 'meta', 'openapi');

function loadFragments() {
  return fs.readdirSync(openapiDir)
    .filter(name => name.endsWith('.json'))
    .sort()
    .map(name => ({name, spec: JSON.parse(fs.readFileSync(path.join(openapiDir, name), 'utf8'))}));
}

function targetSet(node) {
  const value = node?.['x-include-target'];
  if (!Array.isArray(value)) return null;
  return value;
}

// Request/response schema roots of an operation (inline schemas only).
function* schemaRoots(operation) {
  for (const parameter of operation.parameters || []) {
    if (parameter?.schema && typeof parameter.schema === 'object') yield parameter.schema;
  }
  for (const media of Object.values(operation.requestBody?.content || {})) {
    if (media?.schema && typeof media.schema === 'object') yield media.schema;
  }
  for (const response of Object.values(operation.responses || {})) {
    for (const media of Object.values(response?.content || {})) {
      if (media?.schema && typeof media.schema === 'object') yield media.schema;
    }
  }
}

// The schema tree: the node itself plus properties, items, additionalProperties,
// and combinator branches.
function* schemaNodes(node) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return;
  yield node;
  for (const child of Object.values(node.properties || {})) yield* schemaNodes(child);
  if (node.items) yield* schemaNodes(node.items);
  for (const combinator of ['oneOf', 'anyOf', 'allOf']) {
    for (const branch of node[combinator] || []) yield* schemaNodes(branch);
  }
  if (node.additionalProperties && typeof node.additionalProperties === 'object') {
    yield* schemaNodes(node.additionalProperties);
  }
}

// Every explicit x-include-target set in the subtree, keyed by nothing — the
// caller decides how to compare them.
function collectTargets(node, into) {
  if (Array.isArray(node)) {
    for (const child of node) collectTargets(child, into);
    return;
  }
  if (!node || typeof node !== 'object') return;
  const targets = targetSet(node);
  if (targets) into.push(targets);
  for (const child of Object.values(node)) collectTargets(child, into);
}

test('sibling fields of one schema object never carry disjoint publication targets', () => {
  for (const {name, spec} of loadFragments()) {
    for (const [endpoint, methods] of Object.entries(spec.paths || {})) {
      for (const [method, operation] of Object.entries(methods)) {
        if (!operation || typeof operation !== 'object') continue;
        for (const root of schemaRoots(operation)) {
          const complain = message => assert.fail(`${name} ${method} ${endpoint}: ${message}`);
          const walk = (node, location) => {
            if (!node || typeof node !== 'object' || Array.isArray(node)) return;
            const childTargets = [];
            for (const [childName, child] of Object.entries(node.properties || {})) {
              const targets = targetSet(child);
              if (targets) childTargets.push({name: childName, targets});
              walk(child, `${location}.properties.${childName}`);
            }
            if (node.items) {
              const targets = targetSet(node.items);
              if (targets) childTargets.push({name: 'items', targets});
              walk(node.items, `${location}.items`);
            }
            for (let i = 0; i < childTargets.length; i++) {
              for (let j = i + 1; j < childTargets.length; j++) {
                const overlap = childTargets[i].targets.some(t => childTargets[j].targets.includes(t));
                assert(
                  overlap,
                  `${location} mixes sibling fields with disjoint publication targets: "${childTargets[i].name}" [${childTargets[i].targets}] vs "${childTargets[j].name}" [${childTargets[j].targets}] — fork the object into explicitly scoped oneOf branches instead (branch axis is the implementation, see CUSTOM_ATTRIBUTES §1.2)`,
                );
              }
            }
            for (const combinator of ['oneOf', 'anyOf', 'allOf']) {
              for (const [index, branch] of (node[combinator] || []).entries()) {
                walk(branch, `${location}.${combinator}[${index}]`);
              }
            }
          };
          walk(root, 'schema');
        }
      }
    }
  }
});

test('explicitly scoped nodes never contain foreign-target descendants', () => {
  const violations = [];
  const check = (node, scope, location) => {
    if (Array.isArray(node)) {
      node.forEach((child, index) => check(child, scope, `${location}/${index}`));
      return;
    }
    if (!node || typeof node !== 'object') return;
    const own = targetSet(node);
    if (own) {
      const foreign = own.length > 0 && scope.some(t => !own.includes(t));
      if (foreign) violations.push(`${location} pinned to [${own.join(',')}] sits inside scope [${scope.join(',')}]`);
    }
    const next = own && own.length > 0 ? own : scope;
    for (const [key, child] of Object.entries(node)) {
      if (key === 'x-include-target') continue;
      check(child, next, `${location}/${key}`);
    }
  };
  for (const {name, spec} of loadFragments()) {
    for (const [endpoint, methods] of Object.entries(spec.paths || {})) {
      for (const [method, operation] of Object.entries(methods)) {
        // An empty x-include-target array is the never-publish kill switch;
        // there is no rendered page to mix implementations on.
        const opTargets = targetSet(operation);
        if (opTargets && opTargets.length === 0) continue;
        check(operation, opTargets ?? [], `${name} ${method} ${endpoint}`);
      }
    }
  }
  assert.deepEqual(violations, [], `foreign-target nodes inside explicitly scoped subtrees (CUSTOM_ATTRIBUTES §1.2):\n  ${violations.join('\n  ')}`);
});
