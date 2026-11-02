const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {diffSpecifications} = require('./diff')
const {parseChangeSet, diffDigestOf} = require('./changeSet')
const {applyChangeSet, applyTitleEntries, reconcile, writeCanonicalOutputs} = require('./applier')
const {assertCanonicalBytes} = require('./formatter')
const {mergeMirrorProse} = require('./mirror')

const SHA = 'c'.repeat(40)
const RULESET = {internalFieldDenylist: ['accessKey', 'secretKey', 'token', 'innerCall']}
const SOURCE = {id: 'zilliz-cloud-control-plane', publicationTarget: 'zilliz'}

function importFragment() {
    return {
        openapi: '3.0.1',
        info: {title: 'REST', version: 'v2'},
        paths: {
            '/v2/vectordb/jobs/import/create': {
                post: {
                    summary: 'Import Data.',
                    description: 'Create an import job.',
                    requestBody: {content: {'application/json': {schema: {oneOf: [
                        {'x-tab-label': 'Volume (Serving)', type: 'object', properties: {clusterId: {type: 'string'}}},
                        {'x-tab-label': 'External storage (Serving)', type: 'object', properties: {
                            objectUrl: {type: 'string', maxLength: 128},
                        }},
                        {'x-tab-label': 'External storage (On-demand)', type: 'object', properties: {
                            objectUrl: {type: 'string', maxLength: 128},
                        }},
                    ]}}}},
                    responses: {'200': {description: 'ok'}},
                },
            },
        },
    }
}

function importUpstream() {
    return {openapi: '3.0.3', paths: {
        '/v2/vectordb/jobs/import/create': {post: {
            summary: 'Import Data',
            description: 'Create an import job',
            requestBody: {content: {'application/json': {schema: {type: 'object', properties: {
                clusterId: {type: 'string'},
                objectUrl: {type: 'string', maxLength: 256},
                stageName: {type: 'string'},
            }}}}},
            responses: {'200': {description: 'ok'}},
        }},
        '/v2/vectordb/jobs/import/get_progress': {post: {summary: 'Get Import Progress', responses: {'200': {description: 'ok'}}}},
    }}
}

function baseDiff() {
    return diffSpecifications({source: SOURCE, upstreamPin: SHA, upstream: importUpstream(),
        fragments: new Map([['11-import-operations-v2.json', importFragment()]]),
        ledger: {schemaVersion: '1.0', entries: []}, ruleset: RULESET})
}

const SUMMARY_ID = 'upstream-modified|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|operation||||summary|'
const DESCRIPTION_ID = 'upstream-modified|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|operation||||description|'
const MIRROR_SERVING_ID = 'upstream-modified|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|requestBody|External storage (Serving)||objectUrl|schema|mirror'
const MIRROR_ONDEMAND_ID = 'upstream-modified|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|requestBody|External storage (On-demand)||objectUrl|schema|mirror'
const UNATTRIBUTED_STAGE_NAME_ID = 'unattributed|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|requestBody|||stageName|field-uncovered|'
const ADDED_OP_ID = 'upstream-added|post /v2/vectordb/jobs/import/get_progress||operation||||operation-absent-in-fragments|'
const CREATE_POINTER = '/paths/~1v2~1vectordb~1jobs~1import~1create/post'
const MIRROR_SERVING_POINTER = `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/1/properties/objectUrl`
const MIRROR_ONDEMAND_POINTER = `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/2/properties/objectUrl`

// Mirror values are assembled, never hand-written; tests build them the same
// way the assembler does, from the diff's own upstream subtree.
function mirrorValue(diff, id, documents, fileName, pointer) {
    const cited = diff.entries.find(entry => entry.id === id)
    assert.ok(cited, `fixture drift: ${id} missing from diff`)
    let current = documents.get(fileName)
    for (const token of pointer.split('/').slice(1).map(token => token.replace(/~1/g, '/').replace(/~0/g, '~'))) {
        current = current?.[token]
    }
    return mergeMirrorProse(cited.change.after, current)
}

// A hand-built diff carrying the old-style constraint entry shape. Field-level
// constraint leaves no longer fire from diffSpecifications (any projection
// difference is a mirror), but the applier keeps binding them for
// hand-authored sets — these tests pin that machinery shut.
function constraintDiff() {
    return {schemaVersion: '1.0', source: SOURCE.id, publicationTarget: 'zilliz', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/vectordb/jobs/import/create', fragment: '11-import-operations-v2.json',
            category: 'upstream-modified', scope: 'requestBody', branch: 'External storage (Serving)', field: 'objectUrl',
            change: {kind: 'constraint', key: 'maxLength', before: 128, after: 256}, evidence: '/paths/x/post',
            id: MAXLENGTH_SERVING_ID}]}
}

const MAXLENGTH_SERVING_ID = 'upstream-modified|post /v2/vectordb/jobs/import/create|11-import-operations-v2.json|requestBody|External storage (Serving)||objectUrl|constraint|maxLength'

function changeSet(entries, diff = baseDiff()) {
    return {
        schemaVersion: '1.0',
        source: SOURCE.id,
        diffDigest: diffDigestOf(diff),
        entries: entries.map(({id, ...rest}) => ({evidence: 'upstream pin e64f3bd7', ...rest, diffEntryId: rest.diffEntryId || id})),
    }
}

