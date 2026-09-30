#!/usr/bin/env node
// Strip components.* entries that aren't reachable from `paths` in each
// per-tag OpenAPI fragment under meta/openapi/. Apifox's per-tag exporter
// dumps the full components.schemas block into every file regardless of
// usage; the plugin already tree-shakes at render time (refGen.js
// resolveRefs), so anything unreachable from paths is pure dead weight.

const fs = require('node:fs')
const path = require('node:path')
const { pruneUnreachableComponents } = require('../componentGraph')

const SPECS_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, '..', 'meta', 'openapi')

function main() {
  if (!fs.existsSync(SPECS_DIR)) {
    console.error(`Specs directory not found: ${SPECS_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(SPECS_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()

  let totalRemoved = 0
  let totalSaved = 0
  const changed = []

  for (const file of files) {
    const fullPath = path.join(SPECS_DIR, file)
    const before = fs.readFileSync(fullPath, 'utf-8')
    const spec = JSON.parse(before)
    const { spec: pruned, stats: { kept, removed } } = pruneUnreachableComponents(spec)
    const after = JSON.stringify(pruned, null, 2)

    const beforeBytes = Buffer.byteLength(before, 'utf-8')
    const afterBytes = Buffer.byteLength(after, 'utf-8')
    totalRemoved += removed

    if (before !== after) {
      fs.writeFileSync(fullPath, after, 'utf-8')
      const saved = beforeBytes - afterBytes
      totalSaved += saved
      changed.push(file)
      console.log(`  ${file}: kept ${kept}, removed ${removed}, -${(saved / 1024).toFixed(1)} KB`)
    } else {
      console.log(`  ${file}: kept ${kept}, removed ${removed}, no change`)
    }
  }

  console.log(`\n${changed.length}/${files.length} files changed; removed ${totalRemoved} unreachable component entries; saved ${(totalSaved / 1024).toFixed(1)} KB total.`)
}

main()
