
# has_collection()

This operation checks whether a collection exists.

## Request Syntax

```python
has_collection(
    collection_name: str,
    using: str = "default",
    timeout: float | None,
)
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__
The name of an existing collection.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_bool_

__RETURNS:__
A boolean value indicates whether the specified partition exists.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Check whether a partition exists
collection.has_collection(
    collection_name="test_collection",
) # True
```

