const test = require('node:test')
const assert = require('node:assert/strict')
const {apiProjection, resolveSchemaDeep, mergeMirrorProse, droppedLocalFieldPaths, droppedLocalKeys, stripScalarConstraints, overlayOpaque, stripOpaqueMarkers, mirrorValueMatches, assertMirrorValueBound, proseNodes, isTranslationComplete, assertSchemaShape, undescribedNodes, harvestUpstreamComments} = require('./mirror')

test('opaque blind spots are local-authority boundaries: overlay substitutes the fragment, retirement walkers stop', () => {
    // The Go extractor marks generic maps / interface{} / json.RawMessage as
    // x-milvus-opaque: params.enableDynamicField and elementTypeParams.
    // max_length are forwarded to gRPC and invisible to the route-table
    // structs, so the fragment's hand-authored documentation is the authority
    // below the marker.
    const upstream = {type: 'object', properties: {
        params: {type: 'object', 'x-milvus-opaque': true},
        collectionName: {type: 'string'},
        rows: {type: 'array', items: {'x-milvus-opaque': true}},
    }}
    const local = {type: 'object', properties: {
        params: {type: 'object', properties: {enableDynamicField: {type: 'boolean', description: 'local doc'}}},
        collectionName: {type: 'string'},
        rows: {type: 'array', items: {type: 'object', properties: {id: {type: 'string'}}}},
    }}
    const overlaid = overlayOpaque(upstream, local)
    // below the opaque boundary the fragment content wins wholesale
    assert.deepEqual(overlaid.properties.params, local.properties.params)
    assert.deepEqual(overlaid.properties.rows, local.properties.rows)
    // above the boundary the upstream still rules: a genuinely new sibling
    // stays visible to the comparison
    assert.deepEqual(overlaid.properties.collectionName, {type: 'string'})
    // nothing is reported as retired below a blind-spot boundary
    assert.deepEqual(droppedLocalFieldPaths(overlaid, local), [])
    assert.deepEqual(droppedLocalKeys(overlaid, local), [])
    // without the fragment-side subtree (additions) the upstream shape stays,
    // and markers never ride into a fragment
    assert.deepEqual(stripOpaqueMarkers(overlayOpaque({type: 'object', 'x-milvus-opaque': true}, null)), {type: 'object'})
    assert.deepEqual(stripOpaqueMarkers({'x-milvus-opaque': true, anyOf: [{type: 'string'}]}), {anyOf: [{type: 'string'}]})
})

test('apiProjection strips doc-owned keys at every depth and keeps API truth', () => {
    const schema = {
        description: 'local text', 'x-i18n': {'zh-CN': {description: '中'}}, example: 1,
        type: 'object', required: ['a'], maxLength: 5,
        properties: {a: {type: 'string', description: 'inner', minLength: 2}},
    }
    assert.deepEqual(apiProjection(schema), {
        type: 'object', required: ['a'], maxLength: 5,
        properties: {a: {type: 'string', minLength: 2}},
    })
})

