# list_aliases()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation lists all existing aliases for a specific collection.

## Request Syntax

```python
list_aliases(
    collection_name: str,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection whose aliases are to be listed.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation times out when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of aliases for the specified collection. If the collection has no aliases, an empty list will be returned.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

- **BaseException**

    This exception will be raised when this operation fails.

## Example

```python
from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType, utility

# Connection to localhost:19530
connections.connect()

# Create a collection
schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5),
])

collection_1 = Collection("collection_1", schema)

# Create an alias for collection_1
utility.create_alias(collection_name="collection_1", alias="bob")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob']

# Create another alias for collection_1
utility.create_alias(collection_name="collection_1", alias="tom")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob', 'tom']
```

## Related operations

The following operations are related to `drop_alias()`:

- [alter_alias()](alter_alias.md)

- [create_alias()](create_alias.md)

- [drop_alias()](drop_alias.md)

