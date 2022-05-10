# get_replicas()

This method checks the replica information.

## Invocation

```python
get_replicas()
```

## Return

The information about replica groups and the corresponding query nodes and shard.

## Raises


## Example

```python
from pymilvus import Partition
partition = Partition("book", "novel")
partition.load(replica_number=2)    # Load partition as 2 replicas
result = partition.get_replicas()
print(result)
```