# search()

This method performs a vector similarity search.

> You must load the collection before searching or querying

## Example

### After node sdk v2.2.7

> Starting from node sdk v2.2.7, you can use much simpler search api

```javascript
import { MilvusClient, DataType, MetricType} from "@zilliz/milvus2-sdk-node";

// simple search example
new milvusClient(MILUVS_ADDRESS).search({
  collection_name: "my_collection",
  vector: [1, 2, 3, 4],
});

// complex search example
new milvusClient(MILUVS_ADDRESS).search({
  collection_name: "my_collection",
  vector: [1, 2, 3, 4],
  filter: "count > 5",
  limit: 10,
  offset: 2,
  metric_type: MetricType.L2,
  param: { nprobe: 1024 },
});
```

### Response

```javascript
// search returns
{
  status: { error_code: 'Success', reason: '' },
  results: [
    { score: 22, age: '434848878802251176' },
    { score: 22, age: '434848878802251181' },
    { score: 23, age: '434848878802251173' },
    { score: 25, age: '434848878802251179' }
  ]
}
```

#### Parameters since node sdk v2.2.7

| Parameters          | Description                                                                                                                                                                       | Type                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| collection_name     | Name of the collection to search on                                                                                                                                               | String                 |
| vector? or vectors? | vector or vectors to search                                                                                                                                                       | Number[] or Number[][] |
| limit? or topk?     | Topk, by default: 10                                                                                                                                                              | Number                 |
| offset?             | offset, by default: 0                                                                                                                                                             | Number                 |
| output_fields?      | Vector or scalar field to be returnsed, by default, we will output all fields in the collection                                                                                   | String[]               |
| partitions_names?   | An array of the names of the partitions to search on                                                                                                                              | String[]               |
| metric_type?        | similarity metric, by default, it is 'L2'                                                                                                                                         | String                 |
| filter? or expr?    | Boolean expression to filter the data                                                                                                                                             | String                 |
| params?             | Optional search param, it depends on vector index, for example {nprobe: 1024}                                                                                                     | Object                 |
| timeout?            | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number                 |

#### SearchParam

Please refer to https://milvus.io/docs/index.md.

### Before node sdk v2.2.7

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import {
  DataType,
  MetricType,
} from "@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus";

new milvusClient(MILUVS_ADDRESS).search({
  collection_name: "my_collection",
  expr: "",
  vectors: [[1, 2, 3, 4]],
  search_params: {
    anns_field: "vector_01",
    topk: 4,
    metric_type: MetricType.L2,
    params: JSON.stringify({ nprobe: 1024 }),
  },
  output_fields: ["age"],
  vector_type: DataType.FloatVector,
});
```

### Parameters before node sdk v2.2.7

| Parameters        | Description                                                                                                                                                                       | Type                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| collection_name   | Name of the collection to search on                                                                                                                                               | String                |
| search_params     | Search parameters                                                                                                                                                                 | SearchParams (object) |
| vectors           | Original vector to search with                                                                                                                                                    | Number[][]            |
| vector_type       | Search parameters                                                                                                                                                                 | VectorTypes (number)  |
| output_fields?    | Vector or scalar field to be returnsed                                                                                                                                            | String[]              |
| travel_timestamp? | Timestamp that is used for Time Travel. Users can specify a timestamp in a search to get results based on a data view at a specified point in time.                               | Number                |
| partitions_names? | An array of the names of the partitions to search on                                                                                                                              | String[]              |
| expr?             | Boolean expression to filter the data                                                                                                                                             | String                |
| timeout?          | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined. | Number                |

#### SearchParams

| Parameter      | Description          | Type                     |
| -------------- | -------------------- | ------------------------ |
| anns_field     | Vector field name    | String                   |
| params         | Special parameters   | SearchParam(JSON string) |
| topk?          | Search result counts | String                   |
| metric_type?   | Metric type          | MetricTypes(string)      |
| round_decimal? | Special parameters   | Number                   |

#### MetricTypes

| Value          | Description        |
| -------------- | ------------------ |
| L2             | Euclidean distance |
| IP             | Inner product      |
| HAMMING        | Hamming distance   |
| JACCARD        | Jaccard distance   |
| TANIMOTO       | Tanimoto distance  |
| SUBSTRUCTURE   | Superstructure     |
| SUPERSTRUCTURE | Substructure       |

#### VectorTypes

| Value | Description |
| ----- | ----------- |
| 100   | Binary      |
| 101   | Float       |

#### SearchParam

SearchParam is a json string, it's key and value, please refer to https://milvus.io/docs/index.md.

```javascript
JSON.stringify({ nprobe: 1024 });
```
