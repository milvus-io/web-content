'use strict'

/*
 * Lifecycle suggestions for data-plane refreshes (design §6.3, CUSTOM_ATTRIBUTES
 * §1.10). The diff derives `x-added-at` / `x-last-modified` / `x-deprecated-since`
 * values for data-plane drift so the refresh agent no longer invents them: the
 * applier binds lifecycle change-set values to the diff-derived suggestion, and
 * deviations still need an explicit logged override.
 *
 * Managed tracks are the milvus data-plane minor tracks (`major.minor.x`);
 * ordering is numeric by major then minor, never lexical. Suggestions only fire
 * when a track is supplied (`--lifecycle-track`); without one the diff output is
 * byte-identical to the pre-lifecycle behavior.
 */

const LIFECYCLE_KEYS = ['x-added-at', 'x-last-modified', 'x-deprecated-since']
const TRACK_PATTERN = /^[0-9]+\.[0-9]+\.x$/

// Change kinds whose adoption changes the public contract (CUSTOM_ATTRIBUTES
// §1.10 "public contract changed"): constraint/required membership, structural
// mirrors, and deprecation flips. Prose-only drifts and upstream-absence
// shapes are not contract changes and get no suggestion.
const CONTRACT_CHANGE_KINDS = new Set(['constraint', 'required', 'schema'])

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function parseTrack(track, label = 'lifecycle track') {
    if (typeof track !== 'string' || !TRACK_PATTERN.test(track)) {
        fail('REST_UPSTREAM_LIFECYCLE_TRACK_INVALID', `${label} must use the major.minor.x track format, got ${JSON.stringify(track ?? null)}`)
    }
    const [major, minor] = track.split('.').map(part => Number(part))
    return {major, minor}
}

// Numeric, never lexical, track ordering per CUSTOM_ATTRIBUTES §1.10. This is
// deliberately stricter than releaseTrack.js: lifecycle keys are milvus
// data-plane attributes written as bare `major.minor.x`, so the `v`-prefixed
// forms releaseTrack accepts are invalid here rather than normalized.
function compareTracks(left, right) {
    const a = parseTrack(left, 'left track')
    const b = parseTrack(right, 'right track')
    if (a.major !== b.major) return a.major < b.major ? -1 : 1
    if (a.minor !== b.minor) return a.minor < b.minor ? -1 : 1
    return 0
}

/*
 * Validate that a data-plane source may carry lifecycle suggestions: the
 * attributes are a milvus data-plane convention (CUSTOM_ATTRIBUTES §1.10), so a
 * control-plane source rejects the track outright instead of emitting foreign
 * metadata.
 */
function assertLifecycleSource(source) {
    if (source?.apiSurface !== 'data-plane') {
        fail('REST_UPSTREAM_LIFECYCLE_TRACK_REJECTED', `source ${source?.id ?? '(unknown)'} is not data-plane; lifecycle attributes are milvus data-plane metadata`)
    }
}

/*
 * Suggestion for one diff entry, or null when the entry type carries none.
 * `upstreamNode` is the upstream object the entry reports (operation, property,
 * or parameter) when resolvable; its `deprecated` flag seeds x-deprecated-since
 * for additions.
 */
function lifecycleSuggestion(entry, track, upstreamNode = null) {
    const change = entry.change || {}
    if (entry.category === 'upstream-added' || entry.category === 'upstream-added-field' || entry.category === 'upstream-added-param') {
        const deprecatedSince = upstreamNode?.deprecated ? track : null
        return {'x-added-at': track, 'x-last-modified': track, 'x-deprecated-since': deprecatedSince}
    }
    if (entry.category === 'upstream-modified') {
        if (change.kind === 'deprecated') {
            // Un-deprecating is a human decision (the attribute semantics do not
            // define a removal track); only the flip to deprecated is suggested.
            if (change.after !== true) return null
            return {'x-last-modified': track, 'x-deprecated-since': track}
        }
        if (CONTRACT_CHANGE_KINDS.has(change.kind)) return {'x-last-modified': track}
    }
    return null
}

/*
 * §1.10 validation order, against the fragment-side values at the same managed
 * scope: a suggestion must never move an element backwards on the timeline.
 */
function assertLifecycleOrder(entry, fragmentNode, suggestion, track) {
    if (!fragmentNode || typeof fragmentNode !== 'object') return
    const fragmentAddedAt = fragmentNode['x-added-at']
    if (typeof fragmentAddedAt === 'string' && TRACK_PATTERN.test(fragmentAddedAt) && compareTracks(fragmentAddedAt, track) > 0) {
        fail('REST_UPSTREAM_LIFECYCLE_ORDER', `${entry.id}: fragment x-added-at ${fragmentAddedAt} is newer than suggestion track ${track}`)
    }
    const fragmentLastModified = fragmentNode['x-last-modified']
    if (typeof fragmentLastModified === 'string' && TRACK_PATTERN.test(fragmentLastModified) && compareTracks(fragmentLastModified, track) > 0) {
        fail('REST_UPSTREAM_LIFECYCLE_ORDER', `${entry.id}: fragment x-last-modified ${fragmentLastModified} is newer than suggestion track ${track}`)
    }
    const fragmentDeprecatedSince = fragmentNode['x-deprecated-since']
    if (typeof fragmentDeprecatedSince === 'string' && TRACK_PATTERN.test(fragmentDeprecatedSince)) {
        if (suggestion['x-last-modified'] !== undefined && compareTracks(suggestion['x-last-modified'], fragmentDeprecatedSince) > 0) {
            fail('REST_UPSTREAM_LIFECYCLE_ORDER', `${entry.id}: suggestion x-last-modified ${suggestion['x-last-modified']} would exceed fragment x-deprecated-since ${fragmentDeprecatedSince}`)
        }
        // §1.10 defines the key as the FIRST track in which the element is
        // deprecated: a suggestion below the recorded marker would rewrite
        // that history backwards (and the generation-side deprecation-rewrite
        // guard never sees applier output, so nothing else would catch it).
        if (suggestion['x-deprecated-since'] !== undefined && compareTracks(suggestion['x-deprecated-since'], fragmentDeprecatedSince) < 0) {
            fail('REST_UPSTREAM_LIFECYCLE_ORDER', `${entry.id}: suggestion x-deprecated-since ${suggestion['x-deprecated-since']} would move the fragment deprecation marker ${fragmentDeprecatedSince} backwards`)
        }
    }
}

/*
 * Attach the suggestion to one entry in place. `fragmentNode` is the
 * fragment-side object at the same managed scope (operation, property, or
 * parameter) when the element already exists there; additions pass null.
 */
function attachLifecycleSuggestion(entry, {track, fragmentNode = null, upstreamNode = null}) {
    const suggestion = lifecycleSuggestion(entry, track, upstreamNode)
    if (!suggestion) return
    assertLifecycleOrder(entry, fragmentNode, suggestion, track)
    entry.lifecycle = suggestion
}

module.exports = {
    LIFECYCLE_KEYS,
    TRACK_PATTERN,
    assertLifecycleSource,
    assertLifecycleOrder,
    attachLifecycleSuggestion,
    compareTracks,
    lifecycleSuggestion,
    parseTrack,
}
