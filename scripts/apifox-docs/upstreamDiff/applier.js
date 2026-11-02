const fs = require('node:fs')
const path = require('node:path')
const {isDeepStrictEqual} = require('node:util')
const {serializeDocument} = require('./formatter')
const {verifyAgainstDiff} = require('./changeSet')
const {assertMirrorValueBound, mirrorValueMatches, isTranslationComplete, assertSchemaShape} = require('./mirror')

// Deterministic applier: the pipeline authors a schema-validated change set;
// this module (plain code, never the model) mutates the canonical fragment
// objects. Invariants (design §8.2/§8.3 + 2026-10-30 merge model):
//   - every applied entry traces to a diff output entry AND is bound to it: the
//     written leaf, its location, and (for constraints) its value must match the
//     cited drift; deviating needs an explicit, logged override
//   - writes are limited to whitelisted mutable leaves plus two assembled
//     structural lanes: mirrors (field subtrees rebuilt from the diff's own
//     upstream bytes, prose merged, value verified by recomputation) and
//     additions (new properties/parameters appended from the diff's subtree).
//     Everything outside cited structural lanes must stay deep-equal before and
//     after, so properties, oneOf/anyOf branches, and x-* keys can never drift
//     through here
//   - internal denylisted field names can never be introduced (as keys or as
//     required-array members), and any prose a mirror/addition introduces must
//     be translation-complete (zh-CN + ja-JP) before it may land

const PROSE_KEYS = new Set(['summary', 'description', 'example'])
const CONSTRAINT_KEYS = new Set(['type', 'format', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'minLength', 'maxLength', 'pattern', 'minItems', 'maxItems', 'uniqueItems', 'enum', 'default', 'nullable', 'deprecated', 'required'])
const LIFECYCLE_KEYS = new Set(['x-added-at', 'x-last-modified', 'x-deprecated-since'])
const LIFECYCLE_TRACK = /^[0-9]+\.[0-9]+\.x$/

const isScalar = value => value === null || ['string', 'number', 'boolean'].includes(typeof value)

// Value shapes a constraint write may carry; anything else is rejected so a
// constraint entry cannot smuggle structure (e.g. an object into `type` or `default`).
const CONSTRAINT_VALUE_CHECKS = {
    type: value => typeof value === 'string',
    format: value => typeof value === 'string',
    pattern: value => typeof value === 'string',
    minimum: value => typeof value === 'number',
    maximum: value => typeof value === 'number',
    exclusiveMinimum: value => typeof value === 'number' || typeof value === 'boolean',
    exclusiveMaximum: value => typeof value === 'number' || typeof value === 'boolean',
    minLength: value => Number.isInteger(value) && value >= 0,
    maxLength: value => Number.isInteger(value) && value >= 0,
    minItems: value => Number.isInteger(value) && value >= 0,
    maxItems: value => Number.isInteger(value) && value >= 0,
    uniqueItems: value => typeof value === 'boolean',
    nullable: value => typeof value === 'boolean',
    deprecated: value => typeof value === 'boolean',
    enum: value => Array.isArray(value) && value.every(isScalar),
    // Schema objects carry a required-name array; parameter objects carry a boolean flag.
    required: value => typeof value === 'boolean' || (Array.isArray(value) && value.every(item => typeof item === 'string')),
    default: value => isScalar(value) || (Array.isArray(value) && value.every(isScalar)),
}

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isParameterObject(value) {
    return isPlainObject(value) && typeof value.name === 'string' && typeof value.in === 'string'
}

function decodePointer(pointer) {
    if (!pointer.startsWith('/')) fail('REST_UPSTREAM_APPLY_POINTER_INVALID', pointer)
    return pointer.split('/').slice(1).map(token => token.replace(/~1/g, '/').replace(/~0/g, '~'))
}

function mutableKeyFor(kind) {
    if (kind === 'prose') return PROSE_KEYS
    if (kind === 'constraint') return CONSTRAINT_KEYS
    if (kind === 'lifecycle') return LIFECYCLE_KEYS
    return null
}

function resolveParent(document, pointer, diffEntryId) {
    const tokens = decodePointer(pointer)
    const leaf = tokens[tokens.length - 1]
    let parent = document
    for (const token of tokens.slice(0, -1)) {
        if (Array.isArray(parent)) {
            const index = Number(token)
            if (!/^[0-9]+$/.test(token) || index >= parent.length) {
                fail('REST_UPSTREAM_APPLY_TARGET_MISSING', `${diffEntryId}: ${pointer} (index "${token}" out of range)`)
            }
            parent = parent[index]
            continue
        }
        if (!isPlainObject(parent) || !(token in parent)) {
            fail('REST_UPSTREAM_APPLY_TARGET_MISSING', `${diffEntryId}: ${pointer} (missing "${token}")`)
        }
        parent = parent[token]
    }
    return {parent, leaf, tokens}
}

