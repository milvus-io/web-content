# createIndex()

This method generates an index on a vector field. It is important to note that the index creation process is asynchronous.

## Example

```javascript
import { MilvusClient, MetricType, IndexType } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).createIndex({
  collection_name: "my_collection",
  field_name: "vector_01",
  index_name: "index_name",
  index_type: IndexType.IVF_FLAT,
  metric_type: MetricType.L2,
  params: { nlist: 10 },
});
```

### Response

```javascript
// createIndex returns
{ error_code: 'Success', reason: '' }
```

### Parameters

| Parameters      | Description                                                                                                                                                                       | Type        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| collection_name | Collection name                                                                                                                                                                   | String      |
| field_name      | Name of the field to create index on                                                                                                                                              | String      |
| index_name?     | Name of the index to create                                                                                                                                                       | String      |
| extra_params?   | Extra index parameters (see the table below)                                                                                                                                      | IndexParams |
| index_type      | Index type                                                                                                                                                                        | String      |
| metric_type     | Metric type                                                                                                                                                                       | String      |
| params          | Index parameters                                                                                                                                                                  | Object      |
| timeout?        | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number      |
