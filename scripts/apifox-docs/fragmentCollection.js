const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { isDeepStrictEqual } = require('node:util')
const Ajv2020 = require('ajv/dist/2020')
const { mergeSpecification } = require('./specLoader')
const { assertNoDanglingLocalRefs } = require('./componentGraph')

const FULL_SHA = /^[a-f0-9]{40}$/
const DIGEST = /^sha256:[a-f0-9]{64}$/
const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'])
const collectionSchema = JSON.parse(fs.readFileSync(path.join(__dirname, 'contracts/rest-fragment-collection.schema.json'), 'utf8'))
const validateCollectionManifest = new Ajv2020({allErrors: true, strict: false}).compile(collectionSchema)

function sha256Digest(bytes) {
    return `sha256:${crypto.createHash('sha256').update(bytes).digest('hex')}`
}

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function assertManifestShape(manifest) {
    if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) fail('REST_COLLECTION_INVALID', 'manifest must be an object')
    if (manifest.schemaVersion !== '1.0') fail('REST_COLLECTION_SCHEMA_UNSUPPORTED', JSON.stringify(manifest.schemaVersion))
    if (!['data-plane', 'control-plane'].includes(manifest.apiSurface)) fail('REST_API_SURFACE_INVALID', JSON.stringify(manifest.apiSurface))
    if (manifest.apiSurface === 'control-plane' && Object.hasOwn(manifest, 'releaseTrack')) fail('REST_CONTROL_PLANE_REJECTS_TRACK', 'control-plane manifest must omit releaseTrack')
    for (const [label, value] of [
        ['source.revision', manifest.source?.revision],
        ['generator.revision', manifest.generator?.revision],
    ]) if (!FULL_SHA.test(value || '')) fail('REST_SOURCE_REVISION_INVALID', `${label} must be a full Git SHA`)
    for (const [label, value] of [
        ['generator.configDigest', manifest.generator?.configDigest],
        ['review.manifestDigest', manifest.review?.manifestDigest],
        ['review.approvalDigest', manifest.review?.approvalDigest],
    ]) if (!DIGEST.test(value || '')) fail('REST_DIGEST_INVALID', label)
    if (!Array.isArray(manifest.services) || manifest.services.length === 0) fail('REST_SERVICES_REQUIRED', 'services must be non-empty')
    if (!validateCollectionManifest(manifest)) {
        const details = validateCollectionManifest.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_COLLECTION_SCHEMA_INVALID', details)
    }
}

function collectOperations(spec, serviceId, seenPaths, seenOperationIds) {
    let operationCount = 0
    for (const [endpoint, pathItem] of Object.entries(spec.paths || {})) {
        if (!pathItem || typeof pathItem !== 'object') continue
        for (const [method, operation] of Object.entries(pathItem)) {
            const normalizedMethod = method.toLowerCase()
            if (!HTTP_METHODS.has(normalizedMethod)) continue
            const key = `${normalizedMethod} ${endpoint}`
            operationCount++
            if (seenPaths.has(key)) fail('REST_PATH_METHOD_CONFLICT', `${key} in ${seenPaths.get(key)} and ${serviceId}`)
            seenPaths.set(key, serviceId)
            if (operation?.operationId) {
                if (seenOperationIds.has(operation.operationId)) {
                    fail('REST_OPERATION_ID_CONFLICT', `${operation.operationId} in ${seenOperationIds.get(operation.operationId)} and ${serviceId}`)
                }
                seenOperationIds.set(operation.operationId, serviceId)
            }
        }
    }
    return operationCount
}

function collectComponents(spec, serviceId, seenComponents) {
    for (const [category, entries] of Object.entries(spec.components || {})) {
        if (!entries || typeof entries !== 'object' || Array.isArray(entries) || category.startsWith('x-')) continue
        for (const [name, value] of Object.entries(entries)) {
            const key = `${category}/${name}`
            const existing = seenComponents.get(key)
            if (existing && !isDeepStrictEqual(existing.value, value)) {
                fail('REST_COMPONENT_CONFLICT', `${key} in ${existing.serviceId} and ${serviceId}`)
            }
            if (!existing) seenComponents.set(key, {serviceId, value})
        }
    }
}

