# partition()

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

*Partition* | *NoneType*

**RETURNS:**

A **Partition** object. If the current collection does not have a partition of the specified name, **None** is returned.

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
partition = collection.partition(partition_name="test_partition")
```

## Related operations

The following operations are related to `partition()`:

- [Collection](https://zilliverse.feishu.cn/docx/OSehdj15Ao3AUvxOIJucXzU8nWW)

- [Partition](https://zilliverse.feishu.cn/docx/X9scdVMmxoBTuUxlKhecJXEunHd)

- [create_partition()](https://zilliverse.feishu.cn/docx/Sh7HdgJOIoJipXx5AoNcicjMnyd)

- [drop_partition()](https://zilliverse.feishu.cn/docx/Aym2dpBuIo81mExCqyLcSWhunBe)

- [has_partition()](https://zilliverse.feishu.cn/docx/QsOsda2lRoJP32xNSLWcbgMOnKI)

