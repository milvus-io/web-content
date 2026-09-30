const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {buildIntegratedSpec} = require('./integratedSpecBuilder');

const fixture = name => JSON.parse(fs.readFileSync(
  path.join(__dirname, 'test-fixtures/integrated-spec', name),
  'utf8',
));

test('data-plane latest keeps only the selected protocol version', () => {
  const latest = buildIntegratedSpec(fixture('canonical.json'), {
    publicationPolicy: 'latest',
    target: 'zilliz',
    language: 'en-US',
    apiSurface: 'data-plane',
    protocolVersion: 'v2',
  });

  assert.equal(latest.releaseTrack, null);
  assert.ok(latest.spec.paths['/v2/projects']);
  assert.equal(latest.spec.paths['/v1/clusters'], undefined);
});

test('track policy filters fields added after the selected track', () => {
  const track26 = buildIntegratedSpec(fixture('milvus-2.6.x.json'), {
    publicationPolicy: 'track',
    target: 'milvus',
    language: 'en-US',
    apiSurface: 'data-plane',
    releaseTrack: '2.6.x',
  });

  assert.equal(
    track26.spec.components.schemas.SearchRequest.properties.functionChains,
    undefined,
  );
  assert.deepEqual(
    track26.spec.components.schemas.SearchRequest.required,
    ['collectionName'],
  );
});

test('track policy requires lifecycle on request bodies, responses, and root schemas', () => {
  const cases = [
    spec => { delete spec.paths['/v2/vectordb/entities/search'].post.requestBody['x-added-at']; },
    spec => { spec.paths['/v2/vectordb/entities/search'].post.requestBody.content['application/json'].schema = {type: 'object'}; },
    spec => { delete spec.paths['/v2/vectordb/entities/search'].post.responses['200']['x-added-at']; },
    spec => { spec.paths['/v2/vectordb/entities/search'].post.responses['200'].content['application/json'].schema = {type: 'object'}; },
  ];

  for (const mutate of cases) {
    const spec = fixture('milvus-2.6.x.json');
    mutate(spec);
    assert.throws(() => buildIntegratedSpec(spec, {
      publicationPolicy: 'track',
      target: 'milvus',
      language: 'en-US',
      apiSurface: 'data-plane',
      releaseTrack: '2.6.x',
    }), /REST_LIFECYCLE_MISSING/);
  }
});

test('track policy requires lifecycle on parameter schemas and array items', () => {
  const cases = [
    spec => {
      spec.paths['/v2/vectordb/entities/search'].post.parameters = [{
        name: 'limit', in: 'query',
        'x-added-at': '2.6.x', 'x-last-modified': '2.6.x', 'x-deprecated-since': null,
        schema: {type: 'integer'},
      }];
    },
    spec => {
      spec.paths['/v2/vectordb/entities/search'].parameters = [{
        name: 'tenant', in: 'header',
        'x-added-at': '2.6.x', 'x-last-modified': '2.6.x', 'x-deprecated-since': null,
        schema: {type: 'string'},
      }];
    },
    spec => {
      spec.components.schemas.SearchRequest.properties.collectionName = {
        type: 'array',
        'x-added-at': '2.6.x', 'x-last-modified': '2.6.x', 'x-deprecated-since': null,
        items: {type: 'string'},
      };
    },
  ];

  for (const mutate of cases) {
    const spec = fixture('milvus-2.6.x.json');
    mutate(spec);
    assert.throws(() => buildIntegratedSpec(spec, {
      publicationPolicy: 'track', target: 'milvus', language: 'en-US',
      apiSurface: 'data-plane', releaseTrack: '2.6.x',
    }), /REST_LIFECYCLE_MISSING/);
  }
});

test('latest policy rejects a release track', () => {
  assert.throws(
    () => buildIntegratedSpec(fixture('canonical.json'), {
      publicationPolicy: 'latest',
      target: 'zilliz',
      language: 'en-US',
      apiSurface: 'data-plane',
      protocolVersion: 'v2',
      releaseTrack: '2.6.x',
    }),
    /REST_LATEST_POLICY_REJECTS_TRACK/,
  );
});

test('data-plane track requires a release track and rejects a protocol version', () => {
  assert.throws(
    () => buildIntegratedSpec(fixture('milvus-2.6.x.json'), {
      publicationPolicy: 'track',
      target: 'milvus',
      language: 'en-US',
      apiSurface: 'data-plane',
    }),
    /REST_TRACK_POLICY_REQUIRES_TRACK/,
  );

  assert.throws(
    () => buildIntegratedSpec(fixture('milvus-2.6.x.json'), {
      publicationPolicy: 'track',
      target: 'milvus',
      language: 'en-US',
      releaseTrack: '2.6.x',
      apiSurface: 'data-plane',
      protocolVersion: 'v2',
    }),
    /REST_TRACK_POLICY_REJECTS_PROTOCOL_VERSION/,
  );
});

