const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const {spawnSync} = require('node:child_process');

const cliPath = path.join(__dirname, 'index.js');
const fixture = name => path.join(__dirname, 'test-fixtures/integrated-spec', name);

function run(args) {
  return spawnSync(process.execPath, [cliPath, ...args], {encoding: 'utf8'});
}

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'integrated-spec-cli-'));
}

function collection(specPath, apiSurface, releaseTrack) {
  const dir = tempDir();
  const serviceId = apiSurface === 'control-plane' ? 'projects' : 'milvus-rest';
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  spec['x-zdoc-fragment'] = {schemaVersion: '1.0', apiSurface, service: serviceId};
  const filename = `${serviceId}.openapi.json`;
  const bytes = Buffer.from(`${JSON.stringify(spec, null, 2)}\n`);
  fs.writeFileSync(path.join(dir, filename), bytes);
  const digest = value => `sha256:${crypto.createHash('sha256').update(value).digest('hex')}`;
  const httpMethods = new Set(['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace']);
  const operationCount = Object.values(spec.paths || {}).reduce(
    (count, pathItem) => count + Object.keys(pathItem || {}).filter(method => httpMethods.has(method.toLowerCase())).length,
    0,
  );
  const manifest = {
    schemaVersion: '1.0', collectionId: `${apiSurface}-fixture`, apiSurface,
    ...(releaseTrack ? {releaseTrack} : {}),
    source: {repository: apiSurface === 'control-plane' ? 'zilliz-cloud' : 'milvus', revision: 'a'.repeat(40)},
    generator: {repository: 'feishu-markdown-bridge', revision: 'b'.repeat(40), configDigest: `sha256:${'1'.repeat(64)}`},
    review: {manifestDigest: `sha256:${'2'.repeat(64)}`, approvalDigest: `sha256:${'3'.repeat(64)}`},
    services: [{id: serviceId, fragment: filename, sha256: digest(bytes), operationCount}],
  };
  fs.writeFileSync(path.join(dir, 'collection-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  return dir;
}

test('generates latest artifacts through the explicit CLI command', () => {
  const dir = tempDir();
  const input = collection(fixture('canonical.json'), 'data-plane');
  const result = run([
    'generate-integrated-spec',
    '--fragment-collection', input,
    '--api-surface', 'data-plane',
    '--publication-policy', 'latest',
    '--target', 'zilliz',
    '--protocol-version', 'v2',
    '--lang', 'en-US',
    '--integrated-spec-output', dir,
  ]);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.existsSync(path.join(dir, 'openapi-zilliz-data-plane-v2-en-US.json')), true);
  assert.equal(fs.existsSync(path.join(dir, 'manifest.json')), true);
  fs.rmSync(dir, {recursive: true, force: true});
  fs.rmSync(input, {recursive: true, force: true});
});

test('generates track artifacts through the explicit CLI command', () => {
  const dir = tempDir();
  const input = collection(fixture('milvus-2.6.x.json'), 'data-plane', '2.6.x');
  const result = run([
    'generate-integrated-spec',
    '--fragment-collection', input,
    '--api-surface', 'data-plane',
    '--publication-policy', 'track',
    '--target', 'milvus',
    '--release-track', '2.6.x',
    '--lang', 'zh-CN',
    '--integrated-spec-output', dir,
  ]);

  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.existsSync(path.join(dir, 'openapi-milvus-data-plane-2.6.x-zh-CN.json')), true);
  assert.equal(fs.existsSync(path.join(dir, 'manifest.json')), true);
  fs.rmSync(dir, {recursive: true, force: true});
  fs.rmSync(input, {recursive: true, force: true});
});

test('rejects invalid latest and track option combinations before writing', () => {
  const cases = [
    ['--publication-policy', 'latest', '--target', 'zilliz', '--api-surface', 'data-plane', '--lang', 'en-US'],
    ['--publication-policy', 'latest', '--target', 'zilliz', '--api-surface', 'data-plane', '--protocol-version', 'v2', '--release-track', '2.6.x', '--lang', 'en-US'],
    ['--publication-policy', 'track', '--target', 'milvus', '--api-surface', 'data-plane', '--release-track', '2.6.x', '--protocol-version', 'v2', '--lang', 'en-US'],
    ['--publication-policy', 'track', '--target', 'milvus', '--api-surface', 'data-plane', '--lang', 'en-US'],
    ['--publication-policy', 'track', '--target', 'zilliz', '--api-surface', 'control-plane', '--release-track', '2.6.x', '--lang', 'en-US'],
  ];

  for (const extra of cases) {
    const dir = tempDir();
    const trackCase = extra.includes('track') || extra.includes('2.6.x');
    const surface = extra.includes('control-plane') ? 'control-plane' : 'data-plane';
    const input = collection(trackCase ? fixture('milvus-2.6.x.json') : fixture('canonical.json'), surface, trackCase && surface === 'data-plane' ? '2.6.x' : undefined);
    const result = run([
      'generate-integrated-spec',
      '--fragment-collection', input,
      ...extra,
      '--integrated-spec-output', dir,
    ]);

    assert.notEqual(result.status, 0);
    assert.equal(fs.existsSync(path.join(dir, 'manifest.json')), false);
    assert.equal(fs.readdirSync(dir).length, 0);
    fs.rmSync(dir, {recursive: true, force: true});
    fs.rmSync(input, {recursive: true, force: true});
  }
});

test('generates control-plane latest artifacts and rejects removed integrated flags', () => {
  const dir = tempDir();
  const input = collection(fixture('canonical.json'), 'control-plane');
  const result = run([
    'generate-integrated-spec', '--fragment-collection', input, '--api-surface', 'control-plane',
    '--publication-policy', 'latest', '--target', 'zilliz', '--lang', 'en-US', '--integrated-spec-output', dir,
  ]);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(fs.existsSync(path.join(dir, 'en-US', 'openapi-zilliz-control-plane-en-US.json')), true);
  assert.equal(fs.existsSync(path.join(dir, 'zh-CN', 'openapi-zilliz-control-plane-zh-CN.json')), true);
  assert.equal(fs.existsSync(path.join(dir, 'bilingual-manifest.json')), true);
  const legacy = run([
    'generate-integrated-spec', '--specifications', fixture('canonical.json'), '--api-version', 'v2',
    '--publication-policy', 'latest', '--target', 'zilliz', '--integrated-spec-output', tempDir(),
  ]);
  assert.notEqual(legacy.status, 0);
  fs.rmSync(dir, {recursive: true, force: true});
  fs.rmSync(input, {recursive: true, force: true});
});
