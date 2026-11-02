const test = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')
const {serializeDocument, assertCanonicalBytes, loadCanonicalFragments} = require('./formatter')

const OPENAPI_DIR = path.join(__dirname, '..', 'meta', 'openapi')

test('canonical serializer is byte-idempotent on already-canonical text', () => {
    const raw = '{"openapi":"3.0.1"}\n'
    const document = JSON.parse(raw)
    assert.equal(serializeDocument(document), '{\n  "openapi": "3.0.1"\n}\n')
})

test('every committed REST fragment satisfies the canonical formatting invariant', () => {
    const fragments = loadCanonicalFragments(OPENAPI_DIR)
    assert.ok(fragments.size >= 38, `expected the full fragment set, found ${fragments.size}`)
})

test('non-canonical fragments are rejected with a byte offset and fix hint', () => {
    assert.throws(
        () => assertCanonicalBytes('{"a":1}', 'tight.json'),
        /REST_FRAGMENT_NONCANONICAL_FORMAT.*offset 1.*rest-upstream-format --write/,
    )
    assert.throws(
        () => assertCanonicalBytes('{"a":', 'broken.json'),
        /REST_FRAGMENT_MALFORMED_JSON/,
    )
})
