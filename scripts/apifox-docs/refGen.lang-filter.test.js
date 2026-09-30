const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const RefGen = require('./refGen')

const OPENAPI_DIR = path.join(__dirname, 'meta', 'openapi')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

async function withTempDir(callback) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'apifox-refgen-lang-filter-'))
  try {
    await callback(dir)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

async function testOperationWithIncludeLangExcludesEnUsOutput() {
  await withTempDir(async targetPath => {
    const spec = {
      openapi: '3.0.1',
      info: { title: 'test', version: '1.0.0' },
      tags: [
        {
          name: 'Project Operations (V2)',
        },
      ],
      paths: {
        '/v2/projects/{projectId}/plan': {
          patch: {
            summary: 'Upgrade Project',
            'x-i18n': {
              'zh-CN': {
                summary: '升级项目',
                description: '本接口可更新指定项目的订阅计划。',
              },
            },
            'x-include-langs': ['zh-CN'],
            tags: ['Project Operations (V2)'],
            parameters: [
              {
                name: 'Authorization',
                in: 'header',
                description: 'API key token',
                required: true,
                schema: { type: 'string' },
              },
            ],
            responses: {
              200: {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {},
      servers: [],
    }

    const refGen = new RefGen({
      specifications: spec,
      lang: 'en-US',
      target: 'zilliz',
      target_path: targetPath,
    })

    refGen.make_groups()
    await refGen.write_refs()

    const filePath = path.join(
      targetPath,
      'v2',
      'control-plane',
      'project-operations-v2',
      'upgrade-project-v2.mdx',
    )

    assert.equal(fs.existsSync(filePath), false)
  })
}

async function testGlobalClustersGenerateUnderControlPlane() {
  await withTempDir(async targetPath => {
    const spec = {
      openapi: '3.0.1',
      info: { title: 'test', version: '1.0.0' },
      tags: [
        {
          name: 'Global Clusters (V2)',
          'x-include-target': ['zilliz'],
        },
      ],
      paths: {
        '/v2/globalClusters': {
          get: {
            summary: 'List Global Clusters',
            description: 'List all global clusters in the account.',
            tags: ['Global Clusters (V2)'],
            parameters: [
              {
                name: 'Authorization',
                in: 'header',
                description: 'API key token',
                required: true,
                schema: { type: 'string' },
              },
            ],
            responses: {
              200: {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {},
      servers: [],
    }

    const refGen = new RefGen({
      specifications: spec,
      lang: 'en-US',
      target: 'zilliz',
      target_path: targetPath,
    })

    refGen.make_groups()
    await refGen.write_refs()

    const controlPlanePath = path.join(
      targetPath,
      'v2',
      'control-plane',
      'global-clusters-v2',
      'list-global-clusters-v2.mdx',
    )
    const dataPlanePath = path.join(
      targetPath,
      'v2',
      'data-plane',
      'global-clusters-v2',
      'list-global-clusters-v2.mdx',
    )

    assert.equal(fs.existsSync(controlPlanePath), true)
    assert.equal(fs.existsSync(dataPlanePath), false)
  })
}

async function testSidebarCustomPropsUsesBlockYaml() {
  await withTempDir(async targetPath => {
    const spec = {
      openapi: '3.0.1',
      info: { title: 'test', version: '1.0.0' },
      tags: [
        {
          name: 'Cluster Operations (V2)',
        },
      ],
      paths: {
        '/v2/clusters/modifyOnDemandCluster': {
          post: {
            summary: 'Modify On-Demand Cluster',
            description: 'Modify the settings of an on-demand cluster.',
            tags: ['Cluster Operations (V2)'],
            parameters: [
              {
                name: 'Authorization',
                in: 'header',
                description: 'API key token',
                required: true,
                schema: { type: 'string' },
              },
            ],
            responses: {
              200: {
                description: 'ok',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        code: { type: 'integer' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {},
      servers: [],
    }

    const refGen = new RefGen({
      specifications: spec,
      lang: 'en-US',
      target: 'zilliz',
      target_path: targetPath,
    })

    refGen.make_groups()
    await refGen.write_refs()

    const filePath = path.join(
      targetPath,
      'v2',
      'control-plane',
      'cluster-operations-v2',
      'modify-on-demand-cluster-v2.mdx',
    )
    const content = fs.readFileSync(filePath, 'utf-8')

    assert.match(content, /sidebar_custom_props:\n  badges:\n    - "post"/)
    assert.doesNotMatch(content, /sidebar_custom_props: \\?\{/)
  })
}

function testGroupDescriptionUsesLocalizedMetadata() {
  const specifications = {
    openapi: '3.0.1',
    info: { title: 'test', version: '1.0.0' },
    tags: [{ name: 'Cloud API Key Operations (V2)' }],
    paths: {
      '/v2/api-keys': {
        get: {
          summary: 'List API Keys',
          tags: ['Cloud API Key Operations (V2)'],
        },
      },
    },
  }

  const english = new RefGen({
    specifications,
    lang: 'en-US',
    target: 'zilliz',
    target_path: '/tmp/refgen-description-en',
  })
  const chinese = new RefGen({
    specifications,
    lang: 'zh-CN',
    target: 'zilliz',
    target_path: '/tmp/refgen-description-zh',
  })

  assert.equal(
    english.lookupDescription('cloud-api-key-operations-v2', 'fallback'),
    'This set of APIs provides a way to manage customized ACL API keys and their role assignments.',
  )
  assert.equal(
    chinese.lookupDescription('cloud-api-key-operations-v2', 'fallback'),
    '本系列 API 提供了管理自定义 ACL API Key 及其角色授权的相关接口。',
  )

  chinese.descriptions = [{ name: 'fallback-only', description: 'English fallback' }]
  assert.equal(chinese.lookupDescription('fallback-only', 'spec fallback'), 'English fallback')
}

function testChineseSidebarInventoryExceptionsAreExplicit() {
  const titles = readJson(path.join(__dirname, 'meta', 'titles.json'))
  assert.deepEqual(
    {
      '创建按需集群': titles['创建按需集群'],
      '查看按需集群列表': titles['查看按需集群列表'],
      '删除按需集群': titles['删除按需集群'],
    },
    {
      '创建按需集群': 'create-on-demand-cluster',
      '查看按需集群列表': 'list-on-demand-clusters',
      '删除按需集群': 'delete-on-demand-cluster',
    },
  )

  const languageRestrictedOperations = []
  for (const fileName of fs.readdirSync(OPENAPI_DIR).filter(name => name.endsWith('.json')).sort()) {
    const spec = readJson(path.join(OPENAPI_DIR, fileName))
    for (const [route, pathItem] of Object.entries(spec.paths || {})) {
      for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
        const operation = pathItem?.[method]
        if (!operation?.['x-include-langs']) continue
        languageRestrictedOperations.push({
          fileName,
          route,
          method,
          summary: operation.summary,
          includeLangs: operation['x-include-langs'],
        })
      }
    }
  }

  assert.deepEqual(languageRestrictedOperations, [
    {
      fileName: '21-project-operations-v2.json',
      route: '/v2/projects/{projectId}/plan',
      method: 'patch',
      summary: 'Upgrade Project',
      includeLangs: ['en-US'],
    },
  ])
}

function validSpec() {
  return {
    openapi: '3.0.1',
    info: { title: 'test', version: '1.0.0' },
    tags: [{ name: 'Project Operations (V2)' }],
    paths: {
      '/v2/projects': {
        get: {
          summary: 'List Projects',
          tags: ['Project Operations (V2)'],
          responses: { 200: { description: 'ok' } },
        },
      },
    },
  }
}

function testMalformedI18nIsRejectedWithJsonPath() {
  const cases = [
    {
      label: 'locale outside the locale map',
      mutate: spec => { spec.paths['/v2/projects'].get.responses[200]['x-i18n'] = { description: '返回项目列表。' } },
      expected: /\$\["paths"\]\["\/v2\/projects"\]\["get"\]\["responses"\]\["200"\]\["x-i18n"\]\["description"\]/,
    },
    {
      label: 'locale string instead of localized fields',
      mutate: spec => { spec.tags[0]['x-i18n'] = { 'zh-CN': '项目操作' } },
      expected: /\$\["tags"\]\[0\]\["x-i18n"\]\["zh-CN"\]/,
    },
    {
      label: 'misspelled localized field',
      mutate: spec => { spec.paths['/v2/projects'].get['x-i18n'] = { 'zh-CN': { descripiton: '返回项目列表。' } } },
      expected: /\$\["paths"\]\["\/v2\/projects"\]\["get"\]\["x-i18n"\]\["zh-CN"\]\["descripiton"\]/,
    },
  ]

  for (const testCase of cases) {
    const spec = validSpec()
    testCase.mutate(spec)
    assert.throws(() => new RefGen({
      specifications: spec,
      lang: 'en-US',
      target: 'zilliz',
      target_path: '/tmp/refgen-invalid-i18n',
    }), testCase.expected, testCase.label)
  }
}

function testAllRestSegmentsUseCanonicalI18nShape() {
  const segmentFiles = fs.readdirSync(OPENAPI_DIR).filter(name => name.endsWith('.json')).sort()
  assert.equal(segmentFiles.length, 38)
  for (const fileName of segmentFiles) {
    const spec = readJson(path.join(OPENAPI_DIR, fileName))
    assert.doesNotThrow(() => new RefGen({
      specifications: spec,
      lang: 'en-US',
      target: 'zilliz',
      target_path: '/tmp/refgen-valid-i18n',
    }), fileName)
  }
}

function testPrivateEndpointMetadataIsComplete() {
  const descriptions = readJson(path.join(__dirname, 'meta', 'descriptions.json'))
  const planeConfig = readJson(path.join(__dirname, 'meta', 'plane-config.json'))
  const titles = readJson(path.join(__dirname, 'meta', 'titles.json'))

  assert.ok(descriptions.some(entry => entry.name === 'private-endpoint-operations-v2'))
  assert.ok(planeConfig.controlPlaneKeywords.zilliz.includes('private-endpoint'))
  assert.ok(planeConfig.controlPlaneKeywords.zilliz.includes('privateEndpoint'))
  assert.equal(titles['列出 Private Endpoint 服务'], 'list-private-endpoint-services')
  assert.equal(titles['添加 Private Endpoint 白名单条目'], 'add-private-endpoint-whitelist-entry')
}

function testAllRestSegmentsUseUniquePageRoutes() {
  for (const target of ['zilliz', 'milvus']) {
    for (const fileName of fs.readdirSync(OPENAPI_DIR).filter(name => name.endsWith('.json')).sort()) {
      const spec = readJson(path.join(OPENAPI_DIR, fileName))
      const generator = new RefGen({specifications: spec, lang: 'en-US', target, target_path: '/tmp/refgen-unique-routes'})
      const routes = new Map()
      for (const [endpoint, pathItem] of Object.entries(spec.paths || {})) {
        for (const [method, operation] of Object.entries(pathItem || {})) {
          if (!['get', 'put', 'post', 'delete', 'patch', 'options', 'head', 'trace'].includes(method.toLowerCase())) continue
          if (operation['x-include-target'] && !operation['x-include-target'].includes(target)) continue
          const suffix = target === 'zilliz' && operation.tags?.[0]?.includes('(V2)') ? '-v2' : ''
          const route = `/restful/${generator.get_slug(operation.summary, target)}${suffix}`
          assert.ok(!routes.has(route), `${target}/${fileName}: ${route} conflicts for ${routes.get(route)} and ${method.toUpperCase()} ${endpoint}`)
          routes.set(route, `${method.toUpperCase()} ${endpoint}`)
        }
      }
    }
  }
}

async function run() {
  await testOperationWithIncludeLangExcludesEnUsOutput()
  await testGlobalClustersGenerateUnderControlPlane()
  await testSidebarCustomPropsUsesBlockYaml()
  testGroupDescriptionUsesLocalizedMetadata()
  testChineseSidebarInventoryExceptionsAreExplicit()
  testMalformedI18nIsRejectedWithJsonPath()
  testAllRestSegmentsUseCanonicalI18nShape()
  testPrivateEndpointMetadataIsComplete()
  testAllRestSegmentsUseUniquePageRoutes()
  console.log('apifox refGen lang filter tests passed')
}

run()
