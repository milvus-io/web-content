const test = require('node:test')
const assert = require('node:assert/strict')
const {downgradeDocument, assertIdempotent} = require('./oasDowngrade')

test('golden: 3.1 schema constructs map deterministically to 3.0.3', () => {
    const input = {
        openapi: '3.1.0',
        info: {title: 'Cloud API', version: 'v1', summary: 'ignored in 3.0'},
        jsonSchemaDialect: 'https://json-schema.org/draft/2020-12/schema',
        paths: {
            '/v2/usage/query': {
                post: {
                    responses: {
                        '200': {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: ['object', 'null'],
                                        properties: {
                                            limit: {type: 'integer', exclusiveMinimum: 0, maximum: 10},
                                            mode: {const: 'fast'},
                                            samples: {examples: ['a', 'b']},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    }
    const output = downgradeDocument(input)
    assert.equal(output.openapi, '3.0.3')
    assert.ok(!('jsonSchemaDialect' in output))
    assert.ok(!('summary' in output.info))

    const schema = output.paths['/v2/usage/query'].post.responses['200'].content['application/json'].schema
    assert.deepEqual(schema, {
        type: 'object',
        nullable: true,
        properties: {
            limit: {type: 'integer', minimum: 0, exclusiveMinimum: true, maximum: 10},
            mode: {enum: ['fast']},
            samples: {example: 'a'},
        },
    })
    assertIdempotent(output)
})

test('3.0.x documents pass through unchanged', () => {
    const document = {openapi: '3.0.3', info: {title: 'x', version: '1'}, paths: {}}
    assert.deepEqual(downgradeDocument(document), document)
})

test('unmappable 3.1 constructs fail closed with a JSON path', () => {
    const base = () => ({openapi: '3.1.0', info: {title: 'x', version: '1'}, paths: {}})
    assert.throws(
        () => downgradeDocument({...base(), components: {schemas: {S: {prefixItems: []}}}}),
        /REST_UPSTREAM_OAS_UNMAPPABLE.*\/components\/schemas\/S\/prefixItems/,
    )
    assert.throws(
        () => downgradeDocument({...base(), components: {pathItems: {}}}),
        /REST_UPSTREAM_OAS_UNMAPPABLE.*pathItems/,
    )
    assert.throws(() => downgradeDocument({...base(), webhooks: {}}), /REST_UPSTREAM_OAS_UNMAPPABLE.*webhooks/)
    assert.throws(
        () => downgradeDocument({...base(), paths: {p: {post: {requestBody: {content: {'application/json': {schema: {type: ['object', 'array']}}}}}}}}),
        /REST_UPSTREAM_OAS_UNMAPPABLE.*only single-type-with-null/,
    )
    assert.throws(() => downgradeDocument({...base(), openapi: '2.0'}), /REST_UPSTREAM_OAS_VERSION_UNSUPPORTED/)
    assert.throws(() => downgradeDocument({}), /REST_UPSTREAM_OAS_VERSION_MISSING/)
})
