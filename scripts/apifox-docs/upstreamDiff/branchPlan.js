// Branch-placement stage for the 2026-10-30 merge model (design:
// tmp/2026-10-30-pr964-review-and-refresh-policy-fix.md §3.3). Scenario
// oneOf/anyOf branches are documentation assets: when the upstream grows a
// field on a merged request/response body that the fragments document as
// scenario tabs, WHICH tab(s) receive the new field is a semantic judgment —
// the model proposes placements, this module validates them against a closed
// set of real branch labels, and the assembler turns a validated placement
// into deterministic addition entries (structure bytes still come from the
// diff's own subtree, never from the model).
//
// The model output contract (rest-upstream-branch-plan.schema.json) also
// carries `reorganizations` — proposed branch splits/relabels — which are
// REPORTED for human review and never executed by the pipeline.

const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020')
const {branchesOf} = require('./diff')

const branchPlanSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-upstream-branch-plan.schema.json'), 'utf8'))
const validateBranchPlan = new Ajv2020({allErrors: true, strict: false}).compile(branchPlanSchema)

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

// Entries the placement stage looks at: fields the fragments do not cover
// anywhere, on bodies the fragments document as scenario branches. Added
// fields on unbranched schemas and new parameters need no placement (the
// assembler adds them directly).
function needsPlacement(entry) {
    if (!['upstream-added-field', 'unattributed'].includes(entry.category)) return false
    return Boolean(entry.field)
}

// One compact record per placement-needing entry: the closed set of branch
// labels plus what each tab already documents, so the model places fields
// with the same view a human editor would have. The upstream description
// rides along as the only prose the model may see.
function buildPlacementRecords(diffDocument, fragmentLoader) {
    const records = []
    const seenScopes = new Map()
    for (const entry of diffDocument.entries) {
        if (!needsPlacement(entry)) continue
        if ((entry.ledgerStatus ?? 'pending') === 'classified') continue
        const fragment = entry.fragment
        if (!fragment) continue
        const scopeKey = `${fragment}|${entry.opKey}|${entry.scope}`
        let branchInfo = seenScopes.get(scopeKey)
        if (branchInfo === undefined) {
            branchInfo = branchLabelsForScope(fragmentLoader(fragment), entry)
            seenScopes.set(scopeKey, branchInfo)
        }
        if (!branchInfo) continue
        const upstream = entry.change?.after ?? {}
        records.push({
            diffEntryId: entry.id,
            opKey: entry.opKey,
            scope: entry.scope,
            fragment,
            field: entry.field,
            branchLabels: branchInfo.labels,
            branchFields: branchInfo.labels.map((label, index) => ({label, fields: branchInfo.fields[index]})),
            upstreamDescription: typeof upstream.description === 'string' ? upstream.description : '',
            upstreamType: typeof upstream.type === 'string' ? upstream.type : '',
        })
    }
    return records
}

// Branch labels + per-branch field lists of the fragment schema for one
// operation scope. Returns null when the fragment side is not branched (no
// placement needed) or the operation is missing (stale diff — fail closed at
// the assembler instead).
function branchLabelsForScope(fragmentDocument, entry) {
    const [method, endpoint] = String(entry.opKey).split(' ')
    const operation = fragmentDocument.paths?.[endpoint]?.[method]
    if (!operation) return null
    let schema = null
    if (entry.scope === 'requestBody') {
        schema = operation.requestBody?.content?.['application/json']?.schema ?? null
    } else if (entry.scope === 'response') {
        schema = operation.responses?.[entry.responseStatus ?? '200']?.content?.['application/json']?.schema ?? null
    }
    if (!schema) return null
    const branched = branchesOf(fragmentDocument, schema)
    if (!branched) return null
    const fields = branched.branches.map(branch => Object.keys(branch.properties ?? {}))
    return {labels: branched.labels, fields}
}

function parseBranchPlan(text, label = 'branch-plan.json') {
    let parsed
    try {
        parsed = JSON.parse(text)
    } catch (error) {
        fail('REST_UPSTREAM_BRANCH_PLAN_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    if (!validateBranchPlan(parsed)) {
        const details = validateBranchPlan.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_UPSTREAM_BRANCH_PLAN_SCHEMA_INVALID', `${label}: ${details}`)
    }
    return parsed
}

// Placement validation against the records the diff actually produced: an id
// the diff does not know (or that needs no placement) is a model invention
// and is rejected per line, never fatal to the other placements. Targets must
// be a subset of the real branch labels. Returns {placements, rejected}.
function validatePlacements(branchPlan, records) {
    const byId = new Map(records.map(record => [record.diffEntryId, record]))
    const placements = new Map()
    const rejected = []
    const seen = new Set()
    for (const placement of branchPlan.placements ?? []) {
        const record = byId.get(placement.diffEntryId)
        if (!record) {
            rejected.push({diffEntryId: placement.diffEntryId, reason: 'unknown or placement-ineligible diffEntryId'})
            continue
        }
        if (seen.has(placement.diffEntryId)) {
            rejected.push({diffEntryId: placement.diffEntryId, reason: 'duplicate placement'})
            continue
        }
        const labels = new Set(record.branchLabels)
        const unknown = placement.targets.filter(target => !labels.has(target))
        if (unknown.length > 0) {
            rejected.push({diffEntryId: placement.diffEntryId, reason: `unknown branch label(s): ${unknown.join(', ')}`})
            continue
        }
        seen.add(placement.diffEntryId)
        placements.set(placement.diffEntryId, [...new Set(placement.targets)])
    }
    return {placements, rejected}
}

module.exports = {buildPlacementRecords, branchLabelsForScope, parseBranchPlan, validatePlacements, needsPlacement}
