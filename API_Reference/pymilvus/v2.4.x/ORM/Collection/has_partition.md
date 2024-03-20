# has_partition()

This operation checks whether the specified partition exists in the current collection.

## Request Syntax

```python
has_partition(
    partition_name: str, 
    timeout: float | None,
)
```

__PARAMETERS:__

- __partition_name__ (_str_) -

    The name of the partition to drop.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_bool_

__RETURNS:__

A boolean value indicating whether the current collection has the specified partition or not

__EXCEPTIONS:__

- __MilvusException__

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

The following operations are related to `has_collection()`:

- [Collection](./ORM/Collection.md)

- [Partition](./ORM/Partition.md)

- [create_partition()](./create_partition.md)

- [partition()](./partition.md)

- [drop_partition()](./drop_partition.md)

