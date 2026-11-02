const test = require('node:test')
const assert = require('node:assert/strict')
const {diffSpecifications} = require('./diff')
const {downgradeDocument} = require('./oasDowngrade')

const SHA = 'c'.repeat(40)
const RULESET = {internalFieldDenylist: ['accessKey', 'secretKey', 'token', 'innerCall']}
const SOURCE = {id: 'zilliz-cloud-control-plane', publicationTarget: 'zilliz'}
const EMPTY_LEDGER = {schemaVersion: '1.0', entries: []}

// Synthetic stand-in for 11-import-operations-v2.json: four scenario branches that
// deliberately repeat parameters per scenario, a milvus-only operation, and a
// success/failure response pair.
function importFragment() {
    return {
        openapi: '3.0.1',
        info: {title: 'REST', version: 'v2'},
        components: {schemas: {Common: {properties: {clusterId: {type: 'string', description: 'Target cluster.'}}}}},
        paths: {
            '/v2/vectordb/jobs/import/create': {
                post: {
                    summary: 'Import Data',
                    description: 'Create an import job.',
                    requestBody: {content: {'application/json': {schema: {oneOf: [
                        {'x-tab-label': 'Volume (Serving)', type: 'object', required: ['clusterId'], properties: {
                            clusterId: {$ref: '#/components/schemas/Common/properties/clusterId'},
                            volumeName: {type: 'string'},
                        }},
                        {'x-tab-label': 'Volume (On-demand)', type: 'object', required: ['projectId'], properties: {
                            projectId: {type: 'string'},
                            volumeName: {type: 'string'},
                        }},
                        {'x-tab-label': 'External storage (Serving)', type: 'object', properties: {
                            clusterId: {$ref: '#/components/schemas/Common/properties/clusterId'},
                            objectUrl: {type: 'string', maxLength: 128},
                            files: {type: 'array'},
                        }},
                        {'x-tab-label': 'External storage (On-demand)', type: 'object', properties: {
                            projectId: {type: 'string'},
                            objectUrl: {type: 'string', maxLength: 128},
                        }},
                    ]}}}},
                    responses: {'200': {description: 'ok', content: {'application/json': {schema: {oneOf: [
                        {'x-tab-label': 'success', type: 'object', properties: {code: {type: 'integer'}, data: {type: 'object', properties: {jobId: {type: 'string'}}}}},
                        {'x-tab-label': 'failure', type: 'object', properties: {code: {type: 'integer'}, message: {type: 'string'}}},
                    ]}}}}},
                },
            },
            '/v2/vectordb/jobs/import/abort': {
                post: {summary: 'Abort Import', 'x-include-target': ['milvus'], responses: {'200': {description: 'ok'}}},
            },
            '/v2/projects/{projectId}/regions/{regionId}': {
                delete: {summary: 'Remove Project Region', responses: {'200': {description: 'ok'}}},
            },
        },
    }
}

// Upstream merged object (what a generated control-plane spec looks like): the
// union of all branch fields plus internal fields, with no required array.
function importUpstream() {
    return downgradeDocument({
        openapi: '3.1.0',
        info: {title: 'Cloud-Controller-API', version: 'v1'},
        paths: {
            '/v2/vectordb/jobs/import/create': {
                post: {
                    summary: 'Import Data',
                    description: 'Create an import job.',
                    requestBody: {content: {'application/json': {schema: {type: 'object', properties: {
                        clusterId: {type: 'string', description: 'Target cluster.'},
                        projectId: {type: 'string'},
                        volumeName: {type: 'string'},
                        objectUrl: {type: 'string', maxLength: 256},
                        stageName: {type: 'string'},
                        accessKey: {type: 'string'},
                        innerCall: {type: 'boolean'},
                    }}}}},
                    responses: {'200': {description: 'ok', content: {'application/json': {schema: {type: 'object', properties: {
                        code: {type: 'integer'}, data: {type: 'object', properties: {jobId: {type: 'string'}}}, requestId: {type: 'string'},
                    }}}}}},
                },
            },
            '/v2/vectordb/jobs/import/get_progress': {
                post: {summary: 'Get Import Progress', responses: {'200': {description: 'ok'}}},
            },
        },
    })
}

