# createIndex()
This method creates an index on a vector field. Note that the index building process is an asynchronous.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).collectionManager.createIndex(CreateIndexReq);
```

## Parameters
### CreateIndexReq
| Parameter       | Description      | Type                | Required    |
| --------------- | ---------------- | ------------------- | ----------- |
| collection_name | Collection name  | String              | True        |
| field_name      | Field name       | String              | True        |
| index_name      | Index name       | String              | False       |
| extra_params    | Extra index parameters | IndexParams (see the table below)         | False       |

#### IndexParams
| Parameter   | Description      | Type   | Required |
| ----------- | ---------------- | ------ | -------- |
| index_type  | Index type       | String | True     |
| metric_type | Metric type      | String | True     |
| params      | Index parameters | Json   | True     |

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