test('happy path: mirrors and prose apply, skeleton stays put, reconcile reports the remainder', () => {
    const diff = baseDiff()
    const diffIds = new Set(diff.entries.map(entry => entry.id))
    for (const id of [SUMMARY_ID, DESCRIPTION_ID, MIRROR_SERVING_ID, MIRROR_ONDEMAND_ID, UNATTRIBUTED_STAGE_NAME_ID, ADDED_OP_ID]) {
        assert.ok(diffIds.has(id), `fixture drift: ${id} missing from diff`)
    }
    // The old constraint ids are gone: any projection difference mirrors.
    assert.ok(!diffIds.has(MAXLENGTH_SERVING_ID), 'constraint|maxLength must be superseded by schema|mirror')
    const documents = new Map([['11-import-operations-v2.json', importFragment()]])
    const changeSetDoc = parseChangeSet(JSON.stringify(changeSet([
        {id: SUMMARY_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/summary`, value: 'Import Data'},
        {id: MIRROR_SERVING_ID, kind: 'mirror', targetFragment: '11-import-operations-v2.json',
            opPath: MIRROR_SERVING_POINTER, value: mirrorValue(diff, MIRROR_SERVING_ID, documents, '11-import-operations-v2.json', MIRROR_SERVING_POINTER),
            requiredMembership: null},
        {id: MIRROR_ONDEMAND_ID, kind: 'mirror', targetFragment: '11-import-operations-v2.json',
            opPath: MIRROR_ONDEMAND_POINTER, value: mirrorValue(diff, MIRROR_ONDEMAND_ID, documents, '11-import-operations-v2.json', MIRROR_ONDEMAND_POINTER),
            requiredMembership: null},
        {id: UNATTRIBUTED_STAGE_NAME_ID, kind: 'ledgerDraft', ledgerDraft: {opKey: 'post /v2/vectordb/jobs/import/create',
            classification: 'deferred', reason: 'branch attribution needs PM input', owner: 'doc-team'}},
        {id: ADDED_OP_ID, kind: 'title', value: {action: 'add', zhTitle: '查询导入进度', slug: 'get-import-progress'}},
        {id: DESCRIPTION_ID, kind: 'lifecycle', targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/x-added-at`, value: '3.1.x',
            override: true, overrideReason: 'lifecycle derived by hand from the 3.1 release notes'},
    ])))

    const result = applyChangeSet({documents, titles: {'查看导入': 'import-data'}, changeSet: changeSetDoc, diff, ruleset: RULESET})
    const operation = result.documents.get('11-import-operations-v2.json').paths['/v2/vectordb/jobs/import/create'].post
    assert.equal(operation.summary, 'Import Data')
    assert.equal(operation['x-added-at'], '3.1.x')
    const schema = operation.requestBody.content['application/json'].schema
    assert.deepEqual(schema.oneOf[1].properties.objectUrl, {type: 'string', maxLength: 256})
    assert.deepEqual(schema.oneOf[2].properties.objectUrl, {type: 'string', maxLength: 256})
    // scenario branch structure untouched
    assert.equal(schema.oneOf.length, 3)
    assert.deepEqual(result.titles, {'查看导入': 'import-data', '查询导入进度': 'get-import-progress'})
    assert.deepEqual(result.ledgerDrafts.map(draft => draft.classification), ['deferred'])
    assert.deepEqual(result.appliedLog.map(logEntry => logEntry.kind), ['prose', 'mirror', 'mirror', 'ledgerDraft', 'title', 'lifecycle'])
    assert.deepEqual(result.overrides, [{diffEntryId: DESCRIPTION_ID, kind: 'lifecycle', reason: 'lifecycle derived by hand from the 3.1 release notes'}])
    assert.equal(result.appliedLog[5].override, true)

    const unaddressed = reconcile(result.appliedLog, changeSetDoc, diff)
    assert.deepEqual(unaddressed, [])
    // Deferring an entry is legal: reconcile reports it instead of failing.
    const partialChangeSet = {...changeSetDoc, entries: changeSetDoc.entries.filter(entry => entry.diffEntryId !== DESCRIPTION_ID)}
    const partialLog = result.appliedLog.filter(logEntry => logEntry.diffEntryId !== DESCRIPTION_ID)
    assert.deepEqual(reconcile(partialLog, partialChangeSet, diff), [DESCRIPTION_ID])
    assert.throws(() => reconcile(result.appliedLog, partialChangeSet, diff), /REST_UPSTREAM_RECONCILE_STRAY/)
    assert.throws(() => reconcile(partialLog, changeSetDoc, diff), /REST_UPSTREAM_RECONCILE_INCOMPLETE/)
})