function stripMutableLeaves(value) {
    if (Array.isArray(value)) return value.map(stripMutableLeaves)
    if (!isPlainObject(value)) return value
    const result = {}
    for (const [key, child] of Object.entries(value)) {
        if (PROSE_KEYS.has(key) || CONSTRAINT_KEYS.has(key) || LIFECYCLE_KEYS.has(key)) continue
        result[key] = stripMutableLeaves(child)
    }
    return result
}

function assertSkeletonUnchanged(before, after, label, exemptions = []) {
    const beforeSkeleton = stripMutableLeaves(before)
    const afterSkeleton = stripMutableLeaves(after)
    // Cited structural lanes (mirror/addition) legitimately rewrite their
    // subtrees; excise exactly those coordinates from the skeletons before the
    // comparison so nothing outside them can sneak through.
    const decode = pointer => pointer.split('/').slice(1).map(token => token.replace(/~1/g, '/').replace(/~0/g, '~'))
    const excise = (root, pointer) => {
        const tokens = decode(pointer)
        let parent = root
        for (const token of tokens.slice(0, -1)) {
            if (parent === null || typeof parent !== 'object') return
            parent = Array.isArray(parent) ? parent[Number(token)] : parent[token]
        }
        const leaf = tokens[tokens.length - 1]
        if (parent === null || typeof parent === 'undefined' || typeof parent !== 'object') return
        if (Array.isArray(parent)) {
            const index = Number(leaf)
            if (/^[0-9]+$/.test(leaf) && index < parent.length) parent.splice(index, 1)
            return
        }
        if (leaf in parent) delete parent[leaf]
    }
    // Array-index exemptions splice: apply them highest-index-first so later
    // additions in the same array keep pointing at the right element.
    const orderedExemptions = [...exemptions].sort((left, right) => {
        const leftIndex = Number(left.pointer.split('/').pop())
        const rightIndex = Number(right.pointer.split('/').pop())
        if (Number.isInteger(leftIndex) && Number.isInteger(rightIndex)) return rightIndex - leftIndex
        return 0
    })
    for (const exempt of orderedExemptions) {
        if (exempt.side !== 'after') excise(beforeSkeleton, exempt.pointer)
        excise(afterSkeleton, exempt.pointer)
    }
    if (!isDeepStrictEqual(beforeSkeleton, afterSkeleton)) {
        fail('REST_UPSTREAM_STRUCTURE_CHANGED', `${label}: structural skeleton drifted outside the cited structural lanes (first difference: ${firstSkeletonDifference(beforeSkeleton, afterSkeleton)}); structural edits are a mirror/addition lane`)
    }
}

// First differing path for the failure message, so an unexpected skeleton
// drift is locatable without re-running under a debugger.
function firstSkeletonDifference(before, after, trail = '') {
    if (isDeepStrictEqual(before, after)) return null
    const plain = value => typeof value === 'object' && value !== null
    if (!plain(before) || !plain(after) || Array.isArray(before) !== Array.isArray(after)) return trail || '(root)'
    const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort()
    for (const key of keys) {
        const child = firstSkeletonDifference(before[key], after[key], `${trail}/${key}`)
        if (child) return child
    }
    return trail || '(root)'
}

function collectKeysAndRequiredMembers(value, seen = new Set(), out = {keys: new Set(), requiredMembers: new Set()}) {
    if (seen.has(value)) return out
    if (Array.isArray(value)) {
        seen.add(value)
        for (const item of value) collectKeysAndRequiredMembers(item, seen, out)
        return out
    }
    if (!isPlainObject(value)) return out
    seen.add(value)
    for (const [key, child] of Object.entries(value)) {
        out.keys.add(key)
        if (key === 'required' && Array.isArray(child)) for (const member of child) if (typeof member === 'string') out.requiredMembers.add(member)
        collectKeysAndRequiredMembers(child, seen, out)
    }
    return out
}

function assertNoInternalFields(before, after, denylist, label) {
    const beforeInventory = collectKeysAndRequiredMembers(before)
    const afterInventory = collectKeysAndRequiredMembers(after)
    for (const key of afterInventory.keys) {
        if (denylist.includes(key) && !beforeInventory.keys.has(key)) {
            fail('REST_UPSTREAM_INTERNAL_FIELD', `${label}: "${key}" is an internal field and must never enter the docs`)
        }
    }
    for (const member of afterInventory.requiredMembers) {
        if (denylist.includes(member) && !beforeInventory.requiredMembers.has(member)) {
            fail('REST_UPSTREAM_INTERNAL_FIELD', `${label}: "${member}" is an internal field and must never be listed as required`)
        }
    }
}

