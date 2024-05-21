# drop_partition()

This operation drops a specified partition from the current collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>Before dropping a partition, you must first release it.</p>

</div>

## Request syntax

```python
create_partition(
    collection_name: str,
    partition_name: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_names** (*str*)

    **[REQUIRED]**

    The name of the partition to drop.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

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

# 4. Release partition
client.release_partitions(
    collection_name="test_collection",
    partition_names=["partition_A"]
)

# 4. Drop the partition
client.drop_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
)
```

## Related methods

- [create_partition()](create_partition.md)

- [get_partition_stats()](get_partition_stats.md)

- [has_partition()](has_partition.md)

- [list_partitions()](list_partitions.md)

- [load_partitions()](load_partitions.md)

- [release_partitions()](release_partitions.md)