function loadFragmentCollection(inputPath, expected = {}) {
    const root = path.resolve(inputPath)
    const stat = fs.statSync(root)
    if (!stat.isDirectory()) fail('REST_COLLECTION_DIRECTORY_REQUIRED', root)
    const manifestPath = path.join(root, 'collection-manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    assertManifestShape(manifest)
    if (expected.apiSurface && expected.apiSurface !== manifest.apiSurface) {
        fail('REST_COLLECTION_SURFACE_MISMATCH', `${manifest.apiSurface} != ${expected.apiSurface}`)
    }
    if (expected.releaseTrack !== undefined && expected.releaseTrack !== manifest.releaseTrack) {
        fail('REST_COLLECTION_TRACK_MISMATCH', `${manifest.releaseTrack} != ${expected.releaseTrack}`)
    }

    const declaredFiles = new Set(['collection-manifest.json'])
    const seenServices = new Set()
    const seenPaths = new Map()
    const seenOperationIds = new Map()
    const seenComponents = new Map()
    let spec = null

    for (const service of [...manifest.services].sort((left, right) => left.id.localeCompare(right.id))) {
        if (seenServices.has(service.id)) fail('REST_SERVICE_DUPLICATE', service.id)
        seenServices.add(service.id)
        if (path.basename(service.fragment) !== service.fragment) fail('REST_FRAGMENT_FILENAME_INVALID', service.fragment)
        if (!DIGEST.test(service.sha256 || '')) fail('REST_DIGEST_INVALID', `services.${service.id}.sha256`)
        declaredFiles.add(service.fragment)
        const bytes = fs.readFileSync(path.join(root, service.fragment))
        if (sha256Digest(bytes) !== service.sha256) fail('REST_FRAGMENT_DIGEST_MISMATCH', service.fragment)
        const fragment = JSON.parse(bytes.toString('utf8'))
        const identity = fragment['x-zdoc-fragment']
        if (identity?.schemaVersion !== '1.0' || identity?.apiSurface !== manifest.apiSurface || identity?.service !== service.id) {
            fail('REST_FRAGMENT_IDENTITY_MISMATCH', service.fragment)
        }
        const operationCount = collectOperations(fragment, service.id, seenPaths, seenOperationIds)
        if (operationCount !== service.operationCount) {
            fail('REST_OPERATION_COUNT_MISMATCH', `${service.fragment}: ${operationCount} != ${service.operationCount}`)
        }
        collectComponents(fragment, service.id, seenComponents)
        const mergeable = structuredClone(fragment)
        delete mergeable['x-zdoc-fragment']
        if (!spec) spec = mergeable
        else mergeSpecification(spec, mergeable)
    }

    assertNoDanglingLocalRefs(spec)

    const actualFiles = fs.readdirSync(root).filter(name => fs.statSync(path.join(root, name)).isFile())
    const undeclared = actualFiles.filter(name => !declaredFiles.has(name)).sort()
    if (undeclared.length > 0) fail('REST_COLLECTION_UNDECLARED_FILE', undeclared.join(', '))

    return {
        spec,
        manifest,
        provenance: {
            collectionId: manifest.collectionId,
            apiSurface: manifest.apiSurface,
            releaseTrack: manifest.releaseTrack,
            source: manifest.source,
            generator: manifest.generator,
            review: manifest.review,
            services: [...manifest.services].sort((left, right) => left.id.localeCompare(right.id)),
            manifestDigest: sha256Digest(fs.readFileSync(manifestPath)),
        },
    }
}

module.exports = {loadFragmentCollection, sha256Digest}
