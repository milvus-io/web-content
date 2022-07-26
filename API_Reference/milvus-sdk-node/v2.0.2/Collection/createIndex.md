# createIndex()
Create an index on a vector field. Note that index building is an async progress.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.createIndex(CreateIndexReq);
```

## Parameter
### CreateIndexReq
| Parameter       | Description      | type                | required    |
| --------------- | ---------------- | ------------------- | ----------- |
| collection_name | Collection name  | String              | true        |
| field_name      | Filed name       | String              | true        |
| index_name      | Index name       | String              | false       |
| extra_params    | index parameters | IndexParams         | false       |

### IndexParams
| Parameter   | Description      | type   | required |
| ----------- | ---------------- | ------ | -------- |
| index_type  | index type       | String | true     |
| metric_type | metric type      | string | true     |
| params      | index parameters | Json   | true     |

## Example
```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.createIndex({
  collection_name: 'my_collection',
  field_name: "vector_01",
  extra_params: {
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: JSON.stringify({ nlist: 10 }),
  },
});
```
## Return
```javascript
// createIndex return
{ error_code: 'Success', reason: '' }
```
