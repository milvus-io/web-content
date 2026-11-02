const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {parseDecisions, loadDecisions, assembleChangeSet, stanceError} = require('./assembler')
const {parseChangeSet} = require('./changeSet')
const {diffDigestOf} = require('./changeSet')

// Fragment copy shaped like the staged copies: scenario branches are oneOf /
// anyOf members tagged x-tab-label, parameters are (name, in) objects.
const FRAGMENTS = new Map([
    ['01-things-v2.json', {
        openapi: '3.0.1',
        paths: {
            '/v2/things': {post: {
                summary: 'Create Thing.',
                requestBody: {content: {'application/json': {schema: {
                    type: 'object', required: ['dbName'],
                    properties: {dbName: {type: 'string', maxLength: 32, description: 'Database name.'}, actions: {type: 'array'}},
                }}}},
                responses: {'200': {content: {'application/json': {schema: {oneOf: [
                    {'x-tab-label': 'success', properties: {code: {type: 'integer', description: 'old text'}}},
                    {'x-tab-label': 'error', properties: {code: {type: 'integer'}, message: {type: 'string'}}},
                ]}}}}},
            }},
            '/v2/things/{ID}': {delete: {
                parameters: [
                    {name: 'projectId', in: 'query', required: false, schema: {type: 'string'}},
                    {name: 'dryRun', in: 'query', required: true, schema: {type: 'boolean'}},
                    {name: 'Authorization', in: 'header', required: true},
                    {name: 'Authorization', in: 'header', required: true},
                ],
                responses: {'200': {content: {'application/json': {schema: {anyOf: [
                    {'x-tab-label': 'success', properties: {code: {type: 'integer'}}},
                    {'x-tab-label': 'error', properties: {code: {type: 'integer'}, message: {type: 'string'}}},
                ]}}}}}
            }},
            '/v2/widgets': {post: {
                requestBody: {content: {'application/json': {schema: {anyOf: [
                    {properties: {size: {type: 'integer'}}},
                    {properties: {name: {type: 'string'}}},
                ]}}}},
            }},
            '/v2/etl/merge': {post: {
                requestBody: {content: {'application/json': {schema: {anyOf: [
                    {'x-tab-label': 'use volume', properties: {clusterId: {type: 'string'}}},
                    {'x-tab-label': 'use object storage', properties: {objectUrl: {type: 'string'}}},
                ]}}}},
            }},
            '/v2/gadgets': {post: {summary: 'Create Gadget.', responses: {'200': {content: {'application/json': {schema: {type: 'object', properties: {code: {type: 'integer'}}}}}}}}},
        },
    }],
])

