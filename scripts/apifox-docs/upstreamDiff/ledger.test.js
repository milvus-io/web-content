const test = require('node:test')
const assert = require('node:assert/strict')
const {parseRestUpstreamLedger, findLedgerEntry} = require('./ledger')

const SHA = 'a'.repeat(40)

function ledger(entries = [{}]) {
    return {
        schemaVersion: '1.0',
        entries: entries.map(overrides => ({
            opKey: 'post /v2/clusters/createDedicated',
            source: 'zilliz-cloud-control-plane',
            firstSeenPin: SHA,
            firstSeenAt: '2026-10-28',
            classification: 'adopted',
            reason: 'refresh run 42',
            owner: 'doc-team',
            decidedAt: '2026-10-28',
            fragment: '22-cluster-operations-v2.json',
            ...overrides,
        })),
    }
}

test('parses a valid ledger and looks up decisions append-only', () => {
    const parsed = parseRestUpstreamLedger(JSON.stringify(ledger()))
    assert.equal(findLedgerEntry(parsed, 'zilliz-cloud-control-plane', 'post /v2/clusters/createDedicated').classification, 'adopted')
    assert.equal(findLedgerEntry(parsed, 'zilliz-cloud-control-plane', 'POST /v2/usage/query'), null)
})

test('rejects malformed JSON, bad shapes, duplicates, and adopted entries without fragments', () => {
    assert.throws(() => parseRestUpstreamLedger('nope'), /REST_UPSTREAM_LEDGER_MALFORMED_JSON/)
    assert.throws(() => parseRestUpstreamLedger('[]'), /REST_UPSTREAM_LEDGER_INVALID/)
    assert.throws(
        () => parseRestUpstreamLedger(JSON.stringify(ledger([{classification: 'maybe'}]))),
        /REST_UPSTREAM_LEDGER_SCHEMA_INVALID/,
    )
    assert.throws(
        () => parseRestUpstreamLedger(JSON.stringify(ledger([{}, {}]))),
        /REST_UPSTREAM_LEDGER_DUPLICATE_ENTRY/,
    )
    assert.throws(
        () => parseRestUpstreamLedger(JSON.stringify(ledger([{classification: 'adopted', fragment: undefined}]))),
        /REST_UPSTREAM_LEDGER_ADOPTED_REQUIRES_FRAGMENT/,
    )
})

test('rejected classification may omit fragment files', () => {
    const parsed = parseRestUpstreamLedger(JSON.stringify(ledger([{
        opKey: 'delete /v2/projects/{projectId}/regions/{regionId}',
        classification: 'rejected',
        reason: 'retired upstream, pending 301',
        fragment: undefined,
    }])))
    assert.equal(parsed.entries[0].classification, 'rejected')
})
