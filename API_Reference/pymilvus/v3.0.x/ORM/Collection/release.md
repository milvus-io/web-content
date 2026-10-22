# release()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation releases the data of the current collection from memory.

## Request Syntax

```python
release(
    timeout=None,
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType

# Connect to localhost:19530
connections.connect()

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Create an index on the vector field
collection.create_index(
    field_name="vector",
    index_params={
        "index_type": "AUTOINDEX",
        "metric_type": "COSINE",
    },
)

# Load the entire collection with one replica of the collection data
collection.load()

# Release the entire collection data
collection.release()
```

## Related operations

The following operations are related to `release()`:

- [Partition](../Partition/Partition.md)

- [load()](load.md)

- [load_state()](../utility/load_state.md)

- [loading_progress()](../utility/loading_progress.md)

- [wait_for_loading_complete()](../utility/wait_for_loading_complete.md)

