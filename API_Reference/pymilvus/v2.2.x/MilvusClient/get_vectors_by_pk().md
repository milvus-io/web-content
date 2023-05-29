# get_vectors_by_pk()

This method grabs vectors using the primary keys from the collection.

## Invocation

```python
get_vectors_by_pk(pks, timeout)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `pks` | Primary keys of the vectors to grab. | Union[list, str, int] | True     |
| `timeout` | Maximum time that the method should wait for the operation to complete before raising an exception. | Integer | False    |

## Raises

`ValueError`: Error if failed to grab vectors.

## Returns

None

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

# Grab an entity by its id if the id is a string
client.get_vectors_by_pk('pk-1')

# Grab an entity by its id if the id is an integer
client.get_vectors_by_pk(0)

# Grab multiple entities

client.get_vectors_by_pk(['pk-1', 'pk-2'])
```