# flush()

This method seals all entities in the current collection. Any insertion after a flush operation results in generating new segments. Note that only sealed segments can be indexed.

## Invocation

```python
flush(
    collection_name,
    timeout
)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `collection_name` | Name of the collection to flush. | String | True     |
| `timeout` | An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs. | Float | False     |

## Return

None

## Raises

None

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token)

client.flush(collection_name='my-collection')
```