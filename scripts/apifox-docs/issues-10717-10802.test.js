const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const collectionSpecPath = path.join(__dirname, 'meta/openapi/05-collection-operations-v2.json')
const clusterSpecPath = path.join(__dirname, 'meta/openapi/22-cluster-operations-v2.json')

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function testListCollectionsAuthorizationVariesByEndpointTab() {
  const spec = loadJson(collectionSpecPath)
  const params = spec.paths['/v2/vectordb/collections/list'].post.parameters || []

  const authParams = params.filter(p => p.name === 'Authorization')
  assert.equal(authParams.length, 2, 'List Collections should define two Authorization variants (cluster + on-demand)')

  const clusterAuth = authParams.find(p => Array.isArray(p['x-base-url-target']) && p['x-base-url-target'].includes('cluster'))
  const onDemandAuth = authParams.find(p => Array.isArray(p['x-base-url-target']) && p['x-base-url-target'].includes('on-demand-compute'))

  assert.ok(clusterAuth, 'Missing cluster Authorization variant')
  assert.ok(onDemandAuth, 'Missing on-demand Authorization variant')

  assert.match(clusterAuth.description || '', /username:password/, 'Cluster Authorization should allow username:password token')
  assert.equal(
    /username:password/.test(onDemandAuth.description || ''),
    false,
    'On-demand Authorization should not mention username:password',
  )

  assert.match(
    clusterAuth?.['x-i18n']?.['zh-CN']?.description || '',
    /username:password/,
    'Cluster Authorization zh-CN description should allow username:password token',
  )
  assert.equal(
    /username:password/.test(onDemandAuth?.['x-i18n']?.['zh-CN']?.description || ''),
    false,
    'On-demand Authorization zh-CN description should not mention username:password',
  )
}

function testCreateOnDemandClusterHasZhCnSuccessResponseExample() {
  const spec = loadJson(clusterSpecPath)
  const examples = spec.paths['/v2/clusters/createOnDemandCluster']
    .post.responses['200'].content['application/json'].examples

  const zhCnSuccess = Object.values(examples).find(ex => (
    ex?.['x-target-response'] === 'OPTION 1'
    && ex?.['x-target-lang'] === 'zh-CN'
    && ex?.value?.data?.clusterId
    && ex?.value?.data?.prompt
  ))

  assert.ok(zhCnSuccess, 'Create On-Demand Cluster should have zh-CN OPTION 1 success example')
}

function run() {
  testListCollectionsAuthorizationVariesByEndpointTab()
  testCreateOnDemandClusterHasZhCnSuccessResponseExample()
  console.log('apifox issues 10717 and 10802 regression tests passed')
}

run()
