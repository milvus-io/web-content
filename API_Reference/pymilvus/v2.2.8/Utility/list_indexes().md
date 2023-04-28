# list_indexes()

This method lists the names of the indexes of all or specified indexed fields.

## Invocations

```python
list_indexes(collection_name, using="default", timeout=None,  **kwargs)
```

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `collection_name` | Name of the collection to list the indexes                     | String                          | True     |
| `using`           | Milvus Connection used to check the segments                 | String                          | False    |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                               | Float                           | False    |
| `kwargs`: `fieldName` | Name of an indexed field | String | False |

## Returns

A list of index names.

## Example

```python
from pymilvus import Collection, utility

list = utility.list_indexes("movies_db")

print(list)
# Output
# [_idx_title_vector]

list = utility.list_indexes("movies_db", fieldname="embedding")

print(list)
# Output
# [_idx_title_vector]
```
