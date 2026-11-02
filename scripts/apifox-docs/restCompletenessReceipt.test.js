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

// SchemaVersion 2 embeds the upstream ledger accounting (design §7 T4 / D2);
// creating the receipt cross-binds its upstreamPin to sourceCheckpointSha.
const ACCOUNTING = {
  schemaVersion: '1.0',
  source: 'zilliz-cloud-control-plane',
  upstreamPin: SHA_B,
  diffDigest: `sha256:${'3'.repeat(64)}`,
  summary: {upstreamAdded: 2, ledgered: 2, unaccounted: 0},
  unaccountedOpKeys: [],
}

test('receipts carry the upstream accounting as schemaVersion 2 when supplied', () => {
  const collection = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
  try {
    const receipt = createRestCompletenessReceipt({
      collectionDirectory: collection,
      sourceBaselineSha: SHA_A,
      sourceCheckpointSha: SHA_B,
      upstreamAccounting: ACCOUNTING,
    })
    assert.equal(receipt.schemaVersion, 2)
    assert.deepEqual(receipt.upstreamAccounting, ACCOUNTING)
    assert.equal(validateRestCompletenessReceipt(receipt), receipt)
  } finally {
    fs.rmSync(collection, {recursive: true, force: true})
  }
})

test('schemaVersion 1 receipts stay byte-compatible without accounting', () => {
  const collection = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
  try {
    const receipt = createRestCompletenessReceipt({
      collectionDirectory: collection,
      sourceBaselineSha: SHA_A,
      sourceCheckpointSha: SHA_B,
    })
    assert.equal(receipt.schemaVersion, 1)
    assert.ok(!('upstreamAccounting' in receipt))
    assert.equal(validateRestCompletenessReceipt(receipt), receipt)
  } finally {
    fs.rmSync(collection, {recursive: true, force: true})
  }
})

test('v2 accounting must be about the receipt checkpoint: a foreign upstreamPin is rejected at creation', () => {
  const collection = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
  try {
    assert.throws(
      () => createRestCompletenessReceipt({
        collectionDirectory: collection,
        sourceBaselineSha: SHA_A,
        sourceCheckpointSha: SHA_B,
        upstreamAccounting: {...ACCOUNTING, upstreamPin: SHA_A},
      }),
      /upstreamAccounting upstreamPin must equal the receipt sourceCheckpointSha/,
    )
  } finally {
    fs.rmSync(collection, {recursive: true, force: true})
  }
})

test('v2 accounting fails closed on undecided operations, inconsistent summaries, and wrong shapes', () => {
  const collection = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
  try {
    const build = accounting => createRestCompletenessReceipt({
      collectionDirectory: collection,
      sourceBaselineSha: SHA_A,
      sourceCheckpointSha: SHA_B,
      upstreamAccounting: accounting,
    })
    assert.throws(() => build({...ACCOUNTING, summary: {upstreamAdded: 2, ledgered: 1, unaccounted: 1}, unaccountedOpKeys: ['get /v2/projects']}),
      /upstreamAccounting is incomplete: undecided upstream operations remain/)
    assert.throws(() => build({...ACCOUNTING, summary: {upstreamAdded: 3, ledgered: 2, unaccounted: 0}}),
      /summary is inconsistent/)
    assert.throws(() => build({...ACCOUNTING, upstreamPin: 'short'}), /upstreamAccounting upstreamPin/)
    assert.throws(() => build({...ACCOUNTING, unaccountedOpKeys: ['get /v2/projects']}),
      /summary disagrees with the op key list/)
    assert.throws(() => build({...ACCOUNTING, diffDigest: 'sha256:short'}), /upstreamAccounting diffDigest is invalid/)
    // a hand-edited v2 receipt with a stale checksum fails the integrity gate
    const tampered = JSON.parse(JSON.stringify(build({...ACCOUNTING, unaccountedOpKeys: []})))
    tampered.upstreamAccounting.summary.ledgered = 99
    assert.throws(() => validateRestCompletenessReceipt(tampered), /checksum mismatch|summary is inconsistent/)
  } finally {
    fs.rmSync(collection, {recursive: true, force: true})
  }
})

test('v2 accounting op keys must be canonical method-path pairs, unique and ordered', () => {
  const collection = writeCollection([{id: 'projects', spec: fragment('projects', '/v2/projects', 'listProjects')}])
  try {
    const build = unaccountedOpKeys => createRestCompletenessReceipt({
      collectionDirectory: collection,
      sourceBaselineSha: SHA_A,
      sourceCheckpointSha: SHA_B,
      upstreamAccounting: {...ACCOUNTING,
        summary: {upstreamAdded: 1, ledgered: 0, unaccounted: 1},
        unaccountedOpKeys},
    })
    assert.throws(() => build(['GET /v2/projects']), /unaccountedOpKeys\[0\] is invalid/)
    assert.throws(() => build(['get /v2/projects', 'get /v2/projects']), /unique and canonically ordered/)
    assert.throws(() => build(['get /v2/usage', 'get /v2/projects']), /unique and canonically ordered/)
    // a single undecided op key is shape-valid but fails the completeness gate
    assert.throws(() => build(['get /v2/projects']), /incomplete: undecided upstream operations remain/)
  } finally {
    fs.rmSync(collection, {recursive: true, force: true})
  }
})
