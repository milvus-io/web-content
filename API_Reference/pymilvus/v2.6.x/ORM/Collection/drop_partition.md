# drop_partition()

This operation drops a specified partition from the current collection.

```python
drop_partition(
    partition_name: str
    timeout: float | None
)
```

## Request Syntax

```python
from pymilvus import Collection

# Get an existing collection
collection = Collection(name="string")

# drop an existing partition
collection.drop_partition(
    partition_name="string"
)
```

**PARAMETERS:**

- **partition_name** (*str*) -

    The name of the partition to drop.

- **timeout** (*float* | *None*)  

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
partition = collection.create_partition("test_partition")

# Check whether the partition exists
collection.has_partition("test_partition") # True

# Drop the partition
collection.drop_partition("test_partition")

# Check whether the partition exists
collection.has_partition("test_partition") # False
```

## Related operations

The following operations are related to `drop_collection()`:

- [Collection](Collection.md)

- [Partition](../Partition/Partition.md)

- [create_partition()](create_partition.md)

- [partition()](partition.md)

- [has_partition()](has_partition.md)

