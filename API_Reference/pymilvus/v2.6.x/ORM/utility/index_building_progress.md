# index_building_progress()

This operation returns the progress of the index-building process.

## Request Syntax

```python
index_building_progress(
    collection_name: str,
    index_name: str = "",
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

*dict*

**RETURNS:**
A dictionary that contains the number of indexed entities as well as that of total entities in the specified collection.
The dictionary has the following keys:

- **total_rows** (*int*)

    The total number of entities in the specified collection.

- **indexed_rows** (*int*)

    The number of indexed entities in the specified collection.

- **pending_index_rows** (*int*)

    The number of entities that are pending to be indexed.

**EXCEPTIONS:**

- **CollectionNotExistException**

    This exception will be raised if the specified collection does not exist.

- **IndexNotExistException**

    This exception will be raised if the specified index does not exist.

- **AmbiguousIndexName**

    This exception will be raised if multiple indexes exist but the index name is left unspecified.

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

# Connection to localhost:19530
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

# Get the building progress of a specific index
utility.index_building_progress(
    collection_name="test_collection",
    index_name="_default_idx_101"
)
```

## Related operations

The following operations are related to `index_building_progress()`

- [create_index()](../Collection/create_index.md)

- [drop_index()](../Collection/drop_index.md)

- [has_index()](../Collection/has_index.md)

- [index()](../Collection/index.md)

- [wait_for_index_building_complete()](wait_for_index_building_complete.md)

- [list_indexes()](list_indexes.md)

