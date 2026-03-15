# drop()

This operation drops the current collection. 

## Request Syntax

```python
drop(
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

# Drop the collection
collection.drop()
```

## Related operations

The following operations are related to `drop()`:

- [describe()](https://zilliverse.feishu.cn/docx/EZwsd887JojFjLxbMByckhW0nxg)

- [flush()](https://zilliverse.feishu.cn/docx/VdiwdqQ9iofbkoxcc8Kcqk5gnhZ)

- [get_replicas()](https://zilliverse.feishu.cn/docx/BQKPdDd5xo8OPgxoXorcMxk0nVb)

- [set_properties()](https://zilliverse.feishu.cn/docx/ECmAdaYKboPTNlxqkLxcUEZ4nrh)

