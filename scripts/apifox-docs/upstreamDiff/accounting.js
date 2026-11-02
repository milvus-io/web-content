'use strict'

/*
 * Ledger accounting for the upstream operation surface (design §7, T4 / open
 * decision D2): every operation the pinned upstream exposes that the fragments
 * do not document (diff category `upstream-added`) must carry a ledger entry —
 * any classification counts, because the point is that a human decision exists.
 * The statement is deterministic and digest-bound to one specific diff output,
 * so a receipt (schemaVersion 2) can embed it as completeness evidence.
 */

const {assertLedgerShape} = require('./ledger')
const {diffDigestOf} = require('./changeSet')

const SHA_40 = /^[a-f0-9]{40}$/
const DIGEST = /^sha256:[a-f0-9]{64}$/
const OP_KEY = /^(get|put|post|delete|patch|options|head|trace) \/[^\s]+$/

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function assertDiffShape(diff) {
    if (!diff || typeof diff !== 'object' || Array.isArray(diff)) fail('REST_UPSTREAM_ACCOUNTING_DIFF_INVALID', 'diff must be a parsed diff document')
    if (diff.schemaVersion !== '1.0') fail('REST_UPSTREAM_ACCOUNTING_DIFF_INVALID', `unsupported diff schemaVersion ${JSON.stringify(diff.schemaVersion ?? null)}`)
    if (typeof diff.source !== 'string' || !diff.source) fail('REST_UPSTREAM_ACCOUNTING_DIFF_INVALID', 'diff.source must be a source id')
    if (!SHA_40.test(diff.upstreamPin || '')) fail('REST_UPSTREAM_ACCOUNTING_DIFF_INVALID', 'diff.upstreamPin must be a full commit SHA')
    if (!Array.isArray(diff.entries)) fail('REST_UPSTREAM_ACCOUNTING_DIFF_INVALID', 'diff.entries must be an array')
}

function accountUpstreamOperations({diff, ledger}) {
    assertDiffShape(diff)
    assertLedgerShape(ledger)
    const unaccounted = new Set()
    let ledgered = 0
    for (const entry of diff.entries) {
        if (entry.category !== 'upstream-added' || entry.scope !== 'operation') continue
        if (!OP_KEY.test(entry.opKey || '')) fail('REST_UPSTREAM_ACCOUNTING_OP_KEY_INVALID', entry.opKey)
        const decided = ledger.entries.some(candidate => candidate.source === diff.source && candidate.opKey === entry.opKey)
        if (decided) ledgered++
        else unaccounted.add(entry.opKey)
    }
    const unaccountedOpKeys = [...unaccounted].sort()
    const summary = {upstreamAdded: ledgered + unaccountedOpKeys.length, ledgered, unaccounted: unaccountedOpKeys.length}
    return {
        schemaVersion: '1.0',
        source: diff.source,
        upstreamPin: diff.upstreamPin,
        diffDigest: diffDigestOf(diff),
        summary,
        unaccountedOpKeys,
    }
}

/*
 * The T4 gate: a diff whose new upstream operations are not all classified
 * stops the run. The message lists the exact op keys so the operator can
 * bootstrap them into the ledger (one PR, atomic with the adoption).
 */
function assertAccountingComplete(statement) {
    if (statement.summary.unaccounted !== statement.unaccountedOpKeys.length || statement.summary.upstreamAdded !== statement.summary.ledgered + statement.summary.unaccounted) {
        fail('REST_UPSTREAM_ACCOUNTING_STATEMENT_INVALID', 'accounting summary disagrees with the unaccounted op key list')
    }
    if (statement.summary.unaccounted > 0) {
        fail('REST_UPSTREAM_LEDGER_ACCOUNTING_INCOMPLETE',
            `${statement.source} @ ${statement.upstreamPin}: ${statement.summary.unaccounted} upstream-added operation(s) have no ledger entry: ${statement.unaccountedOpKeys.join(', ')}`)
    }
    return statement
}

module.exports = {accountUpstreamOperations, assertAccountingComplete}
