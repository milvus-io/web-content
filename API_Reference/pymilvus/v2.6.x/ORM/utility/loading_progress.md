# loading_progress()

This operation returns the load progress of a specific collection.

## Request Syntax

```python
loading_progress(
    collection_name: str,
    partition_names: list[str] | None,
    using: str = "default",
    timeout: float | None,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection.

- **partition_names** (*list[str]*) -

    A list of partition names.

    If any partition names are specified, releasing any of these partitions results in the return of a **NotLoad** state.

- **using** (*string*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary that contains information about the index_building progress.

The dictionary has the following keys:

- **loading_progress** (*str*)

    The load progress of the specified collection.

**EXCEPTIONS:**

- **MilvusException**

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

# Get the load progress
utility.loading_progress(
    collection_name="test_collection",
) # {loading_progress: '100%' }
```

## Related operations

The following operations are related to `loading_progress()`:

- [Partition](../Partition/Partition.md)

- [load()](../Collection/load.md)

- [release()](../Collection/release.md)

- [load_state()](load_state.md)

- [wait_for_loading_complete()](wait_for_loading_complete.md)

