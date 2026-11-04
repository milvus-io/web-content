# alter_index()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation alters a specified index of the current collection.

## Request Syntax

```python
alter_index(
    index_name: str,
    extra_params: dict,
    timeout: float | None
)
```

**PARAMETERS:**

- **index_name** (*str*) -

    **[REQUIRED]**

    The name of the index to alter.

- **extra_params** (*dict*) -

    **[REQUIRED]**

    The parameters to alter. 

    Currently, the following parameter is supported:

    - **mmap.enabled** (*str*)

        Whether to enable memory-mapped files for the index. The key is `mmap.enabled` and the value can be `True` or `False`.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType, IndexType, MetricType

# Connect to localhost:19530
connections.connect()

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("title", DataType.STRING),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection_alter_index",
    schema=schema
)

# Create an index
index_params = {
    "index_type": IndexType.IVF_FLAT,
    "metric_type": MetricType.L2,
    "params": {
        "nlist": 128
    }
}
collection.create_index(
    field_name="vector",
    index_params=index_params,
    index_name="idx"
)

# Alter the index to enable mmap
collection.alter_index(
    index_name="idx",
    extra_params={
        "mmap.enabled": True
    }
)
```

## Related operations

The following operations are related to `alter_index()`:

- [create_index()](create_index.md)

- [drop_index()](drop_index.md)

- [has_index()](has_index.md)

- [index()](index.md)
