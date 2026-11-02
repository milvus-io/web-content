'use strict'

/*
 * Gate for the fragment-to-canonical transition (design §11, P3). The
 * fragment-migration.json bookkeeping was hand-edited and unverified; this
 * module makes it machine-checked:
 *
 * 1. Consistency (always): the migration file validates against its contract,
 *    every classified file exists, file names are unique, and the declared
 *    operationCount matches the real operation inventory of the fragment.
 * 2. Canonical readiness (--canonical-ready): every apiSurface that carries a
 *    canonical fragment must have a loadable fragment collection (manifest,
 *    identity stamps, digests, op counts, refs — loadFragmentCollection) whose
 *    services cover exactly those canonical fragments with the current bytes,
 *    and the upstream ledger accounting for that surface's source must be
 *    complete (T4: nothing upstream is undocumented and undecided).
 */

const fs = require('node:fs')
const path = require('node:path')
const Ajv2020 = require('ajv/dist/2020')
const {loadFragmentCollection, sha256Digest} = require('../fragmentCollection')
const {accountUpstreamOperations, assertAccountingComplete} = require('./accounting')

const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'])
const migrationSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-fragment-migration.schema.json'), 'utf8'))
const validateMigration = new Ajv2020({allErrors: true, strict: false}).compile(migrationSchema)

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function parseRestFragmentMigration(text, label = 'fragment-migration.json') {
    let migration
    try {
        migration = JSON.parse(text)
    } catch (error) {
        fail('REST_UPSTREAM_MIGRATION_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    if (!validateMigration(migration)) {
        const details = validateMigration.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_UPSTREAM_MIGRATION_SCHEMA_INVALID', details)
    }
    const seen = new Set()
    for (const fragment of migration.fragments) {
        if (seen.has(fragment.file)) fail('REST_UPSTREAM_MIGRATION_DUPLICATE_FILE', fragment.file)
        seen.add(fragment.file)
    }
    return migration
}

function loadRestFragmentMigration(filePath) {
    return parseRestFragmentMigration(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

function countOperations(fragmentDocument) {
    let count = 0
    for (const pathItem of Object.values(fragmentDocument.paths || {})) {
        if (!pathItem || typeof pathItem !== 'object') continue
        for (const method of Object.keys(pathItem)) {
            if (HTTP_METHODS.has(method.toLowerCase())) count++
        }
    }
    return count
}

/*
 * Consistency gate: the bookkeeping describes the fragments it claims to.
 */
function assertMigrationConsistency({migration, fragmentsDir}) {
    for (const fragment of migration.fragments) {
        const filePath = path.join(fragmentsDir, fragment.file)
        let document
        if (!fs.existsSync(filePath)) fail('REST_UPSTREAM_MIGRATION_FILE_MISSING', `${fragment.file} (declared in fragment-migration.json, absent under ${fragmentsDir})`)
        try {
            document = JSON.parse(fs.readFileSync(filePath, 'utf8'))
        } catch (error) {
            fail('REST_UPSTREAM_MIGRATION_FILE_MALFORMED', `${fragment.file}: ${error.message}`)
        }
        const actual = countOperations(document)
        if (actual !== fragment.operationCount) {
            fail('REST_UPSTREAM_MIGRATION_OPERATION_COUNT', `${fragment.file}: migration declares ${fragment.operationCount} operations, fragment carries ${actual}`)
        }
    }
    return migration
}

/*
 * Canonical-readiness gate. `collectionDir` is the candidate canonical
 * collection (manifest + fragment copies); `diff`/`ledger` prove the upstream
 * accounting for the surface — `expectedSourceId` binds that diff to the
 * lock's source for the canonical surface, so an arbitrary completed diff
 * cannot stand in for the real upstream accounting. Canonical fragments of a
 * surface with no candidate collection fail closed.
 */
function assertCanonicalReady({migration, fragmentsDir, collectionDir, diff, ledger, expectedSourceId = null}) {
    const canonicalSurfaces = new Set(migration.fragments.filter(fragment => fragment.migrationState === 'canonical').map(fragment => fragment.apiSurface))
    if (canonicalSurfaces.size === 0) {
        fail('REST_UPSTREAM_MIGRATION_NOTHING_CANONICAL', 'no fragment is in the canonical state; nothing to gate')
    }
    const canonicalBySurface = new Map()
    for (const fragment of migration.fragments) {
        if (fragment.migrationState !== 'canonical') continue
        if (!canonicalBySurface.has(fragment.apiSurface)) canonicalBySurface.set(fragment.apiSurface, [])
        canonicalBySurface.get(fragment.apiSurface).push(fragment)
    }
    assertMigrationConsistency({migration, fragmentsDir})

    const collection = loadFragmentCollection(collectionDir)
    const servicesById = new Map(collection.manifest.services.map(service => [service.id, service]))
    const surfaces = new Set(canonicalBySurface.keys())
    if (!surfaces.has(collection.manifest.apiSurface)) {
        fail('REST_UPSTREAM_MIGRATION_SURFACE_MISMATCH', `canonical surfaces ${[...surfaces].sort().join(', ')} do not include the collection surface ${collection.manifest.apiSurface}`)
    }
    // Canonical collections name their fragments `*.openapi.json`; the legacy
    // tree keeps `NN-name.json`. The stable join key is the service id.
    for (const fragment of canonicalBySurface.get(collection.manifest.apiSurface)) {
        const service = servicesById.get(fragment.service)
        if (!service) fail('REST_UPSTREAM_MIGRATION_CANONICAL_UNDECLARED', `${fragment.file} (service ${fragment.service}) is canonical but the collection manifest does not declare it`)
        const bytes = fs.readFileSync(path.join(fragmentsDir, fragment.file))
        if (service.sha256 !== sha256Digest(bytes)) {
            fail('REST_UPSTREAM_MIGRATION_CANONICAL_STALE', `${fragment.file}: the collection manifest pins different bytes than the fragment tree`)
        }
        if (service.operationCount !== fragment.operationCount) {
            fail('REST_UPSTREAM_MIGRATION_CANONICAL_COUNT', `${fragment.file}: collection manifest and migration disagree on the operation count`)
        }
    }
    // The other direction: a collection service whose fragment the migration
    // still holds in a pre-canonical state would let exactly the premature
    // promotion this gate exists to catch slip through.
    const canonicalServices = new Set(canonicalBySurface.get(collection.manifest.apiSurface).map(fragment => fragment.service))
    for (const service of servicesById.values()) {
        if (!canonicalServices.has(service.id)) {
            fail('REST_UPSTREAM_MIGRATION_CANONICAL_OVERCOVERED', `collection service ${service.id} is not a canonical fragment of surface ${collection.manifest.apiSurface}`)
        }
    }
    // T4 accounting for the surface's upstream source: nothing undocumented
    // and undecided, and provably the accounting OF that source — a diff from
    // a different (or invented) source id proves nothing about this surface.
    if (expectedSourceId && diff.source !== expectedSourceId) {
        fail('REST_UPSTREAM_MIGRATION_DIFF_SOURCE_MISMATCH', `accounting diff is for ${JSON.stringify(diff.source)}, not the ${collection.manifest.apiSurface} source ${JSON.stringify(expectedSourceId)}`)
    }
    assertAccountingComplete(accountUpstreamOperations({diff, ledger}))
    return collection
}

module.exports = {parseRestFragmentMigration, loadRestFragmentMigration, assertMigrationConsistency, assertCanonicalReady, countOperations}
