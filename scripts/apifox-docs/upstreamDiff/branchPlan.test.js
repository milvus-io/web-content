const test = require('node:test')
const assert = require('node:assert/strict')
const {buildPlacementRecords, branchLabelsForScope, parseBranchPlan, validatePlacements, needsPlacement} = require('./branchPlan')

const FRAGMENT = {
    openapi: '3.0.1',
    paths: {
        '/v2/etl/merge': {post: {requestBody: {content: {'application/json': {schema: {anyOf: [
            {'x-tab-label': 'use volume', properties: {clusterId: {type: 'string'}}},
            {'x-tab-label': 'use object storage', properties: {objectUrl: {type: 'string'}}},
        ]}}}}}},
        '/v2/things': {post: {responses: {'200': {content: {'application/json': {schema: {anyOf: [
            {'x-tab-label': 'success', properties: {code: {type: 'integer'}}},
            {'x-tab-label': 'error', properties: {code: {type: 'integer'}, message: {type: 'string'}}},
        ]}}}}}}},
    },
}

const loader = fileName => {
    if (fileName !== '19-etl-v2.json') throw new Error(`missing ${fileName}`)
    return FRAGMENT
}

function diffDocument() {
    return {
        source: 'zilliz-cloud-control-plane',
        entries: [
            {id: 'unattributed|post /v2/etl/merge|19-etl-v2.json|requestBody|||onError|field-uncovered|',
                category: 'unattributed', opKey: 'post /v2/etl/merge', fragment: '19-etl-v2.json', scope: 'requestBody',
                field: 'onError', change: {kind: 'field-uncovered', before: null, after: {type: 'string', enum: ['fail'], description: 'Error mode.'}}, evidence: ''},
            {id: 'upstream-added-field|post /v2/things|19-etl-v2.json|response||200|result|field-uncovered|',
                category: 'upstream-added-field', opKey: 'post /v2/things', fragment: '19-etl-v2.json', scope: 'response',
                responseStatus: '200', field: 'result', change: {kind: 'field-uncovered', before: null, after: {type: 'string'}}, evidence: ''},
        ],
    }
}

test('placement records carry the closed branch-label set and per-tab fields', () => {
    const records = buildPlacementRecords(diffDocument(), loader)
    assert.deepEqual(records.map(record => [record.field, record.branchLabels]), [
        ['onError', ['use volume', 'use object storage']],
        ['result', ['success', 'error']],
    ])
    assert.deepEqual(records[0].branchFields, [
        {label: 'use volume', fields: ['clusterId']},
        {label: 'use object storage', fields: ['objectUrl']},
    ])
    assert.equal(records[0].upstreamDescription, 'Error mode.')
    assert.equal(records[0].upstreamType, 'string')
})

test('branchLabelsForScope distinguishes branched, flat, and missing shapes', () => {
    const diff = diffDocument()
    assert.deepEqual(branchLabelsForScope(FRAGMENT, diff.entries[0]).labels, ['use volume', 'use object storage'])
    assert.deepEqual(branchLabelsForScope(FRAGMENT, diff.entries[1]).labels, ['success', 'error'])
    assert.equal(branchLabelsForScope(FRAGMENT, {...diff.entries[1], scope: 'response', responseStatus: '200', opKey: 'post /v2/flat'}), null)
    assert.equal(branchLabelsForScope(FRAGMENT, {...diff.entries[0], opKey: 'post /v2/missing'}), null)
})

test('validatePlacements closes the set: unknown ids, unknown labels, duplicates', () => {
    const records = buildPlacementRecords(diffDocument(), loader)
    const plan = parseBranchPlan(JSON.stringify({placements: [
        {diffEntryId: records[0].diffEntryId, targets: ['use volume', 'use object storage'], reason: 'shared field'},
        {diffEntryId: 'invented', targets: ['use volume']},
        {diffEntryId: records[0].diffEntryId, targets: ['use volume']},
        {diffEntryId: records[1].diffEntryId, targets: ['no-such-tab']},
    ], reorganizations: [
        {opKey: 'post /v2/etl/merge', scope: 'requestBody', action: 'split', reason: 'data source scenarios differ', branches: [{xTabLabel: 'use volume', fields: ['clusterId']}]},
    ]}))
    const {placements, rejected} = validatePlacements(plan, records)
    assert.deepEqual(placements.get(records[0].diffEntryId), ['use volume', 'use object storage'])
    assert.deepEqual(rejected.map(entry => entry.diffEntryId), ['invented', records[0].diffEntryId, records[1].diffEntryId])
    assert.match(rejected[1].reason, /duplicate/)
    assert.match(rejected[2].reason, /unknown branch label/)
    assert.equal(plan.reorganizations.length, 1)
})

test('needsPlacement covers the field-level uncovered categories only', () => {
    assert.equal(needsPlacement({category: 'unattributed', field: 'x'}), true)
    assert.equal(needsPlacement({category: 'upstream-added-field', field: 'x'}), true)
    assert.equal(needsPlacement({category: 'upstream-added-field', field: ''}), false)
    assert.equal(needsPlacement({category: 'upstream-added-param', field: 'x'}), false)
    assert.equal(needsPlacement({category: 'upstream-modified', field: 'x'}), false)
})

test('branch-plan contract rejects malformed shapes', () => {
    assert.throws(() => parseBranchPlan('{"placements":[{"diffEntryId":"x"}]}'), /REST_UPSTREAM_BRANCH_PLAN_SCHEMA_INVALID/)
    assert.throws(() => parseBranchPlan('{"placements":[{"diffEntryId":"x","targets":[]}]}'), /REST_UPSTREAM_BRANCH_PLAN_SCHEMA_INVALID/)
    assert.throws(() => parseBranchPlan('not json'), /REST_UPSTREAM_BRANCH_PLAN_MALFORMED_JSON/)
    assert.deepEqual(parseBranchPlan('{"placements":[]}'), {placements: []})
})
