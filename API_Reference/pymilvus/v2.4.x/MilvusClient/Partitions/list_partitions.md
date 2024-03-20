# list_partitions()

This operation lists the partitions in a specified collection.

## Request syntax

```python
list_partitions(
    collection_name: str,
    timeout: Optional[float] = None
) -> list
```

__PARAMETERS:__

- __collection_name __(_str_) -

    __[REQUIRED]__

    The name of an existing collection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_list_

__RETURNS:__

A list of partition names.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Create a partition
client.create_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
)

# 4. List the names of all existing partitions
client.list_partitions(
    collection_name="test_collection", 
)

# ['_default', 'partition_A']
```

## Related methods

- [create_partition()](./create_partition.md)

- [drop_partition()](./drop_partition.md)

- [get_partition_stats()](./get_partition_stats.md)

- [has_partition()](./has_partition.md)

- [load_partitions()](./load_partitions.md)

- [release_partitions()](./release_partitions.md)

