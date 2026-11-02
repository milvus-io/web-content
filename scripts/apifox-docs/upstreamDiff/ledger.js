const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020')

const ledgerSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-upstream-ledger.schema.json'), 'utf8'))

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

const validateLedger = new Ajv2020({allErrors: true, strict: false}).compile(ledgerSchema)

function assertLedgerShape(ledger) {
    if (!ledger || typeof ledger !== 'object' || Array.isArray(ledger)) fail('REST_UPSTREAM_LEDGER_INVALID', 'ledger must be an object')
    if (!validateLedger(ledger)) {
        const details = validateLedger.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_UPSTREAM_LEDGER_SCHEMA_INVALID', details)
    }
    const seen = new Set()
    for (const entry of ledger.entries) {
        const key = `${entry.source} ${entry.opKey}`
        if (seen.has(key)) fail('REST_UPSTREAM_LEDGER_DUPLICATE_ENTRY', key)
        seen.add(key)
        if (entry.classification === 'adopted' && !entry.fragment) {
            fail('REST_UPSTREAM_LEDGER_ADOPTED_REQUIRES_FRAGMENT', key)
        }
    }
}

function parseRestUpstreamLedger(text, label = 'ledger.json') {
    let ledger
    try {
        ledger = JSON.parse(text)
    } catch (error) {
        fail('REST_UPSTREAM_LEDGER_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    assertLedgerShape(ledger)
    return ledger
}

function loadRestUpstreamLedger(filePath) {
    return parseRestUpstreamLedger(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

// Append-only lookup: the ledger records decisions about upstream deltas; absence means undecided.
function findLedgerEntry(ledger, sourceId, opKey) {
    return ledger.entries.find(entry => entry.source === sourceId && entry.opKey === opKey) || null
}

module.exports = {parseRestUpstreamLedger, loadRestUpstreamLedger, findLedgerEntry, assertLedgerShape}
