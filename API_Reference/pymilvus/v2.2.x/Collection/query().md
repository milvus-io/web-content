# query()

This method conducts a vector query.

## Invocation

```python
query(expr, offset, limit, output_fields=None, partition_names=None, timeout=None)
```

## Parameters

| Parameter         | Description                                                   | Type               | Required |
| ----------------- | ------------------------------------------------------------- | ------------------ | -------- |
| `expr`            | Boolean expression to filter the data                         | String             | True     |
| `partition_names` | List of names of the partitions to search on. </br>All partition will be searched if it is left empty.                                                                              | list[String]       | False    |
| `offset`          | Number of results to skip in the returned set. The sum of this value and `limit` should be less than 65535.                           | Integer            | False     |
| `limit`           | Number of nearest records to return. The sum of this value and `offset` should be less than 65535.                          | Integer            | False     |
| `output_fields`   | List of names of fields to output                             | list[String]       | False    |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                                | Float              | False    |
| `kwargs`: `consistency_level`|Consistency level used in the search. | String/Integer              | False    |
| `kwargs`: `guarantee_timestamp`|Milvus searches on the data view before this timestamp when it is provided. Otherwise, it searches the most updated data view. It can be only used in `Customized` level of consistency. | Integer              | False    |
| `kwargs`: `graceful_time`|PyMilvus will use current timestamp minus the `graceful_time` as the `guarantee_timestamp` for search. It can be only used in `Bounded` level of consistency. | Integer              | False    |
| `kwargs`: `travel_timestamp`|Timestamp that is used for Time Travel. Users can specify a timestamp in a search to get results based on a data view at a specified point in time.| Integer              | False    |
| `kwargs`: `ignore_growing` | Whether to ignore growing segments during similarity searches. The value defaults to `False`, indicating that searches involve growing segments. | Bool | False |

## Return

A list that contains all results.

## Raises

- `RpcError`: error if gRPC encounter an error.
- `ParamError`: error if the parameters are invalid.
- `DataTypeNotMatchException`: error if wrong type of data is passed to server.
- `BaseException`: error if the return result from server is not ok.

## Example

```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
res = collection.query(
  expr="book_id in [2,4,6,8]", 
  output_fields=["book_id", "book_intro"],
  consistency_level="Strong"
)
sorted_res = sorted(res, key=lambda k: k['book_id'])
sorted_res

# You can also reference dynamic fields in filter expressions,
# and include them in output fields
res = collection.query(
    # demontrates the ways to reference a dynamic field.
    expr='$meta["dynamic_field_1"] > 10 and dynamic_field_2 == 10',
    # sets the names of the fields you want to retrieve from the search result.
    output_fields=['title', 'dynamic_field_1', 'dynamic_field_2'], 
)

sorted_res = sorted(res, key=lambda k: k['dynamic_field_1'])
```
