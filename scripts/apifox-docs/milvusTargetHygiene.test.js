const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const {buildIntegratedSpec, filterSelection} = require('./integratedSpecBuilder');
const {pruneUnreachableComponents} = require('./componentGraph');
const {resolveIncludeSpans} = require('./includeSpans');
const {loadSpecifications} = require('./specLoader');

const FRAGMENT_DIR = path.join(__dirname, 'meta', 'openapi');

// Vocabulary that only exists on Zilliz Cloud. zdoc shares the fragment set
// with the milvus.io RESTful reference (milvus-io/web-content regenerates its
// pages from these fragments), so any zilliz-only prose must be scoped before
// it can reach the milvus publication target — with
// `x-include-target: ["zilliz"]` on the node, or
// `<include target="zilliz">…</include>` around the sentence.
// "usage tracking" is deliberately absent from this list: tiered-storage usage
// tracking is a Milvus kernel feature
// (queryNode.segcore.tieredStorage.storageUsageTrackingEnabled) that both
// targets document. Add a token here only together with the fragment scoping
// that makes the assertion below pass.
const ZILLIZ_ONLY_TOKENS = [
  'Zilliz Cloud',
  'on-demand compute',
  'serving cluster',
  'Dedicated cluster',
  'Serverless',
  'BDU',
  'Public Preview',
];

function collectStrings(node, pointer, out = []) {
  if (typeof node === 'string') {
    out.push([pointer, node]);
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((child, index) => collectStrings(child, `${pointer}[${index}]`, out));
    return out;
  }
  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      collectStrings(value, `${pointer}.${key}`, out);
    }
  }
  return out;
}

const HTTP_METHODS = new Set(['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace']);

// The latest-data-plane builder prunes `spec.tags` by target but (without the
// track policy's tag selection) leaves operations whose primary tag was
// pruned. The milvus.io wrapper cascades the primary tag, so the guard mirrors
// that before scanning.
function dropOperationsOutsideTagSelection(spec) {
  const tagNames = new Set((spec.tags || []).map(tag => tag.name));
  for (const [endpoint, pathItem] of Object.entries(spec.paths || {})) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem?.[method];
      if (!operation) continue;
      const primaryTag = (operation.tags || [])[0];
      if (primaryTag && !tagNames.has(primaryTag)) {
        delete pathItem[method];
      }
    }
    if (pathItem && Object.keys(pathItem).length === 0) {
      delete spec.paths[endpoint];
    }
  }
}

function projectMilvusLatest(spec, protocolVersion) {
  const {spec: projected} = buildIntegratedSpec(spec, {
    apiSurface: 'data-plane',
    target: 'milvus',
    publicationPolicy: 'latest',
    protocolVersion,
    // Keep en-US language-scoped nodes in the scanned surface: milvus.io
    // publishes en-US, so a node restricted to other languages is genuinely
    // out of scope, but an en-US-only node under a milvus-published tag must
    // stay visible to the token scan.
    language: 'en-US',
  });
  dropOperationsOutsideTagSelection(projected);
  return pruneUnreachableComponents(projected).spec;
}

for (const protocolVersion of ['v1', 'v2']) {
  test(`milvus-target ${protocolVersion} publication carries no zilliz-only vocabulary`, () => {
    const merged = loadSpecifications(FRAGMENT_DIR);
    const spec = projectMilvusLatest(merged, protocolVersion);
    const offenders = [];
    for (const [pointer, raw] of collectStrings(spec, '$')) {
      const resolved = resolveIncludeSpans(raw, 'milvus');
      for (const token of ZILLIZ_ONLY_TOKENS) {
        if (resolved.toLowerCase().includes(token.toLowerCase())) {
          offenders.push(`${pointer} :: [${token}] ${resolved.replace(/\s+/g, ' ').slice(0, 140)}`);
          break;
        }
      }
    }
    assert.deepEqual(offenders, []);
  });
}

