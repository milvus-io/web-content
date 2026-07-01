const assert = require('node:assert/strict');
const Module = require('node:module');

async function testBoardPreviewRetriesPrematureClose() {
  const originalLoad = Module._load;
  let boardFetches = 0;

  try {
    Module._load = function patchedLoad(request, parent, isMain) {
      if (request === 'node-fetch') {
        return async function mockedFetch(url, options) {
          assert.equal(options.compress, false);
          assert.equal(options.headers['Accept-Encoding'], 'identity');

          if (String(url).includes('/tenant_access_token/')) {
            return {
              status: 200,
              headers: { get: () => null },
              text: async () => JSON.stringify({ code: 0, tenant_access_token: 'tenant-token', expire: 7200 }),
            };
          }

          if (String(url).includes('/download_as_image')) {
            boardFetches += 1;

            if (boardFetches === 1) {
              const error = new Error('Premature close');
              error.code = 'ERR_STREAM_PREMATURE_CLOSE';
              error.type = 'system';
              throw error;
            }

            return {
              ok: true,
              status: 200,
              statusText: 'OK',
              headers: { get: () => 'image/png' },
              buffer: async () => Buffer.from('png'),
            };
          }

          throw new Error(`Unexpected fetch URL: ${url}`);
        };
      }

      return originalLoad.apply(this, arguments);
    };

    delete require.cache[require.resolve('./feishuFetch')];
    delete require.cache[require.resolve('./larkTokenFetcher')];
    delete require.cache[require.resolve('./larkImageDownloader')];
    const LarkImageDownloader = require('./larkImageDownloader');
    Module._load = originalLoad;

    const downloader = new LarkImageDownloader({}, '/tmp');
    downloader.__wait = async () => {};
    process.env.FEISHU_HOST = 'https://open.feishu.cn';

    const res = await downloader.__downloadBoardPreview('board-token');

    assert.equal(res.status, 200);
    assert.equal(boardFetches, 2);
  } finally {
    Module._load = originalLoad;
  }
}

async function run() {
  await testBoardPreviewRetriesPrematureClose();
  console.log('lark image downloader tests passed');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
