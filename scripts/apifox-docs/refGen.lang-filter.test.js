const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const RefGen = require('./refGen')

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

async function run() {
  await testOperationWithIncludeLangExcludesEnUsOutput()
  await testGlobalClustersGenerateUnderControlPlane()
  await testSidebarCustomPropsUsesBlockYaml()
  console.log('apifox refGen lang filter tests passed')
}

run()
