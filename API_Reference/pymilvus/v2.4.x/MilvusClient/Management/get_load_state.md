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

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of a collection.

- __partition_name__ (_str_) -

    The name of a partition.

- __timeout__ (_float_ | _None_) -

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response returns or error occurs.

__RETURN TYPE:__

_dict_

__RETURNS:__

A dictionary that contains the status of the specified collection or partition. 

<div class="admonition note">

<p><b>notes</b></p>

<p>A collection is in the loaded state if any or all of its partitions are loaded.</p>

</div>

__EXCEPTIONS:__

- __MilvusException__

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

- [load_collection()](./Management/load_collection.md)

- [refresh_load()](./Management/refresh_load.md)

- [release_collection()](./Management/release_collection.md)

