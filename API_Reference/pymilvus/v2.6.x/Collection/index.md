# index()

This operation gets the specified index of the current collection.

## Request Syntax

```python
index(
    **kwargs
)
```

**PARAMETERS:**

- **kwargs -** 

    Additional keyword arguments.

    - **index_name** (*str*) -

        The name of the index. If no index is specified, the default index name is used.

        A default index name is in the following format: `_default_idx_{field_id}`.

**RETURN TYPE:**

*Index*

**RETURNS:**

An Index object of the current collection.

**EXCEPTIONS:**

- **IndexNotExistException**

    This exception will be raised when the specified index does not exist.

- **AmbiguousIndexName**

    This exception will be raised when multiple indexes exist but no index name has been specified. 

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

# Create an index on a scalar field
collection.create_index(
    field_name="id"
)

# Set the index parameters
index_params = {
    "index_type": "IVF_FLAT",
    "metric_type": "COSINE",
    "params": {
        "nlist": 128
    }
}

# Create an index on the vector field
collection.create_index(
    field_name="vector", 
    index_params=index_params, 
    timeout=None
)

# Check the index
collection.has_index() # True

# list all index names
collection.indexes

# [<pymilvus.orm.index.Index at 0x12045f910>,
# <pymilvus.orm.index.Index at 0x12045d0d0>]

# Get a specific index object
collection.index(index_name="_default_idex_101")

# <pymilvus.orm.index.Index at 0x1205b8690>
```

## Related operations

The following operations are related to `index()`

- [create_index()](https://zilliverse.feishu.cn/docx/J76vdPHNgoyp2wxAiTcceIVJnOe)

- [drop_index()](https://zilliverse.feishu.cn/docx/AtkDdtMAWodFzExARxnco5xLnsg)

- [has_index()](https://zilliverse.feishu.cn/docx/WDk4dXY8IoV3SJxp9e7c3aq1nBh)

- [index_building_progress()](https://zilliverse.feishu.cn/docx/OVfodiKa6o3qTGxadYicI975nhh)

- [wait_for_index_building_complete()](https://zilliverse.feishu.cn/docx/MfR8dw5TioPvw3xvrstcgYixnUb)

- [list_indexes()](https://zilliverse.feishu.cn/docx/XLepdUCcTow6rpx5vxxcbLXZnyb)

