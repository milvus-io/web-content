# list_collections()

This operation lists all collections in the database used in the current connection.

## Request Syntax

```python
list_collections(
    timeout: float | None,
    using: str = "default",
)
```

__PARAMETERS:__

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

__RETURN TYPE:__

_list_

__RETURNS:__
A list of collection names.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Examples

```python
from pymilvus import connections, utility

connections.connect()

utility.list_collections()
```

## Related operations

The following operations are related to `list_collections()`:

- [drop_collection()](./drop_collection.md)

- [flush_all()](./flush_all.md)

- [get_query_segment_info()](./get_query_segment_info.md)

- [has_collection()](./has_collection.md)

- [has_partition()](./has_partition.md)

- [rename_collection()](./rename_collection.md)

