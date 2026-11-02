const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {parseRestFragmentMigration, assertMigrationConsistency, assertCanonicalReady} = require('./migration')
const {sha256Digest} = require('../fragmentCollection')

const SHA = 'a'.repeat(40)

function fragmentDocument(service, endpoint, operationId, apiSurface = 'data-plane') {
    return {
        openapi: '3.0.3',
        info: {title: 'REST', version: 'v2'},
        'x-zdoc-fragment': {schemaVersion: '1.0', apiSurface, service},
        paths: {[endpoint]: {post: {operationId, responses: {200: {description: 'ok'}}}}},
    }
}

function writeFragment(root, fileName, document) {
    const bytes = Buffer.from(`${JSON.stringify(document, null, 2)}\n`)
    fs.writeFileSync(path.join(root, fileName), bytes)
    return bytes
}

function migrationFile(fragments) {
    return {
        schemaVersion: '1.0',
        legacyRoot: 'packages/docs-tooling/src/reference/rest/meta/openapi',
        canonicalContract: 'packages/docs-tooling/src/reference/rest/contracts/rest-fragment-collection.schema.json',
        allowedStates: ['legacy-shadow-required', 'shadow-equivalent', 'canonical'],
        fragments,
    }
}

function workspace({canonicalCount = 1, declareCollection = true, staleBytes = false, countDrift = false} = {}) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-migration-'))
    const fragmentsDir = path.join(root, 'openapi')
    fs.mkdirSync(fragmentsDir)
    const alphaBytes = writeFragment(fragmentsDir, '01-alpha-operations.json',
        fragmentDocument('alpha-v2', '/v2/vectordb/alpha', 'alphaOp'))
    writeFragment(fragmentsDir, '02-beta-operations.json',
        fragmentDocument('beta-v2', '/v2/vectordb/beta', 'betaOp'))
    const operationCount = countDrift ? 2 : 1
    const migration = migrationFile([
        {file: '01-alpha-operations.json', apiSurface: 'data-plane', service: 'alpha-v2', operationCount, migrationState: 'canonical'},
        {file: '02-beta-operations.json', apiSurface: 'data-plane', service: 'beta-v2', operationCount: 1, migrationState: 'legacy-shadow-required'},
    ])
    const collectionDir = path.join(root, 'collection')
    fs.mkdirSync(collectionDir)
    if (declareCollection) {
        const bytes = staleBytes ? Buffer.concat([alphaBytes, Buffer.from(' ')]) : alphaBytes
        // Canonical collections name fragments `*.openapi.json`; the stable join
        // key to the migration bookkeeping is the service id.
        fs.writeFileSync(path.join(collectionDir, '01-alpha-operations.openapi.json'), bytes)
        const manifest = {
            schemaVersion: '1.0',
            collectionId: 'fixture-data-plane',
            apiSurface: 'data-plane',
            source: {repository: 'fixture/milvus', revision: SHA},
            generator: {repository: 'fixture/generator', revision: SHA, configDigest: `sha256:${'1'.repeat(64)}`},
            review: {manifestDigest: `sha256:${'2'.repeat(64)}`, approvalDigest: `sha256:${'3'.repeat(64)}`},
            services: [{id: 'alpha-v2', fragment: '01-alpha-operations.openapi.json', sha256: sha256Digest(bytes), operationCount: 1}],
        }
        fs.writeFileSync(path.join(collectionDir, 'collection-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
    }
    return {root, fragmentsDir, collectionDir, migrationPath: path.join(root, 'fragment-migration.json'), migration}
}

function cleanUp(root) {
    fs.rmSync(root, {recursive: true, force: true})
}

function accountingInputs(diffEntries = []) {
    return {
        diff: {schemaVersion: '1.0', source: 'milvus-data-plane', publicationTarget: 'milvus', upstreamPin: SHA, summary: {}, entries: diffEntries},
        ledger: {schemaVersion: '1.0', entries: []},
    }
}

test('migration parsing enforces the contract, unique files, and the state vocabulary', () => {
    const parsed = parseRestFragmentMigration(JSON.stringify(migrationFile([
        {file: '01-alpha-operations.json', apiSurface: 'data-plane', service: 'alpha-v2', operationCount: 1, migrationState: 'canonical'},
    ])))
    assert.equal(parsed.fragments[0].migrationState, 'canonical')
    assert.throws(() => parseRestFragmentMigration('{}'), /REST_UPSTREAM_MIGRATION_SCHEMA_INVALID/)
    assert.throws(() => parseRestFragmentMigration(JSON.stringify(migrationFile([
        {file: '01-alpha-operations.json', apiSurface: 'data-plane', service: 'alpha-v2', operationCount: 1, migrationState: 'promoted'},
    ]))), /REST_UPSTREAM_MIGRATION_SCHEMA_INVALID/)
    assert.throws(() => parseRestFragmentMigration(JSON.stringify(migrationFile([
        {file: '01-alpha-operations.json', apiSurface: 'data-plane', service: 'alpha-v2', operationCount: 1, migrationState: 'canonical'},
        {file: '01-alpha-operations.json', apiSurface: 'data-plane', service: 'alpha-v2', operationCount: 1, migrationState: 'canonical'},
    ]))), /REST_UPSTREAM_MIGRATION_DUPLICATE_FILE/)
    assert.throws(() => parseRestFragmentMigration('nope'), /REST_UPSTREAM_MIGRATION_MALFORMED_JSON/)
})

test('consistency gate: every classified file exists and the declared operation count is the ground truth', () => {
    const ws = workspace()
    try {
        const migration = parseRestFragmentMigration(JSON.stringify(ws.migration))
        assertMigrationConsistency({migration, fragmentsDir: ws.fragmentsDir})
        assert.throws(
            () => assertMigrationConsistency({migration, fragmentsDir: path.join(ws.root, 'absent')}),
            /REST_UPSTREAM_MIGRATION_FILE_MISSING/,
        )
        const drifted = parseRestFragmentMigration(JSON.stringify(migrationFile([
            {file: '01-alpha-operations.json', apiSurface: 'data-plane', service: 'alpha-v2', operationCount: 7, migrationState: 'canonical'},
            {file: '02-beta-operations.json', apiSurface: 'data-plane', service: 'beta-v2', operationCount: 1, migrationState: 'legacy-shadow-required'},
        ])))
        assert.throws(
            () => assertMigrationConsistency({migration: drifted, fragmentsDir: ws.fragmentsDir}),
            /REST_UPSTREAM_MIGRATION_OPERATION_COUNT/,
        )
    } finally {
        cleanUp(ws.root)
    }
})

test('canonical readiness: collection covers the canonical fragments with current bytes and accounting is complete', () => {
    const ws = workspace()
    try {
        const migration = parseRestFragmentMigration(JSON.stringify(ws.migration))
        const collection = assertCanonicalReady({migration, fragmentsDir: ws.fragmentsDir, collectionDir: ws.collectionDir, ...accountingInputs()})
        assert.equal(collection.manifest.collectionId, 'fixture-data-plane')
    } finally {
        cleanUp(ws.root)
    }
})

test('canonical readiness rejects a collection that promotes a fragment still held pre-canonical', () => {
    const ws = workspace()
    try {
        // declare a service for the legacy-shadow-required fragment too
        const betaBytes = writeFragment(ws.fragmentsDir, '02-beta-operations.json',
            fragmentDocument('beta-v2', '/v2/vectordb/beta', 'betaOp'))
        fs.writeFileSync(path.join(ws.collectionDir, '02-beta-operations.openapi.json'), betaBytes)
        const manifest = JSON.parse(fs.readFileSync(path.join(ws.collectionDir, 'collection-manifest.json'), 'utf8'))
        manifest.services.push({id: 'beta-v2', fragment: '02-beta-operations.openapi.json', sha256: sha256Digest(betaBytes), operationCount: 1})
        fs.writeFileSync(path.join(ws.collectionDir, 'collection-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
        const migration = parseRestFragmentMigration(JSON.stringify(ws.migration))
        assert.throws(
            () => assertCanonicalReady({migration, fragmentsDir: ws.fragmentsDir, collectionDir: ws.collectionDir, ...accountingInputs()}),
            /REST_UPSTREAM_MIGRATION_CANONICAL_OVERCOVERED/,
        )
    } finally {
        cleanUp(ws.root)
    }
    // a fresh workspace: the accounting diff must be the canonical surface's
    // own upstream source, not any completed diff
    const clean = workspace()
    try {
        const migration = parseRestFragmentMigration(JSON.stringify(clean.migration))
        assert.throws(
            () => assertCanonicalReady({migration, fragmentsDir: clean.fragmentsDir, collectionDir: clean.collectionDir,
                diff: {...accountingInputs().diff, source: 'some-other-source'}, ledger: {schemaVersion: '1.0', entries: []},
                expectedSourceId: 'milvus-data-plane'}),
            /REST_UPSTREAM_MIGRATION_DIFF_SOURCE_MISMATCH/,
        )
    } finally {
        cleanUp(clean.root)
    }
})

test('canonical readiness fails closed on stale bytes, undeclared fragments, missing collection, and undecided upstream operations', () => {
    for (const [name, options, expected] of [
        ['stale bytes', {staleBytes: true}, /REST_UPSTREAM_MIGRATION_CANONICAL_STALE/],
        ['stale count', {countDrift: true}, /REST_UPSTREAM_MIGRATION_OPERATION_COUNT/],
        ['no collection', {declareCollection: false}, /ENOENT|REST_COLLECTION_/],
    ]) {
        const ws = workspace(options)
        try {
            const migration = parseRestFragmentMigration(JSON.stringify(ws.migration))
            assert.throws(
                () => assertCanonicalReady({migration, fragmentsDir: ws.fragmentsDir, collectionDir: ws.collectionDir, ...accountingInputs()}),
                expected,
                name,
            )
        } finally {
            cleanUp(ws.root)
        }
    }
    const ws = workspace()
    try {
        const migration = parseRestFragmentMigration(JSON.stringify(ws.migration))
        const undecided = [{opKey: 'post /v2/vectordb/snapshots/list', category: 'upstream-added', scope: 'operation',
            change: {kind: 'operation-absent-in-fragments', before: null, after: null}, evidence: '/paths/x/post'}]
        assert.throws(
            () => assertCanonicalReady({migration, fragmentsDir: ws.fragmentsDir, collectionDir: ws.collectionDir, ...accountingInputs(undecided)}),
            /REST_UPSTREAM_LEDGER_ACCOUNTING_INCOMPLETE/,
        )
    } finally {
        cleanUp(ws.root)
    }
})

test('canonical readiness refuses to run when nothing is canonical', () => {
    const ws = workspace()
    try {
        const migration = parseRestFragmentMigration(JSON.stringify(migrationFile([
            {file: '01-alpha-operations.json', apiSurface: 'data-plane', service: 'alpha-v2', operationCount: 1, migrationState: 'legacy-shadow-required'},
            {file: '02-beta-operations.json', apiSurface: 'data-plane', service: 'beta-v2', operationCount: 1, migrationState: 'legacy-shadow-required'},
        ])))
        assert.throws(
            () => assertCanonicalReady({migration, fragmentsDir: ws.fragmentsDir, collectionDir: ws.collectionDir, ...accountingInputs()}),
            /REST_UPSTREAM_MIGRATION_NOTHING_CANONICAL/,
        )
    } finally {
        cleanUp(ws.root)
    }
})
