const { normalizeReleaseTrack, compareReleaseTracks } = require('./releaseTrack');
const { applyLifecycleForTrack, validateLifecycle } = require('./lifecycle');
const { assertNoDanglingLocalRefs, pruneUnreachableComponents } = require('./componentGraph');

const HTTP_METHODS = new Set(['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace']);
const LIFECYCLE_KEYS = new Set(['x-added-at', 'x-last-modified', 'x-deprecated-since']);
const FILTER_OMIT = Symbol('filter-omit');

function clone(value) {
  return structuredClone(value);
}

function pointerFor(pointer, key) {
  if (typeof key === 'number') return `${pointer}[${key}]`;
  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) return `${pointer}.${key}`;
  return `${pointer}[${JSON.stringify(key)}]`;
}

function asList(value) {
  if (value === undefined || value === null) return null;
  return Array.isArray(value) ? value : [value];
}

function selectionAllows(node, options) {
  if (!node || typeof node !== 'object') return true;

  const targets = asList(node['x-include-target']);
  if (targets && !targets.includes(options.target)) return false;

  const langs = asList(node['x-include-langs']);
  if (langs && !langs.includes(options.language)) return false;

  if (node['x-target-lang'] !== undefined && node['x-target-lang'] !== options.language) return false;

  return true;
}

function countHttpOperations(spec) {
  let count = 0;
  for (const methods of Object.values(spec.paths || {})) {
    if (!methods || typeof methods !== 'object') continue;
    for (const method of Object.keys(methods)) {
      if (HTTP_METHODS.has(method)) count++;
    }
  }
  return count;
}

function collectHttpOperations(spec) {
  const operations = [];
  for (const [endpoint, methods] of Object.entries(spec.paths || {})) {
    if (!methods || typeof methods !== 'object') continue;
    for (const method of Object.keys(methods)) {
      if (!HTTP_METHODS.has(method)) continue;
      operations.push({endpoint, method, operation: methods[method]});
    }
  }
  operations.sort((a, b) => {
    const endpoint = a.endpoint.localeCompare(b.endpoint);
    if (endpoint !== 0) return endpoint;
    return a.method.localeCompare(b.method);
  });
  return operations;
}

function filterProtocolVersion(spec, protocolVersion) {
  if (!protocolVersion) return;
  const prefix = protocolVersion === 'v1' ? '/v1/' : '/v2/';
  for (const endpoint of Object.keys(spec.paths || {})) {
    if (!endpoint.startsWith(prefix)) delete spec.paths[endpoint];
  }
}

function filterSelection(value, options, stats, pointer = '$') {
  if (Array.isArray(value)) {
    const result = [];
    for (let index = 0; index < value.length; index++) {
      const child = filterSelection(value[index], options, stats, pointerFor(pointer, index));
      if (child !== FILTER_OMIT) result.push(child);
    }
    return result;
  }

  if (!value || typeof value !== 'object') return value;

  if (!selectionAllows(value, options)) {
    stats.omittedElements++;
    return FILTER_OMIT;
  }

  const result = {};
  const omittedByFilter = new Set();
  for (const [key, child] of Object.entries(value)) {
    if (key === 'properties' && child && typeof child === 'object' && !Array.isArray(child)) {
      result.properties = {};
      for (const [propertyName, propertySchema] of Object.entries(child)) {
        const propertyResult = filterSelection(propertySchema, options, stats, pointerFor(pointerFor(pointer, key), propertyName));
        if (propertyResult === FILTER_OMIT) {
          omittedByFilter.add(propertyName);
        } else {
          result.properties = result.properties || {};
          result.properties[propertyName] = propertyResult;
        }
      }
      continue;
    }

    const childResult = filterSelection(child, options, stats, pointerFor(pointer, key));
    if (childResult !== FILTER_OMIT) result[key] = childResult;
  }

  if (Array.isArray(result.required) && result.properties && typeof result.properties === 'object' && !Array.isArray(result.properties)) {
    const retainedProperties = new Set(Object.keys(result.properties));
    result.required = result.required.filter(name => retainedProperties.has(name));
  }

  return result;
}

