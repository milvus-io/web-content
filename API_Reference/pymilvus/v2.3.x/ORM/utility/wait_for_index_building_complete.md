
# wait_for_index_building_complete()

This operation blocks the current process until the specified index has been built.

## Request syntax

```python
wait_for_index_building_complete(
    collection_name: str,
    index_name: str = "",
    timeout: float | None,
    using: str = "default",
)
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of an existing collection.

    Setting this to a non-existing collection leads to a __CollectionNotExistException__.

- __index_name__ (_str_) -

    The name of the target index of this operation.

    If left unspecified, the default index applies. If the collection has multiple indexes, this parameter is mandatory.

    Setting this to a non-existing index leads to an __IndexNotExistException__.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation times out when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __CollectionNotExistException__

    This exception will be raised if the specified collection does not exist.

- __IndexNotExistException__

    This exception will be raised if the specified index does not exist.

- __AmbiguousIndexName__

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

# Wait for the index being built
utility.wait_for_index_building_complete(
    collection_name="test_collection",
    index_name="_default_idx_100",
)
```

