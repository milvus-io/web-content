const assert = require('node:assert/strict');
const Module = require('node:module');
const LarkDocWriter = require('./larkDocWriter');

function textRun(content, style = {}) {
  return {
    text_run: {
      content,
      text_element_style: {
        bold: false,
        inline_code: false,
        italic: false,
        strikethrough: false,
        underline: false,
        ...style,
      },
    },
  };
}

function textBlock(block_id, parent_id, elements) {
  return {
    block_id,
    block_type: 2,
    parent_id,
    text: {
      elements,
      style: { align: 1, folded: false },
    },
  };
}

function bulletBlock(block_id, parent_id, elements, children = []) {
  return {
    block_id,
    block_type: 12,
    parent_id,
    bullet: {
      elements,
      style: { align: 1, folded: false },
    },
    ...(children.length ? { children } : {}),
  };
}

function createWriter(blocks) {
  const writer = new LarkDocWriter('', '', 'default');
  writer.page_blocks = blocks;
  writer.targets = 'zilliz';
  return writer;
}

async function assertMdxCompiles(markdown) {
  const { compile } = await import('@mdx-js/mdx');
  const remarkMath = (await import('remark-math')).default;
  await compile(`import Admonition from '@theme/Admonition';\n\n${markdown}`, {
    development: false,
    remarkPlugins: [remarkMath],
  });
}

function testExampleHttpUrlsSkipsInlineCodeSpans() {
  const writer = createWriter([]);
  const markdown = '`https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com`';
  const result = writer.__example_http_urls(markdown);
  assert.equal(result, markdown);
}

function testKeywordPickerUsesStableSeed() {
  const writer = createWriter([]);
  assert.deepEqual(
    writer.keyword_picker('Authentication-create_user:create_user()'),
    writer.keyword_picker('Authentication-create_user:create_user()')
  );
}

async function testCalloutPreservesMarkdownBody() {
  const callout = {
    block_id: 'callout',
    block_type: 19,
    callout: { emoji_id: 'blue_book' },
    children: ['title', 'intro', 'managed', 'external'],
  };

  const blocks = [
    callout,
    textBlock('title', 'callout', [textRun('Notes')]),
    textBlock('intro', 'callout', [textRun('This method applies only to dedicated serving clusters and on-demand compute.')]),
    bulletBlock('managed', 'callout', [
      textRun('For a managed collection in serving clusters, please create '),
      textRun('MilvusClient', { bold: true }),
      textRun(' with the cluster endpoint.'),
    ], ['free', 'dedicated']),
    bulletBlock('free', 'managed', [textRun('Free & Serverless', { bold: true })], ['free-url']),
    textBlock('free-url', 'free', [textRun('https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com', { inline_code: true })]),
    bulletBlock('dedicated', 'managed', [textRun('Dedicated', { bold: true })], ['dedicated-url']),
    textBlock('dedicated-url', 'dedicated', [textRun('https://{cluster-id}.{region}.vectordb.zillizcloud.com:19530', { inline_code: true })]),
    bulletBlock('external', 'callout', [
      textRun('For an external collection for on-demand compute, create '),
      textRun('MilvusClient', { bold: true }),
      textRun(' with the project endpoints.'),
    ], ['external-url']),
    textBlock('external-url', 'external', [textRun('https://{project-id}.{region}.api.zillizcloud.com', { inline_code: true })]),
  ];

  const markdown = await createWriter(blocks).__callout(callout, 0);

  assert.match(markdown, /<Admonition type="info" icon="📘" title="Notes">/);
  assert.match(markdown, /- For a managed collection in serving clusters, please create \*\*MilvusClient\*\* with the cluster endpoint\./);
  assert.match(markdown, /    - \*\*Free & Serverless\*\*/);
  assert.match(markdown, /        `https:\/\/\{cluster-id\}\.serverless\.\{region\}\.vectordb\.zillizcloud\.com`/);
  assert.doesNotMatch(markdown, /<ul>|<li>|<p>/);

  await assertMdxCompiles(markdown);
}

