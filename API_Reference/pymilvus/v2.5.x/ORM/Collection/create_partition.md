# create_partition()

This operation creates a partition in the target collection.

## Request Syntax

```python
create_partition(
    partition_name: str, 
    description: str | None, 
)
```

**PARAMETERS:**

- **partition_name** (*string*)

    **[REQUIRED]**

    The name of the partition to create.

- **description** (*string*)

    The description of this partition.

**RETURN TYPE:**

*Partition*

**RETURNS:**

A partition object.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

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

# Create a partition
partition = collection.create_partition(partition_name="test_partition")

# Output
# {"name":"test_partition","collection_name":"test_collection","description":""}
```

## Related operations

The following operations are related to `create_partition()`:

- [Collection](Collection.md)

- [Partition](../Partition/Partition.md)

- [partition()](partition.md)

- [drop_partition()](drop_partition.md)

- [has_partition()](has_partition.md)

