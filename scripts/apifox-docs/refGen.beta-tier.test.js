'use strict'

// Zilliz release-notes tiers on `x-beta` (PUBLIC, ON REQUEST, PRIVATE, ...)
// are zdoc-site marks: they must badge zilliz pages and resolve as unset for
// the milvus publication target (betaTier.js owns the vocabulary). This pins
// the generated frontmatter for every resolution path: operation-level
// values, tag-level inheritance, the CONFIG.betaOverrides slug rules, and
// the target-neutral DEPRECATED value that must survive on both targets.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')
const RefGen = require('./refGen')

function buildSpecifications() {
  return {
    tags: [
      {name: 'Collection Operations (V2)', 'x-beta': 'ON REQUEST'},
      {name: 'Extract Operations (V2)'},
    ],
    paths: {
      '/v2/vectordb/collections/add_function_field': {
        post: {
          summary: 'Add Function Field to Collection',
          tags: ['Collection Operations (V2)'],
          'x-beta': 'PUBLIC',
          responses: {200: {description: 'ok'}},
        },
      },
      '/v2/vectordb/collections/drop_field': {
        post: {
          summary: 'Drop Collection Field',
          tags: ['Collection Operations (V2)'],
          responses: {200: {description: 'ok'}},
        },
      },
      '/v2/vectordb/entities/extract': {
        post: {
          summary: 'Extract',
          tags: ['Extract Operations (V2)'],
          responses: {200: {description: 'ok'}},
        },
      },
      '/v2/vectordb/entities/describe': {
        post: {
          summary: 'Describe Entity',
          tags: ['Extract Operations (V2)'],
          'x-beta': 'DEPRECATED',
          responses: {200: {description: 'ok'}},
        },
      },
    },
  }
}

async function generateForTarget(target) {
  const targetPath = fs.mkdtempSync(path.join(os.tmpdir(), `rest-beta-tier-${target}-`))
  try {
    const generator = new RefGen({
      lang: 'en-US',
      target,
      target_path: targetPath,
      specifications: buildSpecifications(),
    })
    generator.make_groups()
    await generator.write_refs()

    const pages = []
    const walk = dir => {
      for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) walk(full)
        else if (entry.name.endsWith('.mdx')) pages.push(fs.readFileSync(full, 'utf8'))
      }
    }
    walk(targetPath)
    return pages
  } finally {
    fs.rmSync(targetPath, {recursive: true, force: true})
  }
}

const betaOf = page => page.match(/^beta: (.+)$/m)?.[1]
const pageByTitle = (pages, title) =>
  pages.find(page => page.includes(`title: "${title} | RESTful"`))

test('zilliz target badges every x-beta tier resolution path', async () => {
  const pages = await generateForTarget('zilliz')
  assert.equal(betaOf(pageByTitle(pages, 'Add Function Field to Collection (V2)')), 'PUBLIC')
  // Tag-level ON REQUEST is inherited by operations without their own mark.
  assert.equal(betaOf(pageByTitle(pages, 'Drop Collection Field (V2)')), 'ON REQUEST')
  // The betaOverrides slug rule still applies on zdoc sites.
  assert.equal(betaOf(pageByTitle(pages, 'Extract (V2)')), 'PRIVATE')
  assert.equal(betaOf(pageByTitle(pages, 'Describe Entity (V2)')), 'DEPRECATED')
})

test('milvus target resolves zilliz x-beta tiers as unset', async () => {
  const pages = await generateForTarget('milvus')

  // No page may carry a zilliz release-notes tier badge under the milvus
  // target, in any resolution form (operation-level, tag-level, overrides).
  const tiered = pages.filter(page => /^(beta: (PUBLIC|ON REQUEST|PRIVATE))$/m.test(page))
  assert.deepEqual(tiered, [])

  assert.equal(betaOf(pageByTitle(pages, 'Add Function Field to Collection (V2)')), 'FALSE')
  assert.equal(betaOf(pageByTitle(pages, 'Drop Collection Field (V2)')), 'FALSE')
  assert.equal(betaOf(pageByTitle(pages, 'Extract (V2)')), 'FALSE')
  // DEPRECATED is target-neutral (kernel retirement) and must survive.
  assert.equal(betaOf(pageByTitle(pages, 'Describe Entity (V2)')), 'DEPRECATED')
})
