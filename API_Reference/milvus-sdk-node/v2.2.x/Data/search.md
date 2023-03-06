# search()

This method conducts a vector similarity search.

## Invocation

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.search(SearchReq);
```

## Parameters

### SearchReq(object)

| Parameter         | Description                                                                                                                                         | Type                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| collection_name   | Name of the collection to search on                                                                                                                 | String                             |
| search_params     | Search parameters                                                                                                                                   | SearchParams (see the table below) |
| vectors           | Original vector to search with                                                                                                                      | Number[][]                         |
| vector_type       | Search parameters                                                                                                                                   | VectorTypes (see the table below)  |
| output_fields?    | Vector or scalar field to be returned                                                                                                               | String[]                           |
| travel_timestamp? | Timestamp that is used for Time Travel. Users can specify a timestamp in a search to get results based on a data view at a specified point in time. | Number                             |
| partitions_names? | An array of the names of the partitions to search on                                                                                                | String[]                           |
| expr?             | Boolean expression to filter the data                                                                                                               | String                             |
| timeout?          | An optional duration of time in millisecond to allow for the RPC. Default is undefined                                                              | Number                             |

#### SearchParams(object)

| Parameter      | Description          | Type        |
| -------------- | -------------------- | ----------- |
| anns_field     | Vector field name    | String      |
| params         | Special parameters   | SearchParam |
| topk?          | Search result counts | String      |
| metric_type ?  | Metric type          | MetricTypes |
| round_decimal? | Special parameters   | Number      |

#### MetricTypes(string)

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

Please refer https://milvus.io/docs/index.md

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

new milvusClient(MILUVS_ADDRESS).dataManager.search({
  collection_name: "my_collection",
  expr: "",
  vectors: [[1, 2, 3, 4]],
  search_params: {
    anns_field: "vector_01",
    topk: 4,
    metric_type: "L2",
    params: JSON.stringify({ nprobe: 1024 }),
  },
  output_fields: ["age"],
  vector_type: 100,
});
```

### Return

```javascript
// search return
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
