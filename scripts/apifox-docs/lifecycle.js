const {compareReleaseTracks, normalizeReleaseTrack} = require('./releaseTrack');

const LIFECYCLE_KEYS = ['x-added-at', 'x-last-modified', 'x-deprecated-since'];
const OMIT = Symbol('omit');

function lifecycleError(code, jsonPointer, message) {
  return new Error(`${code} ${jsonPointer}: ${message}`);
}

function normalizeLifecycleValue(value, field, jsonPointer) {
  if (field === 'x-deprecated-since' && value === null) return null;
  try {
    return normalizeReleaseTrack(value);
  } catch (err) {
    throw lifecycleError(
      'REST_LIFECYCLE_INVALID',
      jsonPointer,
      `"${field}" must match major.minor.x and received ${JSON.stringify(value)}`,
    );
  }
}

function validateLifecycle(node, jsonPointer, options = {}) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    if (options.required) {
      throw lifecycleError('REST_LIFECYCLE_MISSING', jsonPointer, 'managed lifecycle objects must be objects');
    }
    return null;
  }

  const presentKeys = LIFECYCLE_KEYS.filter(key => Object.hasOwn(node, key));
  if (presentKeys.length === 0) {
    if (options.required) {
      throw lifecycleError(
        'REST_LIFECYCLE_MISSING',
        jsonPointer,
        `expected ${LIFECYCLE_KEYS.map(key => `"${key}"`).join(', ')}`,
      );
    }
    return null;
  }

  const missingKeys = LIFECYCLE_KEYS.filter(key => !Object.hasOwn(node, key));
  if (missingKeys.length > 0) {
    throw lifecycleError(
      'REST_LIFECYCLE_MISSING',
      jsonPointer,
      `missing ${missingKeys.map(key => `"${key}"`).join(', ')}`,
    );
  }

  const addedAt = normalizeLifecycleValue(node['x-added-at'], 'x-added-at', jsonPointer);
  const lastModified = normalizeLifecycleValue(node['x-last-modified'], 'x-last-modified', jsonPointer);
  const deprecatedSince = normalizeLifecycleValue(node['x-deprecated-since'], 'x-deprecated-since', jsonPointer);

  if (compareReleaseTracks(addedAt, lastModified) > 0) {
    throw lifecycleError(
      'REST_LIFECYCLE_ORDER',
      jsonPointer,
      `"x-added-at" (${addedAt}) must not be after "x-last-modified" (${lastModified})`,
    );
  }

  if (deprecatedSince !== null) {
    if (compareReleaseTracks(addedAt, deprecatedSince) > 0) {
      throw lifecycleError(
        'REST_LIFECYCLE_ORDER',
        jsonPointer,
        `"x-added-at" (${addedAt}) must not be after "x-deprecated-since" (${deprecatedSince})`,
      );
    }
    if (compareReleaseTracks(lastModified, deprecatedSince) > 0) {
      throw lifecycleError(
        'REST_LIFECYCLE_ORDER',
        jsonPointer,
        `"x-last-modified" (${lastModified}) must not be after "x-deprecated-since" (${deprecatedSince})`,
      );
    }
  }

  if (node.deprecated === true && deprecatedSince === null) {
    throw lifecycleError(
      'REST_LIFECYCLE_DEPRECATION',
      jsonPointer,
      '"deprecated: true" requires a non-null "x-deprecated-since"',
    );
  }

  return {addedAt, lastModified, deprecatedSince};
}

