# createIndex()

This method creates an index on a vector field. Note that the index building process is an asynchronous.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.createIndex(CreateIndexReq);
```

## Parameters

### CreateIndexReq

| Parameter       | Description                                                                            | Type        |
| --------------- | -------------------------------------------------------------------------------------- | ----------- |
| collection_name | Collection name                                                                        | String      |
| field_name      | Name of the field to create index on                                                   | String      |
| index_name?     | Name of the index to create                                                            | String      |
| extra_params?   | Extra index parameters (see the table below)                                           | IndexParams |
| timeout?        | An optional duration of time in millisecond to allow for the RPC. Default is undefined | Number      |

#### IndexParams

| Parameter   | Description      | Type   |
| ----------- | ---------------- | ------ |
| index_type  | Index type       | String |
| metric_type | Metric type      | String |
| params      | Index parameters | Json   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).indexManager.createIndex({
  collection_name: "my_collection",
  field_name: "vector_01",
  index_name: "index_name",
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
