# release()

This operation releases the data of the current collection from memory.

## Request Syntax

```python
release(
    timeout=None,
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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

# Load the entire collection with one replica of the collection data
collection.load()

# Release the entire collection data
collection.release()
```

## Related operations

The following operations are related to `release()`:

- [Partition](https://zilliverse.feishu.cn/docx/X9scdVMmxoBTuUxlKhecJXEunHd)

- [load()](https://zilliverse.feishu.cn/docx/HQDndiGwloWKIexgPCUcEZGenOh)

- [load_state()](https://zilliverse.feishu.cn/docx/BJysdlj1MoksHZxNRxicHn9fnSh)

- [loading_progress()](https://zilliverse.feishu.cn/docx/HQiHd82orov0XvxAzLWcl5xRnzc)

- [wait_for_loading_complete()](https://zilliverse.feishu.cn/docx/PLKXdUB1EoNX8gxKHruc9GcEnsg)

