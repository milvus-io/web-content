# drop_collection()

This operation drops a specific collection.

## Request Syntax

```python
drop_collection(
    collection_name: str,
    timeout: float | None,
    using: str = "default",
)
```

__PARAMETERS:__

- __collection_name__ (_str_) -

    __[REQUIRED]__

    The name of a collection to delete.

- __timeout__ (_float_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

N/A

### Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Drop a specific collection
utility.drop_collection(
    collection_name="test_collection",
)
```

## Related operations

The following operations are related to the `drop_collection()` method:

- [flush_all()](./flush_all.md)

- [get_query_segment_info()](./get_query_segment_info.md)

- [has_collection()](./has_collection.md)

- [has_partition()](./has_partition.md)

- [list_collections()](./list_collections.md)

- [rename_collection()](./rename_collection.md)

