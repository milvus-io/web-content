const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const importV2Path = path.resolve(__dirname, '../apifox-docs/meta/openapi/11-import-operations-v2.json');

test('import v2 includes milvus-only describe progress endpoint metadata', () => {
  const openapi = JSON.parse(fs.readFileSync(importV2Path, 'utf8'));
  const operation = openapi.paths['/v2/vectordb/jobs/import/describe']?.post;

  assert.ok(operation, 'expected /v2/vectordb/jobs/import/describe operation to exist');
  assert.deepEqual(operation['x-include-target'], ['milvus']);
});