function cleanEmptyPaths(spec) {
  for (const [endpoint, methods] of Object.entries(spec.paths || {})) {
    if (!methods || typeof methods !== 'object' || !Object.keys(methods).some(method => HTTP_METHODS.has(method))) {
      delete spec.paths[endpoint];
    }
  }
}

function pruneUnusedTags(spec) {
  const used = new Set();
  for (const {operation} of collectHttpOperations(spec)) {
    for (const tag of operation.tags || []) used.add(tag);
  }
  if (Array.isArray(spec.tags)) {
    spec.tags = spec.tags.filter(tag => used.has(tag?.name));
  }
}

function validateExistingLifecycle(spec) {
  function walk(node, pointer) {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((child, index) => walk(child, pointerFor(pointer, index)));
      return;
    }
    if ([...LIFECYCLE_KEYS].some(key => Object.hasOwn(node, key))) {
      validateLifecycle(node, pointer, {required: true});
    }
    for (const [key, child] of Object.entries(node)) walk(child, pointerFor(pointer, key));
  }
  walk(spec, '$');
}

function requireLifecycle(node, pointer) {
  validateLifecycle(node, pointer, {required: true});
}

function requireSchemaProperties(schema, pointer) {
  if (!schema || typeof schema !== 'object' || Array.isArray(schema)) return;
  if (schema.properties && typeof schema.properties === 'object') {
    for (const [name, propertySchema] of Object.entries(schema.properties)) {
      const propertyPointer = pointerFor(pointerFor(pointer, 'properties'), name);
      requireLifecycle(propertySchema, propertyPointer);
      requireSchemaProperties(propertySchema, propertyPointer);
    }
  }
  if (schema.items && typeof schema.items === 'object' && !Array.isArray(schema.items)) {
    const itemsPointer = pointerFor(pointer, 'items');
    if (!schema.items.$ref) requireLifecycle(schema.items, itemsPointer);
    requireSchemaProperties(schema.items, itemsPointer);
  }
  for (const combinator of ['oneOf', 'anyOf', 'allOf']) {
    if (Array.isArray(schema[combinator])) {
      schema[combinator].forEach((branch, index) => {
        if (branch && typeof branch === 'object' && !Array.isArray(branch) && !branch.$ref) {
          const branchPointer = pointerFor(pointerFor(pointer, combinator), index);
          requireLifecycle(branch, branchPointer);
          requireSchemaProperties(branch, branchPointer);
        }
      });
    }
  }
}

