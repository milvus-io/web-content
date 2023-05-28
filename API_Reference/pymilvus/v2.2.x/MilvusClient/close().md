# close()

This method closes the current connection to a Milvus server.

## Invocation

```python
close(delete_collection)
```

## Parameters

| Parameter           | Description                                                                          | Type    | Required |
|---------------------|--------------------------------------------------------------------------------------|---------|----------|
| `delete_collection` | Boolean value indicates whether to delete the collection upon disconnecting from it. | Boolean | False    |

## Raises

None

## Returns

None

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.close()
```