// Expected write for a constraint entry derived from the cited drift entry.
function expectedConstraintValue(cited, parent, leaf) {
    const change = cited.change
    if (change.kind === 'constraint') return {expected: change.after, comparable: true}
    if (change.kind === 'deprecated') return {expected: change.after, comparable: true}
    if (change.kind === 'required') {
        if (isParameterObject(parent)) return {expected: change.after, comparable: true}
        // schema member: the diff reports membership for one field; the write is the whole array
        const current = Array.isArray(parent.required) ? parent.required : []
        const field = String(cited.field || '').split('#')[0]
        const expected = change.after ? [...new Set([...current, field])] : current.filter(name => name !== field)
        return {expected, comparable: true, unordered: true}
    }
    return {comparable: false}
}

function sameValue(left, right, unordered) {
    if (unordered && Array.isArray(left) && Array.isArray(right)) {
        return isDeepStrictEqual([...left].sort(), [...right].sort())
    }
    return isDeepStrictEqual(left, right)
}

/*
 * Bind a change-set entry to the diff entry it cites (design §8.2): the kind and
 * leaf must correspond to the drift the diff reported, the target location must
 * be the reported parameter/field (inside a branch when the drift was
 * branch-scoped), and constraint values must equal the upstream value unless
 * the entry carries an explicit, logged override. Confirmation-flagged drifts
 * (suspected generator loss) can only be applied with an override.
 */
function assertBoundToCitedEntry(document, entry, cited, parent, leaf, tokens) {
    const label = entry.diffEntryId
    const change = cited.change || {}
    if (entry.kind === 'prose') {
        if (!['summary', 'description'].includes(change.kind)) {
            fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${label}: prose entries must cite a summary/description drift, not ${change.kind}`)
        }
        if (leaf !== change.kind) fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${label}: leaf "${leaf}" does not match the cited ${change.kind} drift`)
    } else if (entry.kind === 'constraint') {
        const expectedLeaf = change.kind === 'constraint' ? change.key : change.kind === 'required' ? 'required' : change.kind === 'deprecated' ? 'deprecated' : null
        if (!expectedLeaf) fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${label}: constraint entries must cite a constraint/required/deprecated drift, not ${change.kind}`)
        if (leaf !== expectedLeaf) fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${label}: leaf "${leaf}" does not match the cited "${expectedLeaf}" drift`)
        if (cited.requiresConfirmation && !entry.override) {
            fail('REST_UPSTREAM_APPLY_CONFIRMATION_REQUIRED', `${label}: drift is flagged ${cited.requiresConfirmation}; apply only with override after R&D confirmation`)
        }
        const {expected, comparable, unordered} = expectedConstraintValue(cited, parent, leaf)
        if (comparable && !entry.override && !sameValue(entry.value, expected, unordered)) {
            fail('REST_UPSTREAM_APPLY_VALUE_UNBOUND', `${label}: value ${JSON.stringify(entry.value)} differs from the upstream value ${JSON.stringify(expected)}; use override with a reason to deviate`)
        }
    } else if (entry.kind === 'lifecycle') {
        // Design §6.3: the diff derives lifecycle suggestions on data-plane
        // sources, so a cited value binds like a constraint value. A leaf the
        // diff did not derive (spec-file sources, no track, un-suggested leaf)
        // still needs an explicit logged override.
        const derived = cited.lifecycle ? cited.lifecycle[leaf] : undefined
        if (derived !== undefined) {
            if (!entry.override && !sameValue(entry.value, derived, false)) {
                fail('REST_UPSTREAM_APPLY_VALUE_UNBOUND', `${label}: value ${JSON.stringify(entry.value)} differs from the diff-derived lifecycle value ${JSON.stringify(derived)}; use override with a reason to deviate`)
            }
        } else if (!entry.override) {
            fail('REST_UPSTREAM_APPLY_OVERRIDE_REQUIRED', `${label}: the diff does not derive a lifecycle value for "${leaf}"; lifecycle writes need override with a reason`)
        }
    }

    if (['prose', 'constraint', 'lifecycle'].includes(entry.kind)) {
        if (cited.field !== undefined) {
            const baseField = String(cited.field).split('#')[0]
            if (isParameterObject(parent)) {
                if (`${parent.name}:${parent.in}` !== baseField) fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: target parameter ${parent.name}:${parent.in} is not the cited ${baseField}`)
            } else if (change.kind === 'required') {
                // Schema-level required membership is written on the schema's array; the
                // schema must be the one that declares the cited field.
                if (!isPlainObject(parent.properties) || !(baseField in parent.properties)) {
                    fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: target schema does not declare the cited field "${baseField}"`)
                }
            } else if (tokens[tokens.length - 2] !== baseField) {
                fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: target "${tokens[tokens.length - 2]}" is not the cited field "${baseField}"`)
            }
        } else if (cited.scope === 'operation' && !(tokens.length === 4 && tokens[0] === 'paths')) {
            fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: operation-scoped drift must target the operation object`)
        }
        if (cited.branch) {
            const branchLabel = branchLabelAt(document, tokens)
            if (branchLabel === null) {
                fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: drift is scoped to branch "${cited.branch}" but the target is outside any oneOf/anyOf branch`)
            }
            if (branchLabel !== cited.branch) {
                fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: drift is scoped to branch "${cited.branch}" but the target sits in branch "${branchLabel}"`)
            }
        }
    }
}

