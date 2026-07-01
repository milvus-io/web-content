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
const MilvusDocsGen = require('../lib/milvusDocsGen');

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

test('MilvusSdkDocsGen normalizes Feishu docx tokens before resolving links', async () => {
  const gen = new MilvusSdkDocsGen();
  gen.records = [
    record('utility', 'v2-utility', 'VirtualNode', 'utility'),
    record(
      'create-user',
      'v2-utility-create_user',
      'Function',
      'create_user',
      'utility',
      'N44ndTSrgoEBx7xCID5cXRS7n1c?from=from_parent_docs'
    ),
    record('delete-user', 'v2-utility-delete_user', 'Function', 'delete_user', 'utility'),
  ];

  const sources = await gen.__list_sources();
  const createUser = sources.find((source) => source.title === 'create_user');
  assert.equal(createUser.page_token, 'N44ndTSrgoEBx7xCID5cXRS7n1c');

  gen.current_page_id = 'utility/delete_user.md';
  assert.equal(
    await gen.__convert_link('https://zilliverse.feishu.cn/docx/N44ndTSrgoEBx7xCID5cXRS7n1c'),
    'create_user.md'
  );
});

test('MilvusSdkDocsGen resolves stale Feishu docx links by label within the current SDK section', async () => {
  const gen = new MilvusSdkDocsGen();
  gen.records = [
    record('orm', 'v2-ORM', 'VirtualNode', 'ORM'),
    record('orm-utility', 'v2-ORM-utility', 'Module', 'utility', 'orm'),
    record('orm-create-user', 'v2-utility-create_user', 'Function', 'create_user()', 'orm-utility', 'current-orm-create-user'),
    record('orm-delete-user', 'v2-utility-delete_user', 'Function', 'delete_user()', 'orm-utility', 'current-orm-delete-user'),
    record('client', 'v2-MilvusClient', 'VirtualNode', 'MilvusClient'),
    record('client-auth', 'v2-MilvusClient-Authentication', 'Module', 'Authentication', 'client'),
    record('client-create-user', 'v2-Authentication-create_user', 'Function', 'create_user()', 'client-auth', 'current-client-create-user'),
    record('client-collection-schema', 'v2-MilvusClient-CollectionSchema', 'Class', 'CollectionSchema', 'client', 'current-client-collection-schema'),
    record('client-collection-schema-method', 'v2-CollectionSchema-construct_from_dict', 'Function', 'construct_from_dict', 'client-collection-schema', 'current-client-collection-schema-method'),
    record('client-collections', 'v2-MilvusClient-Collections', 'Module', 'Collections', 'client'),
    record('client-datatype', 'v2-Collections-DataType', 'Enum', 'DataType', 'client-collections', 'current-datatype'),
    record('orm-collection-schema', 'v2-ORM-CollectionSchema', 'Class', 'CollectionSchema', 'orm', 'current-orm-collection-schema'),
    record('orm-collection-schema-method', 'v2-CollectionSchema-construct_from_dict', 'Function', 'construct_from_dict', 'orm-collection-schema', 'current-orm-collection-schema-method'),
  ];
  await gen.__list_sources();

  gen.current_page_id = 'ORM/utility/delete_user.md';
  assert.equal(
    await gen.__convert_link('https://zilliverse.feishu.cn/docx/stale-create-user-token', 'create_user()'),
    'create_user.md'
  );

  gen.current_page_id = 'MilvusClient/StructFieldSchema/add_field.md';
  assert.equal(
    await gen.__convert_link('https://zilliverse.feishu.cn/docx/stale-datatype-token', 'datatype'),
    '../Collections/DataType.md'
  );

  gen.current_page_id = 'DataImport/VolumeBulkWriter/VolumeBulkWriter.md';
  assert.equal(
    await gen.__convert_link('https://zilliverse.feishu.cn/docx/stale-schema-token', 'CollectionSchema'),
    '../../MilvusClient/CollectionSchema/CollectionSchema.md'
  );
});

test('MilvusDocsGen skips unavailable reference_synced source documents', async () => {
  const gen = new MilvusDocsGen();
  gen.__fetch_doc_blocks = async () => null;

  const blocks = [
    {
      block_id: 'reference-block',
      parent_id: 'parent-block',
      block_type: 50,
      reference_synced: {
        source_document_id: 'okCAzpdAw3wo4ZqrxhjTLcEGBBn1S',
        source_block_id: 'SM7ld0ZsEoYLqaxVMZxcSH82n9f',
      },
    },
  ];

  const result = await gen.__get_reference_syncd_blocks(blocks);
  assert.equal(result, blocks);
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
