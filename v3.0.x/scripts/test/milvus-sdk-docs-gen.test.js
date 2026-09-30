const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');

const originalLoad = Module._load;
Module._load = function loadWithMdxPatcherStub(request, parent, isMain) {
  if (request === '../mdx-parse/mdxPatcher') {
    return {
      removeTabsHallucinations: (content) => content,
      unescapeKnownJsxTags: (content) => content,
      normalizeCodeTagContent: (content) => content,
    };
  }
  return originalLoad.call(this, request, parent, isMain);
};

const MilvusSdkDocsGen = require('../lib/milvusSdkDocsGen');

function record(recordId, slug, type, title, parent = null, token = recordId) {
  return {
    record_id: recordId,
    fields: {
      Docs: {
        text: title,
        link: `https://example.feishu.cn/docx/${token}`,
      },
      Slug: [{ text: slug }],
      Type: type,
      Progress: 'Done',
      ...(parent ? { '父记录': [{ record_ids: [parent] }] } : {}),
    },
  };
}

test('MilvusSdkDocsGen makes SDK page paths unique on case-insensitive file systems', async () => {
  const gen = new MilvusSdkDocsGen();
  gen.records = [
    record('collections', 'v2-Collections', 'VirtualNode', 'Collections'),
    record('create-schema-class', 'v2-Collections-CreateSchema', 'Class', 'CreateSchema', 'collections', 'token-upper'),
    record('create-schema-fn', 'v2-Collections-createSchema', 'Function', 'createSchema', 'collections', 'token-lower'),
    record('data-import', 'v2-DataImport', 'VirtualNode', 'DataImport'),
    record('bulk-import-class', 'v2-DataImport-BulkImport', 'Class', 'BulkImport', 'data-import', 'token-bulk-upper'),
    record('bulk-import-fn', 'v2-DataImport-BulkImport-bulkImport', 'Function', 'bulkImport', 'bulk-import-class', 'token-bulk-lower'),
  ];

  const sources = await gen.__list_sources();
  const pageIds = sources.map((source) => source.page_id);

  assert.ok(pageIds.includes('Collections/CreateSchema.md'));
  assert.ok(pageIds.includes('Collections/createSchema-2.md'));
  assert.ok(pageIds.includes('DataImport/BulkImport/BulkImport.md'));
  assert.ok(pageIds.includes('DataImport/BulkImport/bulkImport-2.md'));

  const normalized = pageIds.map((pageId) => pageId.toLowerCase());
  assert.equal(new Set(normalized).size, normalized.length);

  gen.current_page_id = 'Collections/CreateSchema.md';
  assert.equal(
    await gen.__convert_link('https://example.feishu.cn/docx/token-lower'),
    'createSchema-2.md'
  );
});
