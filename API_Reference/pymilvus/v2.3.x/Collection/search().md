# search()

This method conducts a vector similarity search.

## Invocation

```python
search(data, anns_field, param, limit, expr=None, partition_names=None, output_fields=None, timeout=None, round_decimal=-1, **kwargs)
```

## Parameters

| Parameter         | Description                                                   | Type               | Required |
| ----------------- | ------------------------------------------------------------- | ------------------ | -------- |
| `data`            | Data to search with                                           | list[list[Float]]  | True     |
| `anns_field`      | Name of the vector field to search on                         | String             | True     |
| `param`           | Specific search parameter(s) of the index on the vector field. For details, refer to [Prepare search parameters](https://milvus.io/docs/search.md#Prepare-search-parameters).  | Dict               | True     |
| `limit`           | Number of nearest records to return. The sum of this value and `offset` should be less than 16384.                          | Integer            | True     |
| `expr`            | Boolean expression to filter the data                         | String             | False    |
| `partition_names` | List of names of the partitions to search on. </br>All partition will be searched if it is left empty.                         | list[String]            | False    |
| `output_fields`   | List of names of fields to output. <br>When specified, you can get the values of the specified fields by using `hit.entity.get()`.                             | list[String]       | False    |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                  | Float              | False    |
| `round_decimal`   | Number of the decimal places of the returned distance         | Integer            | False    |
| `kwargs`: `_async`| Boolean value to indicate if to invoke asynchronously. | Bool   | False    |
| `kwargs`: `_callback`| Function that will be invoked after server responds successfully. It takes effect only if `_async` is set to `True`. | Function   | False    |
| `kwargs`: `consistency_level`| Consistency level used in the search. | String/Integer   | False    |
| `kwargs`: `guarantee_timestamp`| Milvus searches on the data view before this timestamp when it is provided. Otherwise, it searches the most updated data view. It can be only used in `Customized` level of consistency. | Integer   | False    |
| `kwargs`: `graceful_time`| PyMilvus will use current timestamp minus the `graceful_time` as the `guarantee_timestamp` for search. It can be only used in `Bounded` level of consistency. | Integer   | False    |
| `kwargs`: `travel_timestamp`| Timestamp that is used for Time Travel. Users can specify a timestamp in a search to get results based on a data view at a specified point in time. | Integer   | False    |

## Return

A SearchResult object, an iterable, 2d-array-like class whose first dimension is the number of vectors to query (`nq`), and the second dimension is the number of limit (`topk`).

## Raises

- `RpcError`: error if gRPC encounter an error.
- `ParamError`: error if the parameters are invalid.
- `DataTypeNotMatchException`: error if wrong type of data is passed to server.
- `BaseException`: error if the return result from server is not ok.

## Example

```python
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
result = collection.search(
    data=[[0.1, 0.2]], 
    anns_field="book_intro", 
    param=search_params, 
    limit=10, 
    # demontrates the ways to reference a dynamic field.
    expr='$meta["dynamic_field_1"] > 10 and dynamic_field_2 == 10',
    # sets the names of the fields you want to retrieve from the search result.
    output_fields=['title', 'dynamic_field_1', 'dynamic_field_2'], 
    consistency_level="Strong"
)

for hits in result:
    # get the IDs of all returned hits
    print(hits.ids)

    # get the distances to the query vector from all returned hits
    print(hits.distances)
    for hit in hits:
        # get the value of an output field specified in the search request.
        # dynamic fields are supported, but vector fields are not supported yet.    
        print(hit.entity.get('title'))
        print(hit.entity.get('$meta["dynamic_field_1"]'))
        print(hit.entity.get('$dynamic_field_2'))
```
