const test = require('node:test');
const assert = require('node:assert/strict');
const {
  assertNoDanglingLocalRefs,
  collectReachableRefs,
  pruneUnreachableComponents,
} = require('./componentGraph');

function baseSpec() {
  return {
    openapi: '3.0.1',
    info: {title: 'graph', version: '1.0.0'},
    paths: {
      '/search': {
        post: {
          tags: ['Search'],
          requestBody: {
            content: {
              'application/json': {
                schema: {$ref: '#/components/schemas/SearchRequest'},
              },
            },
          },
          responses: {
            200: {
              description: 'ok',
              content: {
                'application/json': {
                  schema: {$ref: '#/components/schemas/SearchResult'},
                },
              },
            },
          },
        },
      },
    },
    webhooks: {
      searchReady: {
        post: {
          requestBody: {
            content: {
              'application/json': {
                schema: {$ref: '#/components/schemas/SearchResult'},
              },
            },
          },
          responses: {200: {description: 'ok'}},
        },
      },
    },
    components: {
      schemas: {
        SearchRequest: {
          type: 'object',
          properties: {
            result: {$ref: '#/components/schemas/SearchResult'},
          },
        },
        SearchResult: {type: 'object'},
        Unused: {type: 'string'},
      },
      parameters: {
        SearchLimit: {name: 'limit', in: 'query', schema: {type: 'integer'}},
        UnusedParam: {name: 'unused', in: 'query', schema: {type: 'string'}},
      },
      securitySchemes: {
        ApiKeyAuth: {type: 'apiKey', in: 'header', name: 'X-API-Key'},
      },
    },
    security: [{ApiKeyAuth: []}],
  };
}

test('collects reachable refs from paths, webhooks, and security roots', () => {
  const refs = collectReachableRefs(baseSpec());
  assert.deepEqual([...refs].sort(), [
    '#/components/schemas/SearchRequest',
    '#/components/schemas/SearchResult',
  ]);
});

test('prunes unreachable components and preserves security schemes', () => {
  const original = baseSpec();
  const {spec, stats} = pruneUnreachableComponents(original);
  assert.ok(spec.components.schemas.SearchRequest);
  assert.ok(spec.components.schemas.SearchResult);
  assert.equal(spec.components.schemas.Unused, undefined);
  assert.equal(spec.components.parameters?.SearchLimit, undefined);
  assert.equal(spec.components.parameters?.UnusedParam, undefined);
  assert.ok(spec.components.securitySchemes.ApiKeyAuth);
  assert.equal(stats.removed, 3);
  assert.equal(original.components.schemas.Unused.type, 'string');
});

test('handles cyclic component refs without revisiting endlessly', () => {
  const spec = baseSpec();
  spec.components.schemas.SearchRequest.properties.result = {$ref: '#/components/schemas/SearchRequest'};
  const {spec: pruned} = pruneUnreachableComponents(spec);
  assert.ok(pruned.components.schemas.SearchRequest);
});

test('reports missing local references', () => {
  const spec = baseSpec();
  spec.paths['/search'].post.responses[200].content['application/json'].schema =
    {$ref: '#/components/schemas/Missing'};
  assert.throws(
    () => assertNoDanglingLocalRefs(spec),
    /REST_OPENAPI_REF_MISSING.*#\/components\/schemas\/Missing/,
  );
});
