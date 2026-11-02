const test = require('node:test')
const assert = require('node:assert/strict')
const {parseRestUpstreamSkeleton, skeletonToUpstreamDocument, assertSkeletonMatchesSource} = require('./sourceTree')

// A minimal skeleton in the exact shape the Go extractor emits.
function validSkeleton() {
    return {
        schemaVersion: '1.0',
        extractedFrom: {repository: 'milvus-io/milvus', sourceDir: 'internal/distributed/proxy/httpserver', mountPrefix: '/v2/vectordb'},
        operations: [
            {
                path: '/v2/vectordb/collections/list',
                method: 'post',
                handler: 'listCollections',
                requestStruct: 'DatabaseReq',
                requestSchema: {$ref: '#/components/schemas/DatabaseReq'},
            },
            {
                path: '/v2/vectordb/jobs/import/get_progress',
                method: 'post',
                handler: 'getProgress',
                requestStruct: 'JobIDReq',
                deprecated: true,
                requestSchema: {$ref: '#/components/schemas/JobIDReq'},
            },
        ],
        components: {schemas: {
            DatabaseReq: {type: 'object', properties: {dbName: {type: 'string'}}},
            JobIDReq: {type: 'object', properties: {jobId: {type: 'string'}}, required: ['jobId']},
        }},
    }
}

const LOCK_SOURCE = {id: 'milvus-data-plane', repository: 'milvus-io/milvus'}

test('skeleton parses, validates, and keeps extractor invariants', () => {
    const skeleton = parseRestUpstreamSkeleton(JSON.stringify(validSkeleton()))
    assert.equal(skeleton.operations.length, 2)
    assert.equal(skeleton.components.schemas.JobIDReq.required[0], 'jobId')
})

test('skeleton rejects schema violations and broken invariants', () => {
    // schema: unknown method
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify({
        ...validSkeleton(),
        operations: [{...validSkeleton().operations[0], method: 'fetch'}],
    })), /REST_UPSTREAM_SKELETON_SCHEMA_INVALID/)

    // operations must be sorted
    const unsorted = validSkeleton()
    unsorted.operations = [unsorted.operations[1], unsorted.operations[0]]
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(unsorted)), /REST_UPSTREAM_SKELETON_ORDER/)

    // dangling $ref
    const dangling = validSkeleton()
    dangling.operations[0].requestSchema = {$ref: '#/components/schemas/Missing'}
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(dangling)), /REST_UPSTREAM_SKELETON_REF_DANGLING/)

    // required member without a property
    const brokenRequired = validSkeleton()
    brokenRequired.components.schemas.DatabaseReq.required = ['ghost']
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(brokenRequired)), /REST_UPSTREAM_SKELETON_REQUIRED_DANGLING/)

    // operation path outside the mount prefix
    const offMount = validSkeleton()
    offMount.operations[0].path = '/v1/vector/collections'
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(offMount)), /REST_UPSTREAM_SKELETON_MOUNT_PREFIX/)

    // a bare-startsWith trap: a sibling directory sharing the prefix characters
    // is not mounted under the prefix
    const prefixSmuggle = validSkeleton()
    prefixSmuggle.operations[1].path = '/v2/vectordbzzzentities/list'
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(prefixSmuggle)), /REST_UPSTREAM_SKELETON_MOUNT_PREFIX/)

    // duplicate (path, method) neighbors fail with their own code
    const duplicated = validSkeleton()
    duplicated.operations = [duplicated.operations[0], {...duplicated.operations[0]}]
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(duplicated)), /REST_UPSTREAM_SKELETON_DUPLICATE_ROUTE/)

    // a dangling $ref below the first items level must not slip through the
    // vocabulary ([][]Struct is legal; the ref walk has to recurse)
    const deepDangling = validSkeleton()
    deepDangling.components.schemas.DatabaseReq.properties.aliases = {
        type: 'array',
        items: {type: 'array', items: {$ref: '#/components/schemas/Missing'}},
    }
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(deepDangling)), /REST_UPSTREAM_SKELETON_REF_DANGLING/)

    // a legal deep $ref chain still passes
    const deepOk = validSkeleton()
    deepOk.components.schemas.Alias = {type: 'string'}
    deepOk.components.schemas.DatabaseReq.properties.aliases = {
        type: 'array',
        items: {type: 'array', items: {$ref: '#/components/schemas/Alias'}},
    }
    assert.doesNotThrow(() => parseRestUpstreamSkeleton(JSON.stringify(deepOk)))
})

test('skeleton converts into the OpenAPI shape the diff consumes', () => {
    const document = skeletonToUpstreamDocument(parseRestUpstreamSkeleton(JSON.stringify(validSkeleton())))
    assert.equal(document.openapi, '3.0.3')
    const list = document.paths['/v2/vectordb/collections/list'].post
    assert.equal(list['x-milvus-handler'], 'listCollections')
    assert.equal(list['x-milvus-request-struct'], 'DatabaseReq')
    assert.deepEqual(list.requestBody.content['application/json'].schema, {$ref: '#/components/schemas/DatabaseReq'})
    assert.equal(list.requestBody.responses, undefined)
    const progress = document.paths['/v2/vectordb/jobs/import/get_progress'].post
    assert.equal(progress.deprecated, true)
    assert.equal(document.paths['/v2/vectordb/collections/list'].post.deprecated, undefined)
    assert.deepEqual(document.components, validSkeleton().components)
})

test('skeleton from another repository is refused for a locked source', () => {
    const skeleton = parseRestUpstreamSkeleton(JSON.stringify(validSkeleton()))
    assert.throws(() => assertSkeletonMatchesSource(skeleton, {id: 'milvus-data-plane', repository: 'other/repo'}),
        /REST_UPSTREAM_SKELETON_SOURCE_MISMATCH/)
    assertSkeletonMatchesSource(skeleton, LOCK_SOURCE)
})

// P2 review P1-1: the extractor sorts by (path, method); the gate must not
// invert that order across methods the way "method path" string order does.
test('mixed-method skeletons sort by the (path, method) tuple, not by method-path string', () => {
    const mixed = validSkeleton()
    mixed.operations = [
        {...validSkeleton().operations[0], path: '/v2/vectordb/entities/insert', method: 'get', handler: 'getInsertState'},
        {...validSkeleton().operations[0], path: '/v2/vectordb/entities/insert', method: 'post'},
        {...validSkeleton().operations[1]},
    ]
    // "get /v2/vectordb/entities/insert" < "post /v2/vectordb/jobs/..." as strings,
    // but the tuple order puts the /jobs path first: this IS the extractor's order.
    const parsed = parseRestUpstreamSkeleton(JSON.stringify(mixed))
    assert.deepEqual(parsed.operations.map(op => `${op.method} ${op.path}`), [
        'get /v2/vectordb/entities/insert',
        'post /v2/vectordb/entities/insert',
        'post /v2/vectordb/jobs/import/get_progress',
    ])
    const inverted = validSkeleton()
    inverted.operations = [mixed.operations[2], ...mixed.operations.slice(0, 2)]
    assert.throws(() => parseRestUpstreamSkeleton(JSON.stringify(inverted)), /REST_UPSTREAM_SKELETON_ORDER/)
})
