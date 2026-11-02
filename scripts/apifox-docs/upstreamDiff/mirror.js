// Structure-mirror support for the 2026-10-30 merge model (design:
// tmp/2026-10-30-pr964-review-and-refresh-policy-fix.md): structure follows the
// upstream spec wholesale, prose follows the fragments. One implementation is
// shared by all three consumers so the merge is computed exactly once and can
// be VERIFIED BY RECOMPUTATION:
//   - diff.js   embeds the deep-resolved upstream subtree on mirror/added-field
//               entries (change.after) so no downstream step needs the spec
//   - assembler.js merges fragment prose into that subtree (the change-set value)
//   - applier.js  recomputes the same merge from the live fragment and fails
//                 closed unless the submitted value matches it exactly

const {isDeepStrictEqual} = require('node:util')

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Doc-owned keys: the fragment side wins these wherever a matching node exists.
// Everything else in a mirrored subtree is upstream API truth.
const DOC_OWNED_KEYS = new Set(['description', 'example', 'summary'])
const isDocOwnedKey = key => DOC_OWNED_KEYS.has(key) || key.startsWith('x-')

// Opaque containers (the Go extractor's x-milvus-opaque marker) are extractor
// blind spots: generic maps forward their entries to gRPC verbatim (params.
// enableDynamicField, elementTypeParams.max_length) and interface{}/
// json.RawMessage accept arbitrary JSON, so the skeleton asserts nothing
// about their content. The fragment's hand-authored documentation is the
// authority below an opaque node — a mirror must never retire it as
// upstream-deleted. overlayOpaque substitutes the local subtree wherever the
// upstream is blind: comparisons see equal content below the boundary, the
// retirement walkers stop there, and produced mirror values carry the local
// documentation. Subtree positions the local side does not have keep the
// upstream shape (the marker is stripped before a value rides into a
// fragment).
const OPAQUE_KEY = 'x-milvus-opaque'

function overlayOpaque(upstreamNode, localNode) {
    if (Array.isArray(upstreamNode)) {
        return upstreamNode.map((member, index) => overlayOpaque(member, Array.isArray(localNode) ? localNode[index] : undefined))
    }
    if (!isPlainObject(upstreamNode)) return upstreamNode
    if (upstreamNode[OPAQUE_KEY] === true) {
        return isPlainObject(localNode) ? structuredClone(localNode) : structuredClone(upstreamNode)
    }
    const result = {}
    for (const [key, child] of Object.entries(upstreamNode)) {
        if (key === 'properties' && isPlainObject(child)) {
            const localProperties = isPlainObject(localNode?.properties) ? localNode.properties : {}
            result[key] = Object.fromEntries(Object.entries(child).map(([name, property]) => [name, overlayOpaque(property, localProperties[name])]))
        } else if ((key === 'items' || key === 'additionalProperties') && isPlainObject(child)) {
            const localChild = isPlainObject(localNode?.[key]) ? localNode[key] : undefined
            result[key] = overlayOpaque(child, localChild)
        } else if ((key === 'oneOf' || key === 'anyOf' || key === 'prefixItems' || key === 'allOf') && Array.isArray(child)) {
            const localMembers = Array.isArray(localNode?.[key]) ? localNode[key] : []
            result[key] = child.map((member, index) => overlayOpaque(member, localMembers[index]))
        } else {
            result[key] = child
        }
    }
    return result
}

function stripOpaqueMarkers(node) {
    if (Array.isArray(node)) return node.map(stripOpaqueMarkers)
    if (!isPlainObject(node)) return node
    const result = {}
    for (const [key, child] of Object.entries(node)) {
        if (key === OPAQUE_KEY) continue
        result[key] = stripOpaqueMarkers(child)
    }
    return result
}

// API-truth projection: the subtree with every doc-owned key stripped at every
// depth. Two properties with equal projections carry identical structure and
// constraints; any difference (a type, a nested items/properties swap, a new
// nested field, a required member) is structural and must mirror.
function apiProjection(value) {
    if (Array.isArray(value)) return value.map(apiProjection)
    if (!isPlainObject(value)) return value
    const result = {}
    for (const [key, child] of Object.entries(value)) {
        if (isDocOwnedKey(key)) continue
        result[key] = apiProjection(child)
    }
    return result
}

