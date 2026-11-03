const {isDeepStrictEqual} = require('node:util')
const {attachLifecycleSuggestion, assertLifecycleSource, parseTrack} = require('./lifecycle')
const {apiProjection, resolveSchemaDeep, droppedLocalFieldPaths, droppedLocalKeys, relaxedRequiredMembers, stripScalarConstraints, overlayOpaque, stripOpaqueMarkers, harvestUpstreamComments} = require('./mirror')

// Branch-aware diff between a pinned upstream spec and the zdoc fragments.
// Truth assignment (2026-10-30 merge model): STRUCTURE follows upstream
// wholesale — any deep API-truth difference in a field (type, shape keys,
// nested fields, constraints, required membership) collapses into ONE
// `schema|mirror` entry carrying the resolved upstream subtree, which the
// assembler merges with local prose and the applier verifies by
// recomputation. The fragments win on documentation design: prose, oneOf/anyOf
// scenario branches (an upstream merged object is the UNION of branch fields,
// deliberate per-branch omissions are silent, and fields that NO branch covers
// become `unattributed` ledger/placement candidates), and doc-owned x-*
// attributes. Prose drift is reported for human harvest, never auto-adopted.
//
// Source-tree sources (design §6, e.g. the milvus data plane) diff in
// structure-only mode: the extracted skeleton carries no prose, no parameters,
// and no response contract, so summary/description/parameter/response
// comparisons are skipped instead of reporting their absence as drift. What
// remains is exactly the code-owned truth: operation presence, deprecation,
// request-body fields, constraints, and required membership.

const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'])
const BRANCH_COMBINATORS = ['oneOf', 'anyOf']
const CONSTRAINT_KEYS = ['type', 'format', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'minLength', 'maxLength', 'pattern', 'minItems', 'maxItems', 'uniqueItems', 'enum', 'default', 'nullable', 'deprecated']

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// API-truth projection of a schema: everything the branch-aware diff compares,
// minus doc-owned keys (x-* authoring attributes and prose). Used to decide
// whether two same-named fragment component variants are interchangeable
// donors for cross-fragment reference resolution.
function apiTruthOf(value) {
    if (Array.isArray(value)) return value.map(apiTruthOf)
    if (!isPlainObject(value)) return value
    return Object.fromEntries(Object.entries(value)
        .filter(([key]) => !key.startsWith('x-') && key !== 'description')
        .map(([key, inner]) => [key, apiTruthOf(inner)]))
}

function normalizeText(text) {
    return String(text).replace(/\s+/g, ' ').trim()
}