function run(overrides = {}) {
    return diffSpecifications({
        source: SOURCE,
        upstreamPin: SHA,
        upstream: importUpstream(),
        fragments: new Map([['11-import-operations-v2.json', importFragment()]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
        ...overrides,
    })
}

function ids(result, predicate = () => true) {
    return result.entries.filter(predicate).map(entry => entry.id)
}

test('scenario branches are documentation assets: deliberate omissions stay silent, uncovered fields become unattributed', () => {
    const result = run()
    const create = entry => entry.opKey === 'post /v2/vectordb/jobs/import/create'

    // projectId is absent from the two Serving branches on purpose: never proposed there.
    assert.deepEqual(ids(result, entry => create(entry) && entry.field === 'projectId'), [])
    // volumeName is absent from the External storage branches on purpose: never proposed there.
    assert.deepEqual(ids(result, entry => create(entry) && entry.field === 'volumeName'), [])
    // stageName is covered by no branch: exactly one union-level ledger candidate.
    assert.deepEqual(ids(result, entry => create(entry) && entry.field === 'stageName'),
        ['unattributed|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|requestBody|||stageName|field-uncovered|'])
    // Internal fields never surface anywhere.
    assert.deepEqual(ids(result, entry => ['accessKey', 'innerCall'].includes(entry.field)), [])
    // objectUrl maxLength drifted: each documenting branch gets ONE mirror
    // entry whose after is the resolved upstream subtree (structure follows
    // upstream; local prose merges back in the assembler).
    const objectUrl = result.entries.filter(entry => create(entry) && entry.field === 'objectUrl')
    assert.deepEqual(objectUrl.map(entry => [entry.branch, entry.change.kind, entry.change.key, entry.change.before, entry.change.after]), [
        ['External storage (On-demand)', 'schema', 'mirror', null, {type: 'string', maxLength: 256}],
        ['External storage (Serving)', 'schema', 'mirror', null, {type: 'string', maxLength: 256}],
    ])
    assert.equal(objectUrl[0].evidence, '/paths/~1v2~1vectordb~1jobs~1import~1create/post')
    // files exists only in the fragment: informational zdoc-only entry on its branch.
    assert.deepEqual(ids(result, entry => create(entry) && entry.field === 'files'),
        ['zdoc-only|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|requestBody|External storage (Serving)||files|field-absent-upstream|'])
    // Upstream lacks required arrays entirely: one confirmation item per operation, not per branch.
    const confirmation = result.entries.filter(entry => entry.requiresConfirmation === 'required-array')
    assert.equal(confirmation.length, 1)
    assert.equal(confirmation[0].scope, 'requestBody')
})

test('responses match the best-overlapping branch and report uncovered fields once', () => {
    const result = run()
    const response = result.entries.filter(entry => entry.scope === 'response')
    assert.deepEqual(response.map(entry => [entry.category, entry.branch, entry.field]), [
        ['upstream-added-field', undefined, 'requestId'],
    ])
})

test('operation inventory: upstream-added needs a ledger decision, milvus-only fragments are out of scope, in-scope fragment-only ops need a decision', () => {
    const result = run()
    const operations = result.entries.filter(entry => entry.scope === 'operation')
    assert.deepEqual(operations.map(entry => [entry.category, entry.opKey, entry.ledgerStatus]), [
        ['fragment-only', 'delete /v2/projects/{projectId}/regions/{regionId}', 'pending'],
        ['upstream-added', 'post /v2/vectordb/jobs/import/get_progress', 'pending'],
    ])
    assert.deepEqual(result.summary, {'fragment-only': 1, 'unattributed': 1, 'upstream-added': 1, 'upstream-added-field': 1, 'upstream-modified': 3, 'zdoc-only': 1})

    const ledger = {schemaVersion: '1.0', entries: [{
        opKey: 'post /v2/vectordb/jobs/import/get_progress', source: SOURCE.id, firstSeenPin: SHA, firstSeenAt: '2026-10-28',
        classification: 'deferred', reason: 'await PM', owner: 'doc-team', decidedAt: '2026-10-28',
    }]}
    const classified = run({ledger})
    assert.equal(classified.entries.find(entry => entry.category === 'upstream-added').ledgerStatus, 'classified')
})

test('non-branched bodies report field-level drift directly', () => {
    const fragment = {openapi: '3.0.1', paths: {'/v2/projects': {post: {
        summary: 'Create Project',
        requestBody: {content: {'application/json': {schema: {type: 'object', required: ['projectName'], properties: {
            projectName: {type: 'string', description: 'Name.'}, legacyFlag: {type: 'boolean'},
        }}}}},
        responses: {'200': {description: 'ok'}},
    }}}}
    const upstream = {openapi: '3.0.3', paths: {'/v2/projects': {post: {
        summary: 'Create Project',
        deprecated: true,
        requestBody: {content: {'application/json': {schema: {type: 'object', required: ['projectName', 'plan'], properties: {
            projectName: {type: 'string', maxLength: 50, description: 'Project name.'}, plan: {type: 'string'},
        }}}}},
        responses: {'200': {description: 'ok'}},
    }}}}
    const result = run({upstream, fragments: new Map([['21-project-operations-v2.json', fragment]])})
    assert.deepEqual(result.entries.map(entry => [entry.category, entry.scope, entry.field, entry.change.kind, entry.change.key]), [
        ['upstream-added-field', 'requestBody', 'plan', 'field-uncovered', undefined],
        ['upstream-modified', 'operation', undefined, 'deprecated', undefined],
        ['upstream-modified', 'requestBody', 'projectName', 'schema', 'mirror'],
        ['zdoc-only', 'requestBody', 'legacyFlag', 'field-absent-upstream', undefined],
    ])
    // the mirror carries the upstream subtree (maxLength + upstream description
    // ride along; the assembler merges the local prose back in)
    const mirror = result.entries.find(entry => entry.field === 'projectName')
    assert.deepEqual(mirror.change.after, {type: 'string', maxLength: 50, description: 'Project name.'})
})

test('output is deterministic, sorted, and entry ids are unique', () => {
    const first = JSON.stringify(run())
    const second = JSON.stringify(run())
    assert.equal(first, second)
    const idsSorted = run().entries.map(entry => entry.id)
    assert.deepEqual(idsSorted, [...idsSorted].sort())
    assert.equal(new Set(idsSorted).size, idsSorted.length)
})

test('duplicated parameter copies (x-base-url-target gating) get distinct entry ids', () => {
    const fragment = {openapi: '3.0.1', paths: {'/v2/x': {post: {summary: 'X', parameters: [
        {name: 'Authorization', in: 'header', required: true, description: 'token for clusters', 'x-base-url-target': ['cluster']},
        {name: 'Authorization', in: 'header', required: true, description: 'token for on-demand', 'x-base-url-target': ['on-demand-compute']},
    ], responses: {'200': {description: 'ok'}}}}}}
    const upstream = {openapi: '3.0.3', paths: {'/v2/x': {post: {summary: 'X', parameters: [
        {name: 'Authorization', in: 'header', required: true, description: 'token'},
    ], responses: {'200': {description: 'ok'}}}}}}
    const result = run({upstream, fragments: new Map([['21-project-operations-v2.json', fragment]])})
    assert.deepEqual(result.entries.map(entry => [entry.id, entry.copyIndex]), [
        ['upstream-modified|post /v2/x|21-project-operations-v2.json|parameter|||Authorization:header#0|description|', 0],
        ['upstream-modified|post /v2/x|21-project-operations-v2.json|parameter|||Authorization:header#1|description|', 1],
    ])

    // Both copies absent upstream: reported once, not once per copy.
    const noAuthUpstream = {openapi: '3.0.3', paths: {'/v2/x': {post: {summary: 'X', responses: {'200': {description: 'ok'}}}}}}
    const absent = run({upstream: noAuthUpstream, fragments: new Map([['21-project-operations-v2.json', fragment]])})
    assert.deepEqual(absent.entries.map(entry => entry.id), ['zdoc-only|post /v2/x|21-project-operations-v2.json|parameter|||Authorization:header|param-absent-upstream|'])
})

test('ruleset without a denylist fails closed', () => {
    assert.throws(() => run({ruleset: {}}), /REST_UPSTREAM_RULESET_INVALID/)
})

test('fragment-only is scoped to the source api surface; matched operations compare across surfaces', () => {
    const dataPlaneFragment = {openapi: '3.0.1', paths: {
        '/v2/vectordb/collections/list': {post: {summary: 'List Collections', responses: {'200': {description: 'ok'}}}},
        '/v2/vectordb/jobs/import/create': {post: {summary: 'Import Data (old)', responses: {'200': {description: 'ok'}}}},
    }}
    const controlPlaneFragment = {openapi: '3.0.1', paths: {
        '/v2/projects/{projectId}/regions/{regionId}': {delete: {summary: 'Remove Project Region', responses: {'200': {description: 'ok'}}}},
    }}
    const upstream = {openapi: '3.0.3', paths: {
        '/v2/vectordb/jobs/import/create': {post: {summary: 'Import Data', responses: {'200': {description: 'ok'}}}},
    }}
    const fragments = new Map([['05-collection-operations-v2.json', dataPlaneFragment], ['21-project-operations-v2.json', controlPlaneFragment]])
    const fragmentSurfaces = new Map([['05-collection-operations-v2.json', 'data-plane'], ['21-project-operations-v2.json', 'control-plane']])
    const result = run({upstream, fragments, fragmentSurfaces, source: {...SOURCE, apiSurface: 'control-plane'}})
    assert.deepEqual(result.entries.map(entry => [entry.category, entry.opKey]), [
        ['fragment-only', 'delete /v2/projects/{projectId}/regions/{regionId}'],
        ['upstream-modified', 'post /v2/vectordb/jobs/import/create'],
    ])
    assert.throws(
        () => run({upstream, fragments, fragmentSurfaces: new Map([['21-project-operations-v2.json', 'control-plane']]), source: {...SOURCE, apiSurface: 'control-plane'}}),
        /REST_UPSTREAM_FRAGMENT_SURFACE_UNKNOWN.*05-collection-operations-v2.json/,
    )
})

test('ids carry the fragment file and response status, so shared field names never collide', () => {
    const responses = (okText, badText) => ({
        '200': {description: 'ok', content: {'application/json': {schema: {type: 'object', properties: {message: {type: 'string', description: okText}}}}}},
        '400': {description: 'bad', content: {'application/json': {schema: {type: 'object', properties: {message: {type: 'string', description: badText}}}}}},
    })
    const fragment = {openapi: '3.0.1', paths: {'/x': {post: {summary: 'X', responses: responses('ok msg', 'bad msg')}}}}
    const upstream = {openapi: '3.0.3', paths: {'/x': {post: {summary: 'X', responses: responses('ok message', 'bad message')}}}}
    const result = run({upstream, fragments: new Map([['21-project-operations-v2.json', fragment], ['22-cluster-operations-v2.json', structuredClone(fragment)]])})
    const ids = result.entries.map(entry => entry.id)
    assert.equal(new Set(ids).size, ids.length)
    assert.deepEqual(ids, [
        'upstream-modified|post /x|21-project-operations-v2.json|response||200|message|description|',
        'upstream-modified|post /x|21-project-operations-v2.json|response||400|message|description|',
        'upstream-modified|post /x|22-cluster-operations-v2.json|response||200|message|description|',
        'upstream-modified|post /x|22-cluster-operations-v2.json|response||400|message|description|',
    ])
    assert.deepEqual(result.entries.map(entry => entry.responseStatus), ['200', '400', '200', '400'])
})

test('relaxing a requirement is flagged for R&D confirmation; tightening is adoptable as-is', () => {
    const body = required => ({content: {'application/json': {schema: {type: 'object', required, properties: {a: {type: 'string'}, b: {type: 'string'}}}}}})
    const fragment = {openapi: '3.0.1', paths: {'/x': {post: {summary: 'X', parameters: [{name: 'p', in: 'query', required: true}],
        requestBody: body(['a']), responses: {'200': {description: 'ok'}}}}}}
    const upstream = {openapi: '3.0.3', paths: {'/x': {post: {summary: 'X', parameters: [{name: 'p', in: 'query', required: false}],
        requestBody: body(['b']), responses: {'200': {description: 'ok'}}}}}}
    const result = run({upstream, fragments: new Map([['21-project-operations-v2.json', fragment]])})
    assert.deepEqual(result.entries.map(entry => [entry.field, entry.change.kind, entry.change.after, entry.requiresConfirmation]), [
        ['p:query', 'required', false, 'required-relaxation'],
        ['a', 'required', false, 'required-relaxation'],
        ['b', 'required', true, undefined],
    ])
})


test('structure-only mirrors keep fragment scalar constraints; nested required relaxations confirm-gate', () => {
    const upstream = treeUpstream()
    // structure change (new nested field) triggers a mirror on dbName...
    upstream.components.schemas.CollectionNameReq.properties.dbName = {type: 'object', properties: {id: {type: 'string'}}, required: ['id']}
    const fragment = treeFragment()
    // ...while the fragment carries an extrapolated maxLength and a nested
    // required member the upstream no longer lists
    fragment.paths['/v2/vectordb/collections/list'].post.requestBody.content['application/json'].schema.properties.dbName = {
        type: 'object', maxLength: 255, properties: {id: {type: 'string'}, legacy: {type: 'string'}}, required: ['id', 'legacy'],
    }
    const result = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', fragment]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    const mirror = result.entries.find(entry => entry.field === 'dbName' && entry.change.kind === 'schema')
    assert.ok(mirror, 'expected a dbName mirror')
    // the preserve flag rides the entry so assembler AND applier merge with
    // the same mode (P1-2)
    assert.equal(mirror.preserveLocalScalarConstraints, true)
    // nested required relaxation is confirmation-gated (P1-3), and the
    // dropped content rides the same entry
    assert.equal(mirror.requiresConfirmation, 'required-relaxation')
    assert.deepEqual(mirror.droppedLocalFields, ['legacy', 'legacy'])
})

test('spec-file mirrors gate nested required relaxations too', () => {
    const fragment = importFragment()
    fragment.paths['/v2/vectordb/jobs/import/create'].post.requestBody.content['application/json'].schema.oneOf[2].properties.objectUrl = {
        type: 'object', properties: {url: {type: 'string'}}, required: ['url'],
    }
    const upstream = importUpstream()
    upstream.paths['/v2/vectordb/jobs/import/create'].post.requestBody.content['application/json'].schema.properties.objectUrl = {
        type: 'object', properties: {url: {type: 'string'}},
    }
    const result = run({upstream, fragments: new Map([['11-import-operations-v2.json', fragment]])})
    const mirror = result.entries.find(entry => entry.field === 'objectUrl' && entry.change.kind === 'schema'
        && entry.branch === 'External storage (Serving)')
    assert.ok(mirror)
    assert.equal(mirror.requiresConfirmation, 'required-relaxation')
    assert.deepEqual(mirror.droppedLocalFields, ['url'])
})

// --- Source-tree structure-only mode (design §6) ----------------------------

const TREE_SOURCE = {id: 'milvus-data-plane', repository: 'milvus-io/milvus', apiSurface: 'data-plane', publicationTarget: 'milvus', artifact: {kind: 'source-tree'}}

function treeFragment() {
    return {
        openapi: '3.0.1',
        info: {title: 'REST', version: 'v2'},
        paths: {
            '/v2/vectordb/collections/list': {
                post: {
                    summary: 'List Collections',
                    description: 'Lists all collections.',
                    parameters: [{name: 'Authorization', in: 'header', required: true}],
                    requestBody: {content: {'application/json': {schema: {type: 'object', required: ['collectionName'], properties: {
                        dbName: {type: 'string', description: 'The name of the database.', maxLength: 255},
                        collectionName: {type: 'string'},
                        projection: {type: 'object'},
                    }}}}},
                    responses: {'200': {description: 'ok', content: {'application/json': {schema: {type: 'object', properties: {code: {type: 'integer'}}}}}}},
                },
            },
        },
    }
}

// What the Go extractor converts to: no prose, no parameters, no responses.
function treeUpstream() {
    return {
        openapi: '3.0.3',
        info: {title: 'REST upstream source-tree skeleton', version: '/v2/vectordb'},
        components: {schemas: {CollectionNameReq: {type: 'object', properties: {
            dbName: {type: 'string'},
            collectionName: {type: 'string'},
            projection: {type: 'object'},
        }, required: ['collectionName']}}},
        paths: {
            '/v2/vectordb/collections/list': {
                post: {
                    'x-milvus-handler': 'listCollections',
                    'x-milvus-request-struct': 'CollectionNameReq',
                    requestBody: {content: {'application/json': {schema: {$ref: '#/components/schemas/CollectionNameReq'}}}},
                },
            },
        },
    }
}

test('structure-only sources compare request bodies but skip prose, parameters, and responses', () => {
    const result = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream: treeUpstream(),
        fragments: new Map([['05-collection-operations-v2.json', treeFragment()]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    const categories = new Set(result.entries.map(entry => entry.category))
    // Field-level truth still compares: fragment maxLength is zdoc-only design,
    // the upstream union covers every documented field, and required matches.
    assert.deepEqual(result.summary, {'zdoc-only': 1})
    assert.deepEqual(result.entries.map(entry => [entry.scope, entry.field, entry.change.kind]), [
        ['requestBody', 'dbName', 'constraint'],
    ])
    assert.ok(!categories.has('upstream-modified'))
})

test('structure-only sources still report operation presence, deprecation, shape, and required drift', () => {
    const upstream = treeUpstream()
    upstream.paths['/v2/vectordb/collections/list'].post.deprecated = true
    upstream.components.schemas.CollectionNameReq.required = ['dbName']
    upstream.components.schemas.CollectionNameReq.properties.projection = {type: 'array', items: {type: 'string'}}
    const result = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', treeFragment()]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    // Structure-only mirrors fire on shape keys only (type/items/properties/
    // required): the extractor cannot speak to scalar constraints, so the
    // fragment-side maxLength stays and the zdoc-only lane reports it.
    const projection = result.entries.find(entry => entry.field === 'projection')
    assert.equal(projection.change.kind, 'schema')
    assert.deepEqual(projection.change.after, {type: 'array', items: {type: 'string'}})
    assert.deepEqual(result.entries.filter(entry => entry.change.kind !== 'schema').map(entry => [entry.category, entry.scope, entry.field ?? null, entry.change.kind, entry.change.after, entry.requiresConfirmation ?? null]), [
        ['upstream-modified', 'operation', null, 'deprecated', true, null],
        ['upstream-modified', 'requestBody', 'collectionName', 'required', false, 'required-relaxation'],
        ['upstream-modified', 'requestBody', 'dbName', 'required', true, null],
        ['zdoc-only', 'requestBody', 'dbName', 'constraint', null, null],
    ])
})

test('recursive upstream subtrees are flagged for human follow-up instead of failing the diff', () => {
    // The real milvus skeleton self-references FieldSchema (nested struct
    // fields) and SearchAggregationReq (sub-aggregations); no finite inlined
    // mirror value exists for either.
    const upstream = treeUpstream()
    upstream.components.schemas.SearchAggregationReq = {type: 'object', properties: {
        fields: {type: 'array', items: {type: 'string'}},
        subAggregation: {$ref: '#/components/schemas/SearchAggregationReq'},
    }}
    upstream.components.schemas.CollectionNameReq.properties.searchAggregation = {$ref: '#/components/schemas/SearchAggregationReq'}
    const fragment = treeFragment()
    fragment.paths['/v2/vectordb/collections/list'].post.requestBody.content['application/json'].schema.properties.searchAggregation = {
        type: 'object', properties: {fields: {type: 'array', items: {type: 'string'}}},
    }
    const result = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', fragment]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    const mirror = result.entries.find(entry => entry.field === 'searchAggregation' && entry.change.kind === 'schema')
    assert.ok(mirror, 'expected a searchAggregation mirror entry')
    assert.equal(mirror.unresolvableSubtree, true)
    assert.equal(mirror.change.after, null)
    // the flag is conditional: unaffected entries carry no residue
    assert.ok(result.entries.filter(entry => entry.field !== 'searchAggregation').every(entry => entry.unresolvableSubtree === undefined))

    // a recursive ADDED field is flagged the same way and carries no subtree
    upstream.components.schemas.CollectionNameReq.properties.nestedAggregation = {$ref: '#/components/schemas/SearchAggregationReq'}
    const added = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', fragment]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    }).entries.find(entry => entry.field === 'nestedAggregation' && entry.change.kind === 'field-uncovered')
    assert.ok(added, 'expected a nestedAggregation added-field entry')
    assert.equal(added.unresolvableSubtree, true)
    assert.equal(added.change.after, null)
})

test('opaque pass-through maps are local-authority: hand-authored params are never retired', () => {
    // The real retirement that must never happen again: the skeleton sees
    // `params map[string]interface{}` as a bare object, while the fragment
    // documents the pass-through parameters (enableDynamicField arrives in
    // the params map and is forwarded to gRPC; max_length rides elementType-
    // Params). The mirror must keep the fragment content and stay silent.
    const upstream = treeUpstream()
    upstream.components.schemas.CollectionNameReq.properties.params = {type: 'object', 'x-milvus-opaque': true}
    const fragment = treeFragment()
    fragment.paths['/v2/vectordb/collections/list'].post.requestBody.content['application/json'].schema.properties.params = {
        type: 'object', description: 'Extra parameters.',
        properties: {enableDynamicField: {type: 'boolean', description: 'Whether to enable dynamic field.'}},
    }
    const result = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', fragment]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    assert.deepEqual(result.entries.filter(entry => entry.field === 'params'), [])
    // a genuinely new sibling field next to the blind spot still mirrors,
    // and its value keeps the local content below the blind spot while
    // stripping the tooling marker
    upstream.components.schemas.CollectionNameReq.properties.extraParams = {type: 'object', 'x-milvus-opaque': true}
    upstream.components.schemas.CollectionNameReq.properties.partitionNames = {type: 'array', items: {type: 'string'}}
    const withDrift = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', fragment]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    const addedPlain = withDrift.entries.find(entry => entry.field === 'partitionNames' && entry.change.kind === 'field-uncovered')
    assert.ok(addedPlain, 'expected the plain added field')
    assert.deepEqual(addedPlain.change.after, {type: 'array', items: {type: 'string'}})
    const addedOpaque = withDrift.entries.find(entry => entry.field === 'extraParams' && entry.change.kind === 'field-uncovered')
    assert.ok(addedOpaque, 'expected the opaque added field')
    assert.deepEqual(addedOpaque.change.after, {type: 'object'})
    assert.equal(addedOpaque.change.after['x-milvus-opaque'], undefined)
    // a mirror whose subtree holds a blind spot carries the fragment content
    // below the boundary and no marker: the struct gains a VISIBLE field the
    // extractor can see, while the map field inside stays fragment-authored
    upstream.components.schemas.CollectionNameReq.properties.params = {type: 'object', properties: {
        allowInsertNonBM25: {type: 'boolean'},
        extra: {type: 'object', 'x-milvus-opaque': true},
    }}
    fragment.paths['/v2/vectordb/collections/list'].post.requestBody.content['application/json'].schema.properties.params = {
        type: 'object', description: 'Extra parameters.',
        properties: {
            allowInsertNonBM25: {type: 'boolean', description: 'Whether to allow it.'},
            extra: {type: 'object', properties: {enableDynamicField: {type: 'boolean', description: 'Whether to enable dynamic field.'}}},
        },
    }
    upstream.components.schemas.CollectionNameReq.properties.params.properties.newVisibleField = {type: 'string'}
    const mirrorEntry = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', fragment]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    }).entries.find(entry => entry.field === 'params' && entry.change.kind === 'schema')
    assert.ok(mirrorEntry, 'expected a params mirror for the visible-field addition')
    // the after value carries upstream structure; doc-owned prose at VISIBLE
    // nodes is merged back at assemble time — but the fragment content below
    // the opaque boundary rides the value whole (descriptions included)
    assert.deepEqual(mirrorEntry.change.after, {
        type: 'object',
        properties: {
            allowInsertNonBM25: {type: 'boolean'},
            newVisibleField: {type: 'string'},
            extra: {type: 'object', properties: {enableDynamicField: {type: 'boolean', description: 'Whether to enable dynamic field.'}}},
        },
    })
    assert.deepEqual(mirrorEntry.droppedLocalFields, [])
})

test('unattributed fields work for structure-only branched bodies', () => {
    const fragment = treeFragment()
    fragment.paths['/v2/vectordb/collections/list'].post.requestBody.content['application/json'].schema = {oneOf: [
        {'x-tab-label': 'quick', type: 'object', required: ['collectionName'], properties: {collectionName: {type: 'string'}}},
        {'x-tab-label': 'custom', type: 'object', properties: {dbName: {type: 'string'}}},
    ]}
    const result = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream: treeUpstream(),
        fragments: new Map([['05-collection-operations-v2.json', fragment]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    // Branch-level upstream-only fields stay silent; the union-level gap is
    // one `unattributed` ledger candidate (requestBody scope).
    assert.deepEqual(result.entries.map(entry => [entry.category, entry.branch ?? null, entry.field ?? null, entry.change.kind]), [
        ['unattributed', null, 'projection', 'field-uncovered'],
    ])
})

test('cross-fragment component references resolve through the shared view; API-truth conflicts fail closed', () => {
    const donor = {
        openapi: '3.0.1',
        components: {schemas: {Commons: {type: 'object', properties: {dbName: {type: 'string', description: 'Database name.'}}}}},
        paths: {},
    }
    const borrower = {
        openapi: '3.0.1',
        paths: {'/v2/vectordb/collections/drop': {post: {
            requestBody: {content: {'application/json': {schema: {$ref: '#/components/schemas/Commons'}}}},
            responses: {},
        }}},
    }
    const upstream = {
        openapi: '3.0.3',
        components: {schemas: {Commons: {type: 'object', properties: {dbName: {type: 'string'}}}}},
        paths: {'/v2/vectordb/collections/drop': {post: {
            requestBody: {content: {'application/json': {schema: {$ref: '#/components/schemas/Commons'}}}},
        }}},
    }
    const resolved = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', donor], ['07-index-operations-v2.json', borrower]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    // The shared view resolves the borrower's dangling ref: dbName matches, no drift.
    assert.deepEqual(resolved.entries, [])

    const conflicting = structuredClone(donor)
    conflicting.components.schemas.Commons.properties.dbName = {type: 'integer'}
    assert.throws(() => diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', donor], ['08-partition-operations-v2.json', conflicting], ['07-index-operations-v2.json', borrower]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    }), /REST_UPSTREAM_SHARED_SCHEMA_CONFLICT/)
})

test('doc-design-only component variants are interchangeable donors', () => {
    const plain = {
        openapi: '3.0.1',
        components: {schemas: {EmptyResponse: {type: 'object', properties: {code: {type: 'integer'}, message: {type: 'string'}}}}},
        paths: {},
    }
    const labelled = structuredClone(plain)
    labelled.components.schemas.EmptyResponse['x-tab-label'] = 'success'
    labelled.components.schemas.EmptyResponse.properties.code.description = '响应代码。'
    const upstream = {
        openapi: '3.0.3',
        components: {schemas: {EmptyResponse: {type: 'object', properties: {code: {type: 'integer'}, message: {type: 'string'}}}}},
        paths: {'/v2/vectordb/collections/truncate': {post: {
            requestBody: {content: {'application/json': {schema: {$ref: '#/components/schemas/EmptyResponse'}}}},
        }}},
    }
    const consumer = structuredClone(plain)
    consumer.paths = {'/v2/vectordb/collections/truncate': {post: {
        requestBody: {content: {'application/json': {schema: {$ref: '#/components/schemas/EmptyResponse'}}}},
        responses: {},
    }}}
    const result = diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream,
        fragments: new Map([['05-collection-operations-v2.json', labelled], ['37-file-resource-operations-v2.json', consumer]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
    })
    assert.deepEqual(result.entries, [])
})

// Design §6.3: data-plane sources can derive lifecycle suggestions when a
// managed track is supplied; without one the output stays byte-identical.
const TRACK = '3.0.x'

function lifecycleFragment(overrides = {}) {
    return {
        openapi: '3.0.1',
        info: {title: 'REST', version: 'v2'},
        paths: {
            '/v2/vectordb/collections/describe': {
                post: {
                    summary: 'Describe Collection',
                    'x-added-at': '2.6.x', 'x-last-modified': '2.6.x', 'x-deprecated-since': null,
                    requestBody: {content: {'application/json': {schema: {type: 'object', properties: {
                        collectionName: {type: 'string', maxLength: 256, 'x-added-at': '2.6.x', 'x-last-modified': '2.6.x', 'x-deprecated-since': null},
                    }}}}},
                    responses: {'200': {description: 'ok'}},
                },
            },
            '/v2/vectordb/collections/rename': {
                post: {
                    summary: 'Rename Collection',
                    'x-added-at': '2.6.x', 'x-last-modified': '2.6.x', 'x-deprecated-since': null,
                    ...(overrides && overrides.renameOperation),
                    requestBody: {content: {'application/json': {schema: {type: 'object', required: ['collectionName', 'newCollectionName'], properties: {
                        collectionName: {type: 'string'},
                        newCollectionName: {type: 'string'},
                    }}}}},
                    responses: {'200': {description: 'ok'}},
                },
            },
        },
    }
}

function lifecycleUpstream() {
    return {
        openapi: '3.0.3',
        info: {title: 'REST upstream source-tree skeleton', version: '/v2/vectordb'},
        paths: {
            '/v2/vectordb/collections/describe': {
                post: {
                    requestBody: {content: {'application/json': {schema: {type: 'object', properties: {
                        collectionName: {type: 'string', maxLength: 128},
                        dbName: {type: 'string'},
                    }}}}},
                    responses: {'200': {description: 'ok'}},
                },
            },
            '/v2/vectordb/collections/rename': {
                post: {
                    deprecated: true,
                    requestBody: {content: {'application/json': {schema: {type: 'object', required: ['collectionName'], properties: {
                        collectionName: {type: 'string'},
                        newCollectionName: {type: 'string'},
                    }}}}},
                    responses: {'200': {description: 'ok'}},
                },
            },
            '/v2/vectordb/collections/compact': {
                post: {
                    requestBody: {content: {'application/json': {schema: {type: 'object', properties: {collectionName: {type: 'string'}}}}}},
                    responses: {'200': {description: 'ok'}},
                },
            },
        },
    }
}

function lifecycleRun({fragmentOverride = null, ...rest} = {}) {
    return diffSpecifications({
        source: TREE_SOURCE,
        upstreamPin: SHA,
        upstream: lifecycleUpstream(),
        fragments: new Map([['05-collection-operations-v2.json', lifecycleFragment(fragmentOverride)]]),
        ledger: EMPTY_LEDGER,
        ruleset: RULESET,
        ...rest,
    })
}

test('lifecycle suggestions attach to contract drift on data-plane sources when a track is supplied', () => {
    const result = lifecycleRun({lifecycleTrack: TRACK})
    const byKind = new Map(result.entries.map(entry => [entry.id, entry]))
    const constraint = byKind.get('upstream-modified|post /v2/vectordb/collections/describe|05-collection-operations-v2.json|requestBody|||collectionName|constraint|maxLength')
    assert.deepEqual(constraint.lifecycle, {'x-last-modified': TRACK})
    const addedField = byKind.get('upstream-added-field|post /v2/vectordb/collections/describe|05-collection-operations-v2.json|requestBody|||dbName|field-uncovered|')
    assert.deepEqual(addedField.lifecycle, {'x-added-at': TRACK, 'x-last-modified': TRACK, 'x-deprecated-since': null})
    const deprecation = byKind.get('upstream-modified|post /v2/vectordb/collections/rename|05-collection-operations-v2.json|operation||||deprecated|')
    assert.deepEqual(deprecation.lifecycle, {'x-last-modified': TRACK, 'x-deprecated-since': TRACK})
    const relaxation = byKind.get('upstream-modified|post /v2/vectordb/collections/rename|05-collection-operations-v2.json|requestBody|||newCollectionName|required|')
    assert.deepEqual(relaxation.lifecycle, {'x-last-modified': TRACK})
    assert.ok(relaxation.requiresConfirmation === 'required-relaxation')
    const addedOp = byKind.get('upstream-added|post /v2/vectordb/collections/compact||operation||||operation-absent-in-fragments|')
    assert.deepEqual(addedOp.lifecycle, {'x-added-at': TRACK, 'x-last-modified': TRACK, 'x-deprecated-since': null})
    // structure-only sources skip prose entirely: no summary entry, hence nothing to suggest for
    const summary = byKind.get('upstream-modified|post /v2/vectordb/collections/describe|05-collection-operations-v2.json|operation||||summary|')
    assert.ok(!summary)
    // entry ids are untouched by the suggestion
    assert.ok(!constraint.id.includes('lifecycle'))
})

test('without a lifecycle track the diff output is byte-identical to the pre-lifecycle behavior', () => {
    const without = lifecycleRun()
    for (const entry of without.entries) assert.ok(!('lifecycle' in entry), entry.id)
    // and the id set matches the tracked run exactly: suggestions never change identity
    const withTrack = lifecycleRun({lifecycleTrack: TRACK})
    assert.deepEqual(
        withTrack.entries.map(entry => entry.id).sort(),
        without.entries.map(entry => entry.id).sort(),
    )
})

test('lifecycle suggestions fail closed when the fragment side is already on a newer track', () => {
    assert.throws(
        () => lifecycleRun({lifecycleTrack: TRACK, fragmentOverride: {renameOperation: {'x-added-at': '3.1.x'}}}),
        /REST_UPSTREAM_LIFECYCLE_ORDER/,
    )
})

test('a deprecation suggestion below the recorded x-deprecated-since would rewrite history and fails closed', () => {
    // fragment already records deprecation at 3.2.x; a 3.0.x flip suggestion
    // must not move that marker backwards (§1.10: FIRST deprecated track).
    assert.throws(
        () => lifecycleRun({lifecycleTrack: TRACK, fragmentOverride: {renameOperation: {'x-deprecated-since': '3.2.x'}}}),
        /would move the fragment deprecation marker 3.2.x backwards/,
    )
})

test('lifecycle tracks reject control-plane sources and malformed values', () => {
    assert.throws(() => lifecycleRun({lifecycleTrack: '3.0'}), /REST_UPSTREAM_LIFECYCLE_TRACK_INVALID/)
    assert.throws(
        () => lifecycleRun({lifecycleTrack: TRACK, source: SOURCE}),
        /REST_UPSTREAM_LIFECYCLE_TRACK_REJECTED/,
    )
})