function requireTrackLifecycle(spec) {
  function requireParameterSchema(parameter, pointer) {
    if (!parameter?.schema || parameter.schema.$ref) return;
    const schemaPointer = pointerFor(pointer, 'schema');
    requireLifecycle(parameter.schema, schemaPointer);
    requireSchemaProperties(parameter.schema, schemaPointer);
  }

  function requireMediaSchemas(content, pointer) {
    for (const [mediaType, media] of Object.entries(content || {})) {
      if (!media?.schema || media.schema.$ref) continue;
      const schemaPointer = pointerFor(pointerFor(pointer, 'content'), mediaType);
      requireLifecycle(media.schema, schemaPointer);
      requireSchemaProperties(media.schema, schemaPointer);
    }
  }

  function requireOperation(operation, pointer) {
    requireLifecycle(operation, pointer);
    for (const [location, value] of [['parameters', operation.parameters], ['requestBody', operation.requestBody], ['responses', operation.responses]]) {
      if (location === 'parameters' && Array.isArray(value)) {
        value.forEach((parameter, index) => {
          if (parameter && typeof parameter === 'object' && !parameter.$ref) {
            const parameterPointer = pointerFor(pointerFor(pointer, 'parameters'), index);
            requireLifecycle(parameter, parameterPointer);
            requireParameterSchema(parameter, parameterPointer);
          }
        });
        continue;
      }
      if (location === 'requestBody' && value && !value.$ref) {
        const requestPointer = pointerFor(pointer, 'requestBody');
        requireLifecycle(value, requestPointer);
        requireMediaSchemas(value.content, requestPointer);
      }
      if (location === 'responses' && value && typeof value === 'object') {
        for (const [status, response] of Object.entries(value)) {
          if (!response || response.$ref) continue;
          const responsePointer = pointerFor(pointerFor(pointer, 'responses'), status);
          requireLifecycle(response, responsePointer);
          requireMediaSchemas(response.content, responsePointer);
        }
      }
    }
  }

  for (const [endpoint, methods] of Object.entries(spec.paths || {})) {
    if (!methods || typeof methods !== 'object') continue;
    if (Array.isArray(methods.parameters)) {
      methods.parameters.forEach((parameter, index) => {
        if (parameter && typeof parameter === 'object' && !parameter.$ref) {
          requireLifecycle(parameter, `${pointerFor(pointerFor('$', 'paths'), endpoint)}.parameters[${index}]`);
          requireParameterSchema(parameter, `${pointerFor(pointerFor('$', 'paths'), endpoint)}.parameters[${index}]`);
        }
      });
    }
    for (const [method, operation] of Object.entries(methods)) {
      if (!HTTP_METHODS.has(method)) continue;
      requireOperation(operation, `${pointerFor(pointerFor('$', 'paths'), endpoint)}.${method}`);
    }
  }

  for (const [endpoint, webhook] of Object.entries(spec.webhooks || {})) {
    if (!webhook || typeof webhook !== 'object') continue;
    for (const [method, operation] of Object.entries(webhook)) {
      if (!HTTP_METHODS.has(method)) continue;
      requireOperation(operation, `${pointerFor(pointerFor('$', 'webhooks'), endpoint)}.${method}`);
    }
  }

  const componentCategories = new Set(['schemas', 'parameters', 'headers', 'requestBodies', 'responses']);
  for (const [category, entries] of Object.entries(spec.components || {})) {
    if (!componentCategories.has(category) || !entries || typeof entries !== 'object' || Array.isArray(entries)) continue;
    for (const [name, component] of Object.entries(entries)) {
      if (!component || typeof component !== 'object' || component.$ref) continue;
      const pointer = pointerFor(pointerFor('$', 'components'), `${category}/${name}`);
      requireLifecycle(component, pointer);
      if (category === 'schemas') requireSchemaProperties(component, pointer);
      if (category === 'parameters' || category === 'headers') requireParameterSchema(component, pointer);
      if (category === 'requestBodies' || category === 'responses') {
        requireMediaSchemas(component.content, pointer);
      }
    }
  }
}

function localize(value, language) {
  if (Array.isArray(value)) return value.map(child => localize(child, language));
  if (!value || typeof value !== 'object') return value;

  const i18n = value['x-i18n'];
  const localizedFields = language === 'zh-CN' && i18n && typeof i18n === 'object' && !Array.isArray(i18n)
    ? i18n['zh-CN'] && typeof i18n['zh-CN'] === 'object' && !Array.isArray(i18n['zh-CN'])
      ? i18n['zh-CN']
      : null
    : null;

  const result = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === 'x-i18n') continue;
    result[key] = localize(child, language);
  }

  if (localizedFields) {
    for (const [field, translated] of Object.entries(localizedFields)) {
      result[field] = clone(translated);
    }
  }

  return result;
}

function stripInternalExtensions(value) {
  if (Array.isArray(value)) return value.map(stripInternalExtensions);
  if (!value || typeof value !== 'object') return value;
  const result = {};
  for (const [key, child] of Object.entries(value)) {
    if (key.startsWith('x-')) continue;
    result[key] = stripInternalExtensions(child);
  }
  return result;
}

