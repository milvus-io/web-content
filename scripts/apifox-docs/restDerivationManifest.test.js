const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const {
  buildRestDerivationManifest,
  parseRestDerivationManifest,
  validateRestDerivationManifest,
  writeRestDerivationManifest,
} = require('./restDerivationManifest')

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-derivation-'))
  const fragments = path.join(root, 'openapi')
  fs.mkdirSync(fragments)
  fs.writeFileSync(path.join(fragments, '02.json'), '{"b":2}\n')
  fs.writeFileSync(path.join(fragments, '01.json'), '{"a":1}\n')
  return {root, fragments, output: path.join(root, 'generated/en/manifests/rest-derivation.json')}
}

test('builds the same fragment evidence schema for every REST locale', () => {
  const {fragments} = fixture()
  const toolingSha = 'a'.repeat(40)
  const generatedAt = '2026-09-09T00:00:00.000Z'
  const manifests = ['en', 'zh-CN', 'ja-JP'].map(locale => buildRestDerivationManifest({
    fragmentRoot: fragments, locale, toolingSha, generatedAt,
  }))
  assert.deepEqual(manifests.map(manifest => Object.keys(manifest)), Array(3).fill([
    'schemaVersion', 'locale', 'fragmentHashes', 'toolingSha', 'generatedAt',
  ]))
  assert.deepEqual(manifests[0].fragmentHashes, manifests[1].fragmentHashes)
  assert.deepEqual(manifests[1].fragmentHashes, manifests[2].fragmentHashes)
  assert.deepEqual(Object.keys(manifests[0].fragmentHashes), ['01.json', '02.json'])
})

test('writes and validates exact fragment hashes', () => {
  const {fragments, output} = fixture()
  writeRestDerivationManifest({
    fragmentRoot: fragments,
    locale: 'en',
    toolingSha: 'b'.repeat(40),
    generatedAt: '2026-09-09T00:00:00.000Z',
    outputPath: output,
  })
  assert.equal(validateRestDerivationManifest({fragmentRoot: fragments, manifestPath: output, locale: 'en'}).locale, 'en')
  fs.writeFileSync(path.join(fragments, '01.json'), '{"changed":true}\n')
  assert.throws(
    () => validateRestDerivationManifest({fragmentRoot: fragments, manifestPath: output, locale: 'en'}),
    /REST_DERIVATION_FRAGMENT_DRIFT/,
  )
})

test('fails closed on schema, locale, digest, and fragment-set errors', () => {
  const valid = {
    schemaVersion: 1,
    locale: 'ja-JP',
    fragmentHashes: {'01.json': 'c'.repeat(64)},
    toolingSha: 'd'.repeat(40),
    generatedAt: '2026-09-09T00:00:00.000Z',
  }
  assert.throws(() => parseRestDerivationManifest({...valid, extra: true}, 'ja-JP'), /KEYS_INVALID/)
  assert.throws(() => parseRestDerivationManifest(valid, 'en'), /LOCALE_MISMATCH/)
  assert.throws(() => parseRestDerivationManifest({...valid, fragmentHashes: {'../01.json': 'c'.repeat(64)}}, 'ja-JP'), /FRAGMENT_RECORD_INVALID/)
  const {fragments} = fixture()
  fs.writeFileSync(path.join(fragments, 'README.md'), 'not a fragment\n')
  assert.throws(() => buildRestDerivationManifest({
    fragmentRoot: fragments,
    locale: 'en',
    toolingSha: 'e'.repeat(40),
    generatedAt: '2026-09-09T00:00:00.000Z',
  }), /FRAGMENT_SET_INVALID/)
})
