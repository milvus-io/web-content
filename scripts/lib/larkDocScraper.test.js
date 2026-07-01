const assert = require('node:assert/strict');
const Module = require('node:module');

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

async function run() {
  await testFeishuJsonFetchesAreThrottled();
  await testSlugifyRejectsAmbiguousTitleFallback();
  console.log('lark-docs scraper tests passed');
}

run();
