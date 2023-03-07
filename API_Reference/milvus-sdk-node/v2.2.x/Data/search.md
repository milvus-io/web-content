# search()

This method conducts a vector similarity search.

```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.search(SearchReq);
```

### SearchReq

| Parameters        | Description                                                                                                                                         | Type                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| collection_name   | Name of the collection to search on                                                                                                                 | String                |
| search_params     | Search parameters                                                                                                                                   | SearchParams (object) |
| vectors           | Original vector to search with                                                                                                                      | Number[][]            |
| vector_type       | Search parameters                                                                                                                                   | VectorTypes (number)  |
| output_fields?    | Vector or scalar field to be returnsed                                                                                                               | String[]              |
| travel_timestamp? | Timestamp that is used for Time Travel. Users can specify a timestamp in a search to get results based on a data view at a specified point in time. | Number                |
| partitions_names? | An array of the names of the partitions to search on                                                                                                | String[]              |
| expr?             | Boolean expression to filter the data                                                                                                               | String                |
| timeout?          | This parameter is used to specify the length of time, in milliseconds, that the RPC (Remote Procedure Call) is allowed to run. If no value is provided, the default is undefined.                                                              | Number                |

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

## Example

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { DataType, MetricType } from "@zilliz/milvus2-sdk-node/dist/milvus/const/Milvus";

new milvusClient(MILUVS_ADDRESS).dataManager.search({
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

#### Response

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
