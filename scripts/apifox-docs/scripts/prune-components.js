#!/usr/bin/env node
// Strip components.* entries that aren't reachable from `paths` in each
// per-tag OpenAPI fragment under meta/openapi/. Apifox's per-tag exporter
// dumps the full components.schemas block into every file regardless of
// usage; the plugin already tree-shakes at render time (refGen.js
// resolveRefs), so anything unreachable from paths is pure dead weight.

const fs = require('node:fs')
const path = require('node:path')

const SPECS_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, '..', 'meta', 'openapi')
const REF_PREFIX = '#/components/'

function collectReachableRefs(spec) {
  const reachable = new Set()
  const queue = []

  function walk(node) {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) {
      for (const item of node) walk(item)
      return
    }
    for (const [key, value] of Object.entries(node)) {
      if (key === '$ref' && typeof value === 'string' && value.startsWith(REF_PREFIX)) {
        if (!reachable.has(value)) {
          reachable.add(value)
          queue.push(value)
        }
      } else {
        walk(value)
      }
    }
  }

  walk(spec.paths || {})
  walk(spec.webhooks || {})

  while (queue.length > 0) {
    const ref = queue.shift()
    const parts = ref.substring(2).split('/').map(p => p.replace(/~1/g, '/').replace(/~0/g, '~'))
    let body = spec
    for (const p of parts) {
      if (body && typeof body === 'object' && p in body) {
        body = body[p]
      } else {
        body = undefined
        break
      }
    }
    if (body !== undefined) walk(body)
  }

  return reachable
}

function pruneComponents(spec) {
  if (!spec.components || typeof spec.components !== 'object') {
    return { kept: 0, removed: 0 }
  }

  const reachable = collectReachableRefs(spec)
  let kept = 0
  let removed = 0

  for (const category of Object.keys(spec.components)) {
    if (category === 'securitySchemes') continue
    const entries = spec.components[category]
    if (!entries || typeof entries !== 'object') continue

    const pruned = {}
    for (const [name, body] of Object.entries(entries)) {
      const refPath = `${REF_PREFIX}${category}/${name}`
      if (reachable.has(refPath)) {
        pruned[name] = body
        kept++
      } else {
        removed++
      }
    }

    if (Object.keys(pruned).length === 0) {
      delete spec.components[category]
    } else {
      spec.components[category] = pruned
    }
  }

  return { kept, removed }
}

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
    const { kept, removed } = pruneComponents(spec)
    const after = JSON.stringify(spec, null, 2)

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
