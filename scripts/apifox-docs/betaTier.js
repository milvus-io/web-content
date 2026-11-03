'use strict'

// `x-beta` carries an availability tier. Two values are target-neutral:
// FALSE (no badge) and DEPRECATED (the kernel itself retired the surface —
// refGen also derives it from `deprecated` for v1). Every other value in the
// vocabulary (PUBLIC, PRIVATE, ON REQUEST, CONTACT SALES, BYOC,
// NEAR DEPRECATE, ...) is a Zilliz Cloud release-notes tier: the badge
// captions ("Public Preview" & friends) are zdoc-site vocabulary, and the
// milvus publication target must resolve such marks as if they were unset.
// The allowlist (not a denylist) keeps future zilliz tiers from leaking to
// milvus.io by default.
const TARGET_NEUTRAL_BETA_VALUES = new Set(['FALSE', 'DEPRECATED'])

/**
 * Resolve an x-beta value for a publication target. Returns the value when
 * the target renders it, undefined when the target treats it as unset.
 * Non-string values (absent, null, malformed) resolve to undefined.
 */
function resolveBetaForTarget(value, target) {
  if (typeof value !== 'string') return undefined
  if (target === 'milvus' && !TARGET_NEUTRAL_BETA_VALUES.has(value)) return undefined
  return value
}

module.exports = {TARGET_NEUTRAL_BETA_VALUES, resolveBetaForTarget}
