const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {publishBilingualControlPlaneSpecs} = require('./integratedSpecPublisher');

const fixture = path.join(__dirname, 'test-fixtures/integrated-spec/canonical.json');

test('prepares English and Chinese control-plane artifacts as one release unit', async () => {
  const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-bilingual-'));
  const result = await publishBilingualControlPlaneSpecs({
    specifications: fixture,
    apiSurface: 'control-plane',
    publicationPolicy: 'latest',
    target: 'zilliz',
    outputDirectory,
  });
  assert.deepEqual(result.releaseManifest.languages.map(entry => entry.language), ['en-US', 'zh-CN']);
  assert.equal(fs.existsSync(path.join(outputDirectory, 'en-US', 'openapi-zilliz-control-plane-en-US.json')), true);
  assert.equal(fs.existsSync(path.join(outputDirectory, 'zh-CN', 'openapi-zilliz-control-plane-zh-CN.json')), true);
  assert.equal(fs.existsSync(path.join(outputDirectory, 'bilingual-manifest.json')), true);
  fs.rmSync(outputDirectory, {recursive: true, force: true});
});

test('rejects non-control-plane bilingual publication', async () => {
  await assert.rejects(() => publishBilingualControlPlaneSpecs({
    apiSurface: 'data-plane', publicationPolicy: 'latest', target: 'zilliz', outputDirectory: '/tmp/unused',
  }), /REST_BILINGUAL_CONTROL_PLANE_OPTIONS_INVALID/);
});
