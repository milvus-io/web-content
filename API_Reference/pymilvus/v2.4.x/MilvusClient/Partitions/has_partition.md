# has_partition()

This operation checks whether the specified partition exists in the specified collection.

## Request syntax

```python
has_partition(
    collection_name: str,
    partition_name: str,
    timeout: Optional[float] = None
) -> bool
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*string*)

    **[REQUIRED]**

    The name of the partition to check.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*bool*

**RETURNS:**

A boolean value indicating whether the specified partition exists.

**EXCEPTIONS:**

- **MilvusException**

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

# 4. Check whether the partition exists
client.has_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
) 

# True
```

## Related methods

- [create_partition()](create_partition.md)

- [drop_partition()](drop_partition.md)

- [get_partition_stats()](get_partition_stats.md)

- [list_partitions()](list_partitions.md)

- [load_partitions()](load_partitions.md)

- [release_partitions()](release_partitions.md)

