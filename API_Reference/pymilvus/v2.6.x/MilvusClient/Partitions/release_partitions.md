# release_partitions()

This operation releases the partitions in a specified collection from memory.

## Request syntax

```python
release_partitions(
    collection_name: str,
    partition_names: str | List[str],
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **partition_names** (*str | list[str]*) -

    **[REQUIRED]**

    A list of the names of the partitions to release.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

<div class="admonition note">

<p><b>notes</b></p>

<p>A collection is in the loaded state only if any or all of its partitions are loaded.</p>

</div>

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

# 2. Create a collection and get its load status
client.create_collection(collection_name="test_collection", dimension=5)

res = client.get_load_state(
    collection_name="test_collection"
)

print(res)

# {'state': <LoadState: Loaded>}

# 3. Create a partition
client.create_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
)

# 4. Check the load status of the partition
res = client.get_load_state(
    collection_name="test_collection",
    partition_name="partition_A",
)

print(res)

# {'state': <LoadState: Loaded>}

# 5. Release the partition
client.release_partitions(
    collection_name="test_collection",
    partition_names=["partition_A"]
)

# 6. Check the load status
res = client.get_load_state(
    collection_name="test_collection",
    partition_name="partition_A"
)

print(res)

# {'state': <LoadState: NotLoad>}

res = client.get_load_state(
    collection_name="test_collection"
)

# {'state': <LoadState: Loaded>}
```

## Related methods

- [create_partition()](create_partition.md)

- [drop_partition()](drop_partition.md)

- [get_partition_stats()](get_partition_stats.md)

- [has_partition()](has_partition.md)

- [list_partitions()](list_partitions.md)

- [load_partitions()](load_partitions.md)