async function testQuotePreservesMarkdownBody() {
  const quote = {
    block_id: 'quote',
    block_type: 34,
    children: ['title', 'intro', 'managed'],
  };

  const blocks = [
    quote,
    textBlock('title', 'quote', [textRun('Notes')]),
    textBlock('intro', 'quote', [textRun('Use the matching endpoint for your deployment type.')]),
    bulletBlock('managed', 'quote', [textRun('Serving clusters')], ['free']),
    bulletBlock('free', 'managed', [textRun('Free & Serverless', { bold: true })], ['free-url']),
    textBlock('free-url', 'free', [textRun('https://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com', { inline_code: true })]),
  ];

  const markdown = await createWriter(blocks).__quote(quote, 0);

  assert.match(markdown, /<Admonition type="info" icon="📘" title="Notes">/);
  assert.match(markdown, /- Serving clusters/);
  assert.match(markdown, /    - \*\*Free & Serverless\*\*/);
  assert.match(markdown, /        `https:\/\/\{cluster-id\}\.serverless\.\{region\}\.vectordb\.zillizcloud\.com`/);
  assert.doesNotMatch(markdown, /<ul>|<li>|<p>/);

  await assertMdxCompiles(markdown);
}

async function testListedDocsRetriesPrematureClose() {
  const originalLoad = Module._load;
  const originalRetryDelay = process.env.FEISHU_RETRY_DELAY_MS;
  let recordsFetches = 0;

  try {
    process.env.FEISHU_RETRY_DELAY_MS = '1';

    Module._load = function patchedLoad(request, parent, isMain) {
      if (request === 'node-fetch') {
        return async function mockedFetch(url, options) {
          assert.equal(options.compress, false);
          assert.equal(options.headers['Accept-Encoding'], 'identity');

          if (String(url).includes('/tables/') && String(url).includes('/records')) {
            recordsFetches += 1;

            if (recordsFetches === 1) {
              const error = new Error('Premature close');
              error.code = 'ERR_STREAM_PREMATURE_CLOSE';
              error.type = 'system';
              throw error;
            }

            return {
              status: 200,
              headers: { get: () => null },
              text: async () => JSON.stringify({ code: 0, data: { items: [{ fields: { Docs: { text: 'Doc', link: 'https://example.com/doc' }, Slug: 'doc' } }] } }),
            };
          }

          return {
            status: 200,
            headers: { get: () => null },
            text: async () => JSON.stringify({ code: 0, data: { items: [{ table_id: 'tbl' }] } }),
          };
        };
      }

      return originalLoad.apply(this, arguments);
    };

    delete require.cache[require.resolve('./feishuFetch')];
    delete require.cache[require.resolve('./larkDocWriter')];
    const WriterWithMockedFetch = require('./larkDocWriter');
    Module._load = originalLoad;

    const writer = new WriterWithMockedFetch('', 'base', 'default');
    writer.tokenFetcher = { token: async () => 'tenant-token' };
    process.env.FEISHU_HOST = 'https://open.feishu.cn';

    await writer.__listed_docs();

    assert.equal(recordsFetches, 2);
    assert.equal(writer.records.length, 1);
  } finally {
    Module._load = originalLoad;
    if (originalRetryDelay === undefined) {
      delete process.env.FEISHU_RETRY_DELAY_MS;
    } else {
      process.env.FEISHU_RETRY_DELAY_MS = originalRetryDelay;
    }
  }
}

async function run() {
  testExampleHttpUrlsSkipsInlineCodeSpans();
  testKeywordPickerUsesStableSeed();
  await testCalloutPreservesMarkdownBody();
  await testQuotePreservesMarkdownBody();
  await testListedDocsRetriesPrematureClose();
  console.log('larkDocWriter tests passed');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
