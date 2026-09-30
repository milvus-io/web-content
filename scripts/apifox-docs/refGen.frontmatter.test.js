'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const nunjucks = require('nunjucks')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')
const RefGen = require('./refGen')

test('synthetic REST version pages resolve their real, non-empty description', () => {
  const targetPath = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-frontmatter-'))
  try {
    const generator = new RefGen({
      lang: 'en-US',
      target: 'zilliz',
      target_path: targetPath,
      specifications: {
        tags: [{ name: 'Collections (V2)' }],
        paths: {
          '/v2/collections': {
            get: {
              summary: 'List Collections',
              tags: ['Collections (V2)'],
              responses: { 200: { description: 'ok' } },
            },
          },
        },
      },
    })

    generator.make_groups()

    const versionPage = fs.readFileSync(path.join(targetPath, 'v2/v2.mdx'), 'utf8')
    assert.match(versionPage, /^description: "Zilliz Cloud RESTful API V2 documentation\.?"$/m)
    assert.doesNotMatch(versionPage, /^description: ""$/m)
    assert.doesNotMatch(versionPage, /^description: null$/m)
  } finally {
    fs.rmSync(targetPath, { recursive: true, force: true })
  }
})

test('REST group pages serialize a missing description lookup as an empty YAML string, not null', () => {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path.join(__dirname, 'templates')),
    { autoescape: false },
  )
  const rendered = env.getTemplate('group.mdx').render({
    group_name: 'Untitled',
    position: 1,
    slug: 'untitled',
    beta_tag: 'FALSE',
    description: '',
    group_route: '/restful/untitled',
  })
  assert.match(rendered, /^description: ""$/m)
  assert.doesNotMatch(rendered, /^description: null$/m)
})

test('explicit control-plane generation preserves the established public REST slug', async () => {
  const targetPath = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-control-plane-slug-'))
  try {
    const generator = new RefGen({
      lang: 'en-US', target: 'zilliz', target_path: targetPath, apiSurface: 'control-plane',
      specifications: {
        tags: [{name: 'Projects (V2)'}],
        paths: {'/v2/projects': {get: {summary: 'List Projects', tags: ['Projects (V2)'], responses: {200: {description: 'ok'}}}}},
      },
    })
    generator.make_groups()
    await generator.write_refs()
    const page = fs.readFileSync(path.join(targetPath, 'v2/control-plane/projects-v2/list-projects-v2.mdx'), 'utf8')
    assert.match(page, /^slug: \/restful\/list-projects-v2$/m)
    assert.doesNotMatch(page, /\/restful\/control-plane\//)
  } finally {
    fs.rmSync(targetPath, {recursive: true, force: true})
  }
})
