const test = require('node:test')
const assert = require('node:assert/strict')
const {parseRestUpstreamLock, findLockSource} = require('./lock')

const SHA = 'a'.repeat(40)
const SHA256 = 'b'.repeat(64)

function lock(overrides = {}, sourceOverrides = {}) {
    return {
        schemaVersion: '1.0',
        sources: [{
            id: 'zilliz-cloud-control-plane',
            repository: 'zilliztech/zilliz-cloud',
            artifact: {kind: 'spec-file', path: 'vdc/global/cloud-control-api/openapi.yaml'},
            pin: {commit: SHA, contentSha256: SHA256},
            trackedRef: 'master',
            apiSurface: 'control-plane',
            publicationTarget: 'zilliz',
            upstreamOasVersion: '3.1.0',
            ...sourceOverrides,
        }],
        ...overrides,
    }
}

test('parses a valid lock and resolves sources', () => {
    const parsed = parseRestUpstreamLock(JSON.stringify(lock()))
    assert.equal(parsed.sources[0].pin.commit, SHA)
    assert.equal(findLockSource(parsed, 'zilliz-cloud-control-plane').trackedRef, 'master')
})

test('rejects malformed JSON, bad shapes, and duplicate source ids', () => {
    assert.throws(() => parseRestUpstreamLock('{'), /REST_UPSTREAM_LOCK_MALFORMED_JSON/)
    assert.throws(() => parseRestUpstreamLock('[]'), /REST_UPSTREAM_LOCK_INVALID/)
    assert.throws(() => parseRestUpstreamLock(JSON.stringify(lock({schemaVersion: '2.0'}))), /REST_UPSTREAM_LOCK_SCHEMA_INVALID/)
    const duplicate = lock()
    duplicate.sources.push({...duplicate.sources[0], id: 'zilliz-cloud-control-plane', artifact: {kind: 'source-tree', paths: ['a/']}})
    assert.throws(() => parseRestUpstreamLock(JSON.stringify(duplicate)), /REST_UPSTREAM_LOCK_DUPLICATE_SOURCE/)
})

test('rejects content digests on source-tree sources and wrong control-plane targets', () => {
    const tree = lock({}, {artifact: {kind: 'source-tree', paths: ['internal/distributed/proxy/httpserver/']}})
    tree.sources[0].pin = {commit: SHA}
    assert.doesNotThrow(() => parseRestUpstreamLock(JSON.stringify(tree)))
    tree.sources[0].pin = {commit: SHA, contentSha256: SHA256}
    assert.throws(() => parseRestUpstreamLock(JSON.stringify(tree)), /REST_UPSTREAM_LOCK_CONTENT_DIGEST_MISPLACED/)

    const control = lock({}, {publicationTarget: 'milvus'})
    assert.throws(() => parseRestUpstreamLock(JSON.stringify(control)), /REST_UPSTREAM_LOCK_TARGET_INVALID/)
})

test('rejects pins that are not full SHAs and traversal paths', () => {
    assert.throws(
        () => parseRestUpstreamLock(JSON.stringify(lock({}, {pin: {commit: 'abc'}}))),
        /REST_UPSTREAM_LOCK_SCHEMA_INVALID/,
    )
    assert.throws(
        () => parseRestUpstreamLock(JSON.stringify(lock({}, {artifact: {kind: 'spec-file', path: '../escape.yaml'}}))),
        /REST_UPSTREAM_LOCK_SCHEMA_INVALID/,
    )
})

test('unknown source lookup fails closed', () => {
    const parsed = parseRestUpstreamLock(JSON.stringify(lock()))
    assert.throws(() => findLockSource(parsed, 'nope'), /REST_UPSTREAM_SOURCE_UNKNOWN.*known: zilliz-cloud-control-plane/)
})
