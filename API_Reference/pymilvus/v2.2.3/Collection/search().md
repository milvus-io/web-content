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
| `param`           | Specific search parameter(s) of the index on the vector field. You can set an offset in this dictionary. The sum of the offset value and the value in `limit` should be less than 65535.  | Dict               | True     |
| `limit`           | Number of nearest records to return. The sum of this value and `offset` should be less than 65535.                          | Integer            | True     |
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
| `kwargs`: `ignore_growing` | Whether to ignore growing segments during similarity searches. The value defaults to `False`, indicating that searches involve growing segments. | Bool | False |

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
results = collection.search(
	data=[[0.1, 0.2]], 
	anns_field="book_intro", 
	param=search_params, 
	limit=10, 
	expr=None,
	output_fields=['title'],
	consistency_level="Strong"
)

# get the IDs of all returned hits
results[0].ids

# get the distances to the query vector from all returned hits
results[0].distances

# get the value of a specified output field.
hit = results[0][0]
hit.entity.get('title')
```
