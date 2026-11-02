// Machine-generated candidate list for the refresh decision stage (decisions-first
// pipeline, 2026-10-29; stance scope narrowed by the 2026-10-30 merge model).
// The diff stays the only structural authority: candidates restate each
// stanceable drift entry as one compact line the decision model must echo or
// omit. No path, value, or locus ever appears as something the model has to
// produce — the assembler derives those from the diff entry itself.
//
// The 2026-10-30 merge model moved everything structural out of the stance
// space: field mirrors (schema|mirror), added fields/params, and prose are
// automatic or report lanes now. The model judges SEMANTICS only: operation
// deprecation flips, operation-level attribution, retirements, and (as
// proposals, never bytes) nothing else — branch placement of new fields runs
// in its own branch-plan stage.

const PROSE_KINDS = new Set(['description', 'summary'])
const STANCEABLE_CATEGORIES = new Set([
    'upstream-modified',
    'unattributed',
    'upstream-added',
    'fragment-only',
])
const AUTO_KINDS = new Set(['schema'])

// Rules 3-6 expect stances on operation deprecation flips, parameter required
// additions, and operation-level attribution. unattributed entries may instead
// be placed into scenario branches by the branch-plan stage, so an omission
// there is legal and stays out of the coverage base. Flagged relaxations
// (required-relaxation) and fragment-only retirements are instructed omissions
// (rules 5/7).
const STANCE_EXPECTED_CATEGORIES = new Set(['upstream-modified', 'upstream-added'])

function isStanceable(entry) {
    if (!STANCEABLE_CATEGORIES.has(entry.category)) return false
    if (PROSE_KINDS.has(entry.change?.kind)) return false
    if (AUTO_KINDS.has(entry.change?.kind)) return false
    return true
}

function candidateSummary(entry) {
    const change = entry.change || {}
    return [
        entry.opKey,
        entry.scope,
        entry.branch ? `branch=${entry.branch}` : '',
        entry.field ? `field=${entry.field}` : '',
        change.kind ? `change=${change.kind}${change.key ? `(${change.key})` : ''}` : '',
        entry.requiresConfirmation ? `requiresConfirmation=${entry.requiresConfirmation}` : '',
        'before' in change ? `before=${JSON.stringify(change.before)}` : '',
        'after' in change ? `after=${JSON.stringify(change.after)}` : '',
    ].filter(Boolean).join(' ')
}

// Ledger-classified drift is already decided stock; zdoc-only drift is
// deliberate documentation design; mirrors, additions, and prose are
// automatic/report lanes. Everything left is offered to the decision stage,
// one record per diff entry. `stanceExpected` marks the entries the decision
// rules expect a stance for — flagged relaxations are instructed omissions
// (rule 5), as are the rule-7 retirement classes — so the coverage gate can
// measure compliance instead of punishing it.
function buildCandidateRecords(diffDocument, {fragmentFilter = null} = {}) {
    const records = []
    for (const entry of diffDocument.entries) {
        if (!isStanceable(entry)) continue
        if ((entry.ledgerStatus ?? 'pending') === 'classified') continue
        if (fragmentFilter && entry.fragment !== fragmentFilter) continue
        records.push({
            d: entry.id,
            c: candidateSummary(entry),
            stanceExpected: STANCE_EXPECTED_CATEGORIES.has(entry.category) && !(entry.category === 'upstream-modified' && entry.requiresConfirmation),
        })
    }
    return records
}

// The model-facing wire shape: id plus summary only.
function buildCandidateLines(diffDocument, options = {}) {
    return buildCandidateRecords(diffDocument, options).map(record => ({d: record.d, c: record.c}))
}

function serializeCandidateLines(lines) {
    return `${lines.map(line => JSON.stringify(line)).join('\n')}\n`
}

module.exports = {buildCandidateLines, buildCandidateRecords, serializeCandidateLines, STANCEABLE_CATEGORIES, STANCE_EXPECTED_CATEGORIES, PROSE_KINDS, AUTO_KINDS}