test('every sourcing and shape guarantee fails closed', () => {
    const diff = baseDiff()
    const documents = new Map([['11-import-operations-v2.json', importFragment()]])

    // Same write twice (diff entry + kind + locus) is rejected; a different
    // kind or leaf on the same drift entry stays expressible (design §6.3).
    assert.throws(() => parseChangeSet(JSON.stringify(changeSet([
        {id: SUMMARY_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/summary`, value: 'a'},
        {id: SUMMARY_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/summary`, value: 'b'},
    ]))), /REST_UPSTREAM_CHANGESET_DUPLICATE_DIFF_ENTRY/)

    assert.throws(() => parseChangeSet(JSON.stringify(changeSet([
        {id: SUMMARY_ID, kind: 'lifecycle', targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/x-added-at`, value: 'soon'},
    ]))), /REST_UPSTREAM_CHANGESET_VALUE_INVALID/)

    const wrongDigest = changeSet([{id: SUMMARY_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/summary`, value: 'x'}])
    wrongDigest.diffDigest = `sha256:${'0'.repeat(64)}`
    assert.throws(() => applyChangeSet({documents, changeSet: wrongDigest, diff, ruleset: RULESET}), /REST_UPSTREAM_CHANGESET_DIFF_MISMATCH/)

    const unsourced = changeSet([{diffEntryId: 'upstream-modified|post /v2/nope|21-project-operations-v2.json|operation||||summary|', kind: 'prose',
        targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/summary`, value: 'x'}])
    assert.throws(() => applyChangeSet({documents, changeSet: unsourced, diff, ruleset: RULESET}), /REST_UPSTREAM_CHANGESET_UNSOURCED/)

    // Hand-authored sets against the synthetic constraint diff keep the
    // leaf-write gates exercised: structural keys, internal fields, value shapes.
    const synthDiff = constraintDiff()
    const applySynth = entries => applyChangeSet({documents: new Map([['11-import-operations-v2.json', importFragment()]]),
        changeSet: changeSet(entries, synthDiff), diff: synthDiff, ruleset: RULESET})
    const servingObjectUrl = `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/1/properties/objectUrl`
    assert.throws(() => applySynth([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/1/properties/evil`, value: 'x'}]), /REST_UPSTREAM_APPLY_TARGET_INVALID/)
    assert.throws(() => applySynth([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${CREATE_POINTER}/requestBody/content/application~1json/schema/properties/token`, value: 'x'}]), /REST_UPSTREAM_INTERNAL_FIELD/)
    assert.throws(() => applySynth([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${servingObjectUrl}/type`, value: {object: true}}]), /REST_UPSTREAM_APPLY_VALUE_INVALID/)

    const unknownFragment = changeSet([{id: SUMMARY_ID, kind: 'prose', targetFragment: '99-unknown.json', opPath: `${CREATE_POINTER}/summary`, value: 'x'}])
    assert.throws(() => applyChangeSet({documents, changeSet: unknownFragment, diff, ruleset: RULESET}), /REST_UPSTREAM_APPLY_FRAGMENT_UNKNOWN/)
})

test('title conflicts fail closed in both directions', () => {
    assert.throws(() => applyTitleEntries({'查看导入': 'other-slug'}, [
        {diffEntryId: 'x', value: {action: 'add', zhTitle: '查看导入', slug: 'import-data'}},
    ]), /REST_UPSTREAM_TITLES_CONFLICT/)
    assert.throws(() => applyTitleEntries({}, [
        {diffEntryId: 'x', value: {action: 'remove', zhTitle: '不存在', slug: 'nope'}},
    ]), /REST_UPSTREAM_TITLES_CONFLICT/)
})

test('writeCanonicalOutputs leaves untouched fragments byte-identical and changed ones canonical', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-apply-'))
    const outDir = path.join(dir, 'out')
    try {
        fs.writeFileSync(path.join(dir, '11-import-operations-v2.json'), JSON.stringify(importFragment(), null, 2) + '\n')
        fs.writeFileSync(path.join(dir, '12-alias-operations-v2.json'), JSON.stringify({openapi: '3.0.1', paths: {}}, null, 2) + '\n')
        const documents = new Map([['11-import-operations-v2.json', importFragment()]])
        const changeSetDoc = parseChangeSet(JSON.stringify(changeSet([
            {id: SUMMARY_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json', opPath: `${CREATE_POINTER}/summary`, value: 'Import Data'},
        ])))
        const diff = baseDiff()
        const result = applyChangeSet({documents, changeSet: changeSetDoc, diff, ruleset: RULESET})
        const written = writeCanonicalOutputs({outDir, fragmentsDir: dir, documents: result.documents, changedFiles: result.changedFiles, titles: result.titles})
        assert.deepEqual(written, ['11-import-operations-v2.json', '12-alias-operations-v2.json'])
        assert.equal(fs.readFileSync(path.join(outDir, '12-alias-operations-v2.json'), 'utf8'), fs.readFileSync(path.join(dir, '12-alias-operations-v2.json'), 'utf8'))
        const reparsed = assertCanonicalBytes(fs.readFileSync(path.join(outDir, '11-import-operations-v2.json'), 'utf8'), 'applied')
        assert.equal(reparsed.paths['/v2/vectordb/jobs/import/create'].post.summary, 'Import Data')
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('parameter required flags apply as booleans; schema-level required relaxation stays confirmation-gated', () => {
    const fragment = {openapi: '3.0.1', paths: {'/v2/x': {post: {
        summary: 'X',
        parameters: [{name: 'projectId', in: 'query', required: true, description: 'Project.'}],
        requestBody: {content: {'application/json': {schema: {type: 'object', required: ['name'], properties: {name: {type: 'string'}}}}}},
        responses: {'200': {description: 'ok'}},
    }}}}
    const upstream = {openapi: '3.0.3', paths: {'/v2/x': {post: {
        summary: 'X',
        parameters: [{name: 'projectId', in: 'query', required: false, description: 'Project.'}],
        // Schema-level required drift: `required` lives on the parent schema,
        // not in the field projection, so the required entry survives the
        // mirror model as a leaf-class write (normalized to membership).
        requestBody: {content: {'application/json': {schema: {type: 'object', required: [], properties: {name: {type: 'string'}}}}}},
        responses: {'200': {description: 'ok'}},
    }}}}
    const diff = diffSpecifications({source: SOURCE, upstreamPin: SHA, upstream, fragments: new Map([['21-project-operations-v2.json', fragment]]),
        ledger: {schemaVersion: '1.0', entries: []}, ruleset: RULESET})
    const paramId = 'upstream-modified|post /v2/x|21-project-operations-v2.json|parameter|||projectId:query|required|'
    const bodyId = 'upstream-modified|post /v2/x|21-project-operations-v2.json|requestBody|||name|required|'
    assert.deepEqual(diff.entries.map(entry => entry.id), [paramId, bodyId])

    const apply = entries => applyChangeSet({documents: new Map([['21-project-operations-v2.json', structuredClone(fragment)]]),
        changeSet: changeSet(entries, diff), diff, ruleset: RULESET})
    // Both drifts relax a requirement: flagged for R&D confirmation, so they apply only with an override.
    assert.ok(diff.entries.every(entry => entry.requiresConfirmation === 'required-relaxation'))
    assert.throws(() => apply([
        {id: paramId, kind: 'constraint', targetFragment: '21-project-operations-v2.json', opPath: '/paths/~1v2~1x/post/parameters/0/required', value: false},
    ]), /REST_UPSTREAM_APPLY_CONFIRMATION_REQUIRED/)
    const confirmed = {override: true, overrideReason: 'R&D confirmed 2026-10-28'}
    const ok = apply([
        {id: paramId, kind: 'constraint', targetFragment: '21-project-operations-v2.json', opPath: '/paths/~1v2~1x/post/parameters/0/required', value: false, ...confirmed},
        {id: bodyId, kind: 'constraint', targetFragment: '21-project-operations-v2.json', opPath: '/paths/~1v2~1x/post/requestBody/content/application~1json/schema/required', value: [], ...confirmed},
    ])
    const operation = ok.documents.get('21-project-operations-v2.json').paths['/v2/x'].post
    assert.equal(operation.parameters[0].required, false)
    assert.deepEqual(operation.requestBody.content['application/json'].schema.required, [])

    // parameter-level required is fully mechanical (#941-style): a wrong-shape
    // value is normalized to the cited boolean and recorded, not fatal
    const reshaped = apply([{id: paramId, kind: 'constraint', targetFragment: '21-project-operations-v2.json',
        opPath: '/paths/~1v2~1x/post/parameters/0/required', value: ['projectId'], ...confirmed}])
    assert.equal(reshaped.documents.get('21-project-operations-v2.json').paths['/v2/x'].post.parameters[0].required, false)
    assert.equal(reshaped.normalizations.filter(entry => entry.kind === 'required-parameter').length, 1)
    // a boolean on a schema stays a shape error
    assert.throws(() => apply([{id: bodyId, kind: 'constraint', targetFragment: '21-project-operations-v2.json',
        opPath: '/paths/~1v2~1x/post/requestBody/content/application~1json/schema/required', value: true, ...confirmed}]), /REST_UPSTREAM_APPLY_VALUE_INVALID/)
    // Internal field names cannot enter through a required array either, override or not.
    assert.throws(() => apply([{id: bodyId, kind: 'constraint', targetFragment: '21-project-operations-v2.json',
        opPath: '/paths/~1v2~1x/post/requestBody/content/application~1json/schema/required', value: ['name', 'token'], ...confirmed}]), /REST_UPSTREAM_INTERNAL_FIELD/)
})

test('writes are bound to the cited drift: kind, leaf, locus, and value must match unless overridden', () => {
    const diff = constraintDiff()
    const apply = entries => applyChangeSet({documents: new Map([['11-import-operations-v2.json', importFragment()]]),
        changeSet: changeSet(entries, diff), diff, ruleset: RULESET})
    const servingObjectUrl = `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/1/properties/objectUrl`

    // Borrowing an unrelated id to write prose (the hallucination path) is rejected.
    assert.throws(() => apply([{id: MAXLENGTH_SERVING_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json',
        opPath: `${CREATE_POINTER}/description`, value: 'HALLUCINATED'}]), /REST_UPSTREAM_APPLY_UNBOUND_TARGET/)
    // A summary drift cannot be used to rewrite the description.
    const baseDiffDoc = baseDiff()
    const applyBase = entries => applyChangeSet({documents: new Map([['11-import-operations-v2.json', importFragment()]]),
        changeSet: changeSet(entries, baseDiffDoc), diff: baseDiffDoc, ruleset: RULESET})
    assert.throws(() => applyBase([{id: SUMMARY_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json',
        opPath: `${CREATE_POINTER}/description`, value: 'x'}]), /REST_UPSTREAM_APPLY_UNBOUND_TARGET/)
    // Operation-scoped drift must land on the operation object, not inside a branch.
    assert.throws(() => applyBase([{id: SUMMARY_ID, kind: 'prose', targetFragment: '11-import-operations-v2.json',
        opPath: `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/0/summary`, value: 'x'}]), /REST_UPSTREAM_APPLY_UNBOUND_LOCUS/)
    // Constraint value must equal the upstream value the diff reported...
    assert.throws(() => apply([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${servingObjectUrl}/maxLength`, value: 9999}]), /REST_UPSTREAM_APPLY_VALUE_UNBOUND/)
    // ...unless the deviation is explicit and explained, in which case it is logged.
    const overridden = apply([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${servingObjectUrl}/maxLength`, value: 512, override: true, overrideReason: 'PM asked for the documented limit, not the enforced one'}])
    assert.deepEqual(overridden.overrides.map(entry => entry.kind), ['constraint'])
    // The cited drift names objectUrl; writing clusterId instead is a locus mismatch.
    assert.throws(() => apply([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/0/properties/clusterId/maxLength`, value: 256}]), /REST_UPSTREAM_APPLY_UNBOUND_LOCUS/)
    // A maxLength drift cannot be used to write a different constraint key.
    assert.throws(() => apply([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${servingObjectUrl}/default`, value: 'x'}]), /REST_UPSTREAM_APPLY_UNBOUND_TARGET/)
    // Object defaults are never a legal constraint value shape.
    assert.throws(() => apply([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${servingObjectUrl}/default`, value: {smuggled: {deep: true}}}]), /REST_UPSTREAM_APPLY_VALUE_INVALID/)
    // Overrides must carry a reason (parse-time) and cannot appear without the flag.
    assert.throws(() => parseChangeSet(JSON.stringify(changeSet([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${servingObjectUrl}/maxLength`, value: 512, override: true}], diff))), /REST_UPSTREAM_CHANGESET_OVERRIDE_REASON_REQUIRED/)
    assert.throws(() => parseChangeSet(JSON.stringify(changeSet([{id: MAXLENGTH_SERVING_ID, kind: 'constraint', targetFragment: '11-import-operations-v2.json',
        opPath: `${servingObjectUrl}/maxLength`, value: 256, overrideReason: 'stray'}], diff))), /REST_UPSTREAM_CHANGESET_OVERRIDE_REASON_UNEXPECTED/)
})

