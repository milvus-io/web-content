# create_partition()

This operation creates a partition in the target collection.

## Request syntax

```python
create_partition(
    collection_name: str,
    partition_name: str,
    timeout: Optional[float] = None
) -> None
```

__PARAMETERS:__

- __collection_name __(_str_) -

    __[REQUIRED]__

    The name of an existing collection.

- __partition_name__ (_string_)

    __[REQUIRED]__

    The name of the partition to create.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_Partition_

__RETURNS:__

A partition object.

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
```

## Related methods

- [drop_partition()](./drop_partition.md)

- [get_partition_stats()](./get_partition_stats.md)

- [has_partition()](./has_partition.md)

- [list_partitions()](./list_partitions.md)

- [load_partitions()](./load_partitions.md)

- [release_partitions()](./release_partitions.md)

