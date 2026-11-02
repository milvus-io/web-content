const test = require('node:test')
const assert = require('node:assert/strict')
const {accountUpstreamOperations, assertAccountingComplete} = require('./accounting')
const {diffDigestOf} = require('./changeSet')

const SHA = 'a'.repeat(40)

function diff(entries) {
    return {schemaVersion: '1.0', source: 'milvus-data-plane', publicationTarget: 'milvus', upstreamPin: SHA, summary: {}, entries}
}

function ledger(entries = []) {
    return {
        schemaVersion: '1.0',
        entries: entries.map(overrides => ({
            opKey: 'post /v2/vectordb/snapshots/list',
            source: 'milvus-data-plane',
            firstSeenPin: SHA,
            firstSeenAt: '2026-10-29',
            classification: 'deferred',
            reason: 'bootstrap',
            owner: 'doc-team',
            decidedAt: '2026-10-29',
            fragment: '38-snapshot-operations-v2.json',
            ...overrides,
        })),
    }
}

const SNAPSHOTS_LIST = {opKey: 'post /v2/vectordb/snapshots/list', category: 'upstream-added', scope: 'operation',
    change: {kind: 'operation-absent-in-fragments', before: null, after: null}, evidence: '/paths/~1v2~1vectordb~1snapshots~1list/post'}
const SNAPSHOTS_PIN = {opKey: 'post /v2/vectordb/snapshots/pin', category: 'upstream-added', scope: 'operation',
    change: {kind: 'operation-absent-in-fragments', before: null, after: null}, evidence: '/paths/~1v2~1vectordb~1snapshots~1pin/post'}
const FIELD_DRIFT = {opKey: 'post /v2/vectordb/collections/create', category: 'upstream-added-field', scope: 'requestBody', field: 'dbName',
    change: {kind: 'field-uncovered', before: null, after: null}, evidence: '/paths/~1v2~1vectordb~1collections~1create/post'}

test('accounts the upstream-added operation frontier: ledgered versus unaccounted, sorted and digest-bound', () => {
    const document = diff([FIELD_DRIFT, SNAPSHOTS_PIN, SNAPSHOTS_LIST])
    const statement = accountUpstreamOperations({diff: document, ledger: ledger([{}])})
    assert.deepEqual(statement, {
        schemaVersion: '1.0',
        source: 'milvus-data-plane',
        upstreamPin: SHA,
        diffDigest: diffDigestOf(document),
        summary: {upstreamAdded: 2, ledgered: 1, unaccounted: 1},
        unaccountedOpKeys: ['post /v2/vectordb/snapshots/pin'],
    })
    // field-level drift is not an operation: it never enters the T4 frontier
    assert.equal(statement.summary.upstreamAdded, 2)
})

test('classification does not matter for the gate, only that a decision exists', () => {
    const document = diff([SNAPSHOTS_LIST])
    for (const classification of ['adopted', 'rejected', 'deferred', 'external']) {
        const statement = accountUpstreamOperations({diff: document, ledger: ledger([{classification}])})
        assert.equal(statement.summary.unaccounted, 0)
        assertAccountingComplete(statement)
    }
})

test('the T4 gate fails closed and names the undecided operations', () => {
    const statement = accountUpstreamOperations({diff: diff([SNAPSHOTS_PIN, SNAPSHOTS_LIST]), ledger: ledger([{}])})
    assert.throws(() => assertAccountingComplete(statement), error => {
        assert.match(error.message, /REST_UPSTREAM_LEDGER_ACCOUNTING_INCOMPLETE/)
        assert.match(error.message, /post \/v2\/vectordb\/snapshots\/pin/)
        return true
    })
})

test('accounting rejects malformed diffs and ledgers instead of emitting a statement', () => {
    assert.throws(() => accountUpstreamOperations({diff: null, ledger: ledger()}), /REST_UPSTREAM_ACCOUNTING_DIFF_INVALID/)
    assert.throws(() => accountUpstreamOperations({diff: diff([]), ledger: {entries: 'nope'}}), /REST_UPSTREAM_LEDGER_/)
    assert.throws(
        () => accountUpstreamOperations({diff: {...diff([]), upstreamPin: 'short'}, ledger: ledger()}),
        /REST_UPSTREAM_ACCOUNTING_DIFF_INVALID/,
    )
    assert.throws(
        () => accountUpstreamOperations({diff: diff([{...SNAPSHOTS_LIST, opKey: 'SNAPSHOTS LIST'}]), ledger: ledger()}),
        /REST_UPSTREAM_ACCOUNTING_OP_KEY_INVALID/,
    )
})
