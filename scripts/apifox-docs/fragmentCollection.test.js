const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {loadFragmentCollection, sha256Digest} = require('./fragmentCollection')

const SHA_A = 'a'.repeat(40)
const SHA_B = 'b'.repeat(40)
const DIGEST_A = `sha256:${'1'.repeat(64)}`
const DIGEST_B = `sha256:${'2'.repeat(64)}`

function fragment(service, endpoint, operationId, componentDescription = 'shared') {
    return {
        openapi: '3.0.3',
        info: {title: 'REST', version: 'v2'},
        'x-zdoc-fragment': {schemaVersion: '1.0', apiSurface: 'control-plane', service},
        tags: [{name: service}],
        paths: {[endpoint]: {get: {operationId, tags: [service], responses: {200: {$ref: '#/components/responses/Shared'}}}}},
        components: {responses: {Shared: {description: componentDescription}}},
    }
}

function writeCollection(services) {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fragment-collection-'))
    const entries = services.map(service => {
        const filename = `${service.id}.openapi.json`
        const bytes = Buffer.from(`${JSON.stringify(service.spec, null, 2)}\n`)
        fs.writeFileSync(path.join(root, filename), bytes)
        return {id: service.id, fragment: filename, sha256: sha256Digest(bytes), operationCount: 1}
    })
    const manifest = {
        schemaVersion: '1.0', collectionId: 'control-plane-fixture', apiSurface: 'control-plane',
        source: {repository: 'zilliz-cloud', revision: SHA_A},
        generator: {repository: 'feishu-markdown-bridge', revision: SHA_B, configDigest: DIGEST_A},
        review: {manifestDigest: DIGEST_A, approvalDigest: DIGEST_B}, services: entries,
    }
    fs.writeFileSync(path.join(root, 'collection-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
    return root
}

test('loads a homogeneous manifest-backed collection with provenance', () => {
    const root = writeCollection([
        {id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')},
        {id: 'usage', spec: fragment('usage', '/v2/usage', 'getUsage')},
    ])
    const loaded = loadFragmentCollection(root, {apiSurface: 'control-plane'})
    assert.deepEqual(Object.keys(loaded.spec.paths).sort(), ['/v2/projects', '/v2/usage'])
    assert.equal(loaded.provenance.source.revision, SHA_A)
    assert.deepEqual(loaded.provenance.services.map(service => service.id), ['projects', 'usage'])
    fs.rmSync(root, {recursive: true, force: true})
})

test('rejects digest tampering and fragment identity mismatch', () => {
    const root = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
    fs.appendFileSync(path.join(root, 'projects.openapi.json'), ' ')
    assert.throws(() => loadFragmentCollection(root), /REST_FRAGMENT_DIGEST_MISMATCH/)
    fs.rmSync(root, {recursive: true, force: true})
})

test('rejects path, operationId, and component conflicts across services', () => {
    let root = writeCollection([
        {id: 'projects', spec: fragment('projects', '/v2/shared', 'first')},
        {id: 'usage', spec: fragment('usage', '/v2/shared', 'second')},
    ])
    assert.throws(() => loadFragmentCollection(root), /REST_PATH_METHOD_CONFLICT/)
    fs.rmSync(root, {recursive: true, force: true})

    root = writeCollection([
        {id: 'projects', spec: fragment('projects', '/v2/projects', 'duplicate')},
        {id: 'usage', spec: fragment('usage', '/v2/usage', 'duplicate')},
    ])
    assert.throws(() => loadFragmentCollection(root), /REST_OPERATION_ID_CONFLICT/)
    fs.rmSync(root, {recursive: true, force: true})

    root = writeCollection([
        {id: 'projects', spec: fragment('projects', '/v2/projects', 'one', 'first')},
        {id: 'usage', spec: fragment('usage', '/v2/usage', 'two', 'second')},
    ])
    assert.throws(() => loadFragmentCollection(root), /REST_COMPONENT_CONFLICT/)
    fs.rmSync(root, {recursive: true, force: true})
})

test('control-plane collections reject publication tracks and undeclared files', () => {
    const root = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
    const manifestPath = path.join(root, 'collection-manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    manifest.releaseTrack = '2.6.x'
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    assert.throws(() => loadFragmentCollection(root), /REST_CONTROL_PLANE_REJECTS_TRACK/)
    delete manifest.releaseTrack
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    fs.writeFileSync(path.join(root, 'extra.json'), '{}\n')
    assert.throws(() => loadFragmentCollection(root), /REST_COLLECTION_UNDECLARED_FILE/)
    fs.rmSync(root, {recursive: true, force: true})
})

test('validates the collection schema and declared operation counts', () => {
    let root = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
    let manifestPath = path.join(root, 'collection-manifest.json')
    let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    manifest.unexpected = true
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    assert.throws(() => loadFragmentCollection(root), /REST_COLLECTION_SCHEMA_INVALID/)
    fs.rmSync(root, {recursive: true, force: true})

    root = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
    manifestPath = path.join(root, 'collection-manifest.json')
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    manifest.services[0].operationCount = 2
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
    assert.throws(() => loadFragmentCollection(root), /REST_OPERATION_COUNT_MISMATCH/)
    fs.rmSync(root, {recursive: true, force: true})
})

test('rejects dangling local references before publication transforms', () => {
    const spec = fragment('projects', '/v2/projects', 'listProjects')
    spec.paths['/v2/projects'].get.responses[200] = {$ref: '#/components/responses/Missing'}
    const root = writeCollection([{id: 'projects', spec}])
    assert.throws(() => loadFragmentCollection(root), /REST_OPENAPI_REF_MISSING/)
    fs.rmSync(root, {recursive: true, force: true})
})
