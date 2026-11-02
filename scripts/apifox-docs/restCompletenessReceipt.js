'use strict'

const path = require('node:path')
const {loadFragmentCollection} = require('./fragmentCollection')
const {deterministicStringify} = require('./integratedSpecArtifacts')

const SHA = /^[0-9a-f]{40}$/
const DIGEST = /^sha256:[0-9a-f]{64}$/
const OP_KEY = /^(get|put|post|delete|patch|options|head|trace) \/[^\s]+$/
const RECEIPT_KEYS = [
  'schemaVersion',
  'document',
  'sourceBaselineSha',
  'sourceCheckpointSha',
  'collectionId',
  'apiSurface',
  'releaseTrack',
  'inputInventory',
  'generator',
  'review',
  'outputInventory',
  'exclusions',
  'receiptSha256',
]
// SchemaVersion 2 adds the upstream ledger accounting (design §7 T4 / open
// decision D2): the digest-bound proof that every upstream@pin operation the
// fragments do not document carries a ledger decision.
const RECEIPT_KEYS_V2 = [...RECEIPT_KEYS, 'upstreamAccounting']
const ACCOUNTING_KEYS = ['schemaVersion', 'source', 'upstreamPin', 'diffDigest', 'summary', 'unaccountedOpKeys']
const ACCOUNTING_SUMMARY_KEYS = ['upstreamAdded', 'ledgered', 'unaccounted']
const GENERATOR_KEYS = ['repository', 'revision', 'configDigest']
const REVIEW_KEYS = ['manifestDigest', 'approvalDigest']

function canonicalJson(value) {
  return deterministicStringify(value).trimEnd()
}

function sha256(value) {
  const crypto = require('node:crypto')
  return `sha256:${crypto.createHash('sha256').update(canonicalJson(value)).digest('hex')}`
}

function exactKeys(value, expected, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`)
  if (JSON.stringify(Object.keys(value).sort()) !== JSON.stringify([...expected].sort())) {
    throw new Error(`${label} keys must be exactly ${expected.join(', ')}`)
  }
}

function normalizedPath(value, label) {
  if (typeof value !== 'string' || !value || value.startsWith('/') || value.includes('\\') || value.normalize('NFC') !== value ||
      value.split('/').some(segment => !segment || segment === '.' || segment === '..') || /[\u0000-\u001f\u007f]/u.test(value)) {
    throw new Error(`${label} must be a safe normalized repository-relative path`)
  }
  return value
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0
}

function validateInventory(values, label, key) {
  if (!Array.isArray(values)) throw new Error(`${label} must be an array`)
  const seen = new Set()
  let previous = null
  for (const [index, value] of values.entries()) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label}[${index}] must be an object`)
    exactKeys(value, ['path', key], `${label}[${index}]`)
    if (!DIGEST.test(value[key] || '')) throw new Error(`${label}[${index}].${key} must be a SHA-256 digest`)
    normalizedPath(value.path, `${label}[${index}].path`)
    if (seen.has(value.path)) throw new Error(`${label} paths must be unique`)
    if (previous !== null && compareText(previous, value.path) >= 0) throw new Error(`${label} paths must be unique and canonically ordered`)
    seen.add(value.path)
    previous = value.path
  }
}

function receiptBody(receipt) {
  const {receiptSha256, ...body} = receipt
  return body
}