test('mirror entries bind to their branch: a Serving citation cannot land in the On-demand branch', () => {
    const diff = baseDiff()
    const documents = () => new Map([['11-import-operations-v2.json', importFragment()]])
    const apply = entries => applyChangeSet({documents: documents(),
        changeSet: changeSet(entries, diff), diff, ruleset: RULESET})
    const onDemandPointer = `${CREATE_POINTER}/requestBody/content/application~1json/schema/oneOf/2/properties/objectUrl`
    assert.throws(() => apply([{id: MIRROR_SERVING_ID, kind: 'mirror', targetFragment: '11-import-operations-v2.json',
        opPath: onDemandPointer, value: mirrorValue(diff, MIRROR_SERVING_ID, documents(), '11-import-operations-v2.json', onDemandPointer)}]),
    /REST_UPSTREAM_APPLY_UNBOUND_LOCUS.*sits in branch "External storage \(On-demand\)"/)
    const ok = apply([{id: MIRROR_SERVING_ID, kind: 'mirror', targetFragment: '11-import-operations-v2.json',
        opPath: MIRROR_SERVING_POINTER, value: mirrorValue(diff, MIRROR_SERVING_ID, documents(), '11-import-operations-v2.json', MIRROR_SERVING_POINTER)}])
    assert.equal(ok.appliedLog.length, 1)
})

test('mirror values are recomputed and bound: a hand-mangled subtree is refused', () => {
    const diff = baseDiff()
    const documents = new Map([['11-import-operations-v2.json', importFragment()]])
    const mangled = mirrorValue(diff, MIRROR_SERVING_ID, documents, '11-import-operations-v2.json', MIRROR_SERVING_POINTER)
    mangled.maxLength = 999
    assert.throws(() => applyChangeSet({documents, titles: {},
        changeSet: parseChangeSet(JSON.stringify(changeSet([
            {id: MIRROR_SERVING_ID, kind: 'mirror', targetFragment: '11-import-operations-v2.json',
                opPath: MIRROR_SERVING_POINTER, value: mangled},
        ], diff))), diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_VALUE_UNBOUND/,
    )
})

test('mirror prose must be translation-complete before it lands', () => {
    // A local description with no x-i18n (legacy en-only content) survives the
    // merge — and then blocks the mirror until the translation stage runs.
    const fragment = importFragment()
    fragment.paths['/v2/vectordb/jobs/import/create'].post.requestBody
        .content['application/json'].schema.oneOf[1].properties.objectUrl.description = 'Object URL of the import source.'
    const diff = baseDiff()
    const documents = new Map([['11-import-operations-v2.json', fragment]])
    const pointer = MIRROR_SERVING_POINTER
    const changeSetDoc = parseChangeSet(JSON.stringify(changeSet([
        {id: MIRROR_SERVING_ID, kind: 'mirror', targetFragment: '11-import-operations-v2.json', opPath: pointer,
            value: mirrorValue(diff, MIRROR_SERVING_ID, documents, '11-import-operations-v2.json', pointer)},
    ], diff)))
    assert.throws(() => applyChangeSet({documents, titles: {}, changeSet: changeSetDoc, diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_TRANSLATION_INCOMPLETE/)
    // Complete translations let it land, and the local prose survived the merge.
    changeSetDoc.entries[0].value['x-i18n'] = {'zh-CN': {description: '导入源的对象 URL。'}, 'ja-JP': {description: 'インポート元のオブジェクト URL。'}}
    const result = applyChangeSet({documents, titles: {}, changeSet: changeSetDoc, diff, ruleset: RULESET})
    const mirrored = result.documents.get('11-import-operations-v2.json').paths['/v2/vectordb/jobs/import/create'].post
        .requestBody.content['application/json'].schema.oneOf[1].properties.objectUrl
    assert.equal(mirrored.description, 'Object URL of the import source.')
    assert.equal(mirrored.maxLength, 256)
    assert.equal(mirrored['x-i18n']['ja-JP'].description, 'インポート元のオブジェクト URL。')
})

// Design §6.3: lifecycle writes bind to the diff-derived suggestion without an
// override; deviations and un-derived leaves still need the logged override.
const TREE_SOURCE = {id: 'milvus-data-plane', repository: 'milvus-io/milvus', apiSurface: 'data-plane', publicationTarget: 'milvus', artifact: {kind: 'source-tree'}}
const TRACK = '3.0.x'

function lifecycleFragment() {
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
                    }}}}},
                    responses: {'200': {description: 'ok'}},
                },
            },
        },
    }
}

function lifecycleDiff() {
    return diffSpecifications({source: TREE_SOURCE, upstreamPin: SHA, upstream: lifecycleUpstream(),
        fragments: new Map([['05-collection-operations-v2.json', lifecycleFragment()]]),
        ledger: {schemaVersion: '1.0', entries: []}, ruleset: RULESET, lifecycleTrack: TRACK})
}

