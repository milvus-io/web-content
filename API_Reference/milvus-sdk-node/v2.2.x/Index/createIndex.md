# createIndex()

This method creates an index on a vector field. Note that the index building process is an asynchronous.

```javascript
new milvusClient(MILUVS_ADDRESS).indexManager.createIndex(CreateIndexReq);
```

### CreateIndexReq

| Parameters      | Description                                                                            | Type        |
| --------------- | -------------------------------------------------------------------------------------- | ----------- |
| collection_name | Collection name                                                                        | String      |
| field_name      | Name of the field to create index on                                                   | String      |
| index_name?     | Name of the index to create                                                            | String      |
| extra_params?   | Extra index parameters (see the table below)                                           | IndexParams |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number      |

#### IndexParams

| Parameter   | Description      | Type   |
| ----------- | ---------------- | ------ |
| index_type  | Index type       | String |
| metric_type | Metric type      | String |
| params      | Index parameters | Json   |

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import {
  MetricType,
  IndexType,
} from "@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus";

new milvusClient(MILUVS_ADDRESS).indexManager.createIndex({
  collection_name: "my_collection",
  field_name: "vector_01",
  index_name: "index_name",
  extra_params: {
    index_type: IndexType.IVF_FLAT,
    metric_type: MetricType.IP,
    params: JSON.stringify({ nlist: 10 }),
  },
});
```

### Response

```javascript
// createIndex returns
{ error_code: 'Success', reason: '' }
```