test('resolveSchemaDeep inlines refs and allOf merges; cycles fail closed', () => {
    const document = {components: {schemas: {
        Dto: {type: 'object', properties: {id: {type: 'string'}}, required: ['id']},
        Base: {type: 'object', properties: {base: {type: 'string'}}},
    }}}
    const resolved = resolveSchemaDeep(document, {$ref: '#/components/schemas/Dto'})
    assert.deepEqual(resolved, {type: 'object', properties: {id: {type: 'string'}}, required: ['id']})
    const merged = resolveSchemaDeep(document, {allOf: [{$ref: '#/components/schemas/Base'}], type: 'object', properties: {own: {type: 'integer'}}})
    assert.deepEqual(merged.properties, {base: {type: 'string'}, own: {type: 'integer'}})
    // a cycle through structure keys fails deterministically at the first
    // recurrence, naming the reference (not an arbitrary depth count)
    const cyclic = {components: {schemas: {Loop: {type: 'object', properties: {self: {$ref: '#/components/schemas/Loop'}}}}}}
    assert.throws(() => resolveSchemaDeep(cyclic, {$ref: '#/components/schemas/Loop'}), /REST_UPSTREAM_MIRROR_REF_CYCLE: recursive reference #\/components\/schemas\/Loop/)
    assert.throws(() => resolveSchemaDeep(document, {$ref: '#/components/schemas/Missing'}), /REST_UPSTREAM_MIRROR_REF_DANGLING/)
})

test('resolveSchemaDeep keeps sibling re-references resolvable; only true paths are cycles', () => {
    const document = {components: {schemas: {
        Dto: {type: 'object', properties: {id: {type: 'string'}}},
        Tree: {type: 'object', properties: {
            left: {$ref: '#/components/schemas/Dto'},
            right: {$ref: '#/components/schemas/Dto'},
        }},
    }}}
    // two siblings citing the same component share nothing on the resolution
    // path: the path-scoped set must forget each ref when its subtree ends
    const resolved = resolveSchemaDeep(document, {$ref: '#/components/schemas/Tree'})
    assert.deepEqual(resolved.properties.left, {type: 'object', properties: {id: {type: 'string'}}})
    assert.deepEqual(resolved.properties.right, {type: 'object', properties: {id: {type: 'string'}}})
    // a mutual cycle between two components is caught the same way
    const mutual = {components: {schemas: {
        Ping: {type: 'object', properties: {next: {$ref: '#/components/schemas/Pong'}}},
        Pong: {type: 'object', properties: {back: {$ref: '#/components/schemas/Ping'}}},
    }}}
    assert.throws(() => resolveSchemaDeep(mutual, {$ref: '#/components/schemas/Ping'}), /REST_UPSTREAM_MIRROR_REF_CYCLE/)
})

test('mergeMirrorProse keeps local prose/x-* at surviving nodes and adopts upstream structure', () => {
    const upstream = {type: 'object', properties: {
        jobId: {type: 'string', description: 'upstream text'},
        added: {type: 'string', description: 'new field'},
    }}
    const local = {type: 'array', items: {}, properties: {
        jobId: {type: 'string', maxLength: 64, description: 'rich local text', 'x-i18n': {'zh-CN': {description: '本地'}, 'ja-JP': {description: 'ローカル'}}},
        retired: {type: 'string'},
    }, 'x-admonition': 'local note'}
    const merged = mergeMirrorProse(upstream, local)
    assert.deepEqual(merged, {type: 'object', 'x-admonition': 'local note', properties: {
        jobId: {type: 'string', description: 'rich local text', 'x-i18n': {'zh-CN': {description: '本地'}, 'ja-JP': {description: 'ローカル'}}},
        added: {type: 'string', description: 'new field'},
    }})
    // branch members match by x-tab-label first
    const upstreamBranched = {oneOf: [
        {'x-tab-label': 'success', type: 'object', properties: {code: {type: 'integer'}}},
        {'x-tab-label': 'failure', type: 'object'},
    ]}
    const localBranched = {oneOf: [
        {'x-tab-label': 'failure', description: 'local failure'},
        {'x-tab-label': 'success', description: 'local success'},
    ]}
    const mergedBranched = mergeMirrorProse(upstreamBranched, localBranched)
    assert.equal(mergedBranched.oneOf[0].description, 'local success')
    assert.equal(mergedBranched.oneOf[1].description, 'local failure')
})

test('droppedLocalFieldPaths and droppedLocalKeys name what a mirror retires', () => {
    const upstream = {type: 'object', properties: {kept: {type: 'string'}, gone: {type: 'string'}}}
    const local = {type: 'object', properties: {
        kept: {type: 'string', maxLength: 3},
        gone: {type: 'string'},
        extra: {type: 'object', properties: {deep: {type: 'string'}}},
    }}
    assert.deepEqual(droppedLocalFieldPaths(upstream, local), ['extra'])
    assert.deepEqual(droppedLocalKeys(upstream, local), ['kept(maxLength)'])
    // structure-only comparison strips those scalar keys, so nothing triggers
    assert.deepEqual(stripScalarConstraints(local).properties.kept, {type: 'string'})
})

test('mirrorValueMatches tolerates exactly the translation overlay and nothing else', () => {
    const expected = {type: 'object', properties: {name: {type: 'string', description: 'Name.'}}}
    const overlay = {type: 'object', properties: {name: {type: 'string', description: 'Name.',
        'x-i18n': {'zh-CN': {description: '名'}, 'ja-JP': {description: '名前'}}}}}
    assert.equal(mirrorValueMatches(expected, overlay), true)
    // no description on the node -> no overlay allowed
    const noDesc = {type: 'object', properties: {id: {type: 'string'}}}
    assert.equal(mirrorValueMatches(noDesc, {type: 'object', properties: {id: {type: 'string', 'x-i18n': {'zh-CN': {description: 'x'}, 'ja-JP': {description: 'y'}}}}}), false)
    // changed constraints are never tolerated
    assert.equal(mirrorValueMatches(expected, structuredClone({...overlay, properties: {...overlay.properties, name: {...overlay.properties.name, maxLength: 9}}})), false)
    const cited = {change: {after: {type: 'object', properties: {name: {type: 'string', description: 'Name.'}}}}}
    const bound = assertMirrorValueBound({diffEntryId: 'x', value: expected}, cited, {type: 'object', properties: {name: {type: 'string', maxLength: 9}}})
    assert.deepEqual(bound, expected)
    assert.throws(() => assertMirrorValueBound({diffEntryId: 'x', value: {type: 'object'}}, cited,
        {type: 'object', properties: {name: {type: 'string', maxLength: 9}}}), /REST_UPSTREAM_APPLY_VALUE_UNBOUND/)
})


test('mirrorValueMatches recurses arrays: overlays inside oneOf/items are tolerated', () => {
    // the P1-1 deadlock: translate writes x-i18n on oneOf members too
    const expected = {type: 'object', oneOf: [
        {'x-tab-label': 'success', type: 'object', properties: {code: {type: 'integer', description: 'Code.'}}},
        {'x-tab-label': 'error', type: 'object'},
    ]}
    const overlaid = {type: 'object', oneOf: [
        {'x-tab-label': 'success', type: 'object', properties: {code: {type: 'integer', description: 'Code.',
            'x-i18n': {'zh-CN': {description: '码'}, 'ja-JP': {description: 'コード'}}}}},
        {'x-tab-label': 'error', type: 'object'},
    ]}
    assert.equal(mirrorValueMatches(expected, overlaid), true)
    // existing upstream zh preserved byte-identically, ja added on top
    const withZh = {type: 'object', items: {type: 'string', description: 'x', 'x-i18n': {'zh-CN': {description: '中'}}}}
    const withZhJa = {type: 'object', items: {type: 'string', description: 'x', 'x-i18n': {'zh-CN': {description: '中'}, 'ja-JP': {description: 'ヤ'}}}}
    assert.equal(mirrorValueMatches(withZh, withZhJa), true)
    // changed structure inside an array member is still refused
    const mutated = JSON.parse(JSON.stringify(overlaid))
    mutated.oneOf[0].properties.code.type = 'string'
    assert.equal(mirrorValueMatches(expected, mutated), false)
    assert.equal(mirrorValueMatches(expected, {type: 'object', oneOf: [overlaid.oneOf[0]]}), false)
})

test('mergeMirrorProse preserves local scalar constraints only in preserve mode', () => {
    const upstream = {type: 'object', properties: {limit: {type: 'integer', description: 'keep'}}}
    const local = {type: 'object', properties: {limit: {type: 'integer', maximum: 64, description: 'local keep'}}}
    const preserved = mergeMirrorProse(upstream, local, {preserveLocalScalarConstraints: true})
    assert.equal(preserved.properties.limit.maximum, 64)
    const plain = mergeMirrorProse(upstream, local)
    assert.equal(plain.properties.limit.maximum, undefined)
})

test('proseNodes never descends into x-i18n; completeness needs both locales', () => {
    const value = {type: 'object', properties: {
        a: {type: 'string', description: 'one'},
        b: {type: 'string', description: 'two', 'x-i18n': {'zh-CN': {description: '二'}, 'ja-JP': {description: '二'}}},
    }}
    assert.equal(proseNodes(value).length, 2)
    assert.equal(isTranslationComplete(value), false)
    assert.equal(isTranslationComplete(mergeMirrorProse(value, {})), false)
})

test('assertSchemaShape refuses the PR #964 monster classes', () => {
    assert.throws(() => assertSchemaShape({type: 'object', items: {type: 'string'}}, 't'), /type object but carries items/)
    assert.throws(() => assertSchemaShape({type: 'array', properties: {}}, 't'), /type array but carries properties/)
    assert.throws(() => assertSchemaShape({type: 'string', properties: {}}, 't'), /scalar string but carries properties/)
    assert.throws(() => assertSchemaShape({type: 'integer', items: {}}, 't'), /scalar integer but carries items/)
    assert.doesNotThrow(() => assertSchemaShape({type: 'array', items: {type: 'object', properties: {a: {type: 'string'}}}}, 't'))
    assert.doesNotThrow(() => assertSchemaShape({type: 'object', properties: {a: {type: 'array', items: {type: 'string'}}}}, 't'))
})

// --- describe-lane support (2026-11-03) -------------------------------------

test('stripOpaqueMarkers strips both tooling markers from every depth', () => {
    assert.deepEqual(stripOpaqueMarkers({'x-milvus-opaque': true, 'x-upstream-comment': 'note', type: 'object',
        properties: {ttl: {'x-upstream-comment': 'note', type: 'integer'}}}),
    {type: 'object', properties: {ttl: {type: 'integer'}}})
})

test('mirrorValueMatches sanctions the describe overlay: added description on prose-less nodes only', () => {
    const expected = {type: 'object', properties: {params: {type: 'string'}}}
    const described = {type: 'object', properties: {params: {type: 'string', description: 'The parameters.'}}}
    assert.equal(mirrorValueMatches(expected, described), true)
    // prose the merge DID supply must survive verbatim — a rewrite is refused
    const withProse = {type: 'object', properties: {params: {type: 'string', description: 'Original prose.'}}}
    const rewritten = {type: 'object', properties: {params: {type: 'string', description: 'Rewritten prose.'}}}
    assert.equal(mirrorValueMatches(withProse, rewritten), false)
    // empty-string prose counts as prose-less (the overlay may fill it)
    const emptyProse = {type: 'string', description: ''}
    assert.equal(mirrorValueMatches(emptyProse, {type: 'string', description: 'Filled in.'}), true)
    // describe + translation overlays stack on the same node
    const both = {type: 'object', properties: {params: {type: 'string', description: 'The parameters.', 'x-i18n': {'zh-CN': {description: '参数。'}, 'ja-JP': {description: 'パラメータ。'}}}}}
    assert.equal(mirrorValueMatches(expected, both), true)
})

test('undescribedNodes flags every addressable schema row, parameters included', () => {
    const value = {type: 'object', properties: {
        described: {type: 'string', description: 'Has prose.'},
        leaf: {type: 'string'},
        nested: {type: 'object', properties: {inner: {type: 'integer'}}},
        items: {type: 'array', items: {type: 'string'}},
        combinator: {oneOf: [{type: 'string'}]},
        opaque: {},
        'x-annotated': {type: 'string', 'x-admonition': [{type: 'info'}]},
    }}
    const paths = undescribedNodes(value).map(node => node.path)
    assert.deepEqual(paths, ['', 'leaf', 'nested', 'nested.inner', 'items', 'items[]', 'combinator', 'combinator/oneOf[]', 'opaque', 'x-annotated'])
    const parameter = {name: 'connectTimeout', in: 'query', required: false, schema: {type: 'integer'}}
    assert.deepEqual(undescribedNodes(parameter).map(node => node.path), [''])
    assert.deepEqual(undescribedNodes({...parameter, description: 'Timeout.'}), [])
})

test('harvestUpstreamComments uses the undescribedNodes path grammar', () => {
    const subtree = {type: 'object', 'x-upstream-comment': 'root comment',
        properties: {leaf: {type: 'string', 'x-upstream-comment': 'leaf comment'},
            nested: {type: 'object', properties: {inner: {type: 'integer', 'x-upstream-comment': 'inner comment'}}}}}
    assert.deepEqual(harvestUpstreamComments(subtree), {
        '': 'root comment',
        leaf: 'leaf comment',
        'nested.inner': 'inner comment',
    })
})