const DESCRIBE_POINTER = '/paths/~1v2~1vectordb~1collections~1describe/post'
const MAXLENGTH_ID = 'upstream-modified|post /v2/vectordb/collections/describe|05-collection-operations-v2.json|requestBody|||collectionName|constraint|maxLength'
const PROPERTY_POINTER = `${DESCRIBE_POINTER}/requestBody/content/application~1json/schema/properties/collectionName`

test('lifecycle writes bind to the diff-derived suggestion without an override', () => {
    const diff = lifecycleDiff()
    const documents = new Map([['05-collection-operations-v2.json', lifecycleFragment()]])
    const changeSetDoc = parseChangeSet(JSON.stringify(changeSet([
        {id: MAXLENGTH_ID, kind: 'constraint', targetFragment: '05-collection-operations-v2.json', opPath: `${PROPERTY_POINTER}/maxLength`, value: 128},
        {id: MAXLENGTH_ID, kind: 'lifecycle', targetFragment: '05-collection-operations-v2.json', opPath: `${PROPERTY_POINTER}/x-last-modified`, value: TRACK},
    ], diff)))
    const result = applyChangeSet({documents, titles: {}, changeSet: changeSetDoc, diff, ruleset: RULESET})
    const property = result.documents.get('05-collection-operations-v2.json').paths['/v2/vectordb/collections/describe'].post
        .requestBody.content['application/json'].schema.properties.collectionName
    assert.equal(property.maxLength, 128)
    assert.equal(property['x-last-modified'], TRACK)
    assert.equal(property['x-added-at'], '2.6.x')
    assert.deepEqual(result.overrides, [])
})

test('lifecycle values that deviate from the derived suggestion fail closed unless overridden', () => {
    const diff = lifecycleDiff()
    const documents = new Map([['05-collection-operations-v2.json', lifecycleFragment()]])
    // The track format parses; the applier binding rejects the deviation.
    assert.throws(
        () => applyChangeSet({documents, titles: {},
            changeSet: parseChangeSet(JSON.stringify(changeSet([
                {id: MAXLENGTH_ID, kind: 'lifecycle', targetFragment: '05-collection-operations-v2.json', opPath: `${PROPERTY_POINTER}/x-last-modified`, value: '2.6.x'},
            ], diff))), diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_VALUE_UNBOUND/,
    )
    const result = applyChangeSet({documents, titles: {},
        changeSet: parseChangeSet(JSON.stringify(changeSet([
            {id: MAXLENGTH_ID, kind: 'lifecycle', targetFragment: '05-collection-operations-v2.json', opPath: `${PROPERTY_POINTER}/x-last-modified`, value: '2.6.x', override: true, overrideReason: 'the 2.6 backport changed the field first'},
        ], diff))), diff, ruleset: RULESET})
    assert.equal(result.overrides.length, 1)
    assert.equal(result.overrides[0].kind, 'lifecycle')
    assert.match(result.overrides[0].reason, /backport/)
})

test('ledger drafts are bound to the cited operation: a forged opKey or field-level citation is rejected', () => {
    // a draft whose opKey differs from the cited upstream-added operation is
    // an invented decision about an operation the diff never reported
    const addedDiff = {schemaVersion: '1.0', source: 'milvus-data-plane', publicationTarget: 'milvus', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/vectordb/collections/compact', category: 'upstream-added', scope: 'operation',
            change: {kind: 'operation-absent-in-fragments', before: null, after: null}, evidence: '/paths/x/post',
            id: 'upstream-added|post /v2/vectordb/collections/compact||operation||||operation-absent-in-fragments|'}]}
    assert.throws(
        () => applyChangeSet({documents: new Map(), titles: {},
            changeSet: parseChangeSet(JSON.stringify(changeSet([
                {id: 'upstream-added|post /v2/vectordb/collections/compact||operation||||operation-absent-in-fragments|',
                    kind: 'ledgerDraft', ledgerDraft: {opKey: 'post /v2/vectordb/snapshots/list',
                        classification: 'external', reason: 'invented decision', owner: 'codex-rest-refresh-agent'}},
            ], addedDiff))), diff: addedDiff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_UNBOUND_LOCUS/,
    )
    const diff = lifecycleDiff()
    // a non-operation drift cannot carry a ledger draft at all
    assert.throws(
        () => applyChangeSet({documents: new Map([['05-collection-operations-v2.json', lifecycleFragment()]]), titles: {},
            changeSet: parseChangeSet(JSON.stringify(changeSet([
                {id: MAXLENGTH_ID, kind: 'ledgerDraft', ledgerDraft: {opKey: 'post /v2/vectordb/collections/describe',
                    classification: 'external', reason: 'field-level citation', owner: 'codex-rest-refresh-agent'}},
            ], diff))), diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_UNBOUND_TARGET/,
    )
    // the legit shape: an unattributed union field citing its branched operation
    const fieldDiff = {schemaVersion: '1.0', source: 'milvus-data-plane', publicationTarget: 'milvus', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/vectordb/collections/create', category: 'unattributed', scope: 'requestBody', field: 'dbName',
            change: {kind: 'field-uncovered', before: null, after: null}, evidence: '/paths/x/post',
            id: 'unattributed|post /v2/vectordb/collections/create|f.json|requestBody|||dbName|field-uncovered|'}]}
    const drafted = applyChangeSet({documents: new Map(), titles: {},
        changeSet: parseChangeSet(JSON.stringify(changeSet([
            {id: 'unattributed|post /v2/vectordb/collections/create|f.json|requestBody|||dbName|field-uncovered|',
                kind: 'ledgerDraft', ledgerDraft: {opKey: 'post /v2/vectordb/collections/create',
                    classification: 'deferred', reason: 'branch attribution needs review', owner: 'codex-rest-refresh-agent'}},
        ], fieldDiff))), diff: fieldDiff, ruleset: RULESET})
    assert.deepEqual(drafted.ledgerDrafts.map(draft => draft.opKey), ['post /v2/vectordb/collections/create'])
})

// Two real refresh runs lost the schema's existing required members when the
// agent built the array by hand. The applier now normalizes schema-level
// required writes to "membership +/- the cited field" and records the
// deviation instead of failing the run. (Hand-authored-set coverage: the
// pipeline derives mirrors, so this lane only guards bespoke sets.)
test('schema-level required writes are normalized to membership +/- the cited field', () => {
    const diff = lifecycleDiff()
    const documents = new Map([['05-collection-operations-v2.json', lifecycleFragment()]])
    // the fragment schema carries no required array here; simulate one with an
    // existing member to prove preservation
    documents.get('05-collection-operations-v2.json').paths['/v2/vectordb/collections/describe'].post
        .requestBody.content['application/json'].schema.required = ['actions']

    const synth = {schemaVersion: '1.0', source: TREE_SOURCE.id, publicationTarget: 'milvus', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/vectordb/collections/describe', fragment: '05-collection-operations-v2.json',
            category: 'upstream-modified', scope: 'requestBody', field: 'collectionName',
            change: {kind: 'required', before: false, after: true}, evidence: '/paths/x/post',
            id: 'upstream-modified|post /v2/vectordb/collections/describe|05-collection-operations-v2.json|requestBody|||collectionName|required|'}]}
    const changeSetDoc = parseChangeSet(JSON.stringify(changeSet([
        // submitted array drops `actions` — exactly the run-4/run-5 failure shape
        {id: synth.entries[0].id, kind: 'constraint', targetFragment: '05-collection-operations-v2.json',
            opPath: `${DESCRIBE_POINTER}/requestBody/content/application~1json/schema/required`, value: ['comparisonMethod']},
    ], synth)))
    const result = applyChangeSet({documents, titles: {}, changeSet: changeSetDoc, diff: synth, ruleset: RULESET})
    const schema = result.documents.get('05-collection-operations-v2.json')
        .paths['/v2/vectordb/collections/describe'].post.requestBody.content['application/json'].schema
    // landed value is membership + field, preserving the existing member
    assert.deepEqual(schema.required, ['actions', 'collectionName'])
    // and the deviation is recorded for the PR reviewer
    assert.equal(result.normalizations.length, 1)
    assert.deepEqual(result.normalizations[0].submitted, ['comparisonMethod'])
    assert.deepEqual(result.normalizations[0].applied, ['actions', 'collectionName'])
    assert.match(result.normalizations[0].note, /normalized/)
})

