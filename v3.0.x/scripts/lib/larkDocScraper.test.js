const assert = require('node:assert/strict');
const Module = require('node:module');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

async function testFeishuJsonFetchesAreThrottled() {
  const originalLoad = Module._load;
  let activeFetches = 0;
  let maxActiveFetches = 0;

  Module._load = function patchedLoad(request, parent, isMain) {
    if (request === 'node-fetch') {
      return async function mockedFetch() {
        activeFetches += 1;
        maxActiveFetches = Math.max(maxActiveFetches, activeFetches);

        await new Promise(resolve => setTimeout(resolve, 20));

        activeFetches -= 1;
        return {
          status: 200,
          headers: { get: () => null },
          text: async () => '{"code":0,"data":{}}',
        };
      };
    }

    return originalLoad.apply(this, arguments);
  };

  delete require.cache[require.resolve('./larkDocScraper')];
  const larkDocScraper = require('./larkDocScraper');
  Module._load = originalLoad;

  const scraper = new larkDocScraper('', '', 'wiki', '/tmp');
  scraper.token = 'tenant-token';

  await Promise.all([
    scraper.__fetchFeishuJson('https://open.feishu.cn/a', {}, 'a'),
    scraper.__fetchFeishuJson('https://open.feishu.cn/b', {}, 'b'),
    scraper.__fetchFeishuJson('https://open.feishu.cn/c', {}, 'c'),
  ]);

  assert.equal(maxActiveFetches, 1);

  delete require.cache[require.resolve('./larkDocScraper')];
  delete require.cache[require.resolve('./feishuFetch')];
  delete require.cache[require.resolve('./larkTokenFetcher.js')];
}

async function testSlugifyRejectsAmbiguousTitleFallback() {
  const larkDocScraper = require('./larkDocScraper');
  const scraper = new larkDocScraper('', '', 'wiki', '/tmp');

  scraper.slugs = {
    N44ndTSrgoEBx7xCID5cXRS7n1c: {
      slug: 'utility-create_user',
      title: 'create_user()',
    },
    BDupd28JqoNY9HxVOTfcv86enRe: {
      slug: 'Authentication-create_user',
      title: 'create_user()',
    },
  };

  await assert.rejects(
    () => scraper.__slugify('EglSdm1jkozDSlxq6SEc4CRonVe', 'create_user()'),
    /Ambiguous slug metadata/
  );
}

async function testSlugifyResolvesAmbiguousTitleWithParentContext() {
  const larkDocScraper = require('./larkDocScraper');
  const scraper = new larkDocScraper('', '', 'wiki', '/tmp');

  scraper.slugs = {
    WToudUwm4oVXeKxLg3jcj3IAnjh: {
      slug: 'ORM-CollectionSchema',
      title: 'CollectionSchema',
    },
    WVy8dc7Jaonoxqxk7Cvc72KSnvb: {
      slug: 'MilvusClient-CollectionSchema',
      title: 'CollectionSchema',
    },
  };

  assert.equal(
    await scraper.__slugify('CFK5fYjallg3eZdIWqfcdin8noc', 'CollectionSchema', 'MilvusClient'),
    'MilvusClient-CollectionSchema'
  );
}

async function testSlugifyResolvesAmbiguousTitleWithCompositeParentContext() {
  const larkDocScraper = require('./larkDocScraper');
  const scraper = new larkDocScraper('', '', 'wiki', '/tmp');

  scraper.slugs = {
    Bzb6dwkckop6XfxVm2lclXG2nJg: {
      slug: 'Collection-hybrid_search',
      title: 'hybrid_search()',
    },
    NEyWdddQ8oKCw4xQTFPcvDTLn3f: {
      slug: 'Vector-hybrid_search',
      title: 'hybrid_search()',
    },
  };

  assert.equal(
    await scraper.__slugify('QqOSdTDaLoOKGRxiKEtcuuiAnrf', 'hybrid_search()', 'MilvusClient-Vector'),
    'Vector-hybrid_search'
  );
}

