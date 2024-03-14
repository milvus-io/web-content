
# list_aliases()

This operation lists all existing aliases for a specific collection.

## Request Syntax

```python
list_aliases(
    collection_name: str,
    using: str,
    timeout: float | None
)
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of the collection whose aliases are to be listed.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation times out when any response arrives or any error occurs.

__RETURN TYPE:__

_list_

__RETURNS:__

A list of aliases for the specified collection. If the collection has no aliases, an empty list will be returned.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

- __BaseException__

    This exception will be raised when this operation fails.

## Examples

```python
from pymilvus import connections, Collection, utility

# Connection to localhost:19530
connections.connect()

# Get an existing collection
collection_1 = Collection("collection_1")

# Create an alias for collection_1
utility.create_alias(collection_name="collection_1", alias="bob")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob']

# Create another alias for collection_1
utility.create_alias(collection_name="collection_1", alias="tom")

# List aliases for the collection
utility.list_aliases(collection_name="collection_1") # ['bob', 'tom']
```

