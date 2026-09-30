const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {createHash} = require('node:crypto');
const {buildIntegratedSpec} = require('./integratedSpecBuilder');
const {integratedSpecFilename, prepareIntegratedArtifact, writeIntegratedArtifacts} = require('./integratedSpecArtifacts');

const fixture = name => JSON.parse(fs.readFileSync(
  path.join(__dirname, 'test-fixtures/integrated-spec', name),
  'utf8',
));

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'integrated-spec-artifacts-'));
}

test('builds exact latest and track filenames', () => {
  assert.equal(integratedSpecFilename({
    publicationPolicy: 'latest',
    target: 'zilliz',
    apiSurface: 'data-plane',
    protocolVersion: 'v2',
    language: 'en-US',
  }), 'openapi-zilliz-data-plane-v2-en-US.json');
  assert.equal(integratedSpecFilename({
    publicationPolicy: 'latest',
    target: 'zilliz',
    apiSurface: 'control-plane',
    language: 'zh-CN',
  }), 'openapi-zilliz-control-plane-zh-CN.json');
  assert.equal(integratedSpecFilename({
    publicationPolicy: 'track',
    target: 'milvus',
    releaseTrack: '2.6.x',
    apiSurface: 'data-plane',
    language: 'en-US',
  }), 'openapi-milvus-data-plane-2.6.x-en-US.json');
  assert.equal(integratedSpecFilename({
    publicationPolicy: 'track',
    target: 'milvus',
    releaseTrack: '3.0.x',
    apiSurface: 'data-plane',
    language: 'zh-CN',
  }), 'openapi-milvus-data-plane-3.0.x-zh-CN.json');
});

test('deterministic serialization produces identical bytes and sha256', () => {
  const spec = fixture('milvus-3.0.x.json');
  const first = buildIntegratedSpec(spec, {
    publicationPolicy: 'track',
    target: 'milvus',
    language: 'zh-CN',
    releaseTrack: '3.0.x',
    apiSurface: 'data-plane',
  });
  const second = buildIntegratedSpec(spec, {
    publicationPolicy: 'track',
    target: 'milvus',
    language: 'zh-CN',
    releaseTrack: '3.0.x',
    apiSurface: 'data-plane',
  });

  const metadata = {
    publicationPolicy: 'track',
    target: 'milvus',
    releaseTrack: '3.0.x',
    apiSurface: 'data-plane',
    protocolVersion: null,
    language: 'zh-CN',
    sourceIdentity: 'fixture',
    sourceDigest: 'sha256:abc',
    generatorGitSha: 'test-sha',
  };
  const firstArtifacts = prepareIntegratedArtifact(first, metadata);
  const secondArtifacts = prepareIntegratedArtifact(second, metadata);

  assert.deepEqual(firstArtifacts.artifacts[0].bytes, secondArtifacts.artifacts[0].bytes);
  assert.equal(firstArtifacts.artifacts[0].sha256, secondArtifacts.artifacts[0].sha256);
  assert.equal(
    firstArtifacts.artifacts[0].sha256,
    createHash('sha256').update(firstArtifacts.artifacts[0].bytes).digest('hex'),
  );
  assert.match(firstArtifacts.artifacts[0].bytes.toString('utf8'), /\n$/);
});

test('manifest contains deterministic metadata and inventory', () => {
  const spec = fixture('milvus-2.6.x.json');
  const built = buildIntegratedSpec(spec, {
    publicationPolicy: 'track',
    target: 'milvus',
    language: 'en-US',
    releaseTrack: '2.6.x',
    apiSurface: 'data-plane',
  });
  const prepared = prepareIntegratedArtifact(built, {
    publicationPolicy: 'track',
    target: 'milvus',
    releaseTrack: '2.6.x',
    apiSurface: 'data-plane',
    protocolVersion: null,
    language: 'en-US',
    sourceIdentity: 'fixture',
    sourceDigest: 'sha256:abc',
    generatorGitSha: 'test-sha',
    generatedAt: new Date(0).toISOString(),
  });

  const manifest = prepared.manifest;
  assert.equal(manifest.publicationPolicy, 'track');
  assert.equal(manifest.releaseTrack, '2.6.x');
  assert.equal(manifest.language, 'en-US');
  assert.equal(manifest.source.digest, 'sha256:abc');
  assert.equal(manifest.generator.gitSha, 'test-sha');
  assert.ok(Array.isArray(manifest.operations));
  assert.ok(manifest.operations.length >= 1);
  assert.ok(manifest.stats.operations.retained >= 1);
  assert.ok(manifest.files.some(file => file.filename === 'openapi-milvus-data-plane-2.6.x-en-US.json'));
  assert.match(manifest.semanticDigest, /^[a-f0-9]{64}$/);

  const second = prepareIntegratedArtifact(built, {
    publicationPolicy: 'track',
    target: 'milvus',
    releaseTrack: '2.6.x',
    apiSurface: 'data-plane',
    protocolVersion: null,
    language: 'en-US',
    sourceIdentity: 'fixture',
    sourceDigest: 'sha256:abc',
    generatorGitSha: 'test-sha',
    generatedAt: new Date(9999).toISOString(),
  });
  assert.equal(prepared.manifest.semanticDigest, second.manifest.semanticDigest);
});

test('writes artifacts atomically without AWS credentials', () => {
  const dir = tempDir();
  const built = buildIntegratedSpec(fixture('canonical.json'), {
    publicationPolicy: 'latest',
    target: 'zilliz',
    language: 'en-US',
    apiSurface: 'data-plane',
    protocolVersion: 'v2',
  });
  const prepared = prepareIntegratedArtifact(built, {
    publicationPolicy: 'latest',
    target: 'zilliz',
    releaseTrack: null,
    apiSurface: 'data-plane',
    protocolVersion: 'v2',
    language: 'en-US',
    sourceIdentity: 'fixture',
    sourceDigest: 'sha256:abc',
    generatorGitSha: 'test-sha',
  });

  const written = writeIntegratedArtifacts(dir, prepared.artifacts);
  assert.equal(fs.existsSync(path.join(dir, 'openapi-zilliz-data-plane-v2-en-US.json')), true);
  assert.equal(fs.existsSync(path.join(dir, 'manifest.json')), true);
  assert.equal(
    fs.readFileSync(path.join(dir, 'openapi-zilliz-data-plane-v2-en-US.json')).toString('utf8'),
    Buffer.from(written[0].bytes).toString('utf8'),
  );
  fs.rmSync(dir, {recursive: true, force: true});
});
