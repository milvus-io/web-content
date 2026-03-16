# list_indexes()

This operation lists all indexes of a specific collection.

## Request syntax

```python
list_indexes(
    collection_name: str,
    using: str = "default",
    timeout: float | None,
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

    Setting this to a non-existing collection leads to a **CollectionNotExistException**.

- **index_name** (*str*) -

    The name of the target index of this operation.

    If left unspecified, the default index applies. If the collection has multiple indexes, this parameter is mandatory.

    Setting this to a non-existing index leads to an **IndexNotExistException**.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

The names of all built indexes in a list.

**EXCEPTIONS:**

- **CollectionNotExistException**

    This exception will be raised if the specified collection does not exist.

## Examples

```python
from pymilvus import (
    connections, 
    Collection, 
    CollectionSchema, 
    FieldSchema, 
    DataType, 
    utility,
)

# Connect to localhost:19530
connections.connect()

# Create a collection
collection = Collection(
    name="test_collection",
    schema=CollectionSchema([
        FieldSchema("id", DataType.INT64, is_primary=True),
        FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
    ])
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

# List all indexes
utility.list_indexes(
    collection_name="test_collection"
) # ['_default_idx_101', '_default_idx_100']
```

## Related operations

The following operations are related to `list_indexes()`

- [create_index()](../Collection/create_index.md)

- [drop_index()](../Collection/drop_index.md)

- [has_index()](../Collection/has_index.md)

- [index()](../Collection/index.md)

- [index_building_progress()](index_building_progress.md)

- [wait_for_index_building_complete()](wait_for_index_building_complete.md)