async function testSlugifyResolvesAmbiguousTitleWithBitableParentMetadata() {
  const larkDocScraper = require('./larkDocScraper');
  const scraper = new larkDocScraper('', '', 'wiki', '/tmp');

  scraper.slugs = {
    TG3Rd9aM5offvFxKy2CcKXn9nWc: {
      slug: 'CollectionSchema-add_field',
      title: 'add_field()',
      parent_slug: 'ORM-CollectionSchema',
    },
    X1L2dAjDyo7yqOxqWELcBRBUndd: {
      slug: 'CollectionSchema-add_field_1',
      title: 'add_field()',
      parent_slug: 'MilvusClient-CollectionSchema',
    },
  };

  assert.equal(
    await scraper.__slugify('H9IFdpWWUouzXOxKlx9cImP8nnd', 'add_field()', 'MilvusClient-CollectionSchema'),
    'CollectionSchema-add_field_1'
  );
}

async function testSlugifyPrefersExactSlugForAmbiguousSectionTitle() {
  const larkDocScraper = require('./larkDocScraper');
  const scraper = new larkDocScraper('', '', 'wiki', '/tmp');

  scraper.slugs = {
    B2fdfjb1nl9Pjidkaa9cM6lAngd: {
      slug: 'MilvusClient',
      title: 'MilvusClient',
    },
    SojTdgw1joOuA8xMzb5cMUFYnce: {
      slug: 'Client-MilvusClient',
      title: 'MilvusClient',
    },
  };

  assert.equal(
    await scraper.__slugify('BBPZfcRbOlWEnjdbIJgc3wgynsg', 'MilvusClient'),
    'MilvusClient'
  );
}

async function testBaseCapturesRecordIdParentMetadata() {
  const larkDocScraper = require('./larkDocScraper');
  const tokenFetcher = require('./larkTokenFetcher.js');
  const scraper = new larkDocScraper('', 'base-token', 'wiki', '/tmp');
  const originalFetchToken = tokenFetcher.prototype.fetchToken;
  const originalToken = tokenFetcher.prototype.token;

  tokenFetcher.prototype.fetchToken = async function fetchToken() {
    this.tenantAccessToken = 'tenant-token';
  };
  tokenFetcher.prototype.token = async () => 'tenant-token';

  scraper.__fetchFeishuJson = async (url) => {
    if (url.includes('/tables?')) {
      return {
        code: 0,
        data: {
          items: [{ table_id: 'table-token' }],
        },
      };
    }

    if (url.includes('/views')) {
      return {
        code: 0,
        data: {
          items: [],
        },
      };
    }

    if (url.includes('/records')) {
      return {
        code: 0,
        data: {
          items: [
            {
              record_id: 'orm-parent-record',
              fields: {
                'Seq. ID': '1',
                Docs: { text: 'CollectionSchema', link: 'https://example.feishu.cn/docx/orm-parent-token' },
                Slug: 'ORM-CollectionSchema',
              },
            },
            {
              record_id: 'client-parent-record',
              fields: {
                'Seq. ID': '2',
                Docs: { text: 'CollectionSchema', link: 'https://example.feishu.cn/docx/client-parent-token' },
                Slug: 'MilvusClient-CollectionSchema',
              },
            },
            {
              record_id: 'orm-add-field-record',
              fields: {
                'Seq. ID': '3',
                Docs: { text: 'add_field()', link: 'https://example.feishu.cn/docx/orm-add-field-token' },
                Slug: 'CollectionSchema-add_field',
                '父记录': [{ record_ids: ['orm-parent-record'] }],
              },
            },
            {
              record_id: 'client-add-field-record',
              fields: {
                'Seq. ID': '4',
                Docs: { text: 'add_field()', link: 'https://example.feishu.cn/docx/client-add-field-token' },
                Slug: 'CollectionSchema-add_field',
                '父记录': [{ record_ids: ['client-parent-record'] }],
              },
            },
          ],
        },
      };
    }

    throw new Error(`Unexpected URL: ${url}`);
  };

  try {
    await scraper.__base();
  } finally {
    tokenFetcher.prototype.fetchToken = originalFetchToken;
    tokenFetcher.prototype.token = originalToken;
  }

  assert.equal(scraper.slugs['client-add-field-token'].parent_slug, 'MilvusClient-CollectionSchema');
  assert.equal(
    await scraper.__slugify('H9IFdpWWUouzXOxKlx9cImP8nnd', 'add_field()', 'MilvusClient-CollectionSchema'),
    'CollectionSchema-add_field_1'
  );
}

