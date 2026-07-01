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

async function run() {
  await testFeishuJsonFetchesAreThrottled();
  await testSlugifyRejectsAmbiguousTitleFallback();
  await testSlugifyResolvesAmbiguousTitleWithParentContext();
  await testDriveFolderSlugifyUsesParentContext();
  await testDriveFolderRecursionKeepsSiblingParentContext();
  console.log('lark-docs scraper tests passed');
}

run();