function validateLifecycleTransition(previousNode, nextNode, targetTrack, jsonPointer, options = {}) {
  const previous = validateLifecycle(previousNode, jsonPointer, {required: true});
  const next = validateLifecycle(nextNode, jsonPointer, {required: true});
  const target = normalizeReleaseTrack(targetTrack);

  if (previous.addedAt !== next.addedAt) {
    throw lifecycleError('REST_LIFECYCLE_ADDED_AT_REWRITE', jsonPointer, `"x-added-at" must remain ${previous.addedAt}`);
  }
  if (compareReleaseTracks(next.lastModified, previous.lastModified) < 0) {
    throw lifecycleError('REST_LIFECYCLE_LAST_MODIFIED_REGRESSION', jsonPointer, `"x-last-modified" moved backward from ${previous.lastModified} to ${next.lastModified}`);
  }
  if (compareReleaseTracks(next.lastModified, target) > 0) {
    throw lifecycleError('REST_LIFECYCLE_FUTURE_MODIFICATION', jsonPointer, `"x-last-modified" ${next.lastModified} is after ${target}`);
  }
  if (previous.deprecatedSince !== null && previous.deprecatedSince !== next.deprecatedSince) {
    throw lifecycleError('REST_LIFECYCLE_DEPRECATION_REWRITE', jsonPointer, `"x-deprecated-since" must remain ${previous.deprecatedSince}`);
  }
  if (options.publicContractChanged === false && previous.lastModified !== next.lastModified) {
    throw lifecycleError('REST_LIFECYCLE_METADATA_ONLY_ADVANCE', jsonPointer, 'description, translation, example, or formatting-only changes must not advance "x-last-modified"');
  }
  return next;
}

function applyLifecycleForTrack(node, releaseTrack, jsonPointer = '$', options = {}) {
  const targetTrack = normalizeReleaseTrack(releaseTrack);
  const stats = {omittedElements: 0, deprecatedElements: 0};
  const input = structuredClone(node);

  function pointerFor(pointer, key) {
    if (Array.isArray(key)) return `${pointer}[${key[0]}]`;
    if (typeof key === 'number') return `${pointer}[${key}]`;
    if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key)) return `${pointer}.${key}`;
    return `${pointer}[${JSON.stringify(key)}]`;
  }

  function walk(value, pointer) {
    if (Array.isArray(value)) {
      const result = [];
      for (let index = 0; index < value.length; index++) {
        const child = walk(value[index], pointerFor(pointer, index));
        if (child !== OMIT) result.push(child);
      }
      return result;
    }

    if (!value || typeof value !== 'object') return value;

    let lifecycle = null;
    if (Object.hasOwn(value, 'x-added-at') || LIFECYCLE_KEYS.some(key => Object.hasOwn(value, key))) {
      lifecycle = validateLifecycle(value, pointer, {required: true});
      if (compareReleaseTracks(lifecycle.addedAt, targetTrack) > 0) {
        stats.omittedElements++;
        return OMIT;
      }
    }

    const result = {};
    const omittedByLifecycle = new Set();
    for (const [key, child] of Object.entries(value)) {
      if (key === 'properties' && child && typeof child === 'object' && !Array.isArray(child)) {
        result.properties = {};
        for (const [propertyName, propertySchema] of Object.entries(child)) {
          const propertyResult = walk(propertySchema, pointerFor(pointerFor(pointer, key), propertyName));
          if (propertyResult === OMIT) {
            omittedByLifecycle.add(propertyName);
          } else {
            result.properties = result.properties || {};
            result.properties[propertyName] = propertyResult;
          }
        }
        continue;
      }

      const childResult = walk(child, pointerFor(pointer, key));
      if (childResult !== OMIT) result[key] = childResult;
    }

    if (lifecycle && lifecycle.deprecatedSince !== null && compareReleaseTracks(lifecycle.deprecatedSince, targetTrack) <= 0) {
      result.deprecated = true;
      stats.deprecatedElements++;
    }

    if (Array.isArray(result.required) && result.properties && typeof result.properties === 'object' && !Array.isArray(result.properties)) {

      const retainedProperties = new Set(Object.keys(result.properties));
      const unresolved = result.required.filter(name => !retainedProperties.has(name) && !omittedByLifecycle.has(name));
      if (unresolved.length > 0) {
        throw lifecycleError(
          'REST_LIFECYCLE_REQUIRED_UNRESOLVED',
          pointer,
          `required field ${unresolved.map(name => JSON.stringify(name)).join(', ')} has no retained property`,
        );
      }
      result.required = result.required.filter(name => retainedProperties.has(name));
    }

    return result;
  }

  const value = walk(input, jsonPointer);
  if (value === OMIT) {
    throw lifecycleError('REST_LIFECYCLE_OMITTED_ROOT', jsonPointer, 'root lifecycle object is not visible for this track');
  }

  return {value, stats};
}

module.exports = {
  validateLifecycle,
  validateLifecycleTransition,
  applyLifecycleForTrack,
};
