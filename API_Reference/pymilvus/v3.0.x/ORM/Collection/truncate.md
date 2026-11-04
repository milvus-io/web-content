# truncate()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation truncates the current collection. This operation has the same effect as `utility.truncate_collection()`.

## Request Syntax

```python
truncate(
    timeout: float | None
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

## Example

```python
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType

# Connect to localhost:19530
connections.connect()

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection and insert two entities
collection = Collection(
    name="test_collection_truncate",
    schema=schema
)

collection.insert([
    [1, 2],
    [[1.0, 2.0], [3.0, 4.0]]
])
collection.flush()

collection.num_entities # 2

# Truncate the collection
collection.truncate()

collection.num_entities # 0
```

## Related operations

The following operations are related to `truncate()`:

- [drop()](drop.md)

- [flush()](flush.md)

- [set_properties()](set_properties.md)

- [truncate_collection()](../utility/truncate_collection.md)