// Label of the oneOf/anyOf branch the pointer passes through, computed the same way
// the diff labels branches (x-tab-label, else branch-N among the object members).
function branchLabelAt(document, tokens) {
    for (let index = 0; index < tokens.length - 1; index++) {
        if (!['oneOf', 'anyOf'].includes(tokens[index]) || !/^[0-9]+$/.test(tokens[index + 1])) continue
        let container = document
        for (const token of tokens.slice(0, index + 1)) container = Array.isArray(container) ? container[Number(token)] : container?.[token]
        if (!Array.isArray(container)) return null
        const branch = container[Number(tokens[index + 1])]
        if (!isPlainObject(branch)) return null
        if (typeof branch['x-tab-label'] === 'string') return branch['x-tab-label']
        const objectPosition = container.slice(0, Number(tokens[index + 1]) + 1).filter(isPlainObject).length
        return `branch-${objectPosition}`
    }
    return null
}

// Navigate to a decoded token path (no leaf semantics).
function resolveAt(document, tokens, diffEntryId) {
    let current = document
    for (const token of tokens) {
        if (Array.isArray(current)) {
            if (!/^[0-9]+$/.test(token) || Number(token) >= current.length) {
                fail('REST_UPSTREAM_APPLY_TARGET_MISSING', `${diffEntryId}: index "${token}" out of range`)
            }
            current = current[Number(token)]
            continue
        }
        if (!isPlainObject(current) || !(token in current)) {
            fail('REST_UPSTREAM_APPLY_TARGET_MISSING', `${diffEntryId}: missing "${token}"`)
        }
        current = current[token]
    }
    return current
}

// Landed required membership from a mirror/addition: +field (create the array
// when the upstream truth requires the field and the fragment schema has none)
// or -field (remove; the relaxation itself is confirmation-gated upstream of
// this write). Mirrors carry the schema two tokens up (…/properties/<field>);
// additions carry it one token up (…/properties).
function applyRequiredMembership(document, entry, schemaTokens, field) {
    if (entry.requiredMembership !== true && entry.requiredMembership !== false) return
    const schema = resolveAt(document, schemaTokens, entry.diffEntryId)
    if (!isPlainObject(schema)) fail('REST_UPSTREAM_APPLY_TARGET_INVALID', `${entry.diffEntryId}: required-membership target is not a schema object`)
    const current = Array.isArray(schema.required) ? schema.required : []
    const expected = entry.requiredMembership ? [...new Set([...current, field])] : current.filter(name => name !== field)
    if (expected.length === 0 && current.length > 0) delete schema.required
    else if (expected.length > 0 || current.length > 0) schema.required = expected
}

