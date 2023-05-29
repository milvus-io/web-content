# delete_by_pk()

This method deletes entities from the collection by primary keys.

## Invocation

```python
delete_by_pk(pks, timeout)
```

## Parameters

| Parameter           | Description                                                                          | Type    | Required |
|---------------------|--------------------------------------------------------------------------------------|---------|----------|
| `pks` | Primary keys of the entries to delete. | Union[list, str, int] | True    |
| `timeout` | Maximum time that the method should wait for the operation to complete before raising an exception. | Integer | False    |

## Raises

None

## Returns

None

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.delete_by_pk(['pk-1', 'pk-2'])
```