function fixture({admonitions, properties, required}) {
  return {
    openapi: '3.0.1',
    info: {title: 'fixture', version: '1.0.0'},
    tags: [{name: 'Vector Operations (V2)'}],
    paths: {
      '/v2/vectordb/entities/ping': {
        post: {
          tags: ['Vector Operations (V2)'],
          summary: 'Ping',
          description: 'Ping operation.',
          ...(admonitions ? {'x-admonition': admonitions} : {}),
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties,
                  ...(required ? {required} : {}),
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Pong.',
              content: {
                'application/json': {
                  schema: {type: 'object', properties: {code: {type: 'integer'}}},
                },
              },
            },
          },
        },
      },
    },
  };
}

test('x-admonition entries and request properties honor x-include-target under the milvus target', () => {
  const spec = fixture({
    admonitions: [
      {
        type: 'info',
        title: 'Milvus version compatibility',
        content: 'Zilliz Cloud house-style note.',
        'x-include-target': ['zilliz'],
      },
      {
        type: 'info',
        title: 'Shared note',
        content: 'Applies to both targets.',
      },
    ],
    properties: {
      collectionName: {type: 'string'},
      clusterId: {
        type: 'string',
        description: 'On-demand cluster id.',
        'x-include-target': ['zilliz'],
      },
    },
    required: ['collectionName', 'clusterId'],
  });

  const options = {target: 'milvus'};
  const operation = filterSelection(
    spec.paths['/v2/vectordb/entities/ping'].post,
    options,
    {omittedElements: 0},
  );

  assert.deepEqual(
    operation['x-admonition'].map(entry => entry.title),
    ['Shared note'],
  );
  const schema = operation.requestBody.content['application/json'].schema;
  assert.deepEqual(Object.keys(schema.properties), ['collectionName']);
  // `required` must be re-synced to the retained properties.
  assert.deepEqual(schema.required, ['collectionName']);
});

test('unscoped admonition entries survive the milvus target untouched', () => {
  const spec = fixture({
    admonitions: [
      {type: 'info', title: 'Note', content: 'External collections do not support this operation.'},
    ],
    properties: {collectionName: {type: 'string'}},
    required: ['collectionName'],
  });

  const operation = filterSelection(
    spec.paths['/v2/vectordb/entities/ping'].post,
    {target: 'milvus'},
    {omittedElements: 0},
  );

  assert.equal(operation['x-admonition'].length, 1);
  assert.equal(operation['x-admonition'][0].content, 'External collections do not support this operation.');
});

test('includeSpans resolution semantics', () => {
  assert.equal(resolveIncludeSpans('<include target="zilliz">Zilliz Cloud</include> rocks', 'milvus'), ' rocks');
  assert.equal(resolveIncludeSpans('<include target="zilliz">Zilliz Cloud</include> rocks', 'zilliz'), 'Zilliz Cloud rocks');
  assert.equal(resolveIncludeSpans('<exclude target="milvus"> with usage tracking</exclude>', 'milvus'), '');
  assert.equal(resolveIncludeSpans('<exclude target="milvus"> with usage tracking</exclude>', 'zilliz'), ' with usage tracking');
  // The call-site target may be a dot-joined composite (target.lang); the span
  // matches when its single target appears in that list.
  assert.equal(resolveIncludeSpans('<include target="milvus">Both</include>', 'milvus.en-US'), 'Both');
  // Nested spans resolve innermost-first.
  assert.equal(
    resolveIncludeSpans('<include target="zilliz">outer <include target="milvus">inner</include></include>', 'milvus'),
    '',
  );
  assert.equal(
    resolveIncludeSpans('<include target="zilliz">outer <exclude target="milvus">inner</exclude></include>', 'zilliz'),
    'outer inner',
  );
  // Plain text passes through untouched.
  assert.equal(resolveIncludeSpans('no spans here', 'milvus'), 'no spans here');
});
