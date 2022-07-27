# search()
This method conducts a vector similarity search.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.search(SearchReq);
```

## Parameters
### SearchReq(object)
| Parameter                  | Description                                             | Type         | Required |
| -------------------------- | ------------------------------------------------------- | ------------ | -------- |
| collection_name            | Name of the collection to search on                                         | String       | True     |
| search_params              | Search parameters                                       | SearchParams (see the table below) | True     |
| vectors                    | Original vector to search with                          | Number[][]   | True     |
| vector_type                | Search parameters                                       | VectorTypes (see the table below)  | True     |
| output_fields(optional)    | Vector or scalar field to be returned                   | String[]     | False    |
| travel_timestamp(optional) | Timestamp that is used for Time Travel. Users can specify a timestamp in a search to get results based on a data view at a specified point in time. | Number       | False    |
| partitions_names(optional) | An array of the names of the partitions to search on                                | String[]     | False    |
| expr(optional)             | Boolean expression to filter the data                            | String       | False    |

#### SearchParams(object)
| Parameter     | Description          | Type        | Required |
| -----------   | -------------------- | ----------- | -------- |
| anns_field    | Vector field name    | String      | True     |
| topk          | Search result counts | String      | False    |
| metric_type   | Metric type          | MetricTypes | False    |
| params        | Special parameters   | SearchParam | True     |
| round_decimal | Special parameters   | Number      | False    |

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
new milvusClient(MILUVS_ADDRESS).dataManager.search({
  collection_name: 'my_collection',
  expr: "",
  vectors: [[1, 2, 3, 4]],
  search_params: {
    anns_field: 'vector_01',
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
