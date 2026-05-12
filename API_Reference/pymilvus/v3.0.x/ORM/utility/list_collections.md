# list_collections()

This operation lists all collections in the database used in the current connection.

## Request Syntax

```python
list_collections(
    timeout: float | None,
    using: str = "default",
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

**RETURN TYPE:**

*list*

**RETURNS:**
A list of collection names.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Examples

```python
from pymilvus import connections, utility

connections.connect()

utility.list_collections()
```

## Related operations

The following operations are related to `list_collections()`:

- [drop_collection()](drop_collection.md)

- [flush_all()](flush_all.md)

- [get_query_segment_info()](get_query_segment_info.md)

- [has_collection()](has_collection.md)

- [has_partition()](has_partition.md)

- [rename_collection()](rename_collection.md)