function validatePolicyOptions(options) {
  if (options.apiSurface !== 'data-plane' && options.apiSurface !== 'control-plane') {
    throw new Error('REST_API_SURFACE_INVALID: apiSurface must be "data-plane" or "control-plane"');
  }

  if (options.apiSurface === 'control-plane') {
    if (options.target !== 'zilliz') throw new Error('REST_CONTROL_PLANE_REJECTS_TARGET: control-plane publishes only to zilliz');
    if (options.publicationPolicy !== 'latest') throw new Error('REST_CONTROL_PLANE_REJECTS_POLICY: control-plane publishes only latest');
    if (options.releaseTrack !== undefined && options.releaseTrack !== null) throw new Error('REST_CONTROL_PLANE_REJECTS_TRACK');
    if (options.protocolVersion !== undefined && options.protocolVersion !== null) throw new Error('REST_CONTROL_PLANE_REJECTS_PROTOCOL_VERSION');
    return {apiSurface: 'control-plane', protocolVersion: null, releaseTrack: null};
  }

  if (options.publicationPolicy === 'latest') {
    if (options.releaseTrack !== undefined && options.releaseTrack !== null) {
      throw new Error('REST_LATEST_POLICY_REJECTS_TRACK: latest policy must not receive --release-track');
    }
    if (options.protocolVersion !== 'v1' && options.protocolVersion !== 'v2') {
      throw new Error('REST_LATEST_POLICY_REQUIRES_PROTOCOL_VERSION: data-plane latest requires protocolVersion "v1" or "v2"');
    }
    return {apiSurface: 'data-plane', protocolVersion: options.protocolVersion, releaseTrack: null};
  }

  if (options.publicationPolicy === 'track') {
    if (options.protocolVersion !== undefined && options.protocolVersion !== null) {
      throw new Error('REST_TRACK_POLICY_REJECTS_PROTOCOL_VERSION: data-plane track must not receive protocolVersion');
    }
    if (options.releaseTrack === undefined || options.releaseTrack === null) {
      throw new Error('REST_TRACK_POLICY_REQUIRES_TRACK: track policy requires --release-track');
    }
    const releaseTrack = normalizeReleaseTrack(options.releaseTrack);
    return {apiSurface: 'data-plane', protocolVersion: null, releaseTrack};
  }

  throw new Error(`REST_PUBLICATION_POLICY_INVALID: "${options.publicationPolicy}" must be "latest" or "track"`);
}

function buildIntegratedSpec(specifications, options) {
  const {apiSurface, protocolVersion, releaseTrack} = validatePolicyOptions(options);
  let spec = clone(specifications);

  filterProtocolVersion(spec, protocolVersion);

  const filterStats = {omittedElements: 0};
  spec.tags = filterSelection(spec.tags || [], options, filterStats, '$.tags');
  spec.paths = filterSelection(spec.paths || {}, options, filterStats, '$.paths');
  if (spec.webhooks) spec.webhooks = filterSelection(spec.webhooks, options, filterStats, '$.webhooks');
  if (spec.components) spec.components = filterSelection(spec.components, options, filterStats, '$.components');
  cleanEmptyPaths(spec);
  pruneUnusedTags(spec);

  const initialOperationCount = countHttpOperations(specifications);
  const operationCount = countHttpOperations(spec);
  const omittedOperations = Math.max(0, initialOperationCount - operationCount);

  if (releaseTrack) {
    requireTrackLifecycle(spec);
    const lifecycleResult = applyLifecycleForTrack(spec, releaseTrack, '$');
    spec.paths = lifecycleResult.value.paths || {};
    spec.webhooks = lifecycleResult.value.webhooks;
    spec.components = lifecycleResult.value.components;
    cleanEmptyPaths(spec);
    pruneUnusedTags(spec);
    var lifecycleStats = lifecycleResult.stats;
  } else {
    validateExistingLifecycle(spec);
    var lifecycleStats = {omittedElements: 0, deprecatedElements: 0};
  }

  spec = localize(spec, options.language);
  spec = stripInternalExtensions(spec);

  const pruned = pruneUnreachableComponents(spec);
  spec = pruned.spec;
  assertNoDanglingLocalRefs(spec);

  const endpointInventory = collectHttpOperations(spec).map(({endpoint, method, operation}) => ({
    endpoint,
    method,
    tags: operation.tags || [],
  }));

  return {
    spec,
    releaseTrack,
    apiSurface,
    protocolVersion,
    endpointInventory,
    stats: {
      operations: {
        retained: operationCount,
        omitted: omittedOperations,
        deprecated: collectHttpOperations(spec).filter(({operation}) => operation.deprecated === true).length,
      },
      contractElements: {
        omitted: filterStats.omittedElements + lifecycleStats.omittedElements,
        deprecated: lifecycleStats.deprecatedElements,
      },
    },
  };
}

module.exports = {
  buildIntegratedSpec,
};