async function testBasePreservesDuplicateDocTokenSlugsByParentContext() {
  const larkDocScraper = require('./larkDocScraper');
  const tokenFetcher = require('./larkTokenFetcher.js');
  const scraper = new larkDocScraper('', 'base-token', 'wiki', '/tmp');
  const originalFetchToken = tokenFetcher.prototype.fetchToken;
  const originalToken = tokenFetcher.prototype.token;

  tokenFetcher.prototype.fetchToken = async function fetchToken() {
    this.tenantAccessToken = 'tenant-token';
  };
  tokenFetcher.prototype.token = async () => 'tenant-token';

  scraper.__fetchFeishuJson = async (url) => {
    if (url.includes('/tables?page_size=100')) {
      return {
        code: 0,
        data: {
          items: [{ table_id: 'table-token' }],
        },
      };
    }

    if (url.includes('/views?page_size=100')) {
      return {
        code: 0,
        data: {
          items: [],
        },
      };
    }

    if (url.includes('/records')) {
      return {
        code: 0,
        data: {
          items: [
            {
              record_id: 'orm-parent-record',
              fields: {
                'Seq. ID': '1',
                Docs: { text: 'utility', link: 'https://example.feishu.cn/docx/orm-parent-token' },
                Slug: 'ORM-utility',
              },
            },
            {
              record_id: 'client-parent-record',
              fields: {
                'Seq. ID': '2',
                Docs: { text: 'Authentication', link: 'https://example.feishu.cn/docx/client-parent-token' },
                Slug: 'MilvusClient-Authentication',
              },
            },
            {
              record_id: 'orm-create-user-record',
              fields: {
                'Seq. ID': '3',
                Docs: { text: 'create_user()', link: 'https://example.feishu.cn/docx/shared-create-user-token' },
                Slug: 'utility-create_user',
                '父记录': [{ record_ids: ['orm-parent-record'] }],
              },
            },
            {
              record_id: 'client-create-user-record',
              fields: {
                'Seq. ID': '4',
                Docs: { text: 'create_user()', link: 'https://example.feishu.cn/docx/shared-create-user-token' },
                Slug: 'Authentication-create_user',
                '父记录': [{ record_ids: ['client-parent-record'] }],
              },
            },
          ],
        },
      };
    }

    throw new Error(`Unexpected URL: ${url}`);
  };

  try {
    await scraper.__base();
  } finally {
    tokenFetcher.prototype.fetchToken = originalFetchToken;
    tokenFetcher.prototype.token = originalToken;
  }

  assert.equal(
    await scraper.__slugify('shared-create-user-token', 'create_user()', 'MilvusClient-Authentication'),
    'Authentication-create_user'
  );
  assert.equal(
    await scraper.__slugify('shared-create-user-token', 'create_user()', 'ORM-utility'),
    'utility-create_user'
  );
}

async function testDriveFolderSlugifyUsesParentContext() {
  const larkDocScraper = require('./larkDocScraper');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-doc-scraper-'));
  const scraper = new larkDocScraper('', '', 'drive', tempDir);

  scraper.docs = {
    token: 'CFK5fYjallg3eZdIWqfcdin8noc',
    name: 'CollectionSchema',
  };
  scraper.slugs = {
    WToudUwm4oVXeKxLg3jcj3IAnjh: {
      slug: 'ORM-CollectionSchema',
      title: 'CollectionSchema',
    },
    WVy8dc7Jaonoxqxk7Cvc72KSnvb: {
      slug: 'MilvusClient-CollectionSchema',
      title: 'CollectionSchema',
    },
  };
  scraper.__fetchFeishuJson = async () => ({
    code: 0,
    data: {
      files: [],
    },
  });

  await scraper.__fetch_drive_children('CFK5fYjallg3eZdIWqfcdin8noc', null, false, 'MilvusClient');

  assert.equal(scraper.docs.slug, 'MilvusClient-CollectionSchema');
}