function applyFragmentEntry(document, entry, cited, denylist, normalizations, exemptions, writtenSubtrees) {
    const label = entry.diffEntryId
    const kind = entry.kind
    if ((denylist || []).includes(decodePointer(entry.opPath).pop())) {
        fail('REST_UPSTREAM_INTERNAL_FIELD', `${label}: "${entry.opPath}" targets an internal field`)
    }
    // --- assembled structural lane: mirrors -------------------------------
    // The subtree is rebuilt from the diff's own upstream bytes with the
    // fragment's prose merged back in; the applier RECOMPUTES that merge from
    // the live fragment and refuses any hand-authored value. Locus, branch,
    // and confirmation binding all still apply.
    if (kind === 'mirror') {
        if (cited.change?.kind !== 'schema') {
            fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${label}: mirror entries must cite a schema-mirror drift, not ${cited.change?.kind}`)
        }
        if (cited.requiresConfirmation && !entry.override) {
            fail('REST_UPSTREAM_APPLY_CONFIRMATION_REQUIRED', `${label}: drift is flagged ${cited.requiresConfirmation}; apply only with override after R&D confirmation`)
        }
        if (!isTranslationComplete(entry.value)) {
            fail('REST_UPSTREAM_APPLY_TRANSLATION_INCOMPLETE', `${label}: the mirrored subtree carries prose without zh-CN/ja-JP; run the translation stage`)
        }
        const {parent, leaf, tokens} = resolveParent(document, entry.opPath, label)
        // The mirror's opPath leaf IS the cited field (…/properties/<field>).
        if (cited.field !== undefined && leaf !== String(cited.field).split('#')[0]) {
            fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: target "${leaf}" is not the cited field "${cited.field}"`)
        }
        if (cited.branch) {
            // A $ref branch writes through the shared component definition, a
            // pointer no branch wraps; there the recomputed merge (which reads
            // the live component bytes) is the binding.
            const branchLabel = branchLabelAt(document, tokens)
            if (branchLabel !== null && branchLabel !== cited.branch) {
                fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: drift is scoped to branch "${cited.branch}" but the target sits in branch "${branchLabel}"`)
            }
        }
        const current = parent[leaf]
        if (!isPlainObject(current)) fail('REST_UPSTREAM_APPLY_TARGET_INVALID', `${label}: mirror target ${entry.opPath} is not a schema object`)
        assertMirrorValueBound(entry, cited, current)
        parent[leaf] = structuredClone(entry.value)
        applyRequiredMembership(document, entry, tokens.slice(0, -2), String(cited.field).split('#')[0])
        exemptions.push({pointer: entry.opPath, side: 'both'})
        writtenSubtrees.push({label, value: entry.value})
        return
    }
    // --- assembled structural lane: additions ------------------------------
    if (kind === 'addition') {
        if (!isTranslationComplete(entry.value)) {
            fail('REST_UPSTREAM_APPLY_TRANSLATION_INCOMPLETE', `${label}: the added subtree carries prose without zh-CN/ja-JP; run the translation stage`)
        }
        if (cited.category === 'upstream-added-param') {
            if (cited.change?.kind !== 'param-uncovered') {
                fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${label}: parameter additions must cite an upstream-added-param drift`)
            }
            if (!isPlainObject(entry.value)) fail('REST_UPSTREAM_APPLY_VALUE_INVALID', `${label}: parameter additions carry the parameter object`)
            const [pname, pin] = String(cited.field || '').split(':')
            if (entry.value.name !== pname || entry.value.in !== pin) {
                fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: added parameter ${entry.value.name}:${entry.value.in} is not the cited ${cited.field}`)
            }
            // The added object is the diff's own upstream parameter, plus the
            // translation overlay — never a hand-authored shape.
            if (!mirrorValueMatches(cited.change.after, entry.value)) {
                fail('REST_UPSTREAM_APPLY_VALUE_UNBOUND', `${label}: added parameter differs from the diff's upstream parameter (translations aside)`)
            }
            const {parent, leaf} = resolveParent(document, entry.opPath, label)
            if (leaf !== 'parameters') fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: parameter additions target the operation's parameters array, not "${leaf}"`)
            const parameters = Array.isArray(parent[leaf]) ? parent[leaf] : []
            if (parameters.some(candidate => candidate && candidate.name === pname && candidate.in === pin)) {
                fail('REST_UPSTREAM_APPLY_TARGET_EXISTS', `${label}: parameter ${cited.field} already exists`)
            }
            const createdArray = !Array.isArray(parent[leaf])
            parameters.push(structuredClone(entry.value))
            parent[leaf] = parameters
            // When this write created the array itself, the empty container is
            // also part of the sanctioned delta.
            exemptions.push({pointer: createdArray ? entry.opPath : `${entry.opPath}/${parameters.length - 1}`, side: 'after'})
            writtenSubtrees.push({label, value: entry.value})
            return
        }
        if (['upstream-added-field', 'unattributed'].includes(cited.category) && cited.change?.kind === 'field-uncovered') {
            if (!isPlainObject(entry.value) || Object.keys(entry.value).length !== 1 || !(cited.field in entry.value)) {
                fail('REST_UPSTREAM_APPLY_VALUE_INVALID', `${label}: field additions carry exactly {${JSON.stringify(cited.field)}: upstreamSubtree}`)
            }
            if (!mirrorValueMatches(cited.change.after, entry.value[cited.field])) {
                fail('REST_UPSTREAM_APPLY_VALUE_UNBOUND', `${label}: added field differs from the diff's upstream subtree (translations aside)`)
            }
            const {parent, leaf} = resolveParent(document, entry.opPath, label)
            if (leaf !== 'properties') fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: field additions target the schema's properties container, not "${leaf}"`)
            if (cited.branch) {
                const branchLabel = branchLabelAt(document, decodePointer(entry.opPath))
                if (branchLabel !== null && branchLabel !== cited.branch) {
                    fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: placement targets branch "${cited.branch}" but the container sits in branch "${branchLabel}"`)
                }
            }
            const createdContainer = parent[leaf] === undefined
            if (parent[leaf] === undefined) parent[leaf] = {}
            if (!isPlainObject(parent[leaf])) fail('REST_UPSTREAM_APPLY_TARGET_INVALID', `${label}: ${entry.opPath} is not a properties container`)
            if (cited.field in parent[leaf]) {
                // Shared-component additions: several operations may $ref one
                // component, so their per-op additions collapse onto a single
                // properties container (milvus CollectionCommons carries
                // partitionNames for ten operations at once). An existing
                // field carrying the same upstream value (translations aside)
                // is an idempotent skip, not a conflict; a different value is
                // a real conflict and stays fail-closed.
                if (!mirrorValueMatches(cited.change.after, parent[leaf][cited.field])) {
                    fail('REST_UPSTREAM_APPLY_TARGET_EXISTS', `${label}: field "${cited.field}" already exists at ${entry.opPath} with a different value`)
                }
                // Idempotent skip: the caller logs the entry as applied, so
                // the diff reconcile stays addressed.
                return
            }
            parent[leaf][cited.field] = structuredClone(entry.value[cited.field])
            // opPath ends at the properties container; the owning schema is one token up.
            applyRequiredMembership(document, entry, decodePointer(entry.opPath).slice(0, -1), cited.field)
            exemptions.push({pointer: createdContainer ? entry.opPath : `${entry.opPath}/${cited.field}`, side: 'after'})
            writtenSubtrees.push({label, value: entry.value[cited.field]})
            return
        }
        fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${label}: addition entries must cite an upstream-added-param/field or unattributed field drift, not ${cited.category}`)
    }
    // Parameter-level required is FULLY mechanical (three runs produced three
    // different broken shapes for it): the agent cites the entry, the applier
    // locates the parameter from the diff's own coordinates (opKey + field)
    // and writes the boolean. The submitted opPath/value are advisory.
    if (cited.change && cited.change.kind === 'required' && cited.scope === 'parameter') {
        // The confirmation gate (decision 9) outranks the normalization: a
        // relaxation applies only with an explicit override, mechanical or not.
        if (cited.requiresConfirmation && !entry.override) {
            fail('REST_UPSTREAM_APPLY_CONFIRMATION_REQUIRED', `${label}: drift is flagged ${cited.requiresConfirmation}; apply only with override after R&D confirmation`)
        }
        const [method, endpoint] = String(cited.opKey).split(' ')
        const operation = document.paths?.[endpoint]?.[method]
        if (!operation) fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: the cited operation ${cited.opKey} is not in ${entry.targetFragment}`)
        const [pname, pin] = String(cited.field || '').split(':')
        const parameter = (operation.parameters || []).find(candidate => candidate && candidate.name === pname && candidate.in === pin)
        if (!parameter) fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: parameter ${cited.field} not found in ${cited.opKey}`)
        const expected = Boolean(cited.change.after)
        parameter.required = expected
        if (typeof entry.value !== 'boolean' || Boolean(entry.value) !== expected) {
            normalizations.push({diffEntryId: label, kind: 'required-parameter', submitted: entry.value ?? null, applied: expected,
                note: 'normalized to the cited parameter boolean; the submitted value is advisory'})
        }
        return
    }
    if (kind === 'lifecycle' && entry.value !== null && !LIFECYCLE_TRACK.test(entry.value)) {
        fail('REST_UPSTREAM_APPLY_VALUE_INVALID', `${label}: lifecycle values use the major.minor.x track format`)
    }
    const {parent, leaf, tokens} = resolveParent(document, entry.opPath, label)
    const allowedKeys = mutableKeyFor(kind)
    if (allowedKeys && !allowedKeys.has(leaf)) {
        fail('REST_UPSTREAM_APPLY_TARGET_INVALID', `${label}: ${kind} entries may only write ${[...allowedKeys].join(', ')}; got "${leaf}"`)
    }
    if (kind === 'constraint' && !CONSTRAINT_VALUE_CHECKS[leaf](entry.value)) {
        fail('REST_UPSTREAM_APPLY_VALUE_INVALID', `${label}: unsupported value shape for "${leaf}"`)
    }
    if (!isPlainObject(parent)) {
        fail('REST_UPSTREAM_APPLY_TARGET_INVALID', `${label}: parent of ${entry.opPath} is not an object`)
    }
    if (kind === 'constraint' && leaf === 'required' && (typeof entry.value === 'boolean') !== isParameterObject(parent)) {
        fail('REST_UPSTREAM_APPLY_VALUE_INVALID', `${label}: boolean required belongs to parameter objects, arrays to schemas`)
    }
    // A schema-level required member change is NORMALIZED, not agent-authored:
    // two real runs lost the schema's existing members when constructing the
    // array by hand, and prompt tuning did not fix it. The landed value is
    // always the schema's current membership ± the cited field (exactly what
    // expectedConstraintValue derives); the agent's array is checked for shape
    // and recorded, never trusted. Locus binding still applies, and the
    // required-relaxation confirmation gate stays upstream of this.
    if (kind === 'constraint' && leaf === 'required' && !isParameterObject(parent)) {
        const field = String(cited.field || '').split('#')[0]
        if (!isPlainObject(parent.properties) || !(field in parent.properties)) {
            fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${label}: target schema does not declare the cited field "${field}"`)
        }
        // The denylist is a hard red line (decision 8) and outranks
        // normalization: an internal-field name inside the submitted array is
        // a smuggle attempt, not an imperfect copy — reject, never drop.
        for (const member of (Array.isArray(entry.value) ? entry.value : [])) {
            if ((denylist || []).includes(member)) {
                fail('REST_UPSTREAM_INTERNAL_FIELD', `${label}: "${member}" is an internal field and cannot enter through a required array`)
            }
        }
        const current = Array.isArray(parent.required) ? parent.required : []
        const expected = cited.change.after ? [...new Set([...current, field])] : current.filter(name => name !== field)
        parent[leaf] = expected
        if (!sameValue(entry.value, expected, true)) {
            normalizations.push({diffEntryId: label, kind: 'required-array', submitted: entry.value, applied: expected,
                note: 'normalized to the schema membership +/- the cited field; the submitted array is advisory'})
        }
        return
    }
    assertBoundToCitedEntry(document, entry, cited, parent, leaf, tokens)
    parent[leaf] = entry.value
}

function applyTitleEntries(titles, titleEntries) {
    const result = {...titles}
    const log = []
    for (const entry of titleEntries) {
        const {action, zhTitle, slug} = entry.value
        if (action === 'add') {
            if (result[zhTitle] !== undefined && result[zhTitle] !== slug) {
                fail('REST_UPSTREAM_TITLES_CONFLICT', `${entry.diffEntryId}: "${zhTitle}" already maps to ${result[zhTitle]}`)
            }
            result[zhTitle] = slug
        } else {
            if (result[zhTitle] === undefined) fail('REST_UPSTREAM_TITLES_CONFLICT', `${entry.diffEntryId}: "${zhTitle}" is not mapped`)
            if (result[zhTitle] !== slug) fail('REST_UPSTREAM_TITLES_CONFLICT', `${entry.diffEntryId}: "${zhTitle}" maps to ${result[zhTitle]}, not ${slug}`)
            delete result[zhTitle]
        }
        log.push({diffEntryId: entry.diffEntryId, action, zhTitle, slug})
    }
    return {titles: result, log}
}

function assertTitleBinding(entry, cited) {
    const action = entry.value.action
    if (action === 'add' && cited.category !== 'upstream-added') {
        fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${entry.diffEntryId}: title additions must cite an upstream-added operation`)
    }
    if (action === 'remove' && cited.category !== 'fragment-only') {
        fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${entry.diffEntryId}: title removals must cite a fragment-only operation`)
    }
}

/*
 * A ledger draft is a proposed T4 decision: it must name the very operation
 * the cited drift reports. Without this binding an agent could invent a
 * ledger decision for an operation absent from the diff and satisfy the
 * accounting gate itself. `unattributed` stays legal — branch-attribution
 * proposals for an uncovered union field cite the branched operation (design
 * §8.2) — but the opKey equality keeps every draft anchored to a real entry.
 */
function assertLedgerDraftBinding(entry, cited) {
    if (['upstream-added', 'fragment-only', 'unattributed'].includes(cited.category)) {
        if (cited.opKey !== entry.ledgerDraft.opKey) {
            fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${entry.diffEntryId}: ledger draft opKey ${JSON.stringify(entry.ledgerDraft.opKey)} does not match the cited operation ${JSON.stringify(cited.opKey)}`)
        }
        return
    }
    fail('REST_UPSTREAM_APPLY_UNBOUND_TARGET', `${entry.diffEntryId}: ledger drafts must cite an operation-level drift (upstream-added, fragment-only, unattributed), not ${cited.category}`)
}

