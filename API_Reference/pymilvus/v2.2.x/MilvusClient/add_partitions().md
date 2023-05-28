# add_partition()

This method adds partitions to the connected collection.

## Invocation

```python
add_partition(input_partitions)
```

## Parameters

| Parameter          | Description                          | Type     | Required |
|--------------------|--------------------------------------|----------|----------|
| `input_partitions` | Name list of partitions to be added. | String[] | True     |

## Raises

`MilvusException`: Error if failed to add the specified partitions.

## Returns

None

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient()

client.add_partitions(['my-partition-1', 'my-partition-2'])
```