// Hand-built diff document shaped exactly like diff.js output (id layout:
// category|opKey|fragment|scope|branch|responseStatus|field|changeKind|changeKey).
function diffDocument() {
    return {
        source: 'zilliz-cloud-control-plane',
        entries: [
            {id: 'upstream-modified|post /v2/things|01-things-v2.json|response|success|200|code|description|',
                category: 'upstream-modified', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'response',
                branch: 'success', responseStatus: '200', field: 'code',
                change: {kind: 'description', key: '', before: 'old text', after: 'Business response code; 0 indicates success.'}, evidence: ''},
            {id: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||actions|required|',
                category: 'upstream-modified', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'actions',
                change: {kind: 'required', key: '', before: false, after: true}, evidence: ''},
            {id: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|required|',
                category: 'upstream-modified', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'dbName',
                change: {kind: 'required', key: '', before: true, after: false}, evidence: '',
                requiresConfirmation: 'required-relaxation'},
            {id: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|constraint|maxLength',
                category: 'upstream-modified', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'dbName',
                change: {kind: 'constraint', key: 'maxLength', before: 32, after: 50}, evidence: ''},
            {id: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|schema|mirror',
                category: 'upstream-modified', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'dbName',
                change: {kind: 'schema', key: 'mirror', before: null, after: {type: 'string', maxLength: 50}},
                requiredMembership: null, droppedLocalFields: [], evidence: ''},
            {id: 'upstream-modified|delete /v2/things/{ID}|01-things-v2.json|parameter|||projectId:query|required|',
                category: 'upstream-modified', opKey: 'delete /v2/things/{ID}', fragment: '01-things-v2.json', scope: 'parameter',
                branch: '', responseStatus: '', field: 'projectId:query',
                change: {kind: 'required', key: '', before: false, after: true}, evidence: ''},
            {id: 'upstream-modified|delete /v2/things/{ID}|01-things-v2.json|response|success|200|code|constraint|format',
                category: 'upstream-modified', opKey: 'delete /v2/things/{ID}', fragment: '01-things-v2.json', scope: 'response',
                branch: 'success', responseStatus: '200', field: 'code',
                change: {kind: 'constraint', key: 'format', before: null, after: 'int32'}, evidence: ''},
            {id: 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|',
                category: 'upstream-modified', opKey: 'post /v2/gadgets', fragment: '01-things-v2.json', scope: 'operation',
                branch: '', responseStatus: '', field: '',
                change: {kind: 'deprecated', key: '', before: false, after: true}, evidence: '',
                lifecycle: {'x-last-modified': '3.2.x', 'x-deprecated-since': '3.2.x'}},
            {id: 'upstream-modified|post /v2/widgets|01-things-v2.json|requestBody|branch-1||size|constraint|maximum',
                category: 'upstream-modified', opKey: 'post /v2/widgets', fragment: '01-things-v2.json', scope: 'requestBody',
                branch: 'branch-1', responseStatus: '', field: 'size',
                change: {kind: 'constraint', key: 'maximum', before: null, after: 100}, evidence: ''},
            {id: 'upstream-modified|delete /v2/things/{ID}|01-things-v2.json|parameter|||Authorization:header#1|required|',
                category: 'upstream-modified', opKey: 'delete /v2/things/{ID}', fragment: '01-things-v2.json', scope: 'parameter',
                branch: '', responseStatus: '', field: 'Authorization:header#1',
                change: {kind: 'required', key: '', before: false, after: true}, evidence: ''},
            {id: 'unattributed|post /v2/etl/merge|01-things-v2.json|requestBody|||onError|field-uncovered|',
                category: 'unattributed', opKey: 'post /v2/etl/merge', fragment: '01-things-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'onError',
                change: {kind: 'field-uncovered', key: '', before: null, after: {type: 'string', enum: ['fail', 'cancel']},
                    description: 'Error handling mode.'}, evidence: ''},
            {id: 'upstream-added|post /v2/snapshots|01-things-v2.json|operation|||||',
                category: 'upstream-added', opKey: 'post /v2/snapshots', fragment: '01-things-v2.json', scope: 'operation',
                branch: '', responseStatus: '', field: '',
                change: {kind: 'operation-absent-in-fragments', key: '', before: null, after: null}, evidence: ''},
            {id: 'upstream-added-field|delete /v2/things/{ID}|01-things-v2.json|response||200|data|field-uncovered|',
                category: 'upstream-added-field', opKey: 'delete /v2/things/{ID}', fragment: '01-things-v2.json', scope: 'response',
                branch: '', responseStatus: '200', field: 'data',
                change: {kind: 'field-uncovered', key: '', before: null, after: {type: 'object', properties: {jobId: {type: 'string'}}}},
                requiredMembership: null, evidence: ''},
            {id: 'upstream-added-field|post /v2/gadgets|01-things-v2.json|response||200|result|field-uncovered|',
                category: 'upstream-added-field', opKey: 'post /v2/gadgets', fragment: '01-things-v2.json', scope: 'response',
                branch: '', responseStatus: '200', field: 'result',
                change: {kind: 'field-uncovered', key: '', before: null, after: {type: 'string'}},
                requiredMembership: null, evidence: ''},
            {id: 'upstream-added-param|delete /v2/things/{ID}|01-things-v2.json|parameter|||pageSize:query|param-uncovered|',
                category: 'upstream-added-param', opKey: 'delete /v2/things/{ID}', fragment: '01-things-v2.json', scope: 'parameter',
                branch: '', responseStatus: '', field: 'pageSize:query',
                change: {kind: 'param-uncovered', key: '', before: null,
                    after: {name: 'pageSize', in: 'query', required: false, schema: {type: 'integer'}, description: 'Page size.'}}, evidence: ''},
        ],
    }
}

