# truncate()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation truncates the current collection, removing all its data. It has the same effect as `utility.truncate_collection()`.

## Request Syntax

```python
truncate(
    timeout: float | None = None
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

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
    name="test",
    schema=schema
)

# Insert some data
collection.insert(
    data=[
        [0, 1],
        [
            [0.1, 0.2, -0.3, -0.4, 0.5],
            [0.3, -0.1, -0.2, -0.6, 0.7],
        ],
    ]
)

# Truncate the collection
collection.truncate()
```