test('a correct required array lands without a normalization record', () => {
    const documents = new Map([['05-collection-operations-v2.json', lifecycleFragment()]])
    documents.get('05-collection-operations-v2.json').paths['/v2/vectordb/collections/describe'].post
        .requestBody.content['application/json'].schema.required = ['actions']
    const synth = {schemaVersion: '1.0', source: TREE_SOURCE.id, publicationTarget: 'milvus', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/vectordb/collections/describe', fragment: '05-collection-operations-v2.json',
            category: 'upstream-modified', scope: 'requestBody', field: 'collectionName',
            change: {kind: 'required', before: false, after: true}, evidence: '/paths/x/post',
            id: 'upstream-modified|post /v2/vectordb/collections/describe|05-collection-operations-v2.json|requestBody|||collectionName|required|'}]}
    const result = applyChangeSet({documents, titles: {},
        changeSet: parseChangeSet(JSON.stringify(changeSet([
            {id: synth.entries[0].id, kind: 'constraint', targetFragment: '05-collection-operations-v2.json',
                opPath: `${DESCRIBE_POINTER}/requestBody/content/application~1json/schema/required`, value: ['actions', 'collectionName']},
        ], synth))), diff: synth, ruleset: RULESET})
    assert.deepEqual(result.documents.get('05-collection-operations-v2.json')
        .paths['/v2/vectordb/collections/describe'].post.requestBody.content['application/json'].schema.required,
        ['actions', 'collectionName'])
    assert.deepEqual(result.normalizations, [])
})

test('a schema-level required write on a schema without the cited field still fails the locus', () => {
    const documents = new Map([['05-collection-operations-v2.json', lifecycleFragment()]])
    const synth = {schemaVersion: '1.0', source: TREE_SOURCE.id, publicationTarget: 'milvus', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/vectordb/collections/describe', fragment: '05-collection-operations-v2.json',
            category: 'upstream-modified', scope: 'requestBody', field: 'collectionName',
            change: {kind: 'required', before: false, after: true}, evidence: '/paths/x/post',
            id: 'upstream-modified|post /v2/vectordb/collections/describe|05-collection-operations-v2.json|requestBody|||collectionName|required|'}]}
    // citation names collectionName; write the required array on a schema that
    // does not declare it (the operation object itself)
    assert.throws(
        () => applyChangeSet({documents, titles: {},
            changeSet: parseChangeSet(JSON.stringify(changeSet([
                {id: synth.entries[0].id, kind: 'constraint', targetFragment: '05-collection-operations-v2.json', opPath: '/paths/~1v2~1vectordb~1collections~1describe/post/required', value: ['collectionName']},
            ], synth))), diff: synth, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_UNBOUND_LOCUS/,
    )
})

// Three runs produced three different broken shapes for parameter-level
// required. The applier now ignores the submitted opPath/value entirely and
// writes from the diff's own coordinates.
test('parameter-level required writes are fully mechanical from the cited entry', () => {
    const fragment = {openapi: '3.0.1', paths: {'/v2/x': {post: {
        summary: 'X',
        parameters: [{name: 'projectId', in: 'query', required: true, description: 'Project.'}],
        requestBody: {content: {'application/json': {schema: {type: 'object', required: ['name'], properties: {name: {type: 'string'}}}}}},
        responses: {'200': {description: 'ok'}},
    }}}}
    const upstream = {openapi: '3.0.3', paths: {'/v2/x': {post: {
        summary: 'X',
        parameters: [{name: 'projectId', in: 'query', required: false, description: 'Project.'}],
        requestBody: {content: {'application/json': {schema: {type: 'object', required: [], properties: {name: {type: 'string'}}}}}},
        responses: {'200': {description: 'ok'}},
    }}}}
    const diff = diffSpecifications({source: SOURCE, upstreamPin: SHA, upstream, fragments: new Map([['21-project-operations-v2.json', fragment]]),
        ledger: {schemaVersion: '1.0', entries: []}, ruleset: RULESET})
    const paramId = 'upstream-modified|post /v2/x|21-project-operations-v2.json|parameter|||projectId:query|required|'
    const confirmed = {override: true, overrideReason: 'R&D confirmed 2026-10-28'}
    const apply = entries => applyChangeSet({documents: new Map([['21-project-operations-v2.json', structuredClone(fragment)]]),
        changeSet: changeSet(entries, diff), diff, ruleset: RULESET})
    // a broken shape (opPath at an array index, object value) still lands the
    // correct boolean — the submitted parts are advisory
    const broken = apply([{id: paramId, kind: 'constraint', targetFragment: '21-project-operations-v2.json',
        opPath: '/paths/~1v2~1x/post/parameters/0/required/1', value: {nonsense: true}, ...confirmed}])
    const brokenOp = broken.documents.get('21-project-operations-v2.json').paths['/v2/x'].post
    assert.equal(brokenOp.parameters[0].required, false)
    assert.equal(broken.normalizations.length, 1)
    assert.equal(broken.normalizations[0].kind, 'required-parameter')
    assert.equal(broken.normalizations[0].applied, false)

    // a well-shaped submission lands clean, no normalization record
    const clean = apply([{id: paramId, kind: 'constraint', targetFragment: '21-project-operations-v2.json',
        opPath: '/paths/~1v2~1x/post/parameters/0/required', value: false, ...confirmed}])
    assert.equal(clean.documents.get('21-project-operations-v2.json').paths['/v2/x'].post.parameters[0].required, false)
    assert.deepEqual(clean.normalizations, [])

    // (A citation for a parameter absent from the operation is unreachable:
    // verifyAgainstDiff rejects any entry id that is not in the diff output.)
})