function validateUpstreamAccounting(value) {
  exactKeys(value, ACCOUNTING_KEYS, 'REST completeness receipt upstreamAccounting')
  if (value.schemaVersion !== '1.0') throw new Error('REST completeness receipt upstreamAccounting schemaVersion is invalid')
  if (typeof value.source !== 'string' || !value.source) throw new Error('REST completeness receipt upstreamAccounting source is invalid')
  if (!SHA.test(value.upstreamPin || '')) throw new Error('REST completeness receipt upstreamAccounting upstreamPin is invalid')
  if (!DIGEST.test(value.diffDigest || '')) throw new Error('REST completeness receipt upstreamAccounting diffDigest is invalid')
  exactKeys(value.summary, ACCOUNTING_SUMMARY_KEYS, 'REST completeness receipt upstreamAccounting summary')
  for (const key of ACCOUNTING_SUMMARY_KEYS) {
    if (!Number.isSafeInteger(value.summary[key]) || value.summary[key] < 0) throw new Error(`REST completeness receipt upstreamAccounting summary.${key} is invalid`)
  }
  if (value.summary.upstreamAdded !== value.summary.ledgered + value.summary.unaccounted) {
    throw new Error('REST completeness receipt upstreamAccounting summary is inconsistent')
  }
  if (!Array.isArray(value.unaccountedOpKeys)) throw new Error('REST completeness receipt upstreamAccounting unaccountedOpKeys must be an array')
  const seen = new Set()
  let previous = null
  for (const [index, opKey] of value.unaccountedOpKeys.entries()) {
    if (typeof opKey !== 'string' || !OP_KEY.test(opKey)) throw new Error(`REST completeness receipt upstreamAccounting unaccountedOpKeys[${index}] is invalid`)
    if (seen.has(opKey) || (previous !== null && previous >= opKey)) throw new Error('REST completeness receipt upstreamAccounting unaccountedOpKeys must be unique and canonically ordered')
    seen.add(opKey)
    previous = opKey
  }
  if (value.summary.unaccounted !== value.unaccountedOpKeys.length) throw new Error('REST completeness receipt upstreamAccounting summary disagrees with the op key list')
  // A completeness receipt with undecided upstream operations is not complete.
  if (value.summary.unaccounted > 0) throw new Error('REST completeness receipt upstreamAccounting is incomplete: undecided upstream operations remain')
  return value
}

function validateRestCompletenessReceipt(value) {
  if (value.schemaVersion === 2) {
    exactKeys(value, RECEIPT_KEYS_V2, 'REST completeness receipt')
    validateUpstreamAccounting(value.upstreamAccounting)
  } else {
    if (value.schemaVersion !== 1) throw new Error('REST completeness receipt identity is invalid')
    exactKeys(value, RECEIPT_KEYS, 'REST completeness receipt')
  }
  if (value.document !== 'rest-generation-completeness') throw new Error('REST completeness receipt identity is invalid')
  for (const key of ['sourceBaselineSha', 'sourceCheckpointSha']) if (!SHA.test(value[key] || '')) throw new Error(`REST completeness receipt ${key} is invalid`)
  if (typeof value.collectionId !== 'string' || !value.collectionId) throw new Error('REST completeness receipt collectionId is invalid')
  if (!['data-plane', 'control-plane'].includes(value.apiSurface)) throw new Error('REST completeness receipt apiSurface is invalid')
  if (value.releaseTrack !== null && typeof value.releaseTrack !== 'string') throw new Error('REST completeness receipt releaseTrack is invalid')
  exactKeys(value.generator, GENERATOR_KEYS, 'REST completeness receipt generator')
  exactKeys(value.review, REVIEW_KEYS, 'REST completeness receipt review')
  if (typeof value.generator.repository !== 'string' || !value.generator.repository) throw new Error('REST completeness receipt generator repository is invalid')
  if (!SHA.test(value.generator.revision || '')) throw new Error('REST completeness receipt generator revision is invalid')
  if (!DIGEST.test(value.generator.configDigest || '')) throw new Error('REST completeness receipt generator configDigest is invalid')
  for (const key of ['manifestDigest', 'approvalDigest']) if (!DIGEST.test(value.review[key] || '')) throw new Error(`REST completeness receipt review ${key} is invalid`)
  if (!Array.isArray(value.inputInventory) || value.inputInventory.length === 0) throw new Error('REST completeness receipt inputInventory must be non-empty')
  for (const [index, service] of value.inputInventory.entries()) {
    exactKeys(service, ['id', 'fragment', 'sha256', 'operationCount'], `REST completeness receipt inputInventory[${index}]`)
    if (typeof service.id !== 'string' || !service.id || typeof service.fragment !== 'string' || !service.fragment || path.basename(service.fragment) !== service.fragment) {
      throw new Error(`REST completeness receipt inputInventory[${index}] identity is invalid`)
    }
    if (!DIGEST.test(service.sha256 || '') || !Number.isSafeInteger(service.operationCount) || service.operationCount < 0) {
      throw new Error(`REST completeness receipt inputInventory[${index}] identity is invalid`)
    }
  }
  validateInventory(value.outputInventory, 'REST completeness receipt outputInventory', 'sha256')
  validateInventory(value.exclusions, 'REST completeness receipt exclusions', 'sha256')
  if (!DIGEST.test(value.receiptSha256) || sha256(receiptBody(value)) !== value.receiptSha256) throw new Error('REST completeness receipt checksum mismatch')
  return value
}

