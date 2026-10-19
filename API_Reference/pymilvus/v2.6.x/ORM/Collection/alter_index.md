# alter_index()

This operation alters an index of the current collection.

## Request Syntax

```python
alter_index(
    index_name: str,
    extra_params: dict,
    timeout: float | None = None
)
```

**PARAMETERS:**

- **index_name** (*str*) -

    **[REQUIRED]**

    The name of the index to alter.

- **extra_params** (*dict*) -

    **[REQUIRED]**

    The parameters to update on the index. For example, use `"mmap.enabled"` as the key with `True` or `False` as the value to toggle memory-mapped storage.

- **timeout** (*float* | *None*) -

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
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType

# Connect to localhost:19530
connections.connect()

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test",
    schema=schema
)

# Create an index
collection.create_index(
    field_name="vector",
    index_params={
        "index_type": "IVF_FLAT",
        "metric_type": "COSINE",
        "params": {"nlist": 128},
    },
    index_name="vector_idx",
)

# Alter the index
collection.alter_index(
    index_name="vector_idx",
    extra_params={"mmap.enabled": True},
)
```
