const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const importV2Path = path.resolve(__dirname, '../apifox-docs/meta/openapi/11-import-operations-v2.json');

// zdoc splits the two Milvus import-progress endpoints honestly: /describe
// is the primary implementation published to every target, and
// /get_progress is the Milvus-only alias. Both must stay visible to the
// milvus target so the Import (v2) group keeps both pages.
test('import v2 keeps both milvus import-progress endpoints visible', () => {
  const openapi = JSON.parse(fs.readFileSync(importV2Path, 'utf8'));
  const describe = openapi.paths['/v2/vectordb/jobs/import/describe']?.post;
  const alias = openapi.paths['/v2/vectordb/jobs/import/get_progress']?.post;

  assert.ok(describe, 'expected /v2/vectordb/jobs/import/describe operation to exist');
  assert.ok(alias, 'expected /v2/vectordb/jobs/import/get_progress operation to exist');
  const describeTargets = describe['x-include-target'];
  assert.ok(
    describeTargets === undefined || describeTargets.includes('milvus'),
    'describe must be published to the milvus target',
  );
  assert.deepEqual(alias['x-include-target'], ['milvus']);
});
