# get_load_state()

This operation displays whether a specified collection or partition is loaded or not.

## Request syntax

```python
get_load_state(
    collection_name: str,
    partition_name: Optional[str] = "",
    timeout: Optional[float] = None
) -> Dict
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection.

- **partition_name** (*str*) -

    The name of a partition.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response returns or error occurs.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary that contains the status of the specified collection or partition. 

<div class="admonition note">

<p><b>notes</b></p>

<p>A collection is in the loaded state if any or all of its partitions are loaded.</p>

</div>

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="quick_setup", dimension=5)

# 3. Check the load status of the collection
client.get_load_state(collection_name="quick_setup") 

# {'state': <LoadState: Loaded>}

# 4. Release the collection
client.release_collection(collection_name="quick_setup")
client.get_load_state(collection_name="quick_setup") 

# {'state': <LoadState: NotLoad>}

# 5. Create a partition
client.create_partition(
    collection_name="quick_setup", 
    partition_name="partition_A"
)

# 6. Load a partition
client.load_partitions(
    collection_name="quick_setup",
    partition_names=["partition_A"]
)

client.get_load_state(collection_name="quick_setup") 

# {'state': <LoadState: Loaded>}

client.get_load_state(
    collection_name="quick_setup",
    partition_name="partition_A"
) 

# {'state': <LoadState: Loaded>}
```

## Related methods

- [load_collection()](load_collection.md)

- [refresh_load()](refresh_load.md)

- [release_collection()](release_collection.md)

