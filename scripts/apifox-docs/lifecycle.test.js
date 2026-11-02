const test = require('node:test');
const assert = require('node:assert/strict');
const {
  applyLifecycleForTrack,
  validateLifecycle,
  validateLifecycleTransition,
} = require('./lifecycle');
const {compareReleaseTracks, normalizeReleaseTrack} = require('./releaseTrack');

function lifecycleField(addedAt, field) {
  return {
    ...field,
    'x-added-at': addedAt,
    'x-last-modified': addedAt,
    'x-deprecated-since': null,
  };
}

function lifecycleObject(addedAt, lastModified, value) {
  return {
    ...value,
    'x-added-at': addedAt,
    'x-last-modified': lastModified,
    'x-deprecated-since': null,
  };
}

test('minor tracks compare numerically and reject patches', () => {
  assert.equal(normalizeReleaseTrack('v2.6.x'), '2.6.x');
  assert.equal(normalizeReleaseTrack('2.6.x'), '2.6.x');
  assert.equal(compareReleaseTracks('2.10.x', '2.6.x'), 1);
  assert.equal(compareReleaseTracks('2.6.x', '3.0.x'), -1);
  assert.throws(() => normalizeReleaseTrack('2.6.22'), /REST_RELEASE_TRACK_INVALID/);
  assert.throws(() => normalizeReleaseTrack('2.6'), /REST_RELEASE_TRACK_INVALID/);
});

test('added fields are omitted before their track and removed from required', () => {
  const schema = {
    type: 'object',
    required: ['collectionName', 'functionChains'],
    properties: {
      collectionName: lifecycleField('2.6.x', {type: 'string'}),
      functionChains: lifecycleField('3.0.x', {type: 'array', items: {type: 'object'}}),
    },
  };
  const filtered = applyLifecycleForTrack(schema, '2.6.x', '#/components/schemas/SearchRequest');
  assert.deepEqual(Object.keys(filtered.value.properties), ['collectionName']);
  assert.deepEqual(filtered.value.required, ['collectionName']);
  assert.equal(filtered.stats.omittedElements, 1);
});

test('deprecated elements remain and receive standard OpenAPI deprecation', () => {
  const operation = lifecycleObject('2.6.x', '3.0.x', {responses: {}});
  operation['x-deprecated-since'] = '3.0.x';
  const filtered = applyLifecycleForTrack(operation, '3.0.x', '#/paths/~1search/post');
  assert.equal(filtered.value.deprecated, true);
  assert.equal(filtered.stats.deprecatedElements, 1);
});

test('deprecated elements remain present before their deprecation track', () => {
  const operation = lifecycleObject('2.6.x', '3.0.x', {responses: {}, deprecated: false});
  operation['x-deprecated-since'] = '3.0.x';
  const filtered = applyLifecycleForTrack(operation, '2.6.x', '#/paths/~1search/post');
  assert.equal(filtered.value.deprecated, false);
});

test('validateLifecycle returns normalized values for valid metadata', () => {
  const node = {
    'x-added-at': 'v2.6.x',
    'x-last-modified': '3.0.x',
    'x-deprecated-since': null,
  };
  assert.deepEqual(validateLifecycle(node, '#/paths/~1search/post', {required: true}), {
    addedAt: '2.6.x',
    lastModified: '3.0.x',
    deprecatedSince: null,
  });
});

test('validateLifecycle rejects malformed values', () => {
  assert.throws(
    () => validateLifecycle({
      'x-added-at': '2.6.22',
      'x-last-modified': '3.0.x',
      'x-deprecated-since': null,
    }, '#/paths/~1search/post', {required: true}),
    /REST_LIFECYCLE_INVALID.*#\/paths\/~1search\/post/,
  );
});

test('validateLifecycle rejects missing attributes in managed scope', () => {
  assert.throws(
    () => validateLifecycle({
      'x-added-at': '2.6.x',
    }, '#/paths/~1search/post', {required: true}),
    /REST_LIFECYCLE_MISSING/,
  );
});

test('validateLifecycle rejects invalid ordering', () => {
  assert.throws(
    () => validateLifecycle({
      'x-added-at': '3.0.x',
      'x-last-modified': '2.6.x',
      'x-deprecated-since': null,
    }, '#/paths/~1search/post', {required: true}),
    /REST_LIFECYCLE_ORDER/,
  );
  assert.throws(
    () => validateLifecycle({
      'x-added-at': '2.6.x',
      'x-last-modified': '3.0.x',
      'x-deprecated-since': '2.6.x',
    }, '#/paths/~1search/post', {required: true}),
    /REST_LIFECYCLE_ORDER/,
  );
});

test('validateLifecycle rejects deprecated true without x-deprecated-since', () => {
  assert.throws(
    () => validateLifecycle({
      'x-added-at': '2.6.x',
      'x-last-modified': '2.6.x',
      'x-deprecated-since': null,
      deprecated: true,
    }, '#/paths/~1search/post', {required: true}),
    /REST_LIFECYCLE_DEPRECATION/,
  );
});

test('base/head lifecycle comparison rejects x-added-at rewrites', () => {
  assert.throws(() => validateLifecycleTransition(
    lifecycleField('2.6.x', {type: 'string'}),
    lifecycleField('3.0.x', {type: 'string'}),
    '3.0.x',
    '#/components/schemas/Request/properties/name',
  ), /REST_LIFECYCLE_ADDED_AT_REWRITE/);
});

test('base/head lifecycle comparison rejects x-last-modified regression', () => {
  assert.throws(() => validateLifecycleTransition(
    lifecycleObject('2.6.x', '3.0.x', {type: 'string'}),
    lifecycleObject('2.6.x', '2.6.x', {type: 'string'}),
    '3.0.x',
    '#/components/schemas/Request/properties/name',
  ), /REST_LIFECYCLE_LAST_MODIFIED_REGRESSION/);
});

