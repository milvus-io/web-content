const test = require('node:test')
const assert = require('node:assert/strict')
const {buildLedgerProposal, parseRestUpstreamLedgerProposal, mergeLedgerProposal} = require('./ledgerBootstrap')

const SHA = 'b'.repeat(40)

function diffEntry(overrides = {}) {
    return {
        id: 'fragment-only|post /v2/vectordb/jobs/import/abort|11-import-operations-v2.json|operation||||operation-absent-upstream|',
        category: 'fragment-only',
        opKey: 'post /v2/vectordb/jobs/import/abort',
        fragment: '11-import-operations-v2.json',
        scope: 'operation',
        change: {kind: 'operation-absent-upstream', before: null, after: null},
        evidence: 'fragment 11-import-operations-v2.json',
        ledgerStatus: 'pending',
        ...overrides,
    }
}

function diff(entries = [diffEntry()]) {
    return {
        schemaVersion: '1.0',
        source: 'zilliz-cloud-control-plane',
        publicationTarget: 'zilliz',
        upstreamPin: SHA,
        summary: entries.reduce((summary, entry) => ({...summary, [entry.category]: (summary[entry.category] || 0) + 1}), {}),
        entries,
    }
}

function emptyLedger() {
    return JSON.stringify({schemaVersion: '1.0', entries: []})
}

test('builds one external proposal per pending fragment-only operation', () => {
    const proposal = buildLedgerProposal(diff([
        diffEntry(),
        diffEntry({opKey: 'post /v2/vectordb/jobs/import/commit', id: 'fragment-only|post /v2/vectordb/jobs/import/commit|11-import-operations-v2.json|operation||||operation-absent-upstream|'}),
        diffEntry({ledgerStatus: 'classified'}),
    ]), {date: '2026-10-28'})
    assert.equal(proposal.source, 'zilliz-cloud-control-plane')
    assert.equal(proposal.fromPin, SHA)
    assert.equal(proposal.generatedOn, '2026-10-28')
    assert.equal(proposal.entries.length, 2)
    assert.deepEqual(proposal.entries.map(entry => entry.classification), ['external', 'external'])
    assert.equal(proposal.entries[0].fragment, '11-import-operations-v2.json')
    assert.equal(proposal.entries[0].firstSeenAt, '2026-10-28')
    assert.equal(proposal.entries[0].basis.length, 1)
    assert.match(proposal.entries[0].reason, /not covered by the zilliz-cloud-control-plane upstream spec/)
})

test('groups unattributed fields of one operation into a single deferred proposal', () => {
    const proposal = buildLedgerProposal(diff([
        diffEntry({id: 'unattributed|post /v2/etl/merge|19-extract-load-and-transform-v2.json|requestBody|use volume|||field-added|onError', category: 'unattributed', scope: 'requestBody', field: 'onError', fragment: '19-extract-load-and-transform-v2.json'}),
        diffEntry({id: 'unattributed|post /v2/etl/merge|19-extract-load-and-transform-v2.json|requestBody|use object storage|||field-added|validationMode', category: 'unattributed', scope: 'requestBody', field: 'validationMode', fragment: '19-extract-load-and-transform-v2.json'}),
    ]), {date: '2026-10-28'})
    assert.equal(proposal.entries.length, 1)
    assert.equal(proposal.entries[0].classification, 'deferred')
    assert.equal(proposal.entries[0].basis.length, 2)
})

test('upstream-added operations propose deferred adoption', () => {
    const proposal = buildLedgerProposal(diff([
        diffEntry({id: 'upstream-added|post /v2/clusters/modifyProperties||operation||||operation-added|', category: 'upstream-added', fragment: undefined, scope: 'operation'}),
    ]), {date: '2026-10-28'})
    assert.equal(proposal.entries[0].classification, 'deferred')
    assert.equal(proposal.entries[0].fragment, undefined)
    assert.ok(!('fragment' in proposal.entries[0]))
})

