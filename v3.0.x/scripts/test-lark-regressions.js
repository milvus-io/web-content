const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const LarkDocWriter = require('./lib/larkDocWriter');
const LarkDriveWriter = require('./lib/larkDriveWriter');
const LarkDocScraper = require('./lib/larkDocScraper');
const MilvusDocsGen = require('./lib/milvusDocsGen');

async function withTempDir(callback) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'milvus-lark-regressions-'));
  try {
    return await callback(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

async function testIframeSkipImageDownloadUsesCaptionInTitle() {
  const writer = new LarkDocWriter(null, null, 'restfulSidebar', undefined, 'static/img', 'milvus', true, false);
  writer.downloader = {
    __fetchCaption: async () => ({
      nodes: {
        '1:2': {
          document: {
            name: 'figma-caption',
          },
        },
      },
    }),
  };

  const block = {
    block_id: 'block-1',
    iframe: {
      component: {
        iframe_type: 8,
        url: encodeURIComponent('https://www.figma.com/file/abc123/example?node-id=1-2'),
      },
    },
  };

  const markdown = await writer.__iframe(block);
  assert.equal(markdown, '![figma-caption](/img/figma-caption.png "figma-caption")');
}

async function testDriveWriterUsesDisplayedSidebarFrontmatterKey() {
  await withTempDir(async dir => {
    const writer = new LarkDriveWriter(null, null, 'restfulSidebar', dir, 'static/img', 'milvus', true, 'manual');
    writer.__fetch_doc_source = () => ({
      blocks: {
        items: [
          {
            block_type: 1,
            block_id: 'page-1',
            children: [],
          },
        ],
      },
    });
    writer.__write_page = async () => ({
      front_matter: '---\ntitle: "Doc"\n---',
      imports: '',
      markdown: 'body',
    });
    writer.__title_suffix = () => 'Milvus';
    writer.keyword_picker = () => [];

    await writer.write_doc({
      path: dir,
      page_title: 'Doc',
      page_slug: 'doc',
      page_type: 'docx',
      page_token: 'token-1',
      page_beta: 'false',
      notebook: 'false',
      sidebar_position: 1,
      sidebar_label: 'Doc',
      doc_card_list: false,
    });

    const output = fs.readFileSync(path.join(dir, 'doc.md'), 'utf8');
    assert.match(output, /displayed_sidebar: restfulSidebar/);
  });
}

function testDocScraperFetchBlockChildrenRecurses() {
  const scraper = new LarkDocScraper('root', 'base', 'drive', '/tmp');
  const node = {
    blocks: {
      items: [
        { block_id: 'root', children: ['a'] },
        { block_id: 'a', children: ['b'] },
        { block_id: 'b' },
      ],
    },
  };

  const children = scraper.__fetch_block_children(node.blocks.items[0], node);
  assert.deepEqual(children.map(item => item.block_id), ['a', 'b']);
}

async function testDriveWriterWritesMetadataFrontmatterFields() {
  await withTempDir(async dir => {
    const writer = new LarkDriveWriter(null, null, 'restfulSidebar', dir, 'static/img', 'milvus', true, 'manual');
    writer.__fetch_doc_source = () => ({
      blocks: {
        items: [
          {
            block_type: 1,
            block_id: 'page-1',
            children: [],
          },
        ],
      },
    });
    writer.__write_page = async () => ({
      front_matter: '---\ntitle: "Doc"\nslug: /restful/doc\n---',
      imports: '',
      markdown: 'body',
    });
    writer.__title_suffix = () => 'Milvus';
    writer.keyword_picker = () => [];

    await writer.write_doc({
      path: dir,
      page_title: 'Doc',
      page_slug: 'doc',
      page_type: 'docx',
      page_token: 'token-1',
      page_beta: 'false',
      notebook: 'false',
      sidebar_position: 1,
      sidebar_label: 'Doc',
      doc_card_list: false,
      addedSince: 'v2.6.0',
      lastModified: '2026-05-11',
      deprecateSince: 'v3.0.0',
    });

    const output = fs.readFileSync(path.join(dir, 'doc.md'), 'utf8');
    assert.match(output, /added_since: v2.6.0/);
    assert.match(output, /last_modified: 2026-05-11/);
    assert.match(output, /deprecate_since: v3.0.0/);
  });
}

async function testDriveWriterUsesUnprefixedSlugForGoSidebar() {
  await withTempDir(async dir => {
    const writer = new LarkDriveWriter(null, null, 'goSidebar', dir, 'static/img', 'milvus', true, 'manual');
    let seenSlug = null;

    writer.__fetch_doc_source = () => ({
      blocks: {
        items: [
          {
            block_type: 1,
            block_id: 'page-1',
            children: [],
          },
        ],
      },
    });
    writer.__write_page = async options => {
      seenSlug = options.slug;
      return {
        front_matter: '---\ntitle: "Doc"\nslug: /doc\n---',
        imports: '',
        markdown: 'body',
      };
    };
    writer.__title_suffix = () => 'Milvus';
    writer.keyword_picker = () => [];

    await writer.write_doc({
      path: dir,
      page_title: 'Doc',
      page_slug: 'doc',
      page_type: 'docx',
      page_token: 'token-1',
      page_beta: 'false',
      notebook: 'false',
      sidebar_position: 1,
      sidebar_label: 'Doc',
      doc_card_list: false,
    });

    assert.equal(seenSlug, 'doc');
  });
}

function testDriveWriterConstructorWiresUploadToS3Flag() {
  const writer = new LarkDriveWriter(null, null, 'restfulSidebar', '/tmp', 'static/img', 'milvus', true, true, 'manual');
  assert.equal(writer.upload_to_s3, true);
}

async function testMilvusDocsGenExpandsReferenceSyncedDescendants() {
  const gen = new MilvusDocsGen('base', 'drive', {}, 'static/img', []);
  gen.__fetch_doc_blocks = async () => [
    { block_id: 'src-root', block_type: 2, children: ['src-child'] },
    { block_id: 'src-child', block_type: 2, parent_id: 'src-root', children: ['src-grand'] },
    { block_id: 'src-grand', block_type: 2, parent_id: 'src-child' },
  ];

  const blocks = [
    { block_id: 'parent', block_type: 2, children: ['ref-1'] },
    {
      block_id: 'ref-1',
      block_type: 50,
      parent_id: 'parent',
      reference_synced: {
        source_document_id: 'source-doc',
        source_block_id: 'src-root',
      },
    },
  ];

  const merged = await gen.__get_reference_syncd_blocks(blocks);
  const ids = merged.map(block => block.block_id);

  assert.ok(ids.includes('src-root'));
  assert.ok(ids.includes('src-child'));
  assert.ok(ids.includes('src-grand'));
  assert.deepEqual(merged.find(block => block.block_id === 'parent').children, ['src-root']);
}

async function testMilvusDocsGenListSourcesFailsClearlyWithoutRecords() {
  const gen = new MilvusDocsGen('base:table', 'drive', {}, 'static/img', []);
  gen.__getBase = async () => {};

  await assert.rejects(
    async () => {
      await gen.__list_sources();
    },
    err => {
      assert.match(err.message, /Failed to load source records/);
      return true;
    }
  );
}

async function testMilvusDocsGenWriteDocAppliesMdxPatches() {
  const gen = new MilvusDocsGen('base', 'drive', {}, 'static/img', []);

  gen.__list_sources = async () => [
    {
      record_id: 'r1',
      page_id: 'index-explained.md',
      title: 'Index Explained',
      source_link: 'https://example.com/doc',
      page_token: 'token-1',
      label: 'Index Explained',
      keywords: [],
      beta: false,
      progress: 'done',
      parent: null,
    },
  ];

  const blocks = [
    { block_id: 'page', block_type: 1, children: [] },
    { block_id: 'summary', block_type: 2, text: { elements: [] } },
  ];

  gen.__fetch_doc_blocks = async () => blocks;
  gen.__get_reference_syncd_blocks = async input => input;
  gen.__raw_content = async () => 'summary';
  gen.__markdown = async () => 'raw-mdx';
  gen.__mdx_patches = async content => `${content}-patched`;
  gen.__filter_content = content => content;

  const result = await gen.write_doc('Index Explained');
  assert.equal(result.content, 'raw-mdx-patched');
}

async function run() {
  await testIframeSkipImageDownloadUsesCaptionInTitle();
  await testDriveWriterUsesDisplayedSidebarFrontmatterKey();
  testDocScraperFetchBlockChildrenRecurses();
  await testDriveWriterWritesMetadataFrontmatterFields();
  await testDriveWriterUsesUnprefixedSlugForGoSidebar();
  testDriveWriterConstructorWiresUploadToS3Flag();
  await testMilvusDocsGenExpandsReferenceSyncedDescendants();
  await testMilvusDocsGenListSourcesFailsClearlyWithoutRecords();
  await testMilvusDocsGenWriteDocAppliesMdxPatches();
  console.log('lark regression tests passed');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
