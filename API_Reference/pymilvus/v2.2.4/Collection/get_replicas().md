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
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load(replica_number=2)    # Load collection as 2 replicas
result = collection.get_replicas()
print(result)
```