test('refresh categories (upstream-modified, upstream-added-field, zdoc-only) never reach the proposal', () => {
    const proposal = buildLedgerProposal(diff([
        diffEntry({id: 'upstream-modified|post /v2/volumes/create|20-volume-operations-v2.json|requestBody|||description|constraint-changed|pattern', category: 'upstream-modified', change: {kind: 'constraint-changed', key: 'pattern', before: null, after: '.*'}}),
        diffEntry({id: 'upstream-added-field|get /v2/clouds|18-cloud-meta-v2.json|responseBody|200||cloudId|field-added|', category: 'upstream-added-field', field: 'cloudId'}),
        diffEntry({id: 'zdoc-only|post /v2/vectordb/operations/import/get_progress|11-import-operations-v2.json|requestBody||||design|', category: 'zdoc-only'}),
    ]), {date: '2026-10-28'})
    assert.equal(proposal.entries.length, 0)
})

test('proposal round-trips through the schema parser and rejects edits that break the shape', () => {
    const proposal = buildLedgerProposal(diff(), {date: '2026-10-28'})
    const parsed = parseRestUpstreamLedgerProposal(JSON.stringify(proposal))
    assert.equal(parsed.entries.length, 1)
    assert.throws(
        () => parseRestUpstreamLedgerProposal(JSON.stringify({...proposal, entries: [{...proposal.entries[0], classification: 'maybe'}]})),
        /REST_UPSTREAM_BOOTSTRAP_PROPOSAL_SCHEMA_INVALID/,
    )
    assert.throws(
        () => parseRestUpstreamLedgerProposal(JSON.stringify({...proposal, entries: [{...proposal.entries[0], basis: []}]})),
        /REST_UPSTREAM_BOOTSTRAP_PROPOSAL_SCHEMA_INVALID/,
    )
    assert.throws(() => parseRestUpstreamLedgerProposal('nope'), /REST_UPSTREAM_BOOTSTRAP_PROPOSAL_MALFORMED_JSON/)
})

test('merge strips basis, appends to the ledger, and writes canonical bytes', () => {
    const proposal = buildLedgerProposal(diff([
        diffEntry(),
        diffEntry({opKey: 'post /v2/clusters/modifyProperties', id: 'upstream-added|post /v2/clusters/modifyProperties||operation||||operation-added|', category: 'upstream-added', fragment: undefined}),
    ]), {date: '2026-10-28'})
    const merged = JSON.parse(mergeLedgerProposal(proposal, emptyLedger()))
    assert.equal(merged.entries.length, 2)
    for (const entry of merged.entries) assert.ok(!('basis' in entry))
    assert.deepEqual(merged.entries.map(entry => entry.opKey), [
        'post /v2/clusters/modifyProperties',
        'post /v2/vectordb/jobs/import/abort',
    ])
    assert.ok(mergeLedgerProposal(proposal, emptyLedger()).startsWith('{\n  "schemaVersion": "1.0",'))
})

test('merge refuses duplicate opKeys and adopted entries without fragments, and never rewrites existing entries', () => {
    const proposal = buildLedgerProposal(diff(), {date: '2026-10-28'})
    const firstMerge = mergeLedgerProposal(proposal, emptyLedger())
    assert.throws(() => mergeLedgerProposal(proposal, firstMerge), /REST_UPSTREAM_BOOTSTRAP_DUPLICATE_ENTRY/)

    const adopted = parseRestUpstreamLedgerProposal(JSON.stringify(buildLedgerProposal(diff(), {date: '2026-10-28'})))
    adopted.entries[0].classification = 'adopted'
    delete adopted.entries[0].fragment
    assert.throws(() => mergeLedgerProposal(adopted, emptyLedger()), /REST_UPSTREAM_LEDGER_ADOPTED_REQUIRES_FRAGMENT/)

    const existing = JSON.stringify({
        schemaVersion: '1.0',
        entries: [{opKey: 'post /v2/vectordb/jobs/import/commit', source: 'milvus-data-plane', firstSeenPin: 'c'.repeat(40), firstSeenAt: '2026-10-01', classification: 'external', reason: 'milvus-only surface', owner: 'doc-team', decidedAt: '2026-10-01'}],
    })
    const merged = JSON.parse(mergeLedgerProposal(proposal, existing))
    assert.equal(merged.entries.length, 2)
    assert.equal(merged.entries[0].source, 'milvus-data-plane')
})
