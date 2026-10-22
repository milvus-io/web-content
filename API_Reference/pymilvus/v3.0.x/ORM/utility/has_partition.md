# has_partition()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation checks whether a partition exists.

## Request Syntax

```python
has_partition(
    collection_name: str,
    partition_name: str,
    using: str = "default",
    timeout: float | None,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**
    The name of an existing collection.

    Setting this to a non-existing collection results in a **[MilvusException](../../Exceptions/MilvusException.md)**.

- **partition_name** (*str*) -

    **[REQUIRED]**
    The name of a partition.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*bool*

**RETURNS:**
A boolean value indicates whether the specified partition exists.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Examples

```python
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType, utility

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

# Create a partition
collection.create_partition("test_partition")

# Check whether a partition exists
utility.has_partition(
    collection_name="test_collection",
    partition_name="test_partition",
) # True
```

## Related operations

The following operations are related to `has_partition()`:

- [drop_collection()](drop_collection.md)

- [flush_all()](flush_all.md)

- [get_query_segment_info()](get_query_segment_info.md)

- [has_collection()](has_collection.md)

- [list_collections()](list_collections.md)

- [rename_collection()](rename_collection.md)