/*
 * applyChangeSet({documents, titles, changeSet, diff, ruleset}) ->
 * {documents, changedFiles, titles, appliedLog, ledgerDrafts, titleLog, overrides}
 * documents: Map<fragmentFile, parsed object>. Only files named by entries are
 * mutated; everything else is returned untouched.
 */
function applyChangeSet({documents, titles = {}, changeSet, diff, ruleset}) {
    verifyAgainstDiff(changeSet, diff)
    const citedById = new Map(diff.entries.map(entry => [entry.id, entry]))
    const denylist = ruleset.internalFieldDenylist || []
    const snapshots = new Map()
    const appliedLog = []
    const ledgerDrafts = []
    const titleEntries = []
    const overrides = []
    const normalizations = []
    const exemptionsByFile = new Map()
    const writtenSubtrees = []

    for (const entry of changeSet.entries) {
        const cited = citedById.get(entry.diffEntryId)
        if (entry.override) overrides.push({diffEntryId: entry.diffEntryId, kind: entry.kind, reason: entry.overrideReason})
        if (entry.kind === 'ledgerDraft') {
            assertLedgerDraftBinding(entry, cited)
            ledgerDrafts.push({diffEntryId: entry.diffEntryId, ...entry.ledgerDraft})
            appliedLog.push({diffEntryId: entry.diffEntryId, kind: entry.kind})
            continue
        }
        if (entry.kind === 'title') {
            assertTitleBinding(entry, cited)
            titleEntries.push(entry)
            appliedLog.push({diffEntryId: entry.diffEntryId, kind: entry.kind})
            continue
        }
        if (!snapshots.has(entry.targetFragment)) {
            if (!documents.has(entry.targetFragment)) {
                fail('REST_UPSTREAM_APPLY_FRAGMENT_UNKNOWN', `${entry.diffEntryId}: ${entry.targetFragment}`)
            }
            snapshots.set(entry.targetFragment, structuredClone(documents.get(entry.targetFragment)))
        }
        if (cited.fragment && cited.fragment !== entry.targetFragment) {
            fail('REST_UPSTREAM_APPLY_UNBOUND_LOCUS', `${entry.diffEntryId}: drift was reported in ${cited.fragment}, not ${entry.targetFragment}`)
        }
        const exemptions = []
        const entrySubtrees = []
        applyFragmentEntry(documents.get(entry.targetFragment), entry, cited, denylist, normalizations, exemptions, entrySubtrees)
        if (exemptions.length > 0) {
            const list = exemptionsByFile.get(entry.targetFragment) ?? []
            list.push(...exemptions)
            exemptionsByFile.set(entry.targetFragment, list)
        }
        for (const subtree of entrySubtrees) writtenSubtrees.push(subtree)
        appliedLog.push({diffEntryId: entry.diffEntryId, kind: entry.kind, targetFragment: entry.targetFragment, opPath: entry.opPath,
            ...(entry.override ? {override: true, overrideReason: entry.overrideReason} : {})})
    }

    for (const [file, before] of snapshots) {
        assertSkeletonUnchanged(before, documents.get(file), file, exemptionsByFile.get(file) ?? [])
        assertNoInternalFields(before, documents.get(file), denylist, file)
    }
    // Shape gate: whatever a mirror/addition wrote must be type-consistent —
    // the PR #964 monster class (object+items, string+properties) can never
    // reach a fragment.
    for (const subtree of writtenSubtrees) {
        assertSchemaShape(subtree.value, subtree.label)
    }

    const titleResult = applyTitleEntries(titles, titleEntries)
    return {
        documents,
        changedFiles: new Set(snapshots.keys()),
        titles: titleResult.titles,
        appliedLog,
        ledgerDrafts,
        titleLog: titleResult.log,
        overrides,
        normalizations,
    }
}

