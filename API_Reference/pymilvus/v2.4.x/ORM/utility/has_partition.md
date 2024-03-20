# has_partition()

This operation checks whether a partition exists.

## Request Syntax

```python
has_partition(
    collection_name: str,
    partition_name: str,
    using: str = "default",
    timeout: float | None,
)
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__
The name of an existing collection.

    Setting this to a non-existing collection results in a __MilvusException__.

- __partition_name__ (_str_) -

    __[REQUIRED]__
The name of a partition.

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

# Get an existing collection
collection = Collection(name="test_collection")

# Check whether a partition exist
collection.has_partition(
    collection_name="test_collection",
    partition_name="test_partition",
) # True
```

## Related operations

The following operations are related to `has_partition()`:

- [drop_collection()](./drop_collection.md)

- [flush_all()](./flush_all.md)

- [get_query_segment_info()](./get_query_segment_info.md)

- [has_collection()](./has_collection.md)

- [list_collections()](./list_collections.md)

- [rename_collection()](./rename_collection.md)

