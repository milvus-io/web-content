'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {createRestCompletenessReceipt, validateRestCompletenessReceipt, validateRestDeletionEvidence} = require('./restCompletenessReceipt')
const {sha256Digest} = require('./fragmentCollection')

const SHA_A = 'a'.repeat(40)
const SHA_B = 'b'.repeat(40)

function fragment(service, endpoint, operationId) {
  return {
    openapi: '3.0.3',
    info: {title: 'REST', version: 'v2'},
    'x-zdoc-fragment': {schemaVersion: '1.0', apiSurface: 'control-plane', service},
    tags: [{name: service}],
    paths: {[endpoint]: {get: {operationId, tags: [service], responses: {200: {$ref: '#/components/responses/Shared'}}}}},
    components: {responses: {Shared: {description: 'shared'}}},
  }
}

function writeCollection(services) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-completeness-collection-'))
  const entries = services.map(service => {
    const filename = `${service.id}.openapi.json`
    const bytes = Buffer.from(`${JSON.stringify(service.spec, null, 2)}\n`)
    fs.writeFileSync(path.join(root, filename), bytes)
    return {id: service.id, fragment: filename, sha256: sha256Digest(bytes), operationCount: 1}
  })
  const manifest = {
    schemaVersion: '1.0', collectionId: 'control-plane-completeness', apiSurface: 'control-plane',
    source: {repository: 'zilliz-cloud', revision: SHA_A},
    generator: {repository: 'feishu-markdown-bridge', revision: SHA_B, configDigest: `sha256:${'1'.repeat(64)}`},
    review: {manifestDigest: `sha256:${'1'.repeat(64)}`, approvalDigest: `sha256:${'2'.repeat(64)}`},
    services: entries,
  }
  fs.writeFileSync(path.join(root, 'collection-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  return root
}

function inventoryEntry(root, relative, content) {
  const target = path.join(root, relative)
  fs.mkdirSync(path.dirname(target), {recursive: true})
  fs.writeFileSync(target, content)
  return {path: relative, sha256: sha256Digest(Buffer.from(content))}
}

test('creates and validates a complete REST generation receipt from a fragment collection', () => {
  const collection = writeCollection([
    {id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')},
    {id: 'usage', spec: fragment('usage', '/v2/usage', 'getUsage')},
  ])
  const generatedRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-completeness-generated-'))
  const output = [
    inventoryEntry(generatedRoot, 'content/en/reference/api/restful/restful/v2/projects.mdx', '# Projects\n'),
    inventoryEntry(generatedRoot, 'content/en/reference/api/restful/restful/v2/usage.mdx', '# Usage\n'),
  ]
  const receipt = createRestCompletenessReceipt({
    collectionDirectory: collection,
    sourceBaselineSha: SHA_A,
    sourceCheckpointSha: SHA_B,
    outputInventory: output,
  })
  assert.equal(validateRestCompletenessReceipt(receipt), receipt)
  assert.equal(receipt.inputInventory.length, 2)
  assert.equal(receipt.outputInventory.length, 2)
  fs.rmSync(collection, {recursive: true, force: true})
  fs.rmSync(generatedRoot, {recursive: true, force: true})
})

test('rest deletion evidence requires baseline presence and complete checkpoint absence', () => {
  const collection = writeCollection([
    {id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')},
  ])
  const generatedRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-completeness-deletion-'))
  const output = [inventoryEntry(generatedRoot, 'content/en/reference/api/restful/restful/v2/projects.mdx', '# Projects\n')]
  const receipt = createRestCompletenessReceipt({
    collectionDirectory: collection,
    sourceBaselineSha: SHA_A,
    sourceCheckpointSha: SHA_B,
    outputInventory: output,
  })
  const deletedPath = 'content/en/reference/api/restful/restful/v2/old.mdx'
  assert.equal(validateRestDeletionEvidence({receipt, sourcePath: deletedPath}), receipt)
  assert.throws(() => validateRestDeletionEvidence({receipt, sourcePath: deletedPath, sourceMissingAtCheckpoint: false}), /absent.*complete checkpoint/)
  assert.throws(() => validateRestDeletionEvidence({receipt, sourcePath: output[0].path}), /present.*complete output inventory/)
  fs.rmSync(collection, {recursive: true, force: true})
  fs.rmSync(generatedRoot, {recursive: true, force: true})
})