async function testDriveFolderRecursionKeepsSiblingParentContext() {
  const larkDocScraper = require('./larkDocScraper');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-doc-scraper-'));
  const scraper = new larkDocScraper('', '', 'drive', tempDir);

  scraper.docs = {
    token: 'root-token',
    name: 'v2',
  };
  scraper.slugs = {
    'root-token': { slug: 'v2', title: 'v2' },
    'orm-folder-token': { slug: 'ORM', title: 'ORM' },
    'client-folder-token': { slug: 'MilvusClient', title: 'MilvusClient' },
    WToudUwm4oVXeKxLg3jcj3IAnjh: {
      slug: 'ORM-CollectionSchema',
      title: 'CollectionSchema',
    },
    WVy8dc7Jaonoxqxk7Cvc72KSnvb: {
      slug: 'MilvusClient-CollectionSchema',
      title: 'CollectionSchema',
    },
  };
  scraper.__fetchFeishuJson = async (url) => {
    if (url.includes('folder_token=root-token')) {
      return {
        code: 0,
        data: {
          files: [
            { token: 'orm-folder-token', name: 'ORM', type: 'folder' },
            { token: 'client-folder-token', name: 'MilvusClient', type: 'folder' },
          ],
        },
      };
    }

    if (url.includes('folder_token=orm-folder-token')) {
      return {
        code: 0,
        data: {
          files: [],
        },
      };
    }

    if (url.includes('folder_token=client-folder-token')) {
      return {
        code: 0,
        data: {
          files: [
            { token: 'CFK5fYjallg3eZdIWqfcdin8noc', name: 'CollectionSchema', type: 'folder' },
          ],
        },
      };
    }

    if (url.includes('folder_token=CFK5fYjallg3eZdIWqfcdin8noc')) {
      return {
        code: 0,
        data: {
          files: [],
        },
      };
    }

    throw new Error(`Unexpected URL: ${url}`);
  };

  await scraper.__fetch_drive_children('root-token', null, true);

  const collectionSchema = JSON.parse(fs.readFileSync(path.join(tempDir, 'CFK5fYjallg3eZdIWqfcdin8noc.json'), 'utf8'));
  assert.equal(collectionSchema.slug, 'MilvusClient-CollectionSchema');
}

async function testDriveDocSlugifyUsesCompositeParentContext() {
  const larkDocScraper = require('./larkDocScraper');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-doc-scraper-'));
  const scraper = new larkDocScraper('', '', 'drive', tempDir);

  scraper.docs = {
    token: 'vector-folder-token',
    name: 'Vector',
    slug: 'MilvusClient-Vector',
  };
  scraper.slugs = {
    Bzb6dwkckop6XfxVm2lclXG2nJg: {
      slug: 'Collection-hybrid_search',
      title: 'hybrid_search()',
    },
    NEyWdddQ8oKCw4xQTFPcvDTLn3f: {
      slug: 'Vector-hybrid_search',
      title: 'hybrid_search()',
    },
  };
  scraper.__fetchFeishuJson = async () => ({
    code: 0,
    data: {
      files: [
        { token: 'QqOSdTDaLoOKGRxiKEtcuuiAnrf', name: 'hybrid_search()', type: 'docx' },
      ],
    },
  });
  scraper.__fetch_blocks = async (node) => {
    node.blocks = { items: [{ block_id: 'block-1' }] };
  };

  await scraper.__fetch_drive_children('vector-folder-token', null, true, 'MilvusClient');

  const hybridSearch = JSON.parse(fs.readFileSync(path.join(tempDir, 'QqOSdTDaLoOKGRxiKEtcuuiAnrf.json'), 'utf8'));
  assert.equal(hybridSearch.slug, 'Vector-hybrid_search');
}

async function run() {
  await testFeishuJsonFetchesAreThrottled();
  await testSlugifyRejectsAmbiguousTitleFallback();
  await testSlugifyResolvesAmbiguousTitleWithParentContext();
  await testSlugifyResolvesAmbiguousTitleWithCompositeParentContext();
  await testSlugifyResolvesAmbiguousTitleWithBitableParentMetadata();
  await testSlugifyPrefersExactSlugForAmbiguousSectionTitle();
  await testBaseCapturesRecordIdParentMetadata();
  await testBasePreservesDuplicateDocTokenSlugsByParentContext();
  await testDriveFolderSlugifyUsesParentContext();
  await testDriveFolderRecursionKeepsSiblingParentContext();
  await testDriveDocSlugifyUsesCompositeParentContext();
  console.log('lark-docs scraper tests passed');
}

run();
