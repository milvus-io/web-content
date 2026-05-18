const test = require('node:test');
const assert = require('node:assert/strict');

const RefGen = require('../apifox-docs/refGen');

function createRefGen() {
  return new RefGen({
    lang: 'en-US',
    target: 'milvus',
    target_path: 'unused',
    specifications: {
      tags: [{ name: 'Collection Operations (V2)' }],
      paths: {
        '/v2/vectordb/collections/get_compaction_state': {
          post: {
            summary: 'Get Compaction State',
            tags: ['Collection Operations (V2)'],
          },
        },
      },
    },
  });
}

test('normalizes collection v2 compaction and analyzer slugs for milvus output', () => {
  const refGen = createRefGen();

  assert.equal(refGen.get_slug('Get Compaction State', 'milvus'), 'Get Compaction State');
  assert.equal(refGen.get_slug('Run Analyzer', 'milvus'), 'Run Analyzer');
});
