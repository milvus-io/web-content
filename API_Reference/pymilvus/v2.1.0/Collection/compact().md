# compact()

This method compacts data by merging small segments in a collection in Milvus. 

## Invocation

```python
compact(collection_name, timeout=None, **kwargs):
```

## Parameters

| Parameter         | Description                                                  | Type                            | Required |
| ----------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| `collection_name` | Name of the collection to to compact.                        | String                          | True     |
| `timeout`         | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.                                               | Float                           | False    |

## Return

No return.

## Raises

- `BaseException`: error if the collection does not exist.

## Example

```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.compact()
```