test('metadata-only changes cannot advance x-last-modified', () => {
  assert.throws(() => validateLifecycleTransition(
    lifecycleObject('2.6.x', '2.6.x', {description: 'Before'}),
    lifecycleObject('2.6.x', '3.0.x', {description: 'After'}),
    '3.0.x',
    '#/components/schemas/Request/properties/name',
    {publicContractChanged: false},
  ), /REST_LIFECYCLE_METADATA_ONLY_ADVANCE/);
});

test('filtering rejects a retained required name without a retained property', () => {
  const schema = {
    type: 'object',
    required: ['missing'],
    properties: {},
  };
  assert.throws(
    () => applyLifecycleForTrack(schema, '2.6.x', '#/components/schemas/Broken'),
    /REST_LIFECYCLE_REQUIRED_UNRESOLVED/,
  );
});

test('combinator branches may name parent-level properties in required', () => {
  // Shape synced to web-content (milvus-io/web-content#1250): the anyOf
  // alternatives constrain the same instance, so their `required` entries may
  // reference properties declared only at the parent level.
  const schema = lifecycleObject('3.0.x', '3.0.x', {
    type: 'object',
    properties: {
      dbName: lifecycleField('3.0.x', {type: 'string'}),
      collectionName: lifecycleField('3.0.x', {type: 'string'}),
      fieldName: lifecycleField('3.0.x', {type: 'string'}),
      fieldId: lifecycleField('3.0.x', {type: 'integer'}),
    },
    required: ['collectionName'],
    anyOf: [
      lifecycleObject('3.0.x', '3.0.x', {
        required: ['fieldName', 'collectionName'],
        properties: {
          collectionName: lifecycleField('3.0.x', {type: 'string'}),
          dbName: lifecycleField('3.0.x', {type: 'string'}),
        },
      }),
      lifecycleObject('3.0.x', '3.0.x', {
        required: ['fieldId', 'collectionName'],
        properties: {
          collectionName: lifecycleField('3.0.x', {type: 'string'}),
          dbName: lifecycleField('3.0.x', {type: 'string'}),
        },
      }),
    ],
  });

  const filtered = applyLifecycleForTrack(schema, '3.0.x', '#/paths/~1fields~1drop/post');
  assert.deepEqual(filtered.value.anyOf[0].required, ['fieldName', 'collectionName']);
  assert.deepEqual(filtered.value.anyOf[1].required, ['fieldId', 'collectionName']);
});

test('combinator branch required resolves against the parent scope regardless of key order', () => {
  const buildSchema = () => lifecycleObject('3.0.x', '3.0.x', {
    anyOf: [
      lifecycleObject('3.0.x', '3.0.x', {
        required: ['fieldName'],
        properties: {dbName: lifecycleField('3.0.x', {type: 'string'})},
      }),
    ],
    properties: {
      fieldName: lifecycleField('3.0.x', {type: 'string'}),
      dbName: lifecycleField('3.0.x', {type: 'string'}),
    },
  });

  assert.deepEqual(
    applyLifecycleForTrack(buildSchema(), '3.0.x', '$').value.anyOf[0].required,
    ['fieldName'],
  );
});

test('parent-level lifecycle omission also shrinks combinator branch required', () => {
  const schema = lifecycleObject('2.6.x', '2.6.x', {
    type: 'object',
    properties: {
      collectionName: lifecycleField('2.6.x', {type: 'string'}),
      fieldName: lifecycleField('3.0.x', {type: 'string'}),
    },
    required: ['collectionName'],
    anyOf: [
      lifecycleObject('2.6.x', '2.6.x', {
        required: ['fieldName', 'collectionName'],
        properties: {collectionName: lifecycleField('2.6.x', {type: 'string'})},
      }),
    ],
  });

  const filtered = applyLifecycleForTrack(schema, '2.6.x', '$');
  assert.ok(filtered.value.properties.collectionName);
  assert.equal(filtered.value.properties.fieldName, undefined);
  assert.deepEqual(filtered.value.required, ['collectionName']);
  assert.deepEqual(filtered.value.anyOf[0].required, ['collectionName']);
});

test('combinator branch required still rejects names with no property anywhere in scope', () => {
  const schema = lifecycleObject('3.0.x', '3.0.x', {
    type: 'object',
    properties: {collectionName: lifecycleField('3.0.x', {type: 'string'})},
    required: ['collectionName'],
    anyOf: [
      lifecycleObject('3.0.x', '3.0.x', {
        required: ['ghost'],
        properties: {collectionName: lifecycleField('3.0.x', {type: 'string'})},
      }),
    ],
  });

  assert.throws(
    () => applyLifecycleForTrack(schema, '3.0.x', '$'),
    /REST_LIFECYCLE_REQUIRED_UNRESOLVED.*"ghost"/,
  );
});

test('branches added after the track are omitted from the combinator', () => {
  const schema = lifecycleObject('2.6.x', '2.6.x', {
    type: 'object',
    properties: {collectionName: lifecycleField('2.6.x', {type: 'string'})},
    required: ['collectionName'],
    anyOf: [
      lifecycleObject('2.6.x', '2.6.x', {required: ['collectionName']}),
      lifecycleObject('3.0.x', '3.0.x', {required: ['collectionName']}),
    ],
  });

  const filtered = applyLifecycleForTrack(schema, '2.6.x', '$');
  assert.equal(filtered.value.anyOf.length, 1);
  assert.deepEqual(filtered.value.anyOf[0].required, ['collectionName']);
});
