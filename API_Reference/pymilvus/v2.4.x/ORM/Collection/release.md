# release()

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

## Examples

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
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