function fragmentLoader(fileName) {
    const document = FRAGMENTS.get(fileName)
    if (!document) throw new Error(`fixture missing fragment ${fileName}`)
    return document
}

function assemble(decisions, branchPlan = null) {
    return assembleChangeSet({diffDocument: diffDocument(), decisions, fragmentLoader, branchPlan})
}

test('prose drift is a report lane: assembled nothing, and an adopt stance fails closed', () => {
    const {changeSet, reports} = assemble([])
    assert.deepEqual(changeSet.entries.map(entry => entry.diffEntryId).filter(id => id.includes('description')), [])
    const drift = reports.descriptionDrift.find(entry => entry.id.includes('response|success|200|code|description'))
    assert.deepEqual([drift.before, drift.after, drift.templateProse], ['old text', 'Business response code; 0 indicates success.', false])
    assert.throws(() => assemble([{diffEntryId: drift.id, action: 'adopt'}]), /REST_UPSTREAM_ASSEMBLE_PROSE_ADOPT/)
})

test('mirrors are auto lanes: the value merges the upstream structure with the local prose', () => {
    const {changeSet} = assemble([])
    const mirror = changeSet.entries.find(entry => entry.kind === 'mirror')
    assert.equal(mirror.diffEntryId, 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|schema|mirror')
    assert.equal(mirror.targetFragment, '01-things-v2.json')
    assert.equal(mirror.opPath, '/paths/~1v2~1things/post/requestBody/content/application~1json/schema/properties/dbName')
    // upstream structure (maxLength 50) + local description preserved
    assert.deepEqual(mirror.value, {type: 'string', maxLength: 50, description: 'Database name.'})
    assert.equal(mirror.requiredMembership, null)
    assert.match(mirror.evidence, /schema mirrored to upstream structure/)
})

test('unresolvable recursive subtrees are a report lane: nothing is assembled for them', () => {
    // diff.js flags entries whose upstream subtree is self-referential
    // (mirror value would be infinite); the assembler must divert them to a
    // human-review list and write nothing, instead of failing or mirroring.
    const diff = diffDocument()
    const mirrorEntry = diff.entries.find(entry => entry.change.kind === 'schema')
    mirrorEntry.unresolvableSubtree = true
    mirrorEntry.change.after = null
    const addedEntry = diff.entries.find(entry => entry.change.kind === 'field-uncovered' && entry.category === 'upstream-added-field')
    addedEntry.unresolvableSubtree = true
    addedEntry.change.after = null
    const {changeSet, reports} = assembleChangeSet({diffDocument: diff, decisions: [], fragmentLoader})
    const flagged = new Set([mirrorEntry.id, addedEntry.id])
    assert.deepEqual(changeSet.entries.filter(entry => flagged.has(entry.diffEntryId)), [])
    assert.deepEqual(reports.unresolvableSubtrees.map(entry => [entry.id, entry.category]).sort(), [
        ['upstream-added-field|delete /v2/things/{ID}|01-things-v2.json|response||200|data|field-uncovered|', 'upstream-added-field'],
        ['upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|schema|mirror', 'upstream-modified'],
    ].sort())
})


test('a $ref request schema translates mirror and branch loci into the component', () => {
    // milvus create/alter_properties shape: the requestBody itself is a $ref
    // (branches or plain properties live in the component), so every write
    // locus must translate into the component definition.
    const fragment = {
        openapi: '3.0.1', info: {title: 'REST', version: 'v2'},
        paths: {
            '/v2/things/describe': {post: {requestBody: {content: {'application/json': {schema: {$ref: '#/components/schemas/DescribeReq'}}}}}},
            '/v2/things/create': {post: {requestBody: {content: {'application/json': {schema: {$ref: '#/components/schemas/CreateReq'}}}}}},
        },
        components: {schemas: {
            DescribeReq: {type: 'object', properties: {dbName: {type: 'string', description: 'local prose'}}},
            CreateReq: {oneOf: [{$ref: '#/components/schemas/QuickThing'}, {$ref: '#/components/schemas/CustomThing'}]},
            QuickThing: {'x-tab-label': 'quick', type: 'object', properties: {dimension: {type: 'integer'}}},
            CustomThing: {'x-tab-label': 'custom', type: 'object', properties: {schema: {type: 'object'}}},
        }},
    }
    const loader = fileName => {
        if (fileName !== '01-things-v2.json') throw new Error(`fixture missing fragment ${fileName}`)
        return fragment
    }
    const mirrorId = 'upstream-modified|post /v2/things/describe|01-things-v2.json|requestBody|||dbName|schema|mirror'
    const addedId = 'upstream-added-field|post /v2/things/create|01-things-v2.json|requestBody|||consistencyLevel|field-uncovered|'
    const diff = {source: 'milvus-data-plane', entries: [
        {id: mirrorId, category: 'upstream-modified', opKey: 'post /v2/things/describe', fragment: '01-things-v2.json', scope: 'requestBody',
            branch: '', responseStatus: '', field: 'dbName',
            change: {kind: 'schema', key: 'mirror', before: null, after: {type: 'string'}}, requiredMembership: null, droppedLocalFields: [], evidence: ''},
        {id: addedId, category: 'upstream-added-field', opKey: 'post /v2/things/create', fragment: '01-things-v2.json', scope: 'requestBody',
            branch: '', responseStatus: '', field: 'consistencyLevel',
            change: {kind: 'field-uncovered', before: null, after: {type: 'string'}}, requiredMembership: false, evidence: ''},
    ]}
    // diff.js labels $ref members positionally (branch-N): the raw oneOf
    // member carries no x-tab-label, so branch-1 is the offered label and the
    // container translation resolves it to the first component.
    const branchPlan = {placements: [{diffEntryId: addedId, targets: ['branch-1']}], reorganizations: []}
    const {changeSet, reports} = assembleChangeSet({diffDocument: diff, decisions: [], fragmentLoader: loader, branchPlan})
    const mirror = changeSet.entries.find(entry => entry.kind === 'mirror')
    assert.equal(mirror.opPath, '/components/schemas/DescribeReq/properties/dbName')
    assert.deepEqual(mirror.value, {type: 'string', description: 'local prose'})
    const addition = changeSet.entries.find(entry => entry.kind === 'addition')
    assert.equal(addition.opPath, '/components/schemas/QuickThing/properties')
    assert.deepEqual(addition.value, {consistencyLevel: {type: 'string'}})
    assert.deepEqual(reports.unplaced, [])
    assert.deepEqual(reports.rejectedPlacements, [])
})

test('a structure-only mirror change set survives the real parse/contract path', () => {
    // P1-A regression: the preserve flag lives on the DIFF entry only; the
    // change-set entry must stay within the closed contract shape, and the
    // landed artifact must parse through loadChangeSet (Ajv) cleanly.
    const diff = diffDocument()
    const mirror = diff.entries.find(entry => entry.change.kind === 'schema')
    mirror.preserveLocalScalarConstraints = true
    const {changeSet} = assembleChangeSet({diffDocument: diff, decisions: [], fragmentLoader})
    const parsed = parseChangeSet(JSON.stringify(changeSet))
    const landed = parsed.entries.find(entry => entry.kind === 'mirror')
    assert.equal(landed.diffEntryId, mirror.id)
    assert.equal(landed.preserveLocalScalarConstraints, undefined)
    assert.deepEqual(landed.value, {type: 'string', maxLength: 50, description: 'Database name.'})
})

test('a relaxation-flagged mirror waits in pendingConfirmation instead of the change set', () => {
    const diff = diffDocument()
    const mirror = diff.entries.find(entry => entry.change.kind === 'schema')
    mirror.requiresConfirmation = 'required-relaxation'
    mirror.requiredMembership = false
    const {changeSet, reports} = assembleChangeSet({diffDocument: diff, decisions: [], fragmentLoader})
    assert.ok(!changeSet.entries.some(entry => entry.kind === 'mirror'))
    assert.deepEqual(reports.pendingConfirmation.map(entry => entry.id), [mirror.id])
    assert.equal(reports.pendingConfirmation[0].reason, 'required-relaxation')
})

test('schema-level required adoption derives membership from the fragment copy', () => {
    const {changeSet} = assemble([{diffEntryId: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||actions|required|', action: 'adopt'}])
    assert.deepEqual(changeSet.entries.filter(entry => entry.diffEntryId === 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||actions|required|'), [{
        diffEntryId: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||actions|required|',
        kind: 'constraint', targetFragment: '01-things-v2.json',
        opPath: '/paths/~1v2~1things/post/requestBody/content/application~1json/schema/required',
        value: ['dbName', 'actions'],
        evidence: "post /v2/things requestBody field 'actions' required gains 'actions' (membership derived from the fragment copy)",
        override: false,
    }])
})

test('parameter required adoption writes the boolean on the parameter object (#946 semantics)', () => {
    const {changeSet} = assemble([{diffEntryId: 'upstream-modified|delete /v2/things/{ID}|01-things-v2.json|parameter|||projectId:query|required|', action: 'adopt'}])
    assert.deepEqual(changeSet.entries.filter(entry => entry.diffEntryId === 'upstream-modified|delete /v2/things/{ID}|01-things-v2.json|parameter|||projectId:query|required|'), [{
        diffEntryId: 'upstream-modified|delete /v2/things/{ID}|01-things-v2.json|parameter|||projectId:query|required|',
        kind: 'constraint', targetFragment: '01-things-v2.json',
        opPath: '/paths/~1v2~1things~1{ID}/delete/parameters/0',
        value: true,
        evidence: "delete /v2/things/{ID} parameter field 'projectId:query' required → true",
        override: false,
    }])
})

test('constraint adoption writes the upstream scalar; deprecated adoption writes the flag plus diff-suggested lifecycle leaves', () => {
    const deprecatedId = 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|'
    const maxLengthId = 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|constraint|maxLength'
    const {changeSet} = assemble([
        {diffEntryId: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|constraint|maxLength', action: 'adopt'},
        {diffEntryId: 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|', action: 'adopt'},
    ])
    assert.deepEqual(changeSet.entries.filter(entry => [deprecatedId, maxLengthId].includes(entry.diffEntryId)), [
        {
            diffEntryId: 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|',
            kind: 'constraint', targetFragment: '01-things-v2.json',
            opPath: '/paths/~1v2~1gadgets/post/deprecated', value: true,
            evidence: 'post /v2/gadgets operation deprecated false → true', override: false,
        },
        {
            diffEntryId: 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|',
            kind: 'lifecycle', targetFragment: '01-things-v2.json',
            opPath: '/paths/~1v2~1gadgets/post/x-last-modified', value: '3.2.x',
            evidence: 'post /v2/gadgets operation x-last-modified="3.2.x" (diff-suggested lifecycle)', override: false,
        },
        {
            diffEntryId: 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|',
            kind: 'lifecycle', targetFragment: '01-things-v2.json',
            opPath: '/paths/~1v2~1gadgets/post/x-deprecated-since', value: '3.2.x',
            evidence: 'post /v2/gadgets operation x-deprecated-since="3.2.x" (diff-suggested lifecycle)', override: false,
        },
        {
            diffEntryId: maxLengthId,
            kind: 'constraint', targetFragment: '01-things-v2.json',
            opPath: '/paths/~1v2~1things/post/requestBody/content/application~1json/schema/properties/dbName/maxLength', value: 50,
            evidence: "post /v2/things requestBody field 'dbName' maxLength 32 → 50", override: false,
        },
    ])
})

test('override decisions pass through to the change set with their reason', () => {
    const {changeSet} = assemble([{diffEntryId: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|required|', action: 'adopt', override: true, overrideReason: 'R&D confirmed the relaxation upstream'}])
    const overrideEntry = changeSet.entries.find(entry => entry.diffEntryId === 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|required|')
    assert.equal(overrideEntry.override, true)
    assert.equal(overrideEntry.overrideReason, 'R&D confirmed the relaxation upstream')
})

test('skip rows produce nothing; ledger rows become operation-bound drafts', () => {
    const {changeSet} = assemble([
        {diffEntryId: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|required|', action: 'skip', reason: 'flagged relaxation; human decision pending'},
        {diffEntryId: 'unattributed|post /v2/etl/merge|01-things-v2.json|requestBody|||onError|field-uncovered|', action: 'ledger', classification: 'deferred', reason: 'branch attribution unclear'},
        {diffEntryId: 'upstream-added|post /v2/snapshots|01-things-v2.json|operation|||||', action: 'ledger', classification: 'deferred', reason: 'confirmed public, content work pending'},
    ])
    const drafts = changeSet.entries.filter(entry => entry.kind === 'ledgerDraft')
    assert.deepEqual(drafts.map(entry => entry.ledgerDraft.classification), ['deferred', 'deferred'])
    assert.equal(drafts[0].ledgerDraft.opKey, 'post /v2/etl/merge')
    assert.equal(drafts[1].ledgerDraft.opKey, 'post /v2/snapshots')
})

test('a branch placement turns the added field into additions for each target tab', () => {
    const addedFieldId = 'upstream-added-field|delete /v2/things/{ID}|01-things-v2.json|response||200|data|field-uncovered|'
    const {changeSet, reports} = assemble([
        {diffEntryId: 'unattributed|post /v2/etl/merge|01-things-v2.json|requestBody|||onError|field-uncovered|', action: 'ledger', classification: 'deferred', reason: 'placed instead'},
    ], {placements: [
        {diffEntryId: addedFieldId, targets: ['success']},
        {diffEntryId: 'unattributed|post /v2/etl/merge|01-things-v2.json|requestBody|||onError|field-uncovered|', targets: ['use volume', 'use object storage']},
    ], reorganizations: []})
    const additions = changeSet.entries.filter(entry => entry.kind === 'addition')
    assert.deepEqual(additions.map(entry => entry.opPath), [
        '/paths/~1v2~1etl~1merge/post/requestBody/content/application~1json/schema/anyOf/0/properties',
        '/paths/~1v2~1etl~1merge/post/requestBody/content/application~1json/schema/anyOf/1/properties',
        '/paths/~1v2~1things~1{ID}/delete/responses/200/content/application~1json/schema/anyOf/0/properties',
        '/paths/~1v2~1gadgets/post/responses/200/content/application~1json/schema/properties',
        '/paths/~1v2~1things~1{ID}/delete/parameters',
    ])
    const dataAddition = additions.find(entry => entry.opPath.includes('delete/responses'))
    const onErrorAdditions = additions.filter(entry => entry.opPath.includes('etl~1merge'))
    assert.deepEqual(dataAddition.value, {data: {type: 'object', properties: {jobId: {type: 'string'}}}})
    assert.deepEqual(onErrorAdditions.map(entry => entry.value.onError.type), ['string', 'string'])
    assert.deepEqual(reports.placementsApplied.map(entry => entry.targets), [['use volume', 'use object storage'], ['success']])
    // the ledger stance on the placed entry is superseded, not executed
    assert.deepEqual(reports.supersededStances.map(entry => entry.id), ['unattributed|post /v2/etl/merge|01-things-v2.json|requestBody|||onError|field-uncovered|'])
    assert.ok(!changeSet.entries.some(entry => entry.kind === 'ledgerDraft'))
    // the parameter addition rides along automatically (no placement needed)
    const param = changeSet.entries.find(entry => entry.kind === 'addition' && entry.opPath.endsWith('/parameters'))
    assert.equal(param.value.name, 'pageSize')
})

test('unplaced additions land in the human-review list; unattributed ledger stances stay legal there', () => {
    const {changeSet, reports} = assemble([
        {diffEntryId: 'unattributed|post /v2/etl/merge|01-things-v2.json|requestBody|||onError|field-uncovered|', action: 'ledger', classification: 'deferred', reason: 'PM decision pending'},
    ])
    assert.deepEqual(reports.unplaced.map(entry => [entry.field, entry.branchLabels]), [
        ['onError', ['use volume', 'use object storage']],
        ['data', ['success', 'error']],
    ])
    // the ledger draft for the unplaced unattributed field still assembled
    assert.deepEqual(changeSet.entries.filter(entry => entry.kind === 'ledgerDraft').map(entry => entry.ledgerDraft.opKey),
        ['post /v2/etl/merge'])
})

test('a required drift with a lifecycle suggestion anchors the lifecycle leaves on the schema object', () => {
    // The applier binds required-cited entries to the schema declaring the
    // field (its .properties), so the field object is not a legal lifecycle
    // locus for them; the schema itself is.
    const diff = diffDocument()
    diff.entries[1].lifecycle = {'x-last-modified': '3.0.x'}
    const {changeSet} = assembleChangeSet({diffDocument: diff, decisions: [{diffEntryId: diff.entries[1].id, action: 'adopt'}], fragmentLoader})
    assert.deepEqual(changeSet.entries.filter(entry => entry.diffEntryId === diff.entries[1].id).map(entry => [entry.kind, entry.opPath]), [
        ['constraint', '/paths/~1v2~1things/post/requestBody/content/application~1json/schema/required'],
        ['lifecycle', '/paths/~1v2~1things/post/requestBody/content/application~1json/schema/x-last-modified'],
    ])
})

test('positional branch-N citations resolve unlabeled oneOf/anyOf members', () => {
    const {changeSet} = assemble([{diffEntryId: 'upstream-modified|post /v2/widgets|01-things-v2.json|requestBody|branch-1||size|constraint|maximum', action: 'adopt'}])
    assert.equal(changeSet.entries.find(entry => entry.kind === 'constraint').opPath,
        '/paths/~1v2~1widgets/post/requestBody/content/application~1json/schema/anyOf/0/properties/size/maximum')
})

test('copy-indexed parameter fields resolve the cited duplicate occurrence', () => {
    const {changeSet} = assemble([{diffEntryId: 'upstream-modified|delete /v2/things/{ID}|01-things-v2.json|parameter|||Authorization:header#1|required|', action: 'adopt'}])
    assert.equal(changeSet.entries.find(entry => entry.kind === 'constraint').opPath,
        '/paths/~1v2~1things~1{ID}/delete/parameters/3')
})

test('stanceError mirrors the assembler gates on the diff entry alone', () => {
    const diff = diffDocument()
    const byId = new Map(diff.entries.map(entry => [entry.id, entry]))
    assert.match(stanceError({action: 'adopt'}, byId.get('upstream-modified|post /v2/things|01-things-v2.json|response|success|200|code|description|')), /report lane/)
    assert.equal(stanceError({action: 'adopt'}, byId.get('upstream-modified|post /v2/things|01-things-v2.json|requestBody|||actions|required|')), null)
    assert.match(stanceError({action: 'adopt'}, byId.get('upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|schema|mirror')), /assembled automatically/)
    assert.match(stanceError({action: 'adopt'}, byId.get('unattributed|post /v2/etl/merge|01-things-v2.json|requestBody|||onError|field-uncovered|')), /only upstream-modified/)
    assert.match(stanceError({action: 'ledger'}, byId.get('upstream-added-field|delete /v2/things/{ID}|01-things-v2.json|response||200|data|field-uncovered|')), /assembled automatically/)
    assert.match(stanceError({action: 'adopt'}, byId.get('upstream-added-param|delete /v2/things/{ID}|01-things-v2.json|parameter|||pageSize:query|param-uncovered|')), /assembled automatically/)
    assert.match(stanceError({action: 'adopt'}, {category: 'upstream-modified', change: {kind: 'param-uncovered'}}), /param-uncovered/)
    assert.equal(stanceError({action: 'skip'}, byId.get('upstream-added|post /v2/snapshots|01-things-v2.json|operation|||||')), null)
})

test('fail-closed: unknown ids, field-level ledger targets, and non-mechanical adopt targets', () => {
    assert.throws(() => assemble([{diffEntryId: 'upstream-modified|invented|01-things-v2.json|operation||||deprecated|', action: 'adopt'}]),
        /REST_UPSTREAM_ASSEMBLE_DIFF_ENTRY_UNKNOWN/)
    assert.throws(() => assemble([{diffEntryId: 'upstream-added-field|delete /v2/things/{ID}|01-things-v2.json|response||200|data|field-uncovered|', action: 'ledger', classification: 'deferred', reason: 'x'}]),
        /REST_UPSTREAM_ASSEMBLE_LEDGER_TARGET_INVALID/)
    assert.throws(() => assemble([{diffEntryId: 'upstream-added|post /v2/snapshots|01-things-v2.json|operation|||||', action: 'adopt'}]),
        /REST_UPSTREAM_ASSEMBLE_ADOPT_TARGET_INVALID/)
    assert.throws(() => assemble([{diffEntryId: 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|', action: 'ledger', classification: 'deferred', reason: 'x'}]),
        /REST_UPSTREAM_ASSEMBLE_LEDGER_TARGET_INVALID/)
    assert.throws(() => assemble([{diffEntryId: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|schema|mirror', action: 'adopt'}]),
        /REST_UPSTREAM_ASSEMBLE_AUTO_STANCE/)
})

test('fail-closed: branch resolution and unknown constraint keys', () => {
    const diff = diffDocument()
    diff.entries[0].branch = 'no-such-branch'
    // prose entries never resolve loci; force the resolution by adopting a
    // stance-lane entry on a broken branch instead
    const broken = diffDocument()
    broken.entries.find(entry => entry.change.kind === 'constraint' && entry.change.key === 'format').branch = 'no-such-branch'
    assert.throws(() => assembleChangeSet({diffDocument: broken, decisions: [{diffEntryId: broken.entries[6].id, action: 'adopt'}], fragmentLoader}),
        /REST_UPSTREAM_ASSEMBLE_BRANCH_NOT_FOUND/)
    const constraint = diffDocument()
    constraint.entries[3].change = {kind: 'constraint', key: 'unknownKey', before: 1, after: 2}
    assert.throws(() => assembleChangeSet({diffDocument: constraint, decisions: [{diffEntryId: constraint.entries[3].id, action: 'adopt'}], fragmentLoader}),
        /REST_UPSTREAM_ASSEMBLE_CHANGE_UNSUPPORTED/)
})

test('decision parsing enforces the contract and rejects duplicates', () => {
    assert.throws(() => parseDecisions('{"diffEntryId":"x","action":"ledger"}\n'), /REST_UPSTREAM_DECISION_INVALID/)
    assert.throws(() => parseDecisions('{"diffEntryId":"x","action":"skip"}\n'), /REST_UPSTREAM_DECISION_INVALID/)
    assert.throws(() => parseDecisions('{"diffEntryId":"x","action":"adopt","override":true}\n'), /REST_UPSTREAM_DECISION_INVALID/)
    assert.throws(() => parseDecisions('{"diffEntryId":"x","action":"adopt"}\n{"diffEntryId":"x","action":"skip","reason":"y"}\n'), /REST_UPSTREAM_DECISION_DUPLICATE/)
    assert.throws(() => parseDecisions('{"diffEntryId":"x","action":\n'), /REST_UPSTREAM_DECISIONS_MALFORMED_JSON/)
    assert.deepEqual(parseDecisions('{"diffEntryId":"x","action":"skip","reason":"y"}\n\n'), [{diffEntryId: 'x', action: 'skip', reason: 'y'}])
})

test('loadDecisions reads a JSONL file from disk', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-decisions-'))
    try {
        const file = path.join(dir, 'decisions.jsonl')
        fs.writeFileSync(file, '{"diffEntryId":"a","action":"adopt"}\n{"diffEntryId":"b","action":"ledger","classification":"deferred","reason":"r"}\n')
        assert.deepEqual(loadDecisions(file).map(decision => decision.diffEntryId), ['a', 'b'])
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})