function createRestCompletenessReceipt({collectionDirectory, sourceBaselineSha, sourceCheckpointSha, outputInventory = [], exclusions = [], upstreamAccounting = null}) {
  for (const [label, value] of [['sourceBaselineSha', sourceBaselineSha], ['sourceCheckpointSha', sourceCheckpointSha]]) {
    if (!SHA.test(value || '')) throw new Error(`REST completeness receipt ${label} is invalid`)
  }
  const collection = loadFragmentCollection(collectionDirectory)
  const provenance = collection.provenance
  const schemaVersion = upstreamAccounting ? 2 : 1
  const body = {
    schemaVersion,
    document: 'rest-generation-completeness',
    sourceBaselineSha,
    sourceCheckpointSha,
    collectionId: provenance.collectionId,
    apiSurface: provenance.apiSurface,
    releaseTrack: provenance.releaseTrack ?? null,
    inputInventory: structuredClone(provenance.services),
    generator: structuredClone(provenance.generator),
    review: structuredClone(provenance.review),
    outputInventory: structuredClone(outputInventory),
    exclusions: structuredClone(exclusions),
    receiptSha256: 'sha256:'.padEnd(71, '0'),
  }
  if (upstreamAccounting) {
    // Cross-bind the accounting to the receipt identity: a statement about a
    // different upstream revision is not evidence about this checkpoint.
    if (upstreamAccounting.upstreamPin !== sourceCheckpointSha) {
      throw new Error('REST completeness receipt upstreamAccounting upstreamPin must equal the receipt sourceCheckpointSha')
    }
    body.upstreamAccounting = structuredClone(upstreamAccounting)
  }
  body.outputInventory.sort((left, right) => compareText(left.path, right.path))
  body.exclusions.sort((left, right) => compareText(left.path, right.path))
  body.receiptSha256 = sha256(receiptBody(body))
  return validateRestCompletenessReceipt(body)
}

function validateRestDeletionEvidence({receipt, sourcePath, sourceExistedAtBaseline = true, sourceMissingAtCheckpoint = true}) {
  const value = validateRestCompletenessReceipt(receipt)
  normalizedPath(sourcePath, 'REST deletion source path')
  if (sourceExistedAtBaseline !== true) throw new Error('REST deletion source path must exist at the authenticated baseline')
  if (sourceMissingAtCheckpoint !== true) throw new Error('REST deletion source path must be absent from the complete checkpoint')
  if (value.outputInventory.some(entry => entry.path === sourcePath)) throw new Error('REST deletion source path is present in the complete output inventory')
  if (value.exclusions.some(entry => entry.path === sourcePath)) throw new Error('REST deletion source path is excluded from completeness evidence')
  return value
}

module.exports = {
  createRestCompletenessReceipt,
  receiptBody,
  validateRestCompletenessReceipt,
  validateRestDeletionEvidence,
}
