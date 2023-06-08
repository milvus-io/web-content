# search()

This method performs a vector similarity search.

> You must load the collection before searching or querying.

## Example

```javascript
import { MilvusClient, DataType, MetricType } from "@zilliz/milvus2-sdk-node";

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
  consistency_level: ConsistencyLevelEnum.Strong,
});

// batch search example
new milvusClient(MILUVS_ADDRESS).search({
  collection_name: "my_collection",
  vectors: [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ],
});
```

### Response

#### Single search response

```javascript
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

#### Batch search response

```javascript
{
  status: { error_code: 'Success', reason: '' },
  results: [
    [
    { score: 22, age: '434848878802251176' },
    { score: 22, age: '434848878802251181' },
    { score: 23, age: '434848878802251173' },
    { score: 25, age: '434848878802251179' }
   ],
   [
    { score: 22, age: '434848878802251176' },
    { score: 22, age: '434848878802251181' },
    { score: 23, age: '434848878802251173' },
    { score: 25, age: '434848878802251179' }
    ],
  ]
}
```

#### Parameters

| Parameters          | Description                                                                                                                                                                          | Type                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| collection_name     | Name of the collection to search on                                                                                                                                                  | String                 |
| vector? or vectors? | vector or vectors to search                                                                                                                                                          | Number[] or Number[][] |
| limit? or topk?     | Topk, by default: 10                                                                                                                                                                 | Number                 |
| offset?             | offset, by default: 0                                                                                                                                                                | Number                 |
| output_fields?      | Vector or scalar field to be returnsed, by default, we will output all fields in the collection                                                                                      | String[]               |
| partitions_names?   | An array of the names of the partitions to search on                                                                                                                                 | String[]               |
| metric_type?        | similarity metric, by default, it is 'L2'                                                                                                                                            | String                 |
| filter? or expr?    | Boolean expression to filter the data                                                                                                                                                | String                 |
| params?             | Optional search param, it depends on vector index, for example {nprobe: 1024} ,Please refer to https://milvus.io/docs/index.md.                                                      | Object                 |
| consistency_level?  | Consistency in a distributed database specifically refers to the property that ensures every node or replica has the same view of data when writing or reading data at a given time. | Enum                   |
| timeout?            | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined.    | Number                 |