function encodePointerToken(token) {
    return String(token).replace(/~/g, '~0').replace(/\//g, '~1')
}

// Resolve a local $ref. Fragment documents may reference components defined in
// a sibling fragment (the publication assembler merges fragments before
// rendering, so cross-fragment refs are sanctioned); when the local walk
// dangles, fall back to the shared merged-components root. Cycles fail closed.
function resolvePointer(document, pointer, shared = null) {
    if (!pointer.startsWith('#/')) fail('REST_UPSTREAM_REF_UNSUPPORTED', pointer)
    const tokens = pointer.slice(2).split('/').map(token => token.replace(/~1/g, '/').replace(/~0/g, '~'))
    const walk = root => {
        let value = root
        for (const token of tokens) {
            if (value === null || typeof value !== 'object') return undefined
            value = Array.isArray(value) ? value[Number(token)] : value[token]
        }
        return value
    }
    const value = walk(document)
    if (value !== undefined) return value
    if (shared) {
        const sharedValue = walk(shared)
        if (sharedValue !== undefined) return sharedValue
    }
    fail('REST_UPSTREAM_REF_DANGLING', pointer)
}

function resolveSchema(document, schema, depth = 0, shared = null) {
    if (!isPlainObject(schema)) return schema
    if (depth > 8) fail('REST_UPSTREAM_REF_CYCLE', 'depth limit exceeded')
    const {$ref, ...siblings} = schema
    if (typeof $ref === 'string') {
        const target = resolvePointer(document, $ref, shared)
        return resolveSchema(document, {...(isPlainObject(target) ? target : {}), ...siblings}, depth + 1, shared)
    }
    if (Array.isArray(schema.allOf)) {
        const merged = {...schema}
        delete merged.allOf
        for (const member of schema.allOf) {
            const resolvedMember = resolveSchema(document, member, depth + 1, shared)
            if (!isPlainObject(resolvedMember)) continue
            for (const [key, value] of Object.entries(resolvedMember)) {
                if (key === 'properties' && isPlainObject(merged.properties) && isPlainObject(value)) {
                    merged.properties = {...value, ...merged.properties}
                } else if (key === 'required' && Array.isArray(merged.required) && Array.isArray(value)) {
                    merged.required = [...new Set([...value, ...merged.required])]
                } else if (!(key in merged)) {
                    merged[key] = value
                }
            }
        }
        return merged
    }
    return schema
}

function branchesOf(document, schema, shared = null) {
    const effective = resolveSchema(document, schema, 0, shared)
    for (const combinator of BRANCH_COMBINATORS) {
        const value = effective[combinator]
        if (Array.isArray(value) && value.filter(isPlainObject).length >= 2) {
            const objects = value.filter(isPlainObject)
            return {
                combinator,
                branches: objects.map(branch => resolveSchema(document, branch, 0, shared)),
                labels: objects.map((branch, index) => (typeof branch['x-tab-label'] === 'string' ? branch['x-tab-label'] : `branch-${index + 1}`)),
            }
        }
    }
    return null
}

function propertiesOf(document, schema, shared = null) {
    const effective = resolveSchema(document, schema, 0, shared)
    const properties = isPlainObject(effective.properties) ? effective.properties : {}
    return Object.fromEntries(Object.entries(properties).map(([name, property]) => [name, resolveSchema(document, property, 0, shared)]))
}

function requiredOf(document, schema, shared = null) {
    const effective = resolveSchema(document, schema, 0, shared)
    return Array.isArray(effective.required) ? effective.required : null
}

function constraintPairs(document, schema, shared = null) {
    const effective = resolveSchema(document, schema, 0, shared)
    return CONSTRAINT_KEYS.filter(key => key in effective).map(key => [key, effective[key]])
}

function indexOperationsFromDocument(document) {
    const operations = new Map()
    for (const [endpoint, pathItem] of Object.entries(document.paths || {})) {
        if (!isPlainObject(pathItem)) continue
        for (const [method, operation] of Object.entries(pathItem)) {
            if (!HTTP_METHODS.has(method) || !isPlainObject(operation)) continue
            operations.set(`${method} ${endpoint}`, {document, operation, endpoint, method})
        }
    }
    return operations
}

function indexFragmentOperations(fragments) {
    const operations = new Map()
    for (const [file, document] of fragments) {
        for (const [opKey, record] of indexOperationsFromDocument(document)) {
            if (!operations.has(opKey)) operations.set(opKey, [])
            operations.get(opKey).push({...record, file})
        }
    }
    return operations
}

// Id layout: category|opKey|fragment|scope|branch|responseStatus|field|changeKind|changeKey.
// fragment and responseStatus are mandatory components: the same field name drifts
// independently per fragment copy and per response status, and every id must stay
// unique because change sets address edits by id.
function entryId(entry) {
    return [
        entry.category, entry.opKey, entry.fragment || '', entry.scope || '', entry.branch || '',
        entry.responseStatus || '', entry.field || '',
        entry.change ? entry.change.kind : '', entry.change && entry.change.key || '',
    ].join('|')
}

function makeEntry(parts) {
    const entry = {...parts}
    entry.id = entryId(entry)
    return entry
}

// The deep view for one mirror candidate: both subtrees resolved against
// their own documents (so nested $ref-vs-inline asymmetries and referenced
// component content are visible to the comparison and the retirement
// walkers), the fragment's content overlaid below opaque boundaries
// (extractor blind spots — generic maps forwarded to gRPC — where the
// fragment's hand-authored documentation is the authority), and the value
// stripped of blind-spot markers so no tooling marker rides into a fragment.
// `fragmentDocument`/`fragmentNode` are null for additions, where no local
// subtree exists yet. A recursive subtree on either side has no finite
// inlined value: the caller flags the entry for human follow-up instead of
// failing the whole diff.
function resolveMirrorSubtree(upstreamDocument, node, fragmentDocument = null, fragmentNode = null) {
    try {
        const resolvedUpstream = resolveSchemaDeep(upstreamDocument, node)
        const resolvedLocal = fragmentDocument ? resolveSchemaDeep(fragmentDocument, fragmentNode) : null
        const comparableUpstream = overlayOpaque(resolvedUpstream, resolvedLocal)
        return {resolvedUpstream, resolvedLocal, comparableUpstream,
            after: stripOpaqueMarkers(comparableUpstream),
            // Grounding evidence (the extractor's captured Go field comments),
            // harvested off the subtree before the marker is stripped: the
            // describe stage reads it at the entry level, fragments never see
            // the key. Empty for comment-less sources so the default diff
            // output stays byte-identical.
            upstreamComments: harvestUpstreamComments(comparableUpstream),
            unresolvableSubtree: false}
    } catch (error) {
        if (!error.message.startsWith('REST_UPSTREAM_MIRROR_REF_CYCLE:')) throw error
        return {after: null, unresolvableSubtree: true}
    }
}

// Design §6.3: data-plane refreshes carry lifecycle suggestions on the diff
// entries so neither the agent nor a human has to invent track values. No-op
// unless a track was supplied (the default diff output stays byte-identical).
function suggestLifecycle(entry, lifecycle, fragmentNode, upstreamNode) {
    if (!lifecycle) return
    attachLifecycleSuggestion(entry, {track: lifecycle.track, fragmentNode: fragmentNode ?? null, upstreamNode: upstreamNode ?? null})
    return entry
}

function includesTarget(operation, publicationTarget) {
    const targets = operation['x-include-target']
    if (!Array.isArray(targets)) return true
    return targets.includes(publicationTarget)
}

function denylisted(ruleset, name) {
    return (ruleset.internalFieldDenylist || []).includes(name)
}

/*
 * Field-level comparison of one schema pair. `context.suppressUpstreamOnlyFields`
 * is set for branch-mode pairs: fields present in the upstream union but missing
 * from THIS branch are deliberate documentation design and stay silent there;
 * union-level coverage gaps are reported once by the caller.
 */
function diffSchemaPair(context) {
    const {upstreamDocument, upstreamSchema, fragmentDocument, fragmentSchema, ruleset, shared} = context
    const entries = []
    const upstreamProperties = propertiesOf(upstreamDocument, upstreamSchema)
    const fragmentProperties = propertiesOf(fragmentDocument, fragmentSchema, shared)
    const upstreamRequired = requiredOf(upstreamDocument, upstreamSchema)
    const fragmentRequired = requiredOf(fragmentDocument, fragmentSchema, shared)

    for (const [name, fragmentProperty] of Object.entries(fragmentProperties)) {
        if (denylisted(ruleset, name)) continue
        const upstreamProperty = upstreamProperties[name]
        if (!upstreamProperty) {
            entries.push(makeEntry({...context.meta, category: 'zdoc-only', scope: context.scope, branch: context.branch, field: name,
                change: {kind: 'field-absent-upstream', before: null, after: null}, evidence: context.upstreamEvidencePath}))
            continue
        }
        // Structure follows upstream: one deep API-truth difference collapses
        // the field into a single mirror entry (resolved upstream subtree plus
        // required-membership truth). The per-leaf constraint/description/
        // required reports below are superseded — the mirror carries the
        // upstream side of all of them, and the assembler keeps the local
        // prose at every node that survives. Structure-only sources (the
        // extractor vocabulary cannot speak to scalar constraints) compare
        // with those keys stripped AND keep the fragment's extrapolated
        // constraints in the merged value — absent upstream there means
        // unseen, not deleted. Opaque upstream nodes (extractor blind spots —
        // generic maps forwarded to gRPC) are wildcards: the fragment's
        // hand-authored content is the authority below them, so the overlay
        // feeds the comparison, the retirement walkers, and the mirror value.
        // The comparison runs on the deep-resolved pair so nested $ref-vs-
        // inline asymmetries don't fabricate drift; only a pair that is
        // shallow-unequal AND too recursive to resolve stays a flagged entry.
        const mirrorPair = resolveMirrorSubtree(upstreamDocument, upstreamProperty, fragmentDocument, fragmentProperty)
        const comparableUpstream = mirrorPair.unresolvableSubtree ? upstreamProperty : mirrorPair.comparableUpstream
        const localView = mirrorPair.unresolvableSubtree ? fragmentProperty : mirrorPair.resolvedLocal
        const mirrorProjection = schema => apiProjection(context.structureOnly ? stripScalarConstraints(schema) : schema)
        if (!isDeepStrictEqual(mirrorProjection(localView), mirrorProjection(comparableUpstream))) {
            const localHadRequired = Array.isArray(fragmentRequired) && fragmentRequired.includes(name)
            const requiredMembership = upstreamRequired === null ? null : upstreamRequired.includes(name)
            // A flagged entry writes nothing (the assembler diverts it to the
            // human-review list), so it retires nothing either: the retirement
            // walkers only run for entries that will actually mirror.
            const droppedLocalFields = mirrorPair.unresolvableSubtree ? [] : [
                ...droppedLocalFieldPaths(comparableUpstream, localView),
                // structure-only keeps these keys, so they are not retired
                ...(context.structureOnly ? [] : droppedLocalKeys(comparableUpstream, localView)),
                // a nested required member the upstream dropped is a relaxation
                ...relaxedRequiredMembers(comparableUpstream, localView),
            ]
            const nestedRelaxation = mirrorPair.unresolvableSubtree ? [] : relaxedRequiredMembers(comparableUpstream, localView)
            const entry = makeEntry({...context.meta, category: 'upstream-modified', scope: context.scope, branch: context.branch, field: name,
                change: {kind: 'schema', key: 'mirror', before: null, after: mirrorPair.unresolvableSubtree ? null : mirrorPair.after},
                ...(mirrorPair.upstreamComments && Object.keys(mirrorPair.upstreamComments).length > 0 ? {upstreamComments: mirrorPair.upstreamComments} : {}),
                requiredMembership,
                ...(mirrorPair.unresolvableSubtree ? {unresolvableSubtree: true} : {}),
                ...(context.structureOnly ? {preserveLocalScalarConstraints: true} : {}),
                droppedLocalFields,
                evidence: context.upstreamEvidencePath,
                // Retiring a fragment-side required member on upstream say-so
                // stays the "suspected generator loss" class (decision 9):
                // mirror applies it only with an explicit override — at the
                // top level and anywhere in the mirrored subtree.
                requiresConfirmation: requiredMembership === false && localHadRequired
                    ? 'required-relaxation'
                    : nestedRelaxation.length > 0
                        ? 'required-relaxation'
                        : undefined})
            suggestLifecycle(entry, context.lifecycle, fragmentProperty, upstreamProperty)
            entries.push(entry)
            continue
        }
        for (const [key, after] of constraintPairs(upstreamDocument, comparableUpstream)) {
            if (isDeepStrictEqual(fragmentProperty[key], after)) continue
            const entry = makeEntry({...context.meta, category: 'upstream-modified', scope: context.scope, branch: context.branch, field: name,
                change: {kind: 'constraint', key, before: fragmentProperty[key] === undefined ? null : fragmentProperty[key], after},
                evidence: context.upstreamEvidencePath})
            suggestLifecycle(entry, context.lifecycle, fragmentProperty, upstreamProperty)
            entries.push(entry)
        }
        for (const key of CONSTRAINT_KEYS) {
            if (key in fragmentProperty && !(key in comparableUpstream)) {
                entries.push(makeEntry({...context.meta, category: 'zdoc-only', scope: context.scope, branch: context.branch, field: name,
                    change: {kind: 'constraint', key, before: fragmentProperty[key], after: null}, evidence: context.upstreamEvidencePath}))
            }
        }
        // Structure-only sources carry no extractable prose (design §6: the
        // fragments win prose), so field descriptions are not comparable.
        if (!context.structureOnly && normalizeText(upstreamProperty.description ?? '') !== normalizeText(fragmentProperty.description ?? '')) {
            entries.push(makeEntry({...context.meta, category: 'upstream-modified', scope: context.scope, branch: context.branch, field: name,
                change: {kind: 'description', before: fragmentProperty.description ?? null, after: upstreamProperty.description ?? null},
                evidence: context.upstreamEvidencePath}))
        }
        const inFragmentRequired = Array.isArray(fragmentRequired) && fragmentRequired.includes(name)
        const inUpstreamRequired = Array.isArray(upstreamRequired) && upstreamRequired.includes(name)
        if (inFragmentRequired !== inUpstreamRequired && upstreamRequired !== null) {
            const entry = makeEntry({...context.meta, category: 'upstream-modified', scope: context.scope, branch: context.branch, field: name,
                change: {kind: 'required', before: inFragmentRequired, after: inUpstreamRequired}, evidence: context.upstreamEvidencePath,
                // Relaxing a fragment-side requirement on upstream say-so is exactly the
                // "suspected generator loss" class (decision 9): never auto-adoptable.
                requiresConfirmation: inUpstreamRequired ? undefined : 'required-relaxation'})
            suggestLifecycle(entry, context.lifecycle, fragmentProperty, upstreamProperty)
            entries.push(entry)
        }
    }

    if (!context.suppressUpstreamOnlyFields) {
        for (const name of Object.keys(upstreamProperties)) {
            if (denylisted(ruleset, name) || name in fragmentProperties) continue
            const addedSubtree = resolveMirrorSubtree(upstreamDocument, upstreamProperties[name])
            const entry = makeEntry({...context.meta, category: 'upstream-added-field', scope: context.scope, branch: context.branch, field: name,
                // The resolved upstream subtree rides the entry: the addition
                // lane (assembler/applier) copies structure from the diff, so
                // no downstream step ever needs the upstream spec again.
                change: {kind: 'field-uncovered', before: null, after: addedSubtree.after},
                ...(addedSubtree.unresolvableSubtree ? {unresolvableSubtree: true} : {}),
                ...(addedSubtree.upstreamComments && Object.keys(addedSubtree.upstreamComments).length > 0 ? {upstreamComments: addedSubtree.upstreamComments} : {}),
                requiredMembership: upstreamRequired === null ? null : upstreamRequired.includes(name),
                evidence: context.upstreamEvidencePath})
            suggestLifecycle(entry, context.lifecycle, null, upstreamProperties[name])
            entries.push(entry)
        }
        if (fragmentRequired !== null && upstreamRequired === null && fragmentRequired.length > 0) {
            entries.push(makeEntry({...context.meta, category: 'upstream-modified', scope: context.scope, branch: context.branch,
                change: {kind: 'required-array-missing-upstream', before: fragmentRequired, after: null}, evidence: context.upstreamEvidencePath,
                requiresConfirmation: 'required-array'}))
        }
    }
    return entries
}

function overlapScore(fragmentProperties, upstreamProperties) {
    const fragmentNames = new Set(Object.keys(fragmentProperties))
    const upstreamNames = new Set(Object.keys(upstreamProperties))
    if (fragmentNames.size === 0 && upstreamNames.size === 0) return 0
    let shared = 0
    for (const name of fragmentNames) if (upstreamNames.has(name)) shared++
    return shared / (fragmentNames.size + upstreamNames.size - shared)
}

/*
 * Shared comparison for request/response bodies. When the fragment side is
 * scenario-branched, the upstream union is compared per branch (deliberate
 * branch omissions stay silent) and union-level gaps become either
 * `unattributed` (request body: ledger candidates) or `upstream-added-field`
 * (responses: structural lane), once per field.
 */
function diffBodied(context, fragmentContent, upstreamContent, scope) {
    const {upstreamDocument, fragmentDocument, ruleset, shared} = context
    if (!isPlainObject(fragmentContent.schema)) return []
    if (!upstreamContent || !isPlainObject(upstreamContent.schema)) {
        return [makeEntry({...context.meta, category: 'upstream-modified', scope,
            change: {kind: 'body-schema-absent-upstream', before: 'present', after: null}, evidence: context.upstreamEvidencePath})]
    }

    const fragmentBranches = branchesOf(fragmentDocument, fragmentContent.schema, shared)
    if (!fragmentBranches) {
        return diffSchemaPair({...context, fragmentSchema: fragmentContent.schema, upstreamSchema: upstreamContent.schema, scope})
    }

    const upstreamBranches = branchesOf(upstreamDocument, upstreamContent.schema)
    const upstreamUnionProperties = {}
    for (const branch of upstreamBranches ? upstreamBranches.branches : [upstreamContent.schema]) {
        Object.assign(upstreamUnionProperties, propertiesOf(upstreamDocument, branch))
    }
    const upstreamUnionRequired = upstreamBranches ? null : requiredOf(upstreamDocument, upstreamContent.schema)
    const upstreamUnionSchema = {type: 'object', properties: upstreamUnionProperties, required: upstreamUnionRequired}

    const entries = []
    const coveredNames = new Set()
    for (let index = 0; index < fragmentBranches.branches.length; index++) {
        const branchProperties = propertiesOf(fragmentDocument, fragmentBranches.branches[index], shared)
        for (const name of Object.keys(branchProperties)) coveredNames.add(name)
        entries.push(...diffSchemaPair({
            ...context,
            fragmentSchema: fragmentBranches.branches[index],
            upstreamSchema: upstreamUnionSchema,
            branch: fragmentBranches.labels[index],
            scope,
            suppressUpstreamOnlyFields: true,
        }))
    }

    const uncoveredCategory = scope === 'requestBody' ? 'unattributed' : 'upstream-added-field'
    for (const name of Object.keys(upstreamUnionProperties)) {
        if (denylisted(ruleset, name) || coveredNames.has(name)) continue
        const addedSubtree = resolveMirrorSubtree(upstreamDocument, upstreamUnionProperties[name])
        const entry = makeEntry({...context.meta, category: uncoveredCategory, scope, field: name,
            change: {kind: 'field-uncovered', before: null, after: addedSubtree.after},
            ...(addedSubtree.unresolvableSubtree ? {unresolvableSubtree: true} : {}),
            ...(addedSubtree.upstreamComments && Object.keys(addedSubtree.upstreamComments).length > 0 ? {upstreamComments: addedSubtree.upstreamComments} : {}),
            requiredMembership: upstreamUnionRequired === null ? null : upstreamUnionRequired.includes(name),
            evidence: context.upstreamEvidencePath})
        if (uncoveredCategory === 'upstream-added-field') suggestLifecycle(entry, context.lifecycle, null, upstreamUnionProperties[name])
        entries.push(entry)
    }
    if (scope === 'requestBody' && upstreamUnionRequired === null
        && fragmentBranches.branches.some(branch => (requiredOf(fragmentDocument, branch, shared) || []).length > 0)) {
        entries.push(makeEntry({...context.meta, category: 'upstream-modified', scope,
            change: {kind: 'required-array-missing-upstream', before: 'per-branch required arrays', after: null},
            evidence: context.upstreamEvidencePath, requiresConfirmation: 'required-array'}))
    }
    return entries
}

function diffRequestBody(context) {
    const {upstreamDocument, upstreamOperation, fragmentDocument, fragmentOperation} = context
    const fragmentBody = fragmentOperation.requestBody
    if (!fragmentBody) return []
    if (!upstreamOperation.requestBody) {
        return [makeEntry({...context.meta, category: 'zdoc-only', scope: 'requestBody',
            change: {kind: 'request-body-absent-upstream', before: null, after: null}, evidence: context.upstreamEvidencePath})]
    }
    const fragmentContent = isPlainObject(fragmentBody.content) ? fragmentBody.content['application/json'] : null
    const upstreamContent = isPlainObject(upstreamOperation.requestBody.content) ? upstreamOperation.requestBody.content['application/json'] : null
    if (!fragmentContent) return []
    if (!upstreamContent) {
        return [makeEntry({...context.meta, category: 'upstream-modified', scope: 'requestBody',
            change: {kind: 'body-media-absent-upstream', before: 'application/json', after: null}, evidence: context.upstreamEvidencePath})]
    }
    return diffBodied(context, fragmentContent, upstreamContent, 'requestBody')
}

function diffResponses(context) {
    const {upstreamDocument, upstreamOperation, fragmentDocument, fragmentOperation, shared} = context
    const entries = []
    const fragmentResponses = isPlainObject(fragmentOperation.responses) ? fragmentOperation.responses : {}
    const upstreamResponses = isPlainObject(upstreamOperation.responses) ? upstreamOperation.responses : {}
    for (const [status, fragmentResponse] of Object.entries(fragmentResponses)) {
        if (!isPlainObject(fragmentResponse)) continue
        // Every response-scoped entry carries its status so ids stay unique across 200/4xx shapes.
        const statusContext = {...context, meta: {...context.meta, responseStatus: status}}
        const upstreamResponse = upstreamResponses[status]
        if (!isPlainObject(upstreamResponse)) {
            entries.push(makeEntry({...statusContext.meta, category: 'zdoc-only', scope: 'response', field: status,
                change: {kind: 'response-absent-upstream', before: null, after: null}, evidence: context.upstreamEvidencePath}))
            continue
        }
        const fragmentContent = isPlainObject(fragmentResponse.content) ? fragmentResponse.content['application/json'] : null
        const upstreamContent = isPlainObject(upstreamResponse.content) ? upstreamResponse.content['application/json'] : null
        if (!fragmentContent) continue
        if (!upstreamContent) {
            entries.push(makeEntry({...statusContext.meta, category: 'upstream-modified', scope: 'response', field: status,
                change: {kind: 'body-media-absent-upstream', before: 'application/json', after: null}, evidence: context.upstreamEvidencePath}))
            continue
        }
        const fragmentBranches = branchesOf(fragmentDocument, fragmentContent.schema, shared)
        if (fragmentBranches) {
            // Match the upstream shape to the branch it most overlaps; the remaining
            // tabs (e.g. failure shapes) are preserved untouched.
            const upstreamProperties = propertiesOf(upstreamDocument, upstreamContent.schema)
            const upstreamRequired = requiredOf(upstreamDocument, upstreamContent.schema)
            let best = -1
            let bestScore = -1
            fragmentBranches.branches.forEach((branch, index) => {
                const score = overlapScore(propertiesOf(fragmentDocument, branch, shared), upstreamProperties)
                if (score > bestScore) {
                    bestScore = score
                    best = index
                }
            })
            if (best >= 0) {
                entries.push(...diffSchemaPair({...statusContext, fragmentSchema: fragmentBranches.branches[best],
                    upstreamSchema: upstreamContent.schema, branch: fragmentBranches.labels[best],
                    scope: 'response', suppressUpstreamOnlyFields: true}))
            }
            const coveredNames = new Set()
            for (const branch of fragmentBranches.branches) {
                for (const name of Object.keys(propertiesOf(fragmentDocument, branch, shared))) coveredNames.add(name)
            }
            for (const name of Object.keys(upstreamProperties)) {
                if (denylisted(context.ruleset, name) || coveredNames.has(name)) continue
                const addedSubtree = resolveMirrorSubtree(upstreamDocument, upstreamProperties[name])
                const entry = makeEntry({...statusContext.meta, category: 'upstream-added-field', scope: 'response', field: name,
                    change: {kind: 'field-uncovered', before: null, after: addedSubtree.after},
                    ...(addedSubtree.unresolvableSubtree ? {unresolvableSubtree: true} : {}),
                    ...(addedSubtree.upstreamComments && Object.keys(addedSubtree.upstreamComments).length > 0 ? {upstreamComments: addedSubtree.upstreamComments} : {}),
                    requiredMembership: upstreamRequired === null ? null : upstreamRequired.includes(name),
                    evidence: context.upstreamEvidencePath})
                suggestLifecycle(entry, context.lifecycle, null, upstreamProperties[name])
                entries.push(entry)
            }
            continue
        }
        entries.push(...diffBodied(statusContext, fragmentContent, upstreamContent, 'response'))
    }
    return entries
}

function diffParameters(context) {
    const {upstreamDocument, upstreamOperation, fragmentDocument, fragmentOperation, meta, upstreamEvidencePath, ruleset, shared} = context
    const entries = []
    // Fragments may reference shared parameter components ($ref); resolve them
    // so name/in comparisons see the referenced definition.
    const unwrap = (document, parameter, fallback = null) => {
        if (!isPlainObject(parameter) || typeof parameter.$ref !== 'string') return parameter
        const target = resolvePointer(document, parameter.$ref, fallback)
        return isPlainObject(target) ? {...target} : parameter
    }
    const fragmentParams = (fragmentOperation.parameters || []).filter(isPlainObject).map(parameter => unwrap(fragmentDocument, parameter, shared))
    const upstreamParams = (upstreamOperation.parameters || []).filter(isPlainObject).map(parameter => unwrap(upstreamDocument, parameter))
    const fragmentIndex = new Map()
    for (const parameter of fragmentParams) {
        const key = `${parameter.name}:${parameter.in}`
        if (!fragmentIndex.has(key)) fragmentIndex.set(key, [])
        fragmentIndex.get(key).push(parameter)
    }
    for (const upstreamParameter of upstreamParams) {
        if (denylisted(ruleset, upstreamParameter.name)) continue
        const key = `${upstreamParameter.name}:${upstreamParameter.in}`
        const matches = fragmentIndex.get(key) || []
        if (matches.length === 0) {
            const entry = makeEntry({...meta, category: 'upstream-added-param', scope: 'parameter', field: key,
                change: {kind: 'param-uncovered', before: null, after: structuredClone(upstreamParameter)}, evidence: upstreamEvidencePath})
            suggestLifecycle(entry, context.lifecycle, null, upstreamParameter)
            entries.push(entry)
            continue
        }
        for (const [index, fragmentParameter] of matches.entries()) {
            // Fragments may document one parameter several times (e.g. two Authorization
            // headers gated by x-base-url-target); the copy index keeps entry ids unique.
            const copyIndex = matches.length > 1 ? index : undefined
            const field = copyIndex === undefined ? key : `${key}#${copyIndex}`
            if (Boolean(fragmentParameter.required) !== Boolean(upstreamParameter.required)) {
                const entry = makeEntry({...meta, category: 'upstream-modified', scope: 'parameter', field,
                    change: {kind: 'required', before: Boolean(fragmentParameter.required), after: Boolean(upstreamParameter.required)},
                    evidence: upstreamEvidencePath, copyIndex,
                    requiresConfirmation: upstreamParameter.required ? undefined : 'required-relaxation'})
                suggestLifecycle(entry, context.lifecycle, fragmentParameter, upstreamParameter)
                entries.push(entry)
            }
            if (normalizeText(upstreamParameter.description ?? '') !== normalizeText(fragmentParameter.description ?? '')) {
                entries.push(makeEntry({...meta, category: 'upstream-modified', scope: 'parameter', field,
                    change: {kind: 'description', before: fragmentParameter.description ?? null, after: upstreamParameter.description ?? null},
                    evidence: upstreamEvidencePath, copyIndex}))
            }
        }
    }
    const reportedAbsent = new Set()
    for (const fragmentParameter of fragmentParams) {
        if (denylisted(ruleset, fragmentParameter.name)) continue
        const key = `${fragmentParameter.name}:${fragmentParameter.in}`
        if (reportedAbsent.has(key)) continue
        if (upstreamParams.some(parameter => `${parameter.name}:${parameter.in}` === key)) continue
        reportedAbsent.add(key)
        entries.push(makeEntry({...meta, category: 'zdoc-only', scope: 'parameter', field: key,
            change: {kind: 'param-absent-upstream', before: null, after: null}, evidence: upstreamEvidencePath}))
    }
    return entries
}

function diffOperationPair(context) {
    const {upstreamOperation, fragmentOperation} = context
    const entries = []
    if (!context.structureOnly && normalizeText(upstreamOperation.summary ?? '') !== normalizeText(fragmentOperation.summary ?? '')) {
        entries.push(makeEntry({...context.meta, category: 'upstream-modified', scope: 'operation',
            change: {kind: 'summary', before: fragmentOperation.summary ?? null, after: upstreamOperation.summary ?? null},
            evidence: context.upstreamEvidencePath}))
    }
    if (!context.structureOnly && normalizeText(upstreamOperation.description ?? '') !== normalizeText(fragmentOperation.description ?? '')) {
        entries.push(makeEntry({...context.meta, category: 'upstream-modified', scope: 'operation',
            change: {kind: 'description', before: fragmentOperation.description ?? null, after: upstreamOperation.description ?? null},
            evidence: context.upstreamEvidencePath}))
    }
    if (Boolean(fragmentOperation.deprecated) !== Boolean(upstreamOperation.deprecated)) {
        const entry = makeEntry({...context.meta, category: 'upstream-modified', scope: 'operation',
            change: {kind: 'deprecated', before: Boolean(fragmentOperation.deprecated), after: Boolean(upstreamOperation.deprecated)},
            evidence: context.upstreamEvidencePath})
        suggestLifecycle(entry, context.lifecycle, fragmentOperation, upstreamOperation)
        entries.push(entry)
    }
    // Structure-only sources carry no parameters and no response contract;
    // those comparisons are skipped before they can report absence as drift.
    if (!context.structureOnly) entries.push(...diffParameters(context))
    entries.push(...diffRequestBody(context))
    if (!context.structureOnly) entries.push(...diffResponses(context))
    return entries
}

/*
 * diffSpecifications({source, upstreamPin, upstream, fragments, ledger, ruleset, fragmentSurfaces}) ->
 * {schemaVersion, source, upstreamPin, publicationTarget, summary, entries}
 * Deterministic: same inputs -> byte-identical output (no timestamps).
 *
 * Operations that exist upstream are compared wherever a fragment documents
 * them, regardless of the fragment's api surface (the control-plane spec covers
 * import jobs that live in a data-plane fragment). `fragment-only` is only
 * reported for fragments on the source's own api surface: a data-plane
 * fragment missing from the control-plane spec is expected, not drift. When
 * `fragmentSurfaces` is supplied every fragment must be classified.
 */
function diffSpecifications({source, upstreamPin, upstream, fragments, ledger, ruleset, fragmentSurfaces = null, lifecycleTrack = null}) {
    if (!isPlainObject(ruleset) || !Array.isArray(ruleset.internalFieldDenylist)) {
        fail('REST_UPSTREAM_RULESET_INVALID', 'ruleset.internalFieldDenylist is required')
    }
    let lifecycle = null
    if (lifecycleTrack) {
        parseTrack(lifecycleTrack)
        assertLifecycleSource(source)
        lifecycle = {track: lifecycleTrack}
    }
    if (fragmentSurfaces) {
        for (const file of fragments.keys()) {
            if (!fragmentSurfaces.has(file)) fail('REST_UPSTREAM_FRAGMENT_SURFACE_UNKNOWN', `${file} is not classified in fragment-migration.json`)
        }
    }
    const onSourceSurface = file => !fragmentSurfaces || fragmentSurfaces.get(file) === source.apiSurface
    const structureOnly = source.artifact?.kind === 'source-tree'
    // Fragment documents may reference components defined in a sibling
    // fragment; the publication assembler merges fragments before rendering,
    // so the diff resolves dangling refs through a merged view of its own.
    // The publication tree knowingly carries per-fragment variants of a
    // component that differ only in doc-owned attributes (x-tab-label,
    // x-i18n, descriptions). This merged view is a close approximation of the
    // assembler, not a mirror: it tolerates API-truth-equivalent variants and
    // keeps the first definition in fragment file order as the donor, while
    // the assembler merges by service id order and fails closed on ANY byte
    // difference. Definitions that differ in API truth fail closed here too.
    const sharedSchemas = {}
    for (const [file, document] of fragments) {
        for (const [name, schema] of Object.entries(document.components?.schemas ?? {})) {
            if (name in sharedSchemas) {
                if (isDeepStrictEqual(sharedSchemas[name], schema)) continue
                if (!isDeepStrictEqual(apiTruthOf(sharedSchemas[name]), apiTruthOf(schema))) {
                    fail('REST_UPSTREAM_SHARED_SCHEMA_CONFLICT', `${name} differs in API truth across fragments (seen in ${file})`)
                }
            } else {
                sharedSchemas[name] = schema
            }
        }
    }
    const shared = {components: {schemas: sharedSchemas}}
    const upstreamOps = indexOperationsFromDocument(upstream)
    const fragmentOps = indexFragmentOperations(fragments)
    const entries = []

    for (const opKey of [...upstreamOps.keys()].sort()) {
        const upstreamRecord = upstreamOps.get(opKey)
        const meta = {opKey, fragment: undefined}
        const upstreamEvidencePath = `/paths/${encodePointerToken(upstreamRecord.endpoint)}/${upstreamRecord.method}`
        if (!fragmentOps.has(opKey)) {
            const ledgerEntry = ledger.entries.find(candidate => candidate.source === source.id && candidate.opKey === opKey)
            const entry = makeEntry({...meta, category: 'upstream-added', scope: 'operation',
                change: {kind: 'operation-absent-in-fragments', before: null, after: null}, evidence: upstreamEvidencePath,
                ledgerStatus: ledgerEntry ? 'classified' : 'pending'})
            suggestLifecycle(entry, lifecycle, null, upstreamRecord.operation)
            entries.push(entry)
            continue
        }
        for (const fragmentRecord of fragmentOps.get(opKey)) {
            entries.push(...diffOperationPair({
                meta: {...meta, fragment: fragmentRecord.file},
                upstreamDocument: upstreamRecord.document,
                upstreamOperation: upstreamRecord.operation,
                fragmentDocument: fragmentRecord.document,
                fragmentOperation: fragmentRecord.operation,
                upstreamEvidencePath,
                ruleset,
                structureOnly,
                shared,
                lifecycle,
            }))
        }
    }

    for (const opKey of [...fragmentOps.keys()].sort()) {
        if (upstreamOps.has(opKey)) continue
        for (const fragmentRecord of fragmentOps.get(opKey)) {
            if (!onSourceSurface(fragmentRecord.file)) continue
            if (!includesTarget(fragmentRecord.operation, source.publicationTarget)) continue
            const ledgerEntry = ledger.entries.find(candidate => candidate.source === source.id && candidate.opKey === opKey)
            entries.push(makeEntry({opKey, fragment: fragmentRecord.file, category: 'fragment-only', scope: 'operation',
                change: {kind: 'operation-absent-upstream', before: null, after: null},
                evidence: `fragment ${fragmentRecord.file}`,
                ledgerStatus: ledgerEntry ? 'classified' : 'pending'}))
        }
    }

    entries.sort((left, right) => (left.id < right.id ? -1 : left.id > right.id ? 1 : 0))
    flagTemplateProse(entries)
    const summary = {}
    for (const entry of entries) summary[entry.category] = (summary[entry.category] || 0) + 1
    return {
        schemaVersion: '1.0',
        source: source.id,
        publicationTarget: source.publicationTarget,
        upstreamPin,
        summary,
        entries,
    }
}

// Prose that upstream repeats verbatim across many fields is shared template
// copy (e.g. the "$ref payload" wording on merged response schemas), not
// per-endpoint information. It is flagged so the candidate list skips it and
// the PR review list labels it — the description lane never auto-adopts, so
// this only shapes the noise the human reviewer sees.
const TEMPLATE_PROSE_MIN_SITES = 3

function flagTemplateProse(entries) {
    const sitesByProse = new Map()
    for (const entry of entries) {
        if (entry.category !== 'upstream-modified' || entry.change?.kind !== 'description' || !entry.field) continue
        const text = normalizeText(entry.change.after ?? '')
        if (!text) continue
        const site = `${entry.opKey}|${entry.field}`
        if (!sitesByProse.has(text)) sitesByProse.set(text, new Set())
        sitesByProse.get(text).add(site)
    }
    for (const entry of entries) {
        if (entry.category !== 'upstream-modified' || entry.change?.kind !== 'description' || !entry.field) continue
        const text = normalizeText(entry.change.after ?? '')
        const sites = sitesByProse.get(text)
        if (sites && sites.size >= TEMPLATE_PROSE_MIN_SITES) entry.templateProse = true
    }
}

module.exports = {
    diffSpecifications,
    branchesOf,
    resolveSchema,
    propertiesOf,
    requiredOf,
    includesTarget,
    encodePointerToken,
    HTTP_METHODS,
}
