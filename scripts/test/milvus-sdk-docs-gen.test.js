const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const config = require('../config.json');
const packageJson = require('../package.json');

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
    record('create-schema-upper', 'v2-Collections-CreateSchema', 'Function', 'CreateSchema', 'collections', 'token-upper'),
    record('create-schema-fn', 'v2-Collections-createSchema', 'Function', 'createSchema', 'collections', 'token-lower'),
    record('struct-class', 'v2-Collections-StructFieldSchema', 'Class', 'StructFieldSchema', 'collections', 'token-struct-class'),
    record('struct-get-name', 'v2-StructFieldSchema-getName', 'Function', 'getName', 'struct-class', 'token-struct-get-name'),
    record('struct-virtual', 'v2-Collections-StructFieldSchema', 'VirtualNode', 'StructFieldSchema', 'collections', 'token-struct-virtual'),
    record('struct-add-field', 'v2-StructFieldSchema-addField', 'Function', 'addField', 'struct-virtual', 'token-struct-add-field'),
    record('data-import', 'v2-DataImport', 'VirtualNode', 'DataImport'),
    record('bulk-import-class', 'v2-DataImport-BulkImport', 'Class', 'BulkImport', 'data-import', 'token-bulk-upper'),
    record('bulk-import-fn', 'v2-DataImport-BulkImport-bulkImport', 'Function', 'bulkImport', 'bulk-import-class', 'token-bulk-lower'),
  ];

  const sources = await gen.__list_sources();
  const pageIds = sources.map((source) => source.page_id);

  assert.ok(pageIds.includes('Collections/CreateSchema.md'));
  assert.ok(pageIds.includes('Collections/createSchema-2.md'));
  assert.ok(pageIds.includes('Collections/StructFieldSchema/StructFieldSchema.md'));
  assert.ok(pageIds.includes('Collections/StructFieldSchema/getName.md'));
  assert.ok(pageIds.includes('Collections/StructFieldSchema/addField.md'));
  assert.ok(pageIds.includes('DataImport/BulkImport/BulkImport.md'));
  assert.ok(pageIds.includes('DataImport/BulkImport/bulkImport-2.md'));
  assert.ok(!pageIds.some((pageId) => pageId.includes('StructFieldSchema-2')));

  const normalized = pageIds
    .filter((pageId) => pageId.endsWith('.md'))
    .map((pageId) => pageId.toLowerCase());
  assert.equal(new Set(normalized).size, normalized.length);

  gen.current_page_id = 'Collections/CreateSchema.md';
  assert.equal(
    await gen.__convert_link('https://example.feishu.cn/docx/token-lower'),
    'createSchema-2.md'
  );
});

test('package scripts expose an npm command for every SDK manual', () => {
  const sdkManuals = Object.entries(config.milvus.manuals)
    .filter(([, manual]) => manual.sourceType === 'drive')
    .map(([name]) => name);

  assert.ok(sdkManuals.length > 0);
  assert.equal(
    packageJson.scripts['fetch-sdk-docs'],
    'node lark-docs/index.js -c config.json'
  );

  for (const manualName of sdkManuals) {
    const match = manualName.match(/^(.+)-v(\d+\.\d+)\.x$/);
    assert.ok(match, `Unexpected SDK manual name: ${manualName}`);

    const [, sdk, version] = match;
    const scriptName = `fetch-sdk-docs:${sdk}:v${version}`;

    assert.equal(
      packageJson.scripts[scriptName],
      `node lark-docs/index.js -c config.json -m ${manualName} --all`,
      `Missing npm script for ${manualName}`
    );
  }
});
