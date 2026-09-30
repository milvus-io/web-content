const assert = require('node:assert/strict')
const RefGen = require('./refGen')
const cloudAccessControlSpec = require('./meta/openapi/34-cloud-access-control-operations-v2.json')

const generator = new RefGen({
  specifications: {
    tags: [{ name: 'Test Operations (V2)' }],
    paths: {
      '/v2/test': {
        get: {
          summary: 'Test',
          tags: ['Test Operations (V2)'],
          responses: {},
        },
      },
    },
  },
  lang: 'en-US',
  target: 'zilliz',
  target_path: '/tmp/refgen-plane-test',
})

assert.equal(generator.getPlane('cluster-role-operations-v2', 'zilliz'), 'data-plane')
assert.equal(generator.getPlane('cluster-user-operations-v2', 'zilliz'), 'data-plane')
assert.equal(generator.getPlane('cloud-access-control-operations-v2', 'zilliz'), 'control-plane')
assert.equal(generator.getPlane('cloud-api-key-operations-v2', 'zilliz'), 'control-plane')
assert.equal(generator.getPlane('collection-operations-v2', 'zilliz'), 'data-plane')
assert.equal(generator.getPlane('cluster-role-operations-v2', 'milvus'), 'data-plane')

const explicit = new RefGen({
  specifications: generator.options.specifications,
  lang: 'en-US',
  target: 'zilliz',
  target_path: '/tmp/refgen-plane-explicit-test',
  apiSurface: 'control-plane',
})
assert.equal(explicit.getPlane('collection-operations-v2', 'zilliz'), 'control-plane')

const listCloudRoleParameters = cloudAccessControlSpec.paths['/v2/roles'].get.parameters
assert.equal(listCloudRoleParameters.some(parameter => parameter.name === 'roleType'), false)
assert.equal(
  listCloudRoleParameters.find(parameter => parameter.name === 'projectId').description,
  'The project ID used to filter roles.',
)

console.log('REST reference plane tests passed')
