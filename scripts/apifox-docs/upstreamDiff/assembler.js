// Deterministic assembler for the decisions-first refresh pipeline (2026-10-29;
// 2026-10-30 merge model). Three lanes:
//   - AUTO (no stance): field mirrors (change.kind "schema") rebuild the field
//     subtree from the diff's own upstream bytes with local prose merged back
//     in; added fields/parameters become additions — into scenario branches
//     when the branch plan places them, else into the unbranched schema.
//   - STANCE (model): operation deprecation, parameter required booleans,
//     ledger attribution (upstream-added / fragment-only / unattributed).
//   - REPORT (human): prose drift, fragment-only fields upstream retired,
//     unplaced additions, relaxation-flagged mirrors, branch reorganizations.
// The model never writes a path or a value: every structural byte derives from
// the diff entry itself. The applier and its gates stay the final authority;
// assembler output is a plain v1.0 change set so every existing binding/
// confirmation/normalization rule keeps applying unchanged.

const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020')
const {diffDigestOf} = require('./changeSet')
const {mergeMirrorProse} = require('./mirror')
const {buildPlacementRecords, validatePlacements, branchLabelsForScope} = require('./branchPlan')

const decisionsSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-upstream-decisions.schema.json'), 'utf8'))
const validateDecision = new Ajv2020({allErrors: true, strict: false}).compile(decisionsSchema)

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

// Scalar constraint leaves the diff may report on a field or parameter. Schema
// membership drift arrives as change.kind "required", never as this key.
const CONSTRAINT_KEYS = new Set([
    'type', 'format', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum',
    'minLength', 'maxLength', 'pattern', 'minItems', 'maxItems', 'uniqueItems',
    'enum', 'default', 'nullable', 'deprecated',
])
const PROSE_KINDS = new Set(['description', 'summary'])
const MIRROR_KINDS = new Set(['schema'])
const LIFECYCLE_KEYS = new Set(['x-added-at', 'x-last-modified', 'x-deprecated-since'])
const ADOPTABLE_CATEGORIES = new Set(['upstream-modified'])
// The applier binds ledger drafts to operation-level drift only, so the
// assembler refuses them earlier with the same rule.
const LEDGERABLE_CATEGORIES = new Set(['upstream-added', 'fragment-only', 'unattributed'])
const DELETION_KINDS = new Set(['field-absent-upstream', 'param-absent-upstream'])

function validateDecisions(decisions) {
    for (const decision of decisions) {
        const shapeError = decisionShapeError(decision)
        if (shapeError) fail('REST_UPSTREAM_DECISION_INVALID', `${JSON.stringify(decision)}: ${shapeError}`)
    }
    const seen = new Set()
    for (const decision of decisions) {
        if (seen.has(decision.diffEntryId)) {
            fail('REST_UPSTREAM_DECISION_DUPLICATE', decision.diffEntryId)
        }
        seen.add(decision.diffEntryId)
    }
}

// Contract shape of a single decision line, for callers that must reject one
// bad line instead of failing a whole file (the batched decision stage).
function decisionShapeError(decision) {
    if (!validateDecision(decision)) {
        return validateDecision.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
    }
    if (decision.action === 'ledger' && decision.override !== undefined) return 'ledger decisions carry no override'
    if (decision.action === 'skip' && decision.override !== undefined) return 'skip decisions carry no override'
    if (decision.override !== true && decision.overrideReason !== undefined) return 'overrideReason without override'
    return null
}

function parseDecisions(text, label = 'decisions.jsonl') {
    const decisions = []
    for (const [index, line] of text.split('\n').entries()) {
        if (!line.trim()) continue
        let decision
        try {
            decision = JSON.parse(line)
        } catch (error) {
            fail('REST_UPSTREAM_DECISIONS_MALFORMED_JSON', `${label}:${index + 1}: ${error.message}`)
        }
        decisions.push(decision)
    }
    validateDecisions(decisions)
    return decisions
}

