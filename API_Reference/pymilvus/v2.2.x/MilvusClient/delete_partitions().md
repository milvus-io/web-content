# delete_partitions()

This method removes partitions from the collection.

## Invocation

```python
delete_partitions(remove_partitions)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `remove_partitions` | A list of partition names to be deleted. | list[String] | True     |

## Raises

`MilvusException`: Error if failed to remove a partition.

## Returns

None

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.remove_partitions(['my-partition-1', 'my-partition-2'])
```