// Deep-resolve $ref (and allOf merges) at every node of a subtree so a mirror
// value is self-contained: it must survive copy into a fragment without
// dragging upstream component references along. Recursive upstream shapes
// (self-referential components — milvus nested struct fields, sub-aggregations)
// have no finite inlined form, so a reference that re-enters its own resolution
// path fails closed deterministically; the depth limit stays as the backstop
// for pathological finite chains.
function resolveSchemaDeep(document, schema, depth = 0, resolving = new Set()) {
    if (depth > 16) fail('REST_UPSTREAM_MIRROR_REF_CYCLE', 'mirror subtree exceeds the reference depth limit')
    if (Array.isArray(schema)) return schema.map(item => resolveSchemaDeep(document, item, depth + 1, resolving))
    if (!isPlainObject(schema)) return schema
    let effective = schema
    let onPath = false
    if (typeof schema.$ref === 'string') {
        if (!schema.$ref.startsWith('#/')) fail('REST_UPSTREAM_MIRROR_REF_UNSUPPORTED', schema.$ref)
        if (resolving.has(schema.$ref)) fail('REST_UPSTREAM_MIRROR_REF_CYCLE', `recursive reference ${schema.$ref} cannot be inlined into a self-contained mirror value`)
        let target = document
        for (const token of schema.$ref.slice(2).split('/').map(token => token.replace(/~1/g, '/').replace(/~0/g, '~'))) {
            target = target === null || typeof target !== 'object' ? undefined : Array.isArray(target) ? target[Number(token)] : target[token]
        }
        if (target === undefined) fail('REST_UPSTREAM_MIRROR_REF_DANGLING', schema.$ref)
        const {$ref, ...siblings} = schema
        effective = {...(isPlainObject(target) ? target : {}), ...siblings}
        resolving.add(schema.$ref)
        onPath = true
    }
    try {
        if (Array.isArray(effective.allOf)) {
            const merged = {...effective}
            delete merged.allOf
            for (const member of effective.allOf) {
                const resolvedMember = resolveSchemaDeep(document, member, depth + 1, resolving)
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
            effective = merged
        }
        const result = {}
        for (const [key, child] of Object.entries(effective)) {
            if (key === 'allOf') continue
            if (key === 'properties' && isPlainObject(child)) {
                result[key] = Object.fromEntries(Object.entries(child).map(([name, property]) => [name, resolveSchemaDeep(document, property, depth + 1, resolving)]))
            } else if ((key === 'items' || key === 'additionalProperties') && isPlainObject(child)) {
                result[key] = resolveSchemaDeep(document, child, depth + 1, resolving)
            } else if ((key === 'oneOf' || key === 'anyOf' || key === 'prefixItems') && Array.isArray(child)) {
                result[key] = child.map(member => resolveSchemaDeep(document, member, depth + 1, resolving))
            } else {
                result[key] = child
            }
        }
        return result
    } finally {
        if (onPath) resolving.delete(schema.$ref)
    }
}

// The mirror merge: upstream structure with the fragment's doc-owned keys
// preserved at every node that still exists on both sides (matched by property
// name through properties, positionally through items/oneOf/anyOf). Nodes that
// only exist upstream keep the upstream prose (and any upstream x-i18n); nodes
// that only exist locally are dropped by construction (the diff reports them
// as droppedLocalFields).
function mergeMirrorProse(upstreamNode, localNode, options = {}) {
    if (Array.isArray(upstreamNode)) {
        return upstreamNode.map((member, index) => mergeMirrorProse(member, Array.isArray(localNode) ? localNode[index] : undefined, options))
    }
    if (!isPlainObject(upstreamNode)) return upstreamNode
    const local = isPlainObject(localNode) ? localNode : {}
    const result = {}
    for (const [key, child] of Object.entries(upstreamNode)) {
        if (isDocOwnedKey(key) && key in local && local[key] !== undefined) {
            result[key] = local[key]
            continue
        }
        if (key === 'properties' && isPlainObject(child)) {
            const localProperties = isPlainObject(local.properties) ? local.properties : {}
            result[key] = Object.fromEntries(Object.entries(child).map(([name, property]) => [name, mergeMirrorProse(property, localProperties[name], options)]))
            continue
        }
        if (key === 'items' && isPlainObject(child)) {
            result[key] = mergeMirrorProse(child, isPlainObject(local.items) ? local.items : undefined, options)
            continue
        }
        if ((key === 'oneOf' || key === 'anyOf') && Array.isArray(child)) {
            const localMembers = Array.isArray(local[key]) ? local[key] : []
            result[key] = child.map((member, index) => {
                const localMember = localMembers[index]
                const label = typeof member?.['x-tab-label'] === 'string'
                    ? member['x-tab-label']
                    : null
                const localByLabel = label === null ? null : localMembers.find(candidate => isPlainObject(candidate) && candidate['x-tab-label'] === label)
                return mergeMirrorProse(member, localByLabel ?? localMember, options)
            })
            continue
        }
        result[key] = child
    }
    // Local-only doc keys on a surviving node (e.g. x-admonition the upstream
    // lacks) must not silently disappear with the mirrored structure.
    for (const [key, value] of Object.entries(local)) {
        if (key in result) continue
        if (isDocOwnedKey(key)) {
            result[key] = value
            continue
        }
        // Structure-only sources cannot see scalar constraints (the extractor
        // vocabulary has no maxLength/enum/...), so "absent upstream" there
        // means unseen, not deleted: keep the fragment's extrapolated values.
        if (options.preserveLocalScalarConstraints && key !== 'type' && SCALAR_CONSTRAINT_KEYS.has(key)) {
            result[key] = value
        }
    }
    return result
}

// Property-name paths that exist in the local subtree but not upstream — the
// content a mirror retires, for the deletion-review list. Name-based: array
// members and unnamed slots have nothing to report.
function droppedLocalFieldPaths(upstreamNode, localNode, prefix = '') {
    const dropped = []
    const walk = (upstream, local, path) => {
        if (!isPlainObject(local)) return
        if (!isPlainObject(upstream)) {
            if (path) dropped.push(path)
            return
        }
        if (isPlainObject(local.properties)) {
            const upstreamNames = new Set(Object.keys(isPlainObject(upstream.properties) ? upstream.properties : {}))
            for (const [name, child] of Object.entries(local.properties)) {
                const childPath = path ? `${path}.${name}` : name
                if (!upstreamNames.has(name)) {
                    dropped.push(childPath)
                    continue
                }
                walk(upstream.properties[name], child, childPath)
            }
        }
        if (isPlainObject(local.items)) walk(upstream.items ?? {}, local.items, path)
        for (const combinator of ['oneOf', 'anyOf']) {
            if (!Array.isArray(local[combinator])) continue
            const upstreamMembers = Array.isArray(upstream[combinator]) ? upstream[combinator] : []
            local[combinator].forEach((member, index) => walk(upstreamMembers[index] ?? {}, member, path))
        }
    }
    walk(upstreamNode, localNode, prefix)
    return dropped
}

// Scalar constraint keys the upstream subtree lacks where the local subtree has
// them — mirrored fields retire these too (the merge keeps only doc-owned
// local keys), so they ride the same deletion-review list as retired fields.
// `example` is NOT here: it is a doc-owned key the merge always preserves.
const SCALAR_CONSTRAINT_KEYS = new Set([
    'format', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'minLength',
    'maxLength', 'pattern', 'minItems', 'maxItems', 'uniqueItems', 'enum', 'default',
    'nullable', 'deprecated',
])

function droppedLocalKeys(upstreamNode, localNode, prefix = '') {
    const dropped = []
    const walk = (upstream, local, path) => {
        if (!isPlainObject(local)) return
        if (!isPlainObject(upstream)) return
        for (const key of SCALAR_CONSTRAINT_KEYS) {
            if (key in local && !(key in upstream)) dropped.push(path ? `${path}(${key})` : key)
        }
        if (isPlainObject(local.properties) && isPlainObject(upstream.properties)) {
            for (const [name, child] of Object.entries(local.properties)) {
                if (!isPlainObject(upstream.properties[name])) continue
                walk(upstream.properties[name], child, path ? `${path}.${name}` : name)
            }
        }
        if (isPlainObject(local.items) && isPlainObject(upstream.items)) walk(upstream.items, local.items, `${path}[]`)
        for (const combinator of ['oneOf', 'anyOf']) {
            if (!Array.isArray(local[combinator]) || !Array.isArray(upstream[combinator])) continue
            local[combinator].forEach((member, index) => {
                if (isPlainObject(upstream[combinator][index])) walk(upstream[combinator][index], member, `${path}/${index}`)
            })
        }
    }
    walk(upstreamNode, localNode, prefix)
    return dropped
}

// Required members the local subtree requires at NESTED nodes that the upstream
// subtree does not — a mirror would silently relax them (decision 9's
// suspected-generator-loss class). The top-level membership is handled by the
// diff's requiredMembership; this walker covers everything beneath it.
function relaxedRequiredMembers(upstreamNode, localNode, prefix = '') {
    const relaxed = []
    const walk = (upstream, local, path) => {
        if (!isPlainObject(local) || !isPlainObject(upstream)) return
        if (Array.isArray(local.required)) {
            const upstreamMembers = Array.isArray(upstream.required) ? upstream.required : []
            for (const member of local.required) {
                if (typeof member === 'string' && !upstreamMembers.includes(member)) {
                    relaxed.push(path ? `${path}(${member})` : member)
                }
            }
        }
        if (isPlainObject(local.properties) && isPlainObject(upstream.properties)) {
            for (const [name, child] of Object.entries(local.properties)) {
                if (!isPlainObject(upstream.properties[name])) continue
                walk(upstream.properties[name], child, path ? `${path}.${name}` : name)
            }
        }
        if (isPlainObject(local.items) && isPlainObject(upstream.items)) walk(upstream.items, local.items, `${path}[]`)
        for (const combinator of ['oneOf', 'anyOf']) {
            if (!Array.isArray(local[combinator]) || !Array.isArray(upstream[combinator])) continue
            local[combinator].forEach((member, index) => {
                if (isPlainObject(upstream[combinator][index])) walk(upstream[combinator][index], member, `${path}/${index}`)
            })
        }
    }
    walk(upstreamNode, localNode, prefix)
    return relaxed
}

// The applier recomputes the merge from the live fragment and requires the
// change-set value to match it exactly — with ONE sanctioned overlay: the
// translation stage may add x-i18n {zh-CN, ja-JP} descriptions on
// description-bearing nodes where the merged subtree had none (local prose the
// fragments never translated). Anything else — a changed constraint, a dropped
// or added property, a rewritten description — refuses the value.
function isTranslationOverlay(node) {
    if (!isPlainObject(node)) return false
    return Object.entries(node).every(([lang, entry]) => ['zh-CN', 'ja-JP'].includes(lang)
        && isPlainObject(entry)
        && typeof entry.description === 'string'
        && Object.keys(entry).every(key => key === 'description' || key.startsWith('x-')))
}

function mirrorValueMatches(expected, value) {
    if (isDeepStrictEqual(expected, value)) return true
    // Arrays recurse element-wise so members inside oneOf/anyOf/items get the
    // same translation-overlay tolerance as object nodes — the translate stage
    // writes x-i18n there too, and a strict array compare would deadlock the
    // entry between the translation gate and this binding.
    if (Array.isArray(expected) || Array.isArray(value)) {
        if (!Array.isArray(expected) || !Array.isArray(value) || expected.length !== value.length) return false
        return expected.every((member, index) => mirrorValueMatches(member, value[index]))
    }
    if (!isPlainObject(expected) || !isPlainObject(value)) return false
    for (const [key, expectedChild] of Object.entries(expected)) {
        if (!(key in value)) return false
        if (key === 'x-i18n') {
            if (!isTranslationSuperset(expectedChild, value[key])) return false
            continue
        }
        if (!mirrorValueMatches(expectedChild, value[key])) return false
    }
    for (const [key, valueChild] of Object.entries(value)) {
        if (key in expected) continue
        if (key !== 'x-i18n' || typeof expected.description !== 'string' || !isTranslationOverlay(valueChild)) return false
    }
    return true
}

// The translation stage may ADD zh-CN/ja-JP to an upstream x-i18n that only
// carried one language; every language the upstream did carry must survive
// byte-identically.
function isTranslationSuperset(expectedNode, valueNode) {
    if (!isPlainObject(expectedNode) || !isPlainObject(valueNode)) return false
    for (const [lang, entry] of Object.entries(expectedNode)) {
        if (!isDeepStrictEqual(entry, valueNode[lang])) return false
    }
    const extra = Object.keys(valueNode).filter(lang => !(lang in expectedNode))
    return extra.every(lang => ['zh-CN', 'ja-JP'].includes(lang) && isPlainObject(valueNode[lang])
        && typeof valueNode[lang].description === 'string'
        && Object.keys(valueNode[lang]).every(key => key === 'description' || key.startsWith('x-')))
}

function assertMirrorValueBound(entry, cited, currentSubtree) {
    const expected = mergeMirrorProse(cited.change.after, currentSubtree,
        cited.preserveLocalScalarConstraints ? {preserveLocalScalarConstraints: true} : {})
    if (!mirrorValueMatches(expected, entry.value)) {
        fail('REST_UPSTREAM_APPLY_VALUE_UNBOUND', `${entry.diffEntryId}: mirror value differs from the recomputed upstream-structure/local-prose merge; mirrors are assembled, never hand-written`)
    }
    return expected
}

// Every description-bearing node of a change-set value, flattened. Shared by
// the translation stage (address space for the model) and the applier
// (completeness gate). x-i18n is never descended into: the translations inside
// it are output, not source prose.
function proseNodes(value) {
    const nodes = []
    const walk = node => {
        if (Array.isArray(node)) {
            node.forEach(walk)
            return
        }
        if (!node || typeof node !== 'object') return
        if (typeof node.description === 'string' && node.description.trim()) nodes.push(node)
        for (const [key, child] of Object.entries(node)) {
            if (key.startsWith('x-')) continue
            walk(child)
        }
    }
    walk(value)
    return nodes
}

const hasLanguage = (node, lang) => Boolean((node['x-i18n']?.[lang]?.description ?? '').trim())

// The three-locale invariant (PR #964 review): any prose a mirror/addition
// introduces must carry zh-CN AND ja-JP before the applier touches a fragment.
function isTranslationComplete(value) {
    return proseNodes(value).every(node => hasLanguage(node, 'zh-CN') && hasLanguage(node, 'ja-JP'))
}

// Shape gate (2026-10-30, the PR #964 monster class): a schema node's shape
// keys must agree with its type — object+items, scalar+items, scalar+properties
// and array+properties can never reach a fragment. Checked on every written
// mirror/addition subtree after apply.
const SCALAR_TYPES = new Set(['string', 'number', 'integer', 'boolean', 'null'])
function assertSchemaShape(node, label, trail = '') {
    if (Array.isArray(node)) {
        node.forEach((member, index) => assertSchemaShape(member, label, `${trail}[${index}]`))
        return
    }
    if (!isPlainObject(node)) return
    const type = node.type
    if (type === 'object' && node.items !== undefined) fail('REST_UPSTREAM_APPLY_SHAPE_INVALID', `${label}: ${trail || 'schema'} is type object but carries items`)
    if (type === 'array' && node.properties !== undefined) fail('REST_UPSTREAM_APPLY_SHAPE_INVALID', `${label}: ${trail || 'schema'} is type array but carries properties`)
    if (SCALAR_TYPES.has(type)) {
        if (node.items !== undefined) fail('REST_UPSTREAM_APPLY_SHAPE_INVALID', `${label}: ${trail || 'schema'} is scalar ${type} but carries items`)
        if (node.properties !== undefined) fail('REST_UPSTREAM_APPLY_SHAPE_INVALID', `${label}: ${trail || 'schema'} is scalar ${type} but carries properties`)
    }
    for (const [key, child] of Object.entries(node)) {
        if (key === 'properties' && isPlainObject(child)) {
            for (const [name, property] of Object.entries(child)) assertSchemaShape(property, label, trail ? `${trail}.properties.${name}` : name)
        } else if (key === 'items') {
            assertSchemaShape(child, label, `${trail}.items`)
        } else if (key === 'oneOf' || key === 'anyOf' || key === 'prefixItems' || key === 'allOf') {
            assertSchemaShape(child, label, `${trail}.${key}`)
        }
    }
}

// Deep-strip the scalar constraint keys (structure-only sources: the extractor
// vocabulary cannot speak to them, so they must not trigger mirrors — the
// fragment's doc-extrapolated formats/lengths stay and the leaf lanes report).
function stripScalarConstraints(value) {
    if (Array.isArray(value)) return value.map(stripScalarConstraints)
    if (!isPlainObject(value)) return value
    const result = {}
    for (const [key, child] of Object.entries(value)) {
        if (key !== 'type' && SCALAR_CONSTRAINT_KEYS.has(key)) continue
        result[key] = stripScalarConstraints(child)
    }
    return result
}

module.exports = {apiProjection, resolveSchemaDeep, mergeMirrorProse, droppedLocalFieldPaths, droppedLocalKeys, relaxedRequiredMembers, stripScalarConstraints, overlayOpaque, stripOpaqueMarkers, assertMirrorValueBound, mirrorValueMatches, isDocOwnedKey, proseNodes, isTranslationComplete, assertSchemaShape}
