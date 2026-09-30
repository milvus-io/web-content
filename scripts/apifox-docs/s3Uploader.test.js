const test = require('node:test');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const {HeadObjectCommand, PutObjectCommand} = require('@aws-sdk/client-s3');
const S3Uploader = require('./s3Uploader');

function md5(bytes) {
  return createHash('md5').update(bytes).digest('hex');
}

class MockClient {
  constructor() {
    this.commands = [];
    this.headResponse = null;
    this.putError = null;
  }

  async send(command) {
    this.commands.push(command);
    if (command instanceof HeadObjectCommand) {
      if (this.headResponse) return this.headResponse;
      const error = new Error('NotFound');
      error.name = 'NotFound';
      throw error;
    }
    if (command instanceof PutObjectCommand && this.putError) throw this.putError;
    return {};
  }
}

test('accepts an injected client and uploads the exact supplied bytes', async () => {
  const client = new MockClient();
  const uploader = new S3Uploader({
    client,
    bucket: 'bucket',
    region: 'us-east-1',
    prefix: 'rest/',
  });
  const bytes = Buffer.from('{"openapi":"3.0.1"}');
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const url = await uploader.uploadArtifact({
    filename: 'openapi-zilliz-v2-en-US.json',
    bytes,
    sha256,
  });

  assert.equal(client.commands.length, 2);
  assert.ok(client.commands[0] instanceof HeadObjectCommand);
  assert.ok(client.commands[1] instanceof PutObjectCommand);
  const put = client.commands[1].input;
  assert.equal(put.Key, 'rest/openapi-zilliz-v2-en-US.json');
  assert.equal(put.ContentType, 'application/json');
  assert.deepEqual(put.Body, bytes);
  assert.equal(put.Metadata.sha256, sha256);
  assert.equal(url, 'https://bucket.s3.us-east-1.amazonaws.com/rest/openapi-zilliz-v2-en-US.json');
});

test('rejects stale latest promotion before writing', async () => {
  const client = new MockClient();
  client.headResponse = {Metadata: {sha256: 'newer'}};
  const uploader = new S3Uploader({client, bucket: 'bucket', region: 'us-east-1'});
  await assert.rejects(() => uploader.promoteArtifact({
    filename: 'manifest.json', key: 'openapi/latest/manifest.json', bytes: Buffer.from('{}'),
    sha256: 'incoming', expectedCurrentSha256: 'older',
  }), /REST_STALE_LATEST_REJECTED/);
  assert.equal(client.commands.filter(command => command instanceof PutObjectCommand).length, 0);
});

test('skips upload when the remote checksum is unchanged', async () => {
  const client = new MockClient();
  const bytes = Buffer.from('{"openapi":"3.0.1"}');
  client.headResponse = {ETag: `"${md5(bytes)}"`};
  const uploader = new S3Uploader({
    client,
    bucket: 'bucket',
    region: 'us-east-1',
    prefix: '',
  });

  await uploader.uploadArtifact({
    filename: 'openapi-zilliz-v2-en-US.json',
    bytes,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  });

  assert.equal(client.commands.length, 1);
  assert.ok(client.commands[0] instanceof HeadObjectCommand);
});

test('propagates head and put failures without deleting prepared content', async () => {
  const client = new MockClient();
  client.putError = new Error('network down');
  const uploader = new S3Uploader({client, bucket: 'bucket', region: 'us-east-1'});

  await assert.rejects(
    () => uploader.uploadArtifact({filename: 'x.json', bytes: Buffer.from('{}'), sha256: 'abc'}),
    /network down/,
  );
});

test('legacy upload keeps the established unversioned key layout separate from the new publisher', async () => {
  const client = new MockClient();
  const uploader = new S3Uploader({client, bucket: 'bucket', region: 'us-east-1', prefix: 'rest'});
  uploader.updateAboutPage = () => {};
  await uploader.upload({
    info: {title: 'API', version: '1'},
    tags: [{name: 'Collections (V2)'}],
    paths: {'/v2/collections': {get: {tags: ['Collections (V2)'], responses: {200: {description: 'ok'}}}}},
  }, 'en-US');
  const put = client.commands.find(command => command instanceof PutObjectCommand);
  assert.equal(put.input.Key, 'rest/openapi-zilliz-v2.json');
  assert.doesNotMatch(put.input.Key, /data-plane|control-plane|openapi\/v2/);
});
