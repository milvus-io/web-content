
# load_state()

This operation returns the load status of a specific collection.

## Request syntax

```python
load_state(
    collection_name: str,
    partition_names: list[str] | None
    using: str = "default",
    timeout: float | None
) -> LoadState
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of a collection.

- __partition_names__ (_list[str]_) -

    A list of partition names.

    If any partition names are specified, releasing any of these partitions results in the return of a __NotLoad__ state.

- __using__ (_string_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_LoadState_

__RETURNS:__
A __LoadState__ object that indicates the load status of the specified collection.

The possible states are as follows:

- __Loaded__

    Indicates that the specified collection is loaded.

- __Loading__

    Indicates that the specified collection is being loaded.

- __NotExist__

    Indicates that the specified collection does not exist. 

    Including a non-existing partition in __partition_names__ results in a __MilvusException__.

- __NotLoad__

    Indicates that the specified collection is not loaded.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import (
    connections, 
    Collection, 
    CollectionSchema, 
    FieldSchema, 
    DataType, 
    utility,
)

# Connect to localhost:19530
connections.connect()

# Create a collection
collection = Collection(
    name="test_collection",
    schema=CollectionSchema([
        FieldSchema("id", DataType.INT64, is_primary=True),
        FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
    ])
)

# Set the index parameters
index_params = {
    "index_type": "AUTOINDEX",
    "metric_type": "COSINE",
    "params": {
        "nprobe": 10
    }
}

# Create an index on the vector field
collection.create_index(
    field_name="vector", 
    index_params=index_params, 
    timeout=None
)

# Load the collection
collection.load()

# Create two partitions
partition1 = collection.create_partition("partition1")
partition2 = collection.create_partition("partition2")

# Check the load
utility.load_state(
    collection_name="test_collection",
    partition_names=["partition1", "partition2"],
    using=using,
    timeout=timeout,
) # <LoadState: Loaded>

# Release a partition
partition2.release()

utility.load_state(collection_name="test_collection") # <LoadState: Loaded>

utility.load_state(
    collection_name="test_collection",
    partition_names=["partition1", "partition2"],
) # <LoadState: NotLoad>
```

