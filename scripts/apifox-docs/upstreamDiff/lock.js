const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020')

const lockSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-upstream-lock.schema.json'), 'utf8'))

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function compileSchema(schema) {
    return new Ajv2020({allErrors: true, strict: false}).compile(schema)
}

const validateLock = compileSchema(lockSchema)

function assertLockShape(lock) {
    if (!lock || typeof lock !== 'object' || Array.isArray(lock)) fail('REST_UPSTREAM_LOCK_INVALID', 'lock must be an object')
    if (!validateLock(lock)) {
        const details = validateLock.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_UPSTREAM_LOCK_SCHEMA_INVALID', details)
    }
    const seenIds = new Set()
    for (const source of lock.sources) {
        if (seenIds.has(source.id)) fail('REST_UPSTREAM_LOCK_DUPLICATE_SOURCE', source.id)
        seenIds.add(source.id)
        if (source.artifact.kind === 'source-tree' && source.pin.contentSha256 !== undefined) {
            fail('REST_UPSTREAM_LOCK_CONTENT_DIGEST_MISPLACED', `${source.id}: contentSha256 only applies to spec-file sources`)
        }
        if (source.apiSurface === 'control-plane' && source.publicationTarget !== 'zilliz') {
            fail('REST_UPSTREAM_LOCK_TARGET_INVALID', `${source.id}: control-plane sources publish to zilliz only`)
        }
    }
}

function parseRestUpstreamLock(text, label = 'rest-upstream-lock.json') {
    let lock
    try {
        lock = JSON.parse(text)
    } catch (error) {
        fail('REST_UPSTREAM_LOCK_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    assertLockShape(lock)
    return lock
}

function loadRestUpstreamLock(filePath) {
    return parseRestUpstreamLock(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

function findLockSource(lock, sourceId) {
    const source = lock.sources.find(entry => entry.id === sourceId)
    if (!source) {
        fail('REST_UPSTREAM_SOURCE_UNKNOWN', `${sourceId}; known: ${lock.sources.map(entry => entry.id).join(', ')}`)
    }
    return source
}

module.exports = {parseRestUpstreamLock, loadRestUpstreamLock, findLockSource, assertLockShape}
