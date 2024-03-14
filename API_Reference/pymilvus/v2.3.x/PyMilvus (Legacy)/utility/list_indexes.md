
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

_list_

__RETURNS:__

The names of all built indexes in a list.

__EXCEPTIONS:__

- __CollectionNotExistException__

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

