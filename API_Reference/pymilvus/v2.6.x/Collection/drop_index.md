# drop_index()

This operation deletes index from the current collection.

## Request Syntax

```python
drop_index(timeout: float | None)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*None*

**RETURNS:**

*NoneType*

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

# Set the index parameters
index_params = {
    "index_type": "IVF_FLAT",
    "metric_type": "COSINE",
    "params": {
        "nlist": 128
    }
}

# Create an index
collection.create_index(
    field_name="test_collection", 
    index_params=index_params, 
    timeout=None
)

# Check the index
collection.has_index() # True

# Drop the index
collection.drop_index()

# Check the index
collection.has_index() # False
```

## Related operations

The following operations are related to `drop_index()`:

- [create_index()](https://zilliverse.feishu.cn/docx/J76vdPHNgoyp2wxAiTcceIVJnOe)

- [has_index()](https://zilliverse.feishu.cn/docx/WDk4dXY8IoV3SJxp9e7c3aq1nBh)

- [index()](https://zilliverse.feishu.cn/docx/RkQ8dnWDHo3DiDxiCVRcP1xPnob)

- [index_building_progress()](https://zilliverse.feishu.cn/docx/OVfodiKa6o3qTGxadYicI975nhh)

- [wait_for_index_building_complete()](https://zilliverse.feishu.cn/docx/MfR8dw5TioPvw3xvrstcgYixnUb)

- [list_indexes()](https://zilliverse.feishu.cn/docx/XLepdUCcTow6rpx5vxxcbLXZnyb)

