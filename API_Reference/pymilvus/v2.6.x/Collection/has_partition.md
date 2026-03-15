# has_partition()

This operation checks whether the specified partition exists in the current collection.

## Request Syntax

```python
has_partition(
    partition_name: str, 
    timeout: float | None,
)
```

**PARAMETERS:**

- **partition_name** (*str*) -

    The name of the partition to drop.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*bool*

**RETURNS:**

A boolean value indicating whether the current collection has the specified partition or not

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

The following operations are related to `has_collection()`:

- [Collection](https://zilliverse.feishu.cn/docx/OSehdj15Ao3AUvxOIJucXzU8nWW)

- [Partition](https://zilliverse.feishu.cn/docx/X9scdVMmxoBTuUxlKhecJXEunHd)

- [create_partition()](https://zilliverse.feishu.cn/docx/Sh7HdgJOIoJipXx5AoNcicjMnyd)

- [partition()](https://zilliverse.feishu.cn/docx/SvCrdEJIdosGQYxQZhrc2OAXnpd)

- [drop_partition()](https://zilliverse.feishu.cn/docx/Aym2dpBuIo81mExCqyLcSWhunBe)