test('lifecycle leaves the diff did not derive still require the override', () => {
    const diff = lifecycleDiff()
    const documents = new Map([['05-collection-operations-v2.json', lifecycleFragment()]])
    assert.throws(
        () => applyChangeSet({documents, titles: {},
            changeSet: parseChangeSet(JSON.stringify(changeSet([
                {id: MAXLENGTH_ID, kind: 'lifecycle', targetFragment: '05-collection-operations-v2.json', opPath: `${PROPERTY_POINTER}/x-added-at`, value: TRACK},
            ], diff))), diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_OVERRIDE_REQUIRED/,
    )
})

test('lifecycle writes honor the locus binding: cited field, operation scope, and branch labels', () => {
    const diff = lifecycleDiff()
    const documents = new Map([['05-collection-operations-v2.json', lifecycleFragment()]])
    // Writing inside the cited property's sibling is rejected as an unbound locus.
    assert.throws(
        () => applyChangeSet({documents, titles: {},
            changeSet: parseChangeSet(JSON.stringify(changeSet([
                {id: MAXLENGTH_ID, kind: 'lifecycle', targetFragment: '05-collection-operations-v2.json', opPath: `${DESCRIBE_POINTER}/x-last-modified`, value: TRACK, override: true, overrideReason: 'op-scoped bump'},
            ], diff))), diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_UNBOUND_LOCUS/,
    )
})

// --- addition lane ---------------------------------------------------------

const SHAPE_DIFF_BASE = '/paths/~1v2~1volumes~1create/post'

function additionDiff() {
    return {schemaVersion: '1.0', source: SOURCE.id, publicationTarget: 'zilliz', upstreamPin: SHA, summary: {},
        entries: [
            {opKey: 'post /v2/volumes/create', fragment: '20-volume-operations-v2.json', category: 'upstream-added-field', scope: 'response', field: 'data',
             change: {kind: 'field-uncovered', before: null, after: {type: 'object', properties: {volumeName: {type: 'string', description: 'Name.'}}}},
             requiredMembership: null, evidence: '/paths/x/post',
             id: 'upstream-added-field|post /v2/volumes/create|20-volume-operations-v2.json|response||200|data|field-uncovered|'},
            {opKey: 'post /v2/volumes', fragment: '20-volume-operations-v2.json', category: 'upstream-added-param', scope: 'parameter', field: 'pageSize:query',
             change: {kind: 'param-uncovered', before: null, after: {name: 'pageSize', in: 'query', schema: {type: 'integer'}, description: 'Page size.'}},
             evidence: '/paths/x/post',
             id: 'upstream-added-param|post /v2/volumes|20-volume-operations-v2.json|parameter|||pageSize:query|param-uncovered|'},
        ]}
}

function additionFragment() {
    return {openapi: '3.0.1', paths: {
        '/v2/volumes/create': {post: {responses: {'200': {content: {'application/json': {schema: {type: 'object', properties: {code: {type: 'integer'}}}}}}}}},
        '/v2/volumes': {post: {responses: {'200': {description: 'ok'}}}},
    }}
}

const TRANSLATED = {'x-i18n': {'zh-CN': {description: '中'}, 'ja-JP': {description: '日'}}}

test('additions onto a shared $ref component are idempotent for equal values, fail-closed otherwise', () => {
    // milvus CollectionCommons shape: ten operations $ref one component, so
    // their per-op additions collapse onto a single properties container.
    const fragment = {openapi: '3.0.1', paths: {
        '/v2/things/drop': {post: {responses: {'200': {content: {'application/json': {schema: {$ref: '#/components/schemas/CommonDto'}}}}}}},
        '/v2/things/has': {post: {responses: {'200': {content: {'application/json': {schema: {$ref: '#/components/schemas/CommonDto'}}}}}}},
    }, components: {schemas: {CommonDto: {type: 'object', properties: {code: {type: 'integer'}}}}}}
    const diff = {schemaVersion: '1.0', source: SOURCE.id, publicationTarget: 'milvus', upstreamPin: SHA, summary: {},
        entries: [
            {opKey: 'post /v2/things/drop', fragment: '01-things-v2.json', category: 'upstream-added-field', scope: 'response', field: 'partitionNames',
                change: {kind: 'field-uncovered', before: null, after: {type: 'array', items: {type: 'string'}}},
                requiredMembership: false, evidence: '/paths/x/post',
                id: 'upstream-added-field|post /v2/things/drop|01-things-v2.json|response||200|partitionNames|field-uncovered|'},
            {opKey: 'post /v2/things/has', fragment: '01-things-v2.json', category: 'upstream-added-field', scope: 'response', field: 'partitionNames',
                change: {kind: 'field-uncovered', before: null, after: {type: 'array', items: {type: 'string'}}},
                requiredMembership: false, evidence: '/paths/x/post',
                id: 'upstream-added-field|post /v2/things/has|01-things-v2.json|response||200|partitionNames|field-uncovered|'},
        ]}
    const sharedPath = '/components/schemas/CommonDto/properties'
    const apply = entries => applyChangeSet({
        documents: new Map([['01-things-v2.json', structuredClone(fragment)]]),
        changeSet: changeSet(entries.map(entry => ({...entry, kind: 'addition', targetFragment: '01-things-v2.json', opPath: sharedPath,
            value: {partitionNames: entry.value}}), diff), diff), diff, ruleset: RULESET})
    const sameValue = {type: 'array', items: {type: 'string'}}
    const ok = apply([{id: diff.entries[0].id, value: sameValue}, {id: diff.entries[1].id, value: sameValue}])
    const props = ok.documents.get('01-things-v2.json').components.schemas.CommonDto.properties
    assert.deepEqual(props.partitionNames, sameValue)
    // both entries reconcile as addressed (the second was an idempotent skip)
    assert.deepEqual(ok.appliedLog.filter(entry => entry.kind === 'addition').length, 2)
    // a conflicting value for the already-present field stays fail-closed:
    // the fragment already carries the field with a different shape than the
    // diff's upstream subtree
    const seeded = structuredClone(fragment)
    seeded.components.schemas.CommonDto.properties.partitionNames = {type: 'string'}
    assert.throws(() => applyChangeSet({
        documents: new Map([['01-things-v2.json', seeded]]),
        changeSet: changeSet([{id: diff.entries[0].id, kind: 'addition', targetFragment: '01-things-v2.json', opPath: sharedPath,
            value: {partitionNames: sameValue}}], diff), diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_TARGET_EXISTS.*different value/)
})

function withTranslations(subtree) {
    const clone = structuredClone(subtree)
    const visit = node => {
        if (!node || typeof node !== 'object') return
        if (typeof node.description === 'string') node['x-i18n'] = structuredClone(TRANSLATED['x-i18n'])
        for (const [key, child] of Object.entries(node)) {
            if (key.startsWith('x-')) continue
            visit(child)
        }
    }
    visit(clone)
    return clone
}

test('additions land new fields and parameters from the diff subtree, translation-complete', () => {
    const diff = additionDiff()
    const apply = entries => applyChangeSet({documents: new Map([['20-volume-operations-v2.json', additionFragment()]]),
        changeSet: changeSet(entries, diff), diff, ruleset: RULESET})
    const fieldEntry = diff.entries[0]
    const paramEntry = diff.entries[1]
    const ok = apply([
        {id: fieldEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
            opPath: `${SHAPE_DIFF_BASE}/responses/200/content/application~1json/schema/properties`,
            value: {data: withTranslations(fieldEntry.change.after)}, requiredMembership: null},
        {id: paramEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
            opPath: '/paths/~1v2~1volumes/post/parameters', value: withTranslations(paramEntry.change.after)},
    ])
    const created = ok.documents.get('20-volume-operations-v2.json').paths['/v2/volumes/create'].post
    assert.deepEqual(created.responses['200'].content['application/json'].schema.properties.data, withTranslations(fieldEntry.change.after))
    const listed = ok.documents.get('20-volume-operations-v2.json').paths['/v2/volumes'].post
    assert.equal(listed.parameters.length, 1)
    assert.equal(listed.parameters[0].name, 'pageSize')
    assert.equal(ok.appliedLog.length, 2)
})

test('additions fail closed: untranslated prose, existing keys, wrong shapes, forged params', () => {
    const diff = additionDiff()
    const apply = entries => applyChangeSet({documents: new Map([['20-volume-operations-v2.json', additionFragment()]]),
        changeSet: changeSet(entries, diff), diff, ruleset: RULESET})
    const fieldEntry = diff.entries[0]
    const fieldPointer = `${SHAPE_DIFF_BASE}/responses/200/content/application~1json/schema/properties`
    // untranslated
    assert.throws(() => apply([{id: fieldEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
        opPath: fieldPointer, value: {data: fieldEntry.change.after}}]), /REST_UPSTREAM_APPLY_TRANSLATION_INCOMPLETE/)
    // value must carry exactly the cited field
    assert.throws(() => apply([{id: fieldEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
        opPath: fieldPointer, value: {other: withTranslations(fieldEntry.change.after)}}]), /REST_UPSTREAM_APPLY_VALUE_INVALID/)
    // already exists
    const preexisting = additionFragment()
    preexisting.paths['/v2/volumes/create'].post.responses['200'].content['application/json'].schema.properties.data = {type: 'string'}
    assert.throws(() => applyChangeSet({documents: new Map([['20-volume-operations-v2.json', preexisting]]),
        changeSet: changeSet([{id: fieldEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
            opPath: fieldPointer, value: {data: withTranslations(fieldEntry.change.after)}}], diff), diff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_TARGET_EXISTS/)
    // parameter additions must cite param-uncovered with a matching name:in
    const paramEntry = diff.entries[1]
    assert.throws(() => apply([{id: paramEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
        opPath: '/paths/~1v2~1volumes/post/parameters', value: withTranslations({...paramEntry.change.after, name: 'offset'})}]),
        /REST_UPSTREAM_APPLY_UNBOUND_LOCUS/)
    // citing a field diff while carrying the parameter payload fails on the
    // value shape (right lane, wrong payload)
    assert.throws(() => apply([{id: fieldEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
        opPath: '/paths/~1v2~1volumes/post/parameters', value: withTranslations(paramEntry.change.after)}]),
        /REST_UPSTREAM_APPLY_VALUE_INVALID/)
})

test('addition requiredMembership lands the field in the schema required array', () => {
    const diff = additionDiff()
    const fieldEntry = diff.entries[0]
    const result = applyChangeSet({documents: new Map([['20-volume-operations-v2.json', additionFragment()]]), titles: {},
        changeSet: parseChangeSet(JSON.stringify(changeSet([
            {id: fieldEntry.id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
                opPath: `${SHAPE_DIFF_BASE}/responses/200/content/application~1json/schema/properties`,
                value: {data: withTranslations(fieldEntry.change.after)}, requiredMembership: true},
        ], diff))), diff, ruleset: RULESET})
    const schema = result.documents.get('20-volume-operations-v2.json').paths['/v2/volumes/create'].post
        .responses['200'].content['application/json'].schema
    assert.deepEqual(schema.required, ['data'])
})

test('the shape gate refuses the PR #964 monster classes in written subtrees', () => {
    // The value binding already refuses hand-mangled subtrees, so the gate's
    // remaining job is upstream-side malformation: a spec that itself carries
    // object+items must die here, not reach a fragment.
    const monsterDiff = {schemaVersion: '1.0', source: SOURCE.id, publicationTarget: 'zilliz', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/volumes/create', fragment: '20-volume-operations-v2.json', category: 'upstream-added-field', scope: 'response', field: 'data',
            change: {kind: 'field-uncovered', before: null, after: {type: 'object', items: {type: 'string'}}},
            requiredMembership: null, evidence: '/paths/x/post',
            id: 'upstream-added-field|post /v2/volumes/create|20-volume-operations-v2.json|response||200|data|field-uncovered|'}]}
    const applyMonster = value => applyChangeSet({documents: new Map([['20-volume-operations-v2.json', additionFragment()]]), titles: {},
        changeSet: parseChangeSet(JSON.stringify(changeSet([
            {id: monsterDiff.entries[0].id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
                opPath: `${SHAPE_DIFF_BASE}/responses/200/content/application~1json/schema/properties`, value},
        ], monsterDiff))), diff: monsterDiff, ruleset: RULESET})
    assert.throws(() => applyMonster({data: withTranslations(monsterDiff.entries[0].change.after)}), /REST_UPSTREAM_APPLY_SHAPE_INVALID/)
    const scalarProps = {type: 'string', properties: {x: {type: 'string'}}}
    const scalarDiff = {schemaVersion: '1.0', source: SOURCE.id, publicationTarget: 'zilliz', upstreamPin: SHA, summary: {},
        entries: [{opKey: 'post /v2/volumes/create', fragment: '20-volume-operations-v2.json', category: 'upstream-added-field', scope: 'response', field: 'data',
            change: {kind: 'field-uncovered', before: null, after: scalarProps},
            requiredMembership: null, evidence: '/paths/x/post',
            id: 'upstream-added-field|post /v2/volumes/create|20-volume-operations-v2.json|response||200|data|field-uncovered|'}]}
    assert.throws(() => applyChangeSet({documents: new Map([['20-volume-operations-v2.json', additionFragment()]]), titles: {},
        changeSet: parseChangeSet(JSON.stringify(changeSet([
            {id: scalarDiff.entries[0].id, kind: 'addition', targetFragment: '20-volume-operations-v2.json',
                opPath: `${SHAPE_DIFF_BASE}/responses/200/content/application~1json/schema/properties`, value: {data: withTranslations(scalarProps)}},
        ], scalarDiff))), diff: scalarDiff, ruleset: RULESET}),
        /REST_UPSTREAM_APPLY_SHAPE_INVALID/)
})
