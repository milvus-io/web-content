const test = require('node:test')
const assert = require('node:assert/strict')
const {
    assertLifecycleSource,
    assertLifecycleOrder,
    attachLifecycleSuggestion,
    compareTracks,
    lifecycleSuggestion,
    parseTrack,
} = require('./lifecycle')

const TRACK = '3.0.x'

function entry(overrides = {}) {
    return {
        id: 'upstream-modified|post /v2/vectordb/entities/insert|05-collection-operations-v2.json|requestBody|||data.field|constraint',
        category: 'upstream-modified',
        change: {kind: 'constraint', key: 'maxLength', before: null, after: 65535},
        ...overrides,
    }
}

test('parseTrack accepts the managed track format and orders numerically', () => {
    assert.deepEqual(parseTrack('2.6.x'), {major: 2, minor: 6})
    assert.throws(() => parseTrack('3.0'), /REST_UPSTREAM_LIFECYCLE_TRACK_INVALID/)
    assert.throws(() => parseTrack('v3.0.x'), /REST_UPSTREAM_LIFECYCLE_TRACK_INVALID/)
    assert.throws(() => parseTrack('3.0.1'), /REST_UPSTREAM_LIFECYCLE_TRACK_INVALID/)
    assert.equal(compareTracks('2.6.x', '3.0.x'), -1)
    assert.equal(compareTracks('3.0.x', '2.6.x'), 1)
    // Numeric, never lexical ("10.x" would sort before "9.x" as text).
    assert.equal(compareTracks('2.10.x', '2.9.x'), 1)
    assert.equal(compareTracks('3.0.x', '3.0.x'), 0)
})

test('addition entries suggest the full triple, seeding deprecation from the upstream node', () => {
    const added = {id: 'x', category: 'upstream-added', change: {kind: 'operation-absent-in-fragments', before: null, after: null}}
    assert.deepEqual(lifecycleSuggestion(added, TRACK, null), {'x-added-at': TRACK, 'x-last-modified': TRACK, 'x-deprecated-since': null})
    assert.deepEqual(
        lifecycleSuggestion(added, TRACK, {deprecated: true}),
        {'x-added-at': TRACK, 'x-last-modified': TRACK, 'x-deprecated-since': TRACK},
    )
    const field = {id: 'x', category: 'upstream-added-field', change: {kind: 'field-uncovered', before: null, after: null}}
    assert.deepEqual(lifecycleSuggestion(field, TRACK, {deprecated: true})['x-deprecated-since'], TRACK)
    const param = {id: 'x', category: 'upstream-added-param', change: {kind: 'param-uncovered', before: null, after: null}}
    assert.deepEqual(lifecycleSuggestion(param, TRACK, null)['x-added-at'], TRACK)
})

test('contract modifications suggest only x-last-modified; deprecation flips add x-deprecated-since', () => {
    const constraint = entry()
    assert.deepEqual(lifecycleSuggestion(constraint, TRACK, null), {'x-last-modified': TRACK})
    const required = entry({change: {kind: 'required', before: false, after: true}})
    assert.deepEqual(lifecycleSuggestion(required, TRACK, null), {'x-last-modified': TRACK})
    const flip = entry({change: {kind: 'deprecated', before: false, after: true}})
    assert.deepEqual(lifecycleSuggestion(flip, TRACK, null), {'x-last-modified': TRACK, 'x-deprecated-since': TRACK})
    // Un-deprecating stays a human decision: no suggestion.
    const unflip = entry({change: {kind: 'deprecated', before: true, after: false}})
    assert.equal(lifecycleSuggestion(unflip, TRACK, null), null)
})

test('prose and unattributed/zdoc-only/fragment-only entries never get suggestions', () => {
    assert.equal(lifecycleSuggestion(entry({change: {kind: 'description', before: 'a', after: 'b'}}), TRACK, null), null)
    assert.equal(lifecycleSuggestion(entry({change: {kind: 'summary', before: 'a', after: 'b'}}), TRACK, null), null)
    assert.equal(lifecycleSuggestion(entry({change: {kind: 'body-media-absent-upstream', before: 'application/json', after: null}}), TRACK, null), null)
    assert.equal(lifecycleSuggestion(entry({category: 'zdoc-only', change: {kind: 'field-absent-upstream', before: null, after: null}}), TRACK, null), null)
    assert.equal(lifecycleSuggestion(entry({category: 'fragment-only', change: {kind: 'operation-absent-upstream', before: null, after: null}}), TRACK, null), null)
    assert.equal(lifecycleSuggestion(entry({category: 'unattributed', change: {kind: 'field-uncovered', before: null, after: null}}), TRACK, null), null)
    assert.equal(lifecycleSuggestion(entry({change: {kind: 'required-array-missing-upstream', before: [], after: null}}), TRACK, null), null)
})

test('attaching validates the fragment-side timeline before writing the suggestion', () => {
    const later = entry()
    assert.throws(
        () => attachLifecycleSuggestion(later, {track: TRACK, fragmentNode: {'x-added-at': '3.1.x'}}),
        /REST_UPSTREAM_LIFECYCLE_ORDER/,
    )
    const modified = entry()
    assert.throws(
        () => attachLifecycleSuggestion(modified, {track: TRACK, fragmentNode: {'x-last-modified': '3.2.x'}}),
        /REST_UPSTREAM_LIFECYCLE_ORDER/,
    )
    // §1.10: once deprecated, x-last-modified may not move past x-deprecated-since.
    const afterDeprecation = entry()
    assert.throws(
        () => attachLifecycleSuggestion(afterDeprecation, {track: TRACK, fragmentNode: {'x-added-at': '2.6.x', 'x-deprecated-since': '2.6.x'}}),
        /REST_UPSTREAM_LIFECYCLE_ORDER/,
    )
    const healthy = entry({id: 'healthy'})
    attachLifecycleSuggestion(healthy, {track: TRACK, fragmentNode: {'x-added-at': '2.6.x', 'x-last-modified': '2.6.x', 'x-deprecated-since': null}})
    assert.deepEqual(healthy.lifecycle, {'x-last-modified': TRACK})
})

test('control-plane sources reject lifecycle tracks outright', () => {
    assert.throws(() => assertLifecycleSource({id: 'zilliz-cloud-control-plane', apiSurface: 'control-plane'}), /REST_UPSTREAM_LIFECYCLE_TRACK_REJECTED/)
    assert.throws(() => assertLifecycleSource(null), /REST_UPSTREAM_LIFECYCLE_TRACK_REJECTED/)
    assert.doesNotThrow(() => assertLifecycleSource({id: 'milvus-data-plane', apiSurface: 'data-plane'}))
})
