# partition()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation gets the specified partition in the current collection.

## Request Syntax

```python
partition(
    partition_name: str
)
```

**PARAMETERS:**

- **partition_name** (*str*) -

    **[REQUIRED]**

    The name of the partition to get.

**RETURN TYPE:**

*[Partition](../Partition/Partition.md)* | *NoneType*

**RETURNS:**

A **[Partition](../Partition/Partition.md)** object. If the current collection does not have a partition of the specified name, **None** is returned.

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

# Create a partition
partition = collection.partition(partition_name="test_partition")
```

## Related operations

The following operations are related to `partition()`:

- [Collection](Collection.md)

- [Partition](../Partition/Partition.md)

- [create_partition()](create_partition.md)

- [drop_partition()](drop_partition.md)

- [has_partition()](has_partition.md)