function loadDecisions(filePath) {
    return parseDecisions(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

function escapePointerToken(token) {
    return String(token).replace(/~/g, '~0').replace(/\//g, '~1')
}

function resolvePointer(document, pointer) {
    let current = document
    for (const raw of pointer.split('/').slice(1)) {
        const key = raw.replace(/~1/g, '/').replace(/~0/g, '~')
        current = current?.[key]
    }
    return current
}

function operationBasePath(opKey) {
    const space = opKey.indexOf(' ')
    if (space <= 0) fail('REST_UPSTREAM_ASSEMBLE_OPKEY_INVALID', opKey)
    const method = opKey.slice(0, space)
    const operationPath = opKey.slice(space + 1)
    return `/paths/${escapePointerToken(operationPath)}/${method}`
}

// Scenario branches are oneOf/anyOf members tagged x-tab-label; the diff names
// the branch, the fragment decides the container and the index. A branch may
// be a $ref to a shared component (storageIntegrations documents four tabs
// through one component): the writable locus is then the component definition,
// and every branch citing it mirrors idempotently onto the same bytes.
function schemaContainerPath({base, scope, responseStatus, branch, fragmentDocument}) {
    let schemaPath
    if (scope === 'requestBody') {
        schemaPath = `${base}/requestBody/content/application~1json/schema`
    } else if (scope === 'response') {
        schemaPath = `${base}/responses/${responseStatus || '200'}/content/application~1json/schema`
    } else {
        fail('REST_UPSTREAM_ASSEMBLE_SCOPE_UNSUPPORTED', scope)
    }
    let schema = resolvePointer(fragmentDocument, schemaPath)
    // A request/response schema may itself be a $ref to a component that
    // carries the content (milvus alter_properties requestBody $ref →
    // component properties) or the branches (milvus create: requestBody $ref →
    // CreateCollectionRequest oneOf → {$ref: QuickSetupCollection} members,
    // with the tab labels living inside the target components). Translate the
    // write into the component definition, same as the member-$ref
    // translation below.
    if (schema && typeof schema.$ref === 'string' && schema.$ref.startsWith('#/')) {
        const componentPath = `/${schema.$ref.slice(2).split('/').map(token => escapePointerToken(token.replace(/~1/g, '/').replace(/~0/g, '~'))).join('/')}`
        const component = resolvePointer(fragmentDocument, componentPath)
        if (!component) fail('REST_UPSTREAM_ASSEMBLE_BRANCH_REF_DANGLING', `${schemaPath}: ${schema.$ref}`)
        schemaPath = componentPath
        schema = component
    }
    if (!branch) return {schemaPath, container: schema}
    const containerName = schema && (schema.oneOf ? 'oneOf' : schema.anyOf ? 'anyOf' : null)
    if (!containerName) fail('REST_UPSTREAM_ASSEMBLE_BRANCH_CONTAINER_MISSING', `${schemaPath} branch=${branch}`)
    const members = schema[containerName]
    let branchIndex = members.findIndex(member => member && member['x-tab-label'] === branch)
    // diff.js labels unlabeled oneOf/anyOf members by position (branch-N,
    // 1-based) and the applier's branchLabelAt resolves the same fallback; a
    // positional citation may only land on a member that is still unlabeled.
    if (branchIndex < 0) {
        const positional = /^branch-([0-9]+)$/.exec(branch)
        const index = positional ? Number(positional[1]) - 1 : -1
        if (index >= 0) {
            // diff.js and the applier's branchLabelAt number positional
            // branches by PLAIN-OBJECT member rank (non-object members do not
            // count); resolve the same member here.
            const objectMembers = members.filter(member => member && typeof member === 'object' && !Array.isArray(member))
            if (index < objectMembers.length && objectMembers[index]['x-tab-label'] === undefined) {
                branchIndex = members.indexOf(objectMembers[index])
            }
        }
    }
    if (branchIndex < 0) fail('REST_UPSTREAM_ASSEMBLE_BRANCH_NOT_FOUND', `${schemaPath}/${containerName} has no branch ${branch}`)
    const member = members[branchIndex]
    if (typeof member?.$ref === 'string' && member.$ref.startsWith('#/')) {
        const componentPath = `/${member.$ref.slice(2).split('/').map(token => escapePointerToken(token.replace(/~1/g, '/').replace(/~0/g, '~'))).join('/')}`
        const component = resolvePointer(fragmentDocument, componentPath)
        if (!component) fail('REST_UPSTREAM_ASSEMBLE_BRANCH_REF_DANGLING', `${branch}: ${member.$ref}`)
        return {schemaPath: componentPath, container: component}
    }
    const branchPath = `${schemaPath}/${containerName}/${branchIndex}`
    return {schemaPath: branchPath, container: member}
}

function locateParameter({base, field, fragmentDocument}) {
    const separator = field.indexOf(':')
    if (separator <= 0) fail('REST_UPSTREAM_ASSEMBLE_FIELD_INVALID', field)
    const name = field.slice(0, separator)
    const rest = field.slice(separator + 1)
    // diff.js mints copy indexes for duplicated parameters (name:in#N, the
    // 0-based occurrence) and the applier compares with the suffix stripped;
    // resolve the same occurrence here.
    const hash = rest.indexOf('#')
    const where = (hash < 0 ? rest : rest.slice(0, hash)) || 'query'
    const copy = hash < 0 ? null : Number(rest.slice(hash + 1))
    const parameters = resolvePointer(fragmentDocument, `${base}/parameters`) || []
    const matches = []
    for (const [index, parameter] of parameters.entries()) {
        if (parameter && parameter.name === name && parameter.in === where) matches.push(index)
    }
    const position = copy ?? 0
    if (matches.length === 0 || position >= matches.length) {
        fail('REST_UPSTREAM_ASSEMBLE_PARAMETER_NOT_FOUND', `${base}/parameters name=${name} in=${where}${copy === null ? '' : ` copy=${copy}`}`)
    }
    return {parameterPath: `${base}/parameters/${matches[position]}`}
}

// Shared stance context: the drift coordinates and the fragment locus they
// resolve to. Lifecycle leaves attach to the same object the drift touched.
function stanceContext({entry, fragmentDocument}) {
    const base = operationBasePath(entry.opKey)
    const {scope, branch, responseStatus, field} = entry
    if (scope === 'parameter') {
        const {parameterPath} = locateParameter({base, field, fragmentDocument})
        return {base, scopePath: parameterPath, fieldObjectPath: parameterPath}
    }
    if (scope === 'operation') {
        return {base, scopePath: base, fieldObjectPath: base}
    }
    const {schemaPath, container} = schemaContainerPath({base, scope, responseStatus, branch, fragmentDocument})
    return {base, scopePath: schemaPath, container, fieldObjectPath: `${schemaPath}/properties/${field}`}
}

function evidenceBase(entry) {
    return [
        entry.opKey,
        entry.scope,
        entry.branch ? `branch '${entry.branch}'` : '',
        entry.field ? `field '${entry.field}'` : '',
    ].filter(Boolean).join(' ')
}

function mainEntry({decision, entry, context}) {
    const base = evidenceBase(entry)
    const change = entry.change || {}
    const override = decision.override === true
    const overrideFields = override ? {override: true, overrideReason: decision.overrideReason} : {override: false}

    if (PROSE_KINDS.has(change.kind)) {
        // Unreachable through the pipeline (prose is a report lane and the
        // decision gates reject it); kept fail-closed for hand-authored files.
        fail('REST_UPSTREAM_ASSEMBLE_PROSE_ADOPT', `${entry.id}: prose drift is never assembled; the fragments keep their own text`)
    }
    if (change.kind === 'required') {
        if (entry.scope === 'parameter') {
            // #946 semantics: parameter-level required is the boolean on the
            // parameter object itself; the applier locates and binds it.
            return {diffEntryId: entry.id, kind: 'constraint', targetFragment: entry.fragment,
                opPath: context.fieldObjectPath, value: change.after,
                evidence: `${base} required → ${change.after}`, ...overrideFields}
        }
        // #941 semantics: the landed value is the schema's current membership
        // plus/minus the cited field; the boolean itself is never written.
        const current = Array.isArray(context.container?.required) ? context.container.required : []
        const landed = change.after === true
            ? (current.includes(entry.field) ? current : [...current, entry.field])
            : current.filter(member => member !== entry.field)
        return {diffEntryId: entry.id, kind: 'constraint', targetFragment: entry.fragment,
            opPath: `${context.scopePath}/required`, value: landed,
            evidence: `${base} required ${change.after ? 'gains' : 'drops'} '${entry.field}' (membership derived from the fragment copy)`, ...overrideFields}
    }
    if (change.kind === 'constraint') {
        if (!CONSTRAINT_KEYS.has(change.key)) {
            fail('REST_UPSTREAM_ASSEMBLE_CHANGE_UNSUPPORTED', `${change.kind}(${change.key}) ${entry.id}`)
        }
        return {diffEntryId: entry.id, kind: 'constraint', targetFragment: entry.fragment,
            opPath: `${context.fieldObjectPath}/${change.key}`, value: change.after,
            evidence: `${base} ${change.key} ${JSON.stringify(change.before)} → ${JSON.stringify(change.after)}`, ...overrideFields}
    }
    if (change.kind === 'deprecated') {
        return {diffEntryId: entry.id, kind: 'constraint', targetFragment: entry.fragment,
            opPath: `${context.scopePath}/deprecated`, value: change.after,
            evidence: `${base} ${change.kind} ${JSON.stringify(change.before)} → ${JSON.stringify(change.after)}`, ...overrideFields}
    }
    fail('REST_UPSTREAM_ASSEMBLE_CHANGE_UNSUPPORTED', `${change.kind} ${entry.id}`)
}

// Rule 10: contract drift earns lifecycle writes; the diff derives the exact
// suggested leaves, the assembler copies them onto the drifted object. A
// schema-scope required drift anchors on the schema itself: the applier binds
// required-cited entries to the schema declaring the cited field (its
// .properties), so the field object is not a legal locus for them.
function lifecycleEntries({entry, context}) {
    const base = evidenceBase(entry)
    const change = entry.change || {}
    const anchor = entry.scope !== 'parameter' && entry.scope !== 'operation' && change.kind === 'required'
        ? context.scopePath
        : context.fieldObjectPath
    const leaves = Object.keys(entry.lifecycle || {}).filter(key => LIFECYCLE_KEYS.has(key))
    return leaves.map(leaf => ({diffEntryId: entry.id, kind: 'lifecycle', targetFragment: entry.fragment,
        opPath: `${anchor}/${leaf}`, value: entry.lifecycle[leaf],
        evidence: `${base} ${leaf}=${JSON.stringify(entry.lifecycle[leaf])} (diff-suggested lifecycle)`, override: false}))
}

function ledgerEntry({decision, entry}) {
    const base = evidenceBase(entry)
    return {diffEntryId: entry.id, kind: 'ledgerDraft',
        ledgerDraft: {opKey: entry.opKey, classification: decision.classification, reason: decision.reason, owner: 'rest-decision-stage', ...(entry.fragment ? {fragment: entry.fragment} : {})},
        evidence: `${base}: ledger proposal (${decision.reason})`}
}

// AUTO lane — mirror: the value is the upstream subtree with the fragment's
// prose merged back in, recomputed here from the fragment copy. The applier
// recomputes the same merge from the live fragment and refuses any deviation.
function mirrorEntry({entry, fragmentDocument}) {
    const base = evidenceBase(entry)
    const context = stanceContext({entry, fragmentDocument})
    const current = resolvePointer(fragmentDocument, context.fieldObjectPath)
    if (!current || typeof current !== 'object') {
        fail('REST_UPSTREAM_ASSEMBLE_MIRROR_LOCUS_MISSING', `${entry.id}: ${context.fieldObjectPath}`)
    }
    const mergeOptions = entry.preserveLocalScalarConstraints ? {preserveLocalScalarConstraints: true} : {}
    const value = mergeMirrorProse(entry.change.after, current, mergeOptions)
    // NOTE: preserveLocalScalarConstraints deliberately does NOT ride the
    // change-set entry — the contract's entry object is closed
    // (additionalProperties: false) and the applier reads the flag from the
    // cited diff entry, so a change-set copy would be dead weight that Ajv
    // rejects. The diffDigest binding keeps the two documents in lockstep.
    const mirror = {diffEntryId: entry.id, kind: 'mirror', targetFragment: entry.fragment,
        opPath: context.fieldObjectPath, value,
        requiredMembership: entry.requiredMembership ?? null,
        evidence: `${base} schema mirrored to upstream structure (local prose preserved at surviving nodes)${entry.droppedLocalFields?.length ? `; local fields retired: ${entry.droppedLocalFields.join(', ')}` : ''}`,
        override: false}
    const extra = entry.lifecycle ? lifecycleEntries({entry, context}) : []
    return [mirror, ...extra]
}

// AUTO lane — addition: value shape is {<field>: subtree} merged into the
// target branch's properties container, or the upstream parameter object
// appended to the operation's parameters.
function additionEntries({entry, targets, fragmentDocument}) {
    const base = evidenceBase(entry)
    if (entry.category === 'upstream-added-param') {
        return [{diffEntryId: entry.id, kind: 'addition', targetFragment: entry.fragment,
            opPath: `${operationBasePath(entry.opKey)}/parameters`, value: structuredClone(entry.change.after),
            evidence: `${base} parameter added from upstream (appended to parameters)`, override: false}]
    }
    const entries = []
    for (const target of targets) {
        const {schemaPath} = schemaContainerPath({base: operationBasePath(entry.opKey), scope: entry.scope,
            responseStatus: entry.responseStatus, branch: target, fragmentDocument})
        const propertiesPath = `${schemaPath}/properties`
        const where = target ? ` into branch '${target}'` : ''
        entries.push({diffEntryId: entry.id, kind: 'addition', targetFragment: entry.fragment,
            opPath: propertiesPath, value: {[entry.field]: structuredClone(entry.change.after)},
            requiredMembership: entry.requiredMembership ?? null,
            evidence: `${base} added from upstream${where}`, override: false})
        if (entry.lifecycle) {
            entries.push(...lifecycleEntries({entry, context: {scopePath: propertiesPath, fieldObjectPath: `${propertiesPath}/${entry.field}`}}))
        }
    }
    return entries
}

function buildReports() {
    return {
        descriptionDrift: [],
        deletions: [],
        unplaced: [],
        pendingConfirmation: [],
        unresolvableSubtrees: [],
        supersededStances: [],
        placementsApplied: [],
        rejectedPlacements: [],
        reorganizations: [],
    }
}

function assembleChangeSet({diffDocument, decisions, fragmentLoader, branchPlan = null}) {
    validateDecisions(decisions)
    const byId = new Map(diffDocument.entries.map(entry => [entry.id, entry]))
    // Invented decision ids are the hallucination path: every stance must cite
    // a diff entry that exists, even when the cited lane would ignore it.
    for (const decision of decisions) {
        if (!byId.has(decision.diffEntryId)) fail('REST_UPSTREAM_ASSEMBLE_DIFF_ENTRY_UNKNOWN', decision.diffEntryId)
    }
    const decisionById = new Map(decisions.map(decision => [decision.diffEntryId, decision]))
    const fragmentCache = new Map()
    const loader = fileName => {
        if (!fragmentCache.has(fileName)) fragmentCache.set(fileName, fragmentLoader(fileName))
        return fragmentCache.get(fileName)
    }
    const placementValidation = branchPlan
        ? validatePlacements(branchPlan, buildPlacementRecords(diffDocument, loader))
        : {placements: new Map(), rejected: []}
    const placements = placementValidation.placements
    const reports = buildReports()
    reports.rejectedPlacements = placementValidation.rejected
    reports.reorganizations = branchPlan?.reorganizations ?? []
    const entries = []

    for (const entry of diffDocument.entries) {
        const change = entry.change || {}
        const decision = decisionById.get(entry.id)

        // Report lanes: prose harvest and retirement review.
        if (PROSE_KINDS.has(change.kind)) {
            if (decision && decision.action === 'adopt') {
                fail('REST_UPSTREAM_ASSEMBLE_PROSE_ADOPT', `${entry.id}: prose drift is never assembled; the fragments keep their own text`)
            }
            reports.descriptionDrift.push({id: entry.id, opKey: entry.opKey, scope: entry.scope, branch: entry.branch ?? null,
                field: entry.field ?? null, before: change.before ?? null, after: change.after ?? null, templateProse: entry.templateProse === true})
            continue
        }
        if (entry.category === 'zdoc-only' && DELETION_KINDS.has(change.kind)) {
            reports.deletions.push({id: entry.id, opKey: entry.opKey, scope: entry.scope, field: entry.field ?? null, kind: change.kind})
            continue
        }

        // Recursive upstream subtrees cannot be mirrored (no finite inlined
        // value): report for human follow-up and write nothing.
        if (entry.unresolvableSubtree) {
            reports.unresolvableSubtrees.push({id: entry.id, opKey: entry.opKey, scope: entry.scope, branch: entry.branch ?? null,
                field: entry.field ?? null, category: entry.category, requiresConfirmation: entry.requiresConfirmation ?? null})
            continue
        }

        // AUTO lane: mirrors.
        if (change.kind === 'schema') {
            if (decision) {
                fail('REST_UPSTREAM_ASSEMBLE_AUTO_STANCE', `${entry.id}: ${change.kind} entries are assembled automatically; no stance is taken on them`)
            }
            if (entry.requiresConfirmation) {
                reports.pendingConfirmation.push({id: entry.id, opKey: entry.opKey, scope: entry.scope, branch: entry.branch ?? null,
                    field: entry.field ?? null, reason: entry.requiresConfirmation,
                    droppedLocalFields: entry.droppedLocalFields ?? []})
                continue
            }
            // Retired local content rides the same human-review list as
            // upstream-absent fields, so a mirror can never drop prose or
            // constraints without a reviewer seeing it.
            for (const retired of entry.droppedLocalFields ?? []) {
                reports.deletions.push({id: entry.id, opKey: entry.opKey, scope: entry.scope, field: retired, kind: 'mirror-retired-local'})
            }
            entries.push(...mirrorEntry({entry, fragmentDocument: loader(entry.fragment)}))
            continue
        }

        // AUTO lane: additions (parameters, and fields with a placement or an
        // unbranched target schema). Unplaced branched fields degrade to the
        // human-review list; an unattributed ledger stance stays legal there.
        if (entry.category === 'upstream-added-param') {
            if (decision) fail('REST_UPSTREAM_ASSEMBLE_AUTO_STANCE', `${entry.id}: added parameters are assembled automatically; no stance is taken on them`)
            entries.push(...additionEntries({entry, targets: [], fragmentDocument: loader(entry.fragment)}))
            continue
        }
        if (entry.category === 'upstream-added-field' || entry.category === 'unattributed') {
            if (decision && decision.action === 'adopt') {
                fail('REST_UPSTREAM_ASSEMBLE_AUTO_STANCE', `${entry.id}: added fields are assembled automatically; no stance is taken on them`)
            }
            if (decision && decision.action === 'ledger' && entry.category === 'upstream-added-field') {
                fail('REST_UPSTREAM_ASSEMBLE_LEDGER_TARGET_INVALID', `${entry.id}: ledger drafts must cite an operation-level drift (${[...LEDGERABLE_CATEGORIES].sort().join(', ')}), not ${entry.category}`)
            }
            const targets = placements.get(entry.id)
            if (targets) {
                if (decision && decision.action === 'ledger') {
                    reports.supersededStances.push({id: entry.id, action: decision.action, note: 'branch placement takes precedence over the ledger stance'})
                }
                reports.placementsApplied.push({id: entry.id, opKey: entry.opKey, field: entry.field, targets})
                entries.push(...additionEntries({entry, targets, fragmentDocument: loader(entry.fragment)}))
                continue
            }
            const branchInfo = entry.fragment ? branchLabelsForScope(loader(entry.fragment), entry) : null
            if (branchInfo) {
                reports.unplaced.push({id: entry.id, opKey: entry.opKey, scope: entry.scope, responseStatus: entry.responseStatus ?? null,
                    field: entry.field, branchLabels: branchInfo.labels})
                if (entry.category === 'unattributed' && decision?.action === 'ledger') entries.push(ledgerEntry({decision, entry}))
                continue
            }
            if (entry.category === 'unattributed') {
                // unattributed entries only arise from branched fragment bodies;
                // without a ledger stance to fall back on, reaching here means
                // the fragment drifted from the diff.
                if (!decision || decision.action !== 'ledger') {
                    fail('REST_UPSTREAM_ASSEMBLE_UNATTRIBUTED_UNBRANCHED', `${entry.id}: unattributed field but the fragment schema has no scenario branches`)
                }
                entries.push(ledgerEntry({decision, entry}))
                continue
            }
            entries.push(...additionEntries({entry, targets: [null], fragmentDocument: loader(entry.fragment)}))
            continue
        }

        // STANCE lanes: everything left needs an explicit decision to act.
        if (!decision) continue
        if (decision.action === 'skip') continue
        if (decision.action === 'ledger') {
            if (!LEDGERABLE_CATEGORIES.has(entry.category)) {
                fail('REST_UPSTREAM_ASSEMBLE_LEDGER_TARGET_INVALID', `${entry.id}: ledger drafts must cite an operation-level drift (${[...LEDGERABLE_CATEGORIES].sort().join(', ')}), not ${entry.category}`)
            }
            entries.push(ledgerEntry({decision, entry}))
            continue
        }
        if (!ADOPTABLE_CATEGORIES.has(entry.category)) {
            fail('REST_UPSTREAM_ASSEMBLE_ADOPT_TARGET_INVALID', `${entry.id}: only upstream-modified drift is mechanically adoptable (${entry.category} needs a ledger proposal or human content work)`)
        }
        const fragmentDocument = loader(entry.fragment)
        const context = stanceContext({entry, fragmentDocument})
        entries.push(mainEntry({decision, entry, context}))
        if (entry.lifecycle) entries.push(...lifecycleEntries({entry, context}))
    }

    const orderIds = (left, right) => (left < right ? -1 : left > right ? 1 : 0)
    // Stable sort: equal (diffEntryId, kind) keep assembly order — lifecycle
    // leaves in LIFECYCLE_KEYS order, multi-branch additions in target order.
    entries.sort((left, right) => orderIds(left.diffEntryId, right.diffEntryId) || orderIds(left.kind, right.kind))
    const changeSet = {
        schemaVersion: '1.0',
        source: diffDocument.source,
        diffDigest: diffDigestOf(diffDocument),
        entries,
    }
    return {changeSet, reports}
}

// Assemblability of one stance from the diff entry alone (no fragment needed).
// The batched decision stage uses this to downgrade an out-of-grid stance to a
// per-line rejection instead of losing every other stance with the run; the
// assembler's own gates stay fail-closed and re-check everything.
function stanceError(decision, entry) {
    if (!decision || !entry) return 'unknown diff entry'
    if (decision.action === 'skip') return null
    const change = entry.change || {}
    if (PROSE_KINDS.has(change.kind)) return 'prose drift is a report lane; the fragments keep their own text'
    if (change.kind === 'schema') return 'field mirrors are assembled automatically; no stance is taken on them'
    if (['upstream-added-field', 'upstream-added-param'].includes(entry.category)) return 'added fields/parameters are assembled automatically; no stance is taken on them'
    if (decision.action === 'ledger') {
        if (!LEDGERABLE_CATEGORIES.has(entry.category)) {
            return `ledger drafts must cite an operation-level drift (${[...LEDGERABLE_CATEGORIES].sort().join(', ')}), not ${entry.category}`
        }
        return null
    }
    if (!ADOPTABLE_CATEGORIES.has(entry.category)) {
        return `only upstream-modified drift is mechanically adoptable (${entry.category} needs a ledger proposal or human content work)`
    }
    if (change.kind === 'deprecated' || change.kind === 'required') return null
    if (change.kind === 'constraint') {
        if (!CONSTRAINT_KEYS.has(change.key)) return `constraint key ${JSON.stringify(change.key)} is not mechanically writable`
        return null
    }
    return `change kind ${JSON.stringify(change.kind)} has no mechanical write`
}

module.exports = {parseDecisions, loadDecisions, assembleChangeSet, decisionShapeError, stanceError, CONSTRAINT_KEYS, LIFECYCLE_KEYS}
