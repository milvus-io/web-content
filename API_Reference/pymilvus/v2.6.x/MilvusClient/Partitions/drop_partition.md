# drop_partition()

This operation drops a specified partition from the current collection.

<div class="admonition note">

<p><b>notes</b></p>

<p>Before dropping a partition, you must first release it.</p>

</div>

## Request syntax

```python
drop_partition(
    collection_name: str,
    partition_name: str,
    timeout: Optional[float] = None,
    **kwargs,
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_name** (*str*) -

    **[REQUIRED]**

    The name of the partition to drop.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# Create a partition
client.create_partition(
    collection_name="test_collection",
    partition_name="partition_A"
)

# Release partition before dropping
client.release_partitions(
    collection_name="test_collection",
    partition_names=["partition_A"]
)

# Drop the partition
client.drop_partition(
    collection_name="test_collection",
    partition_name="partition_A"
)
```
