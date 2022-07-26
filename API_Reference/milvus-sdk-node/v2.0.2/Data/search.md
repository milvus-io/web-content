# search()
Conducts a vector search.

## Invocation 
```javascript
new milvusClient(MILUVS_ADDRESS).dataManager.search(SearchReq);
```

## Parameter
### SearchReq(object)
| Parameter                  | Description                                             | type         | required |
| -------------------------- | ------------------------------------------------------- | ------------ | -------- |
| collection_name            | Collection name                                         | String       | true     |
| search_params              | Search parameters                                       | SearchParams | true     |
| vectors                    | Original vector to search with                          | Number[][]   | true     |
| vector_type                | Search parameters                                       | VectorTypes  | true     |
| output_fields(optional)    | Vector or scalar field to be returned                   | String[]     | false    |
| travel_timestamp(optional) | Use this timestamp we can time travel in vector search. | number       | false    |
| partitions_names(optional) | Array of partition names                                | string[]     | false    |
| expr(optional)             | Scalar field filter expression                          | String       | false    |

### SearchParams(object)
| Parameter     | Description          | type        | required |
| -----------   | -------------------- | ----------- | -------- |
| anns_field    | vector field name    | String      | True     |
| topk          | search result counts | String      | False    |
| metric_type   | metric type          | MetricTypes | False    |
| params        | special parameters   | SearchParam | True     |
| round_decimal | special parameters   | Number      | False     |

### MetricTypes(string)
| Value          | Description        |
| -------------- | ------------------ |
| L2             | Euclidean distance |
| IP             | Inner product      |
| HAMMING        | Hamming distance   |
| JACCARD        | Jaccard distance   |
| TANIMOTO       | Tanimoto distance  |
| SUBSTRUCTURE   | Superstructure     |
| SUPERSTRUCTURE | Substructure       |

### VectorTypes
| Value | Description |
| ----- | ----------- |
| 100   | Binary      |
| 101   | Float       |

### SearchParam
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