test('data-plane latest requires a protocol version', () => {
  assert.throws(
    () => buildIntegratedSpec(fixture('canonical.json'), {
      publicationPolicy: 'latest',
      target: 'zilliz',
      language: 'en-US',
      apiSurface: 'data-plane',
    }),
    /REST_LATEST_POLICY_REQUIRES_PROTOCOL_VERSION/,
  );
});

test('applies zh-CN localization before stripping x-i18n', () => {
  const localized = buildIntegratedSpec(fixture('milvus-3.0.x.json'), {
    publicationPolicy: 'track',
    target: 'milvus',
    language: 'zh-CN',
    releaseTrack: '3.0.x',
    apiSurface: 'data-plane',
  });

  assert.equal(localized.spec.paths['/v2/vectordb/entities/search'].post.summary, 'Search');
  assert.equal(
    localized.spec.components.schemas.SearchRequest.properties.collectionName['x-i18n'],
    undefined,
  );
});

test('english output strips internal x-* authoring metadata but keeps deprecated', () => {
  const spec = fixture('milvus-3.0.x.json');
  spec.paths['/v2/vectordb/entities/search'].post['x-deprecated-since'] = '3.0.x';
  spec.paths['/v2/vectordb/entities/search'].post.deprecated = false;
  spec.components.schemas.SearchRequest.properties.functionChains['x-last-modified'] = '3.0.x';

  const built = buildIntegratedSpec(spec, {
    publicationPolicy: 'track',
    target: 'milvus',
    language: 'en-US',
    releaseTrack: '3.0.x',
    apiSurface: 'data-plane',
  });

  assert.equal(built.spec.paths['/v2/vectordb/entities/search'].post.deprecated, true);
  assert.equal(built.spec.paths['/v2/vectordb/entities/search'].post['x-added-at'], undefined);
  assert.equal(
    built.spec.components.schemas.SearchRequest.properties.functionChains['x-added-at'],
    undefined,
  );
});

test('target and language filters prune operations, properties, and examples', () => {
  const spec = fixture('canonical.json');
  spec.paths['/v2/projects'].post.parameters.push({
    name: 'hidden',
    in: 'query',
    schema: {type: 'string'},
    'x-include-target': ['milvus'],
  });
  spec.components.schemas.Project.properties.internalNote = {
    type: 'string',
    'x-include-target': ['milvus'],
  };

  const built = buildIntegratedSpec(spec, {
    publicationPolicy: 'latest',
    target: 'zilliz',
    language: 'en-US',
    apiSurface: 'data-plane',
    protocolVersion: 'v2',
  });

  assert.equal(
    built.spec.paths['/v2/projects'].post.parameters.some(param => param.name === 'hidden'),
    false,
  );
  assert.equal(built.spec.components.schemas.Project.properties.internalNote, undefined);
  assert.equal(built.spec.components.schemas.Unused, undefined);
});

test('control-plane accepts only zilliz latest without track or protocol version', () => {
  const built = buildIntegratedSpec(fixture('canonical.json'), {
    publicationPolicy: 'latest', target: 'zilliz', language: 'en-US', apiSurface: 'control-plane',
  });
  assert.equal(built.apiSurface, 'control-plane');
  assert.equal(built.protocolVersion, null);
  assert.throws(() => buildIntegratedSpec(fixture('canonical.json'), {
    publicationPolicy: 'latest', target: 'milvus', language: 'en-US', apiSurface: 'control-plane',
  }), /REST_CONTROL_PLANE_REJECTS_TARGET/);
  assert.throws(() => buildIntegratedSpec(fixture('canonical.json'), {
    publicationPolicy: 'track', target: 'zilliz', language: 'en-US', apiSurface: 'control-plane', releaseTrack: '2.6.x',
  }), /REST_CONTROL_PLANE_REJECTS_POLICY/);
  assert.throws(() => buildIntegratedSpec(fixture('canonical.json'), {
    publicationPolicy: 'latest', target: 'zilliz', language: 'en-US', apiSurface: 'control-plane', protocolVersion: 'v2',
  }), /REST_CONTROL_PLANE_REJECTS_PROTOCOL_VERSION/);
});
