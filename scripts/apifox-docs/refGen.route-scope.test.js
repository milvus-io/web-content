const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const RefGen = require('./refGen')

function listFiles(dir) {
  return fs.readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => path.join(entry.parentPath ?? entry.path, entry.name))
}

function buildSpecifications() {
  return {
    tags: [
      { name: 'Vector (V1)' },
      { name: 'Collection (V1)' },
      { name: 'Vector Operations (V2)' },
    ],
    paths: {
      '/v1/vector/collections': {
        get: { summary: 'List', tags: ['Vector (V1)'], responses: {} },
      },
      '/v1/collections': {
        get: { summary: 'List', tags: ['Collection (V1)'], responses: {} },
      },
      '/v2/vectordb/collections/list': {
        post: { summary: 'List', tags: ['Vector Operations (V2)'], responses: {} },
      },
    },
  }
}

function buildGenerator(target, targetPath) {
  return new RefGen({
    specifications: buildSpecifications(),
    lang: 'en-US',
    target,
    target_path: targetPath,
  })
}

async function main() {
  // milvus.io namespaces pages by version and group folder and its slug
  // convention drops the -v2 suffix, so same-verb pages across versions and
  // groups are expected. The uniqueness check must key on the physical page
  // path there, where a repeated key would overwrite an actual file.
  const milvusTarget = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'refgen-route-milvus-')), 'out')
  const milvus = buildGenerator('milvus', milvusTarget)
  milvus.make_groups()
  await milvus.write_refs()
  const milvusListPages = listFiles(milvusTarget).filter(file => path.basename(file) === 'list.mdx')
  assert.equal(milvusListPages.length, 3)
  assert.equal(new Set(milvusListPages.map(file => path.dirname(file))).size, 3)

  // zdoc sites publish a flat /restful/<slug> route space, where a repeated
  // slug really is a collision and must keep failing closed.
  const zillizTarget = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'refgen-route-zilliz-')), 'out')
  const zilliz = buildGenerator('zilliz', zillizTarget)
  zilliz.make_groups()
  await assert.rejects(zilliz.write_refs(), /REST_PAGE_ROUTE_CONFLICT: \/restful\/list/)

  // The production CLI must fail closed on the same conflict: the rejection
  // has to surface before the derivation manifest is written (and before the
  // S3 upload that follows it), so a failed run leaves no side effects
  // beyond the target tree it was asked to generate into.
  const cliDir = fs.mkdtempSync(path.join(os.tmpdir(), 'refgen-route-cli-'))
  const fragmentDir = path.join(cliDir, 'fragments')
  fs.mkdirSync(fragmentDir)
  fs.writeFileSync(path.join(fragmentDir, 'spec.json'), `${JSON.stringify(buildSpecifications())}\n`)
  const manifestPath = path.join(cliDir, 'rest-derivation.json')
  // The standalone entry registers the fetch options directly on the
  // program, so no subcommand word is passed here. This also keeps the test
  // compatible with commander >= 13, which errors on excess positionals
  // where commander 10 silently ignored them.
  const cli = spawnSync(process.execPath, [
    path.join(__dirname, 'index.js'),
    '-s', fragmentDir,
    '-l', 'en-US',
    '-o', path.join(cliDir, 'out'),
    '-t', 'zilliz',
    '--derivation-manifest', manifestPath,
    '--tooling-sha', 'a'.repeat(40),
    '--generated-at', '2026-01-01T00:00:00.000Z',
  ], { encoding: 'utf8' })
  assert.notEqual(cli.status, 0)
  assert.match(cli.stderr, /REST_PAGE_ROUTE_CONFLICT: \/restful\/list/)
  assert.equal(fs.existsSync(manifestPath), false, 'derivation manifest must not be written on a route conflict')
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err)
    process.exit(1)
  }
)
