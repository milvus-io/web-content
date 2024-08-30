# load_partitions()

This operation loads a specific set of partitions in a specified collection into memory.

## Request syntax

```python
load_partitions(
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

    A list of the names of the partitions to load.

- **resource_groups** (*str[]*) -

    The target resource groups of this operation.

- **load_fields** (*str[]*) -

    The names of the fields to load. 

    If this parameter is left unspecified, Milvus loads all vector field indexes plus all scalar field data into memory. Setting this parameter makes Milvus load the data of the specified fields into memory, reducing memory usage and improving search performance.

- **skip_load_dynamic_field** (*bool*) - 

    Setting this to true makes Milvus skip loading the dynamic field, making it unavailable for filtering conditions and output fields for searches and queries.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Create a partition
client.create_partition(
    collection_name="test_collection", 
    partition_name="partition_A"
)

# 4. Release the collection
client.release_collection(collection_name="test_collection")

# 5. Load a partition
client.load_partitions(
    collection_name="test_collection",
    partition_names=["partition_A"]
)

# 6. Check the load status of the collection
client.get_load_state(collection_name="test_collection") 

# {'state': <LoadState: Loaded>}

# 7. Check the load status of the partition
client.get_load_state(
    collection_name="test_collection",
    partition_name="partition_A",
)

# {'state': <LoadState: Loaded>}
```

## Related methods

- [create_partition()](create_partition.md)

- [drop_partition()](drop_partition.md)

- [get_partition_stats()](get_partition_stats.md)

- [has_partition()](has_partition.md)

- [list_partitions()](list_partitions.md)

- [release_partitions()](release_partitions.md)