// Reconcile (design §8.2): every change-set entry must have been applied exactly
// once; applied-log entries must trace back to the change set. Returns the set
// of diff entries left unaddressed (a report, not a failure — deferral is legal).
/*
 * Reconcile every applied write against the change set with the same write key
 * the change-set parser enforces (diff entry, kind, locus): one application per
 * entry, no strays. Drift entries no change-set entry cites come back as the
 * unaddressed remainder for the PR body.
 */
function reconcile(appliedLog, changeSet, diffDocument) {
    const writeKey = entry => `${entry.diffEntryId}|${entry.kind}|${entry.opPath || ''}`
    const changeSetKeys = changeSet.entries.map(writeKey)
    const appliedKeys = appliedLog.map(writeKey)
    for (const key of appliedKeys) {
        if (!changeSetKeys.includes(key)) fail('REST_UPSTREAM_RECONCILE_STRAY', key)
    }
    for (const key of changeSetKeys) {
        if (appliedKeys.filter(candidate => candidate === key).length !== 1) fail('REST_UPSTREAM_RECONCILE_INCOMPLETE', key)
    }
    const citedIds = new Set(changeSet.entries.map(entry => entry.diffEntryId))
    return diffDocument.entries.map(entry => entry.id).filter(id => !citedIds.has(id))
}

function writeCanonicalOutputs({outDir, fragmentsDir, documents, changedFiles, titles}) {
    fs.mkdirSync(outDir, {recursive: true})
    const written = []
    for (const fileName of fs.readdirSync(fragmentsDir).filter(name => name.endsWith('.json')).sort()) {
        const target = path.join(outDir, fileName)
        if (changedFiles.has(fileName)) {
            fs.writeFileSync(target, serializeDocument(documents.get(fileName)))
        } else {
            fs.copyFileSync(path.join(fragmentsDir, fileName), target)
        }
        written.push(fileName)
    }
    if (titles) fs.writeFileSync(path.join(outDir, 'titles.json'), serializeDocument(titles))
    return written
}

module.exports = {applyChangeSet, reconcile, writeCanonicalOutputs, stripMutableLeaves, applyTitleEntries}
