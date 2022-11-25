# query()

This method conducts a vector query in a specified partition.

## Invocation

```python
query(expr, output_fields=None, timeout=None, **kwargs)
```

## Parameters

| Parameter         | Description                                                   | Type               | Required |
| ----------------- | ------------------------------------------------------------- | ------------------ | -------- |
| `expr`            | Boolean expression to filter the data.                         | String             | True     |
| `output_fields`   | List of names of fields to output.                             | list[String]       | False    |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                                | Float              | False    |
| `kwargs`: `consistency_level`|Consistency level used in the search. | String/Integer              | False    |
| `kwargs`: `guarantee_timestamp`| Milvus searches on the data view before this timestamp when it is provided. Otherwise, Milvus searches on the most updated data view. This parameter can only be used in the `Customized` level of consistency.  | Integer              | False    |
| `kwargs`: `graceful_time`| Milvus will use current timestamp minus the `graceful_time` as the `guarantee_timestamp` for search. This parameter can only be used in the `Bounded` level of consistency. | Integer              | False    |
| `kwargs`: `travel_timestamp`| Timestamp that is used for Time Travel. Users can specify a timestamp in a search to get results based on a data view at a specified point in time.| Integer              | False    |


## Return

A list that contains all results.

## Raises

- `RpcError`: error if gRPC encounter an error.
- `ParamError`: error if the parameters are invalid.
- `BaseException`: error if the return result from server is not ok.

## Example

```python
from pymilvus import Partition
partition = Partition("novel")
res = partition.query(
  expr = "book_id in [2,4,6,8]", 
  output_fields = ["book_id", "book_intro"],
  consistency_level="Strong"
)
sorted_res = sorted(res, key=lambda k: k['book_id'])
sorted_res
```
