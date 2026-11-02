const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020')
const {serializeDocument} = require('./formatter')
const {parseRestUpstreamLedger, findLedgerEntry, assertLedgerShape} = require('./ledger')

const proposalSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-upstream-ledger-proposal.schema.json'), 'utf8'))

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

const validateProposal = new Ajv2020({allErrors: true, strict: false}).compile(proposalSchema)

// Ledger granularity is operation-level (one decision per source+opKey), while
// the diff reports per field. Unattributed fields of one operation therefore
// collapse into a single proposal entry whose reason names the fields.
const PROPOSAL_DEFAULTS = {
    'fragment-only': {
        classification: 'external',
        reason: source => `Bootstrap: operation exists in the zdoc fragment but is not covered by the ${source} upstream spec at the pinned commit. Confirm the intent (external surface, adopted legacy, or retirement with the nginx 301 checklist).`,
    },
    'upstream-added': {
        classification: 'deferred',
        reason: source => `Bootstrap: new operation in the ${source} upstream spec without a fragment. Adoption (fragment + zh-CN titles.json mapping) is pending a decision.`,
    },
    unattributed: {
        classification: 'deferred',
        reason: source => `Bootstrap: upstream field(s) not covered by any scenario branch of a branched operation (${source} spec at the pinned commit). Branch attribution is a human decision; this entry only records that the delta is known.`,
    },
}

function proposalBasis(entries) {
    return entries.map(entry => entry.id).sort()
}

function proposalForCategory(category, diff, groupedEntries, date) {
    const defaults = PROPOSAL_DEFAULTS[category]
    if (!defaults) return null
    const first = groupedEntries[0]
    const entry = {
        opKey: first.opKey,
        source: diff.source,
        firstSeenPin: diff.upstreamPin,
        firstSeenAt: date,
        classification: defaults.classification,
        reason: defaults.reason(diff.source),
        owner: 'rest-upstream-bootstrap',
        decidedAt: date,
        basis: proposalBasis(groupedEntries),
    }
    if (first.fragment) entry.fragment = first.fragment
    return entry
}

// Group pending operation-level drift (fragment-only ops, upstream-added ops)
// and unattributed field drift by opKey and emit one proposal entry per opKey.
// Entries the ledger already classifies stay out: bootstrap pre-registers the
// known stock of deltas so later diffs are purely incremental (design §7).
function buildLedgerProposal(diff, {date}) {
    if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)) fail('REST_UPSTREAM_BOOTSTRAP_DATE_INVALID', date)
    const pending = diff.entries.filter(entry => entry.ledgerStatus !== 'classified')
    const groups = new Map()
    for (const entry of pending) {
        const category = entry.category === 'fragment-only' || entry.category === 'upstream-added' || entry.category === 'unattributed'
            ? entry.category
            : null
        if (!category) continue
        if (!groups.has(entry.opKey)) groups.set(entry.opKey, [])
        groups.get(entry.opKey).push(entry)
    }
    const entries = []
    for (const [opKey, grouped] of [...groups.entries()].sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))) {
        const categories = new Set(grouped.map(entry => entry.category))
        if (categories.size !== 1) fail('REST_UPSTREAM_BOOTSTRAP_CATEGORY_CONFLICT', `${opKey}: ${[...categories].sort().join(', ')}`)
        const proposal = proposalForCategory(grouped[0].category, diff, grouped, date)
        if (proposal) entries.push(proposal)
    }
    return {
        schemaVersion: '1.0',
        source: diff.source,
        fromPin: diff.upstreamPin,
        generatedOn: date,
        entries,
    }
}

function parseRestUpstreamLedgerProposal(text, label = 'proposal.json') {
    let proposal
    try {
        proposal = JSON.parse(text)
    } catch (error) {
        fail('REST_UPSTREAM_BOOTSTRAP_PROPOSAL_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    if (!validateProposal(proposal)) {
        const details = validateProposal.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_UPSTREAM_BOOTSTRAP_PROPOSAL_SCHEMA_INVALID', details)
    }
    return proposal
}

function loadRestUpstreamLedgerProposal(filePath) {
    return parseRestUpstreamLedgerProposal(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

// Merge a human-reviewed proposal into the append-only ledger. Only additions
// are allowed: existing entries must not change, duplicates fail closed, and
// the result is written in canonical bytes. `basis` is proposal-only audit
// metadata and never reaches the ledger.
function mergeLedgerProposal(proposal, ledgerText, label = 'ledger.json') {
    const ledger = parseRestUpstreamLedger(ledgerText, label)
    const additions = proposal.entries.map(entry => {
        const {basis, ...ledgerEntry} = entry
        if (findLedgerEntry(ledger, ledgerEntry.source, ledgerEntry.opKey)) {
            fail('REST_UPSTREAM_BOOTSTRAP_DUPLICATE_ENTRY', `${ledgerEntry.source} ${ledgerEntry.opKey} already has a ledger entry`)
        }
        return ledgerEntry
    })
    const merged = {
        schemaVersion: ledger.schemaVersion,
        entries: [...ledger.entries, ...additions].sort((left, right) => {
            const leftKey = `${left.source} ${left.opKey}`
            const rightKey = `${right.source} ${right.opKey}`
            return leftKey < rightKey ? -1 : leftKey > rightKey ? 1 : 0
        }),
    }
    assertLedgerShape(merged)
    return serializeDocument(merged)
}

module.exports = {buildLedgerProposal, parseRestUpstreamLedgerProposal, loadRestUpstreamLedgerProposal, mergeLedgerProposal, PROPOSAL_DEFAULTS}
