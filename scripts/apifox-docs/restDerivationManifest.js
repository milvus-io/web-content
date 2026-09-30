const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const FULL_SHA = /^[a-f0-9]{40}$/
const SHA256 = /^[a-f0-9]{64}$/
const LOCALES = new Set(['en', 'zh-CN', 'ja-JP'])

function sha256(bytes) {
  return crypto.createHash('sha256').update(bytes).digest('hex')
}

function canonicalJson(value) {
  if (Array.isArray(value)) return value.map(canonicalJson)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonicalJson(value[key])]))
  }
  return value
}

function fragmentHashes(fragmentRoot) {
  const root = fs.realpathSync(fragmentRoot)
  const entries = fs.readdirSync(root, {withFileTypes: true})
  const unsupported = entries.filter(entry => !entry.isFile() || !entry.name.endsWith('.json'))
  if (unsupported.length > 0) {
    throw new Error(`REST_DERIVATION_FRAGMENT_SET_INVALID: ${unsupported.map(entry => entry.name).sort().join(', ')}`)
  }
  return Object.fromEntries(entries.map(entry => entry.name).sort().map(file => [
    file,
    sha256(fs.readFileSync(path.join(root, file))),
  ]))
}

function buildRestDerivationManifest({fragmentRoot, locale, toolingSha, generatedAt}) {
  if (!LOCALES.has(locale)) throw new Error(`REST_DERIVATION_LOCALE_INVALID: ${locale}`)
  if (!FULL_SHA.test(toolingSha || '')) throw new Error('REST_DERIVATION_TOOLING_SHA_INVALID')
  if (typeof generatedAt !== 'string' || new Date(generatedAt).toISOString() !== generatedAt) {
    throw new Error('REST_DERIVATION_GENERATED_AT_INVALID')
  }
  return {
    schemaVersion: 1,
    locale,
    fragmentHashes: fragmentHashes(fragmentRoot),
    toolingSha,
    generatedAt,
  }
}

function parseRestDerivationManifest(value, expectedLocale) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('REST_DERIVATION_MANIFEST_INVALID')
  const keys = Object.keys(value).sort()
  const expectedKeys = ['fragmentHashes', 'generatedAt', 'locale', 'schemaVersion', 'toolingSha']
  if (keys.length !== expectedKeys.length || keys.some((key, index) => key !== expectedKeys[index])) {
    throw new Error('REST_DERIVATION_MANIFEST_KEYS_INVALID')
  }
  if (value.schemaVersion !== 1) throw new Error('REST_DERIVATION_SCHEMA_UNSUPPORTED')
  if (!LOCALES.has(value.locale)) throw new Error(`REST_DERIVATION_LOCALE_INVALID: ${value.locale}`)
  if (!FULL_SHA.test(value.toolingSha || '')) throw new Error('REST_DERIVATION_TOOLING_SHA_INVALID')
  if (typeof value.generatedAt !== 'string' || new Date(value.generatedAt).toISOString() !== value.generatedAt) {
    throw new Error('REST_DERIVATION_GENERATED_AT_INVALID')
  }
  if (value.locale !== expectedLocale) throw new Error(`REST_DERIVATION_LOCALE_MISMATCH: ${value.locale} != ${expectedLocale}`)
  if (!value.fragmentHashes || typeof value.fragmentHashes !== 'object' || Array.isArray(value.fragmentHashes)) {
    throw new Error('REST_DERIVATION_FRAGMENT_HASHES_INVALID')
  }
  for (const [file, hash] of Object.entries(value.fragmentHashes)) {
    if (path.basename(file) !== file || !file.endsWith('.json') || !SHA256.test(hash || '')) {
      throw new Error(`REST_DERIVATION_FRAGMENT_RECORD_INVALID: ${file}`)
    }
  }
  if (Object.keys(value.fragmentHashes).length === 0) throw new Error('REST_DERIVATION_FRAGMENT_HASHES_EMPTY')
  return value
}

function writeRestDerivationManifest(options) {
  const manifest = buildRestDerivationManifest(options)
  fs.mkdirSync(path.dirname(options.outputPath), {recursive: true})
  fs.writeFileSync(options.outputPath, `${JSON.stringify(canonicalJson(manifest), null, 2)}\n`)
  return manifest
}

function validateRestDerivationManifest({fragmentRoot, manifestPath, locale}) {
  const manifest = parseRestDerivationManifest(JSON.parse(fs.readFileSync(manifestPath, 'utf8')), locale)
  const actual = fragmentHashes(fragmentRoot)
  if (JSON.stringify(manifest.fragmentHashes) !== JSON.stringify(actual)) {
    throw new Error(`REST_DERIVATION_FRAGMENT_DRIFT: ${locale}`)
  }
  return manifest
}

module.exports = {
  buildRestDerivationManifest,
  fragmentHashes,
  parseRestDerivationManifest,
  validateRestDerivationManifest,
  writeRestDerivationManifest,
}
