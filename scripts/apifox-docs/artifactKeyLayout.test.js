const test = require('node:test');
const assert = require('node:assert/strict');
const {artifactKeys, publicationBase} = require('./artifactKeyLayout');

test('builds disjoint plane-aware publication roots', () => {
  assert.equal(publicationBase({apiSurface: 'data-plane', publicationPolicy: 'latest', target: 'zilliz', protocolVersion: 'v2', language: 'en-US'}), 'openapi/v2/data-plane/zilliz/latest/v2/en-US');
  assert.equal(publicationBase({apiSurface: 'data-plane', publicationPolicy: 'track', target: 'milvus', releaseTrack: '2.6.x', language: 'zh-CN'}), 'openapi/v2/data-plane/milvus/tracks/2.6.x/zh-CN');
  assert.equal(publicationBase({apiSurface: 'control-plane', publicationPolicy: 'latest', target: 'zilliz', language: 'en-US'}), 'openapi/v2/control-plane/zilliz/latest/all/en-US');
});

test('immutable keys contain the prepared artifact digest', () => {
  const keys = artifactKeys(
    {apiSurface: 'control-plane', publicationPolicy: 'latest', target: 'zilliz', language: 'en-US'},
    {filename: 'openapi-zilliz-control-plane-en-US.json', sha256: 'abc'},
  );
  assert.match(keys.immutableKey, /objects\/abc\/openapi-zilliz-control-plane-en-US\.json$/);
  assert.match(keys.latestKey, /\/openapi\.json$/);
});
