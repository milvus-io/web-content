const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const volumeSpecPath = path.join(__dirname, 'meta/openapi/20-volume-operations-v2.json')
const vectorSpecPath = path.join(__dirname, 'meta/openapi/04-vector-operations-v2.json')

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function testVectorZhCnIncludeTagsAreClosed() {
  const content = fs.readFileSync(vectorSpecPath, 'utf-8')
  const broken = '表示当前操作消耗的 vCU。"'
  assert.equal(content.includes(broken), false, 'Found unclosed <include> in vector zh-CN cost description')
}

function testCreateVolumeHasZhCnExternalExample() {
  const spec = loadJson(volumeSpecPath)
  const examples = spec.paths['/v2/volumes/create']
    .post.requestBody.content['application/json'].examples

  const zhCnExternal = Object.values(examples).find(ex => (
    ex?.['x-target-lang'] === 'zh-CN'
    && ex?.value?.type === 'EXTERNAL'
    && ex?.value?.storageIntegrationId
    && ex?.value?.path
  ))

  assert.ok(zhCnExternal, 'Create Volume is missing zh-CN EXTERNAL request example')
  assert.equal(zhCnExternal.value.regionId, 'ali-cn-hangzhou')
  assert.match(
    zhCnExternal.value.storageIntegrationId,
    /^integ-/,
    'Create Volume zh-CN EXTERNAL example should use integ- prefixed storageIntegrationId',
  )
}

function testDescribeVolumeHasZhCnRegionExamples() {
  const spec = loadJson(volumeSpecPath)
  const examples = spec.paths['/v2/volumes/{VOLUME_NAME}']
    .get.responses['200'].content['application/json'].examples

  const zhCnSuccessExamples = Object.values(examples).filter(ex => (
    ex?.['x-target-response'] === 'OPTION 1'
    && ex?.['x-target-lang'] === 'zh-CN'
    && ex?.value?.data
  ))

  assert.ok(zhCnSuccessExamples.length >= 2, 'Describe Volume should have zh-CN managed and external success examples')

  for (const ex of zhCnSuccessExamples) {
    assert.equal(ex.value.data.regionId, 'ali-cn-hangzhou')
    if (ex.value.data.type === 'EXTERNAL') {
      assert.match(
        ex.value.data.storageIntegrationId,
        /^integ-/,
        'Describe Volume zh-CN EXTERNAL response example should use integ- prefixed storageIntegrationId',
      )
    }
  }
}

function run() {
  testVectorZhCnIncludeTagsAreClosed()
  testCreateVolumeHasZhCnExternalExample()
  testDescribeVolumeHasZhCnRegionExamples()
  console.log('apifox sync candidate tests passed')
}

run()
