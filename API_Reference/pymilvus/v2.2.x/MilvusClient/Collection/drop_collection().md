# drop_collection()

This method drops a collection.

## Invocation

```python
drop_collection(collection_name)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `collection_name` | Name of the collection to drop. | String | True     |

## Return

None

## Raises

None

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token)

client.drop_collection(collection_name='my-collection')
```