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

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**
    The name of an existing collection.

    Setting this to a non-existing collection results in a **MilvusException**.

- **partition_name** (*str*) -

    **[REQUIRED]**
    The name of a partition.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*bool*

**RETURNS:**
A boolean value indicates whether the specified partition exists.

**EXCEPTIONS:**

- **MilvusException**

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

- [drop_collection()](https://zilliverse.feishu.cn/docx/FHcYdN4apoI5TIx0LxScISvtn0f)

- [flush_all()](https://zilliverse.feishu.cn/docx/Uwsfd443boKKgyx2zZTcYDqKnCe)

- [get_query_segment_info()](https://zilliverse.feishu.cn/docx/CB9edh2ySoJyWhxBoLcchPj9nxg)

- [has_collection()](https://zilliverse.feishu.cn/docx/TWOxdwDYRo4CCHxDdZbc7IOznCg)

- [list_collections()](https://zilliverse.feishu.cn/docx/QgxEdfBMSodYo6xCg24cH3hInr4)

- [rename_collection()](https://zilliverse.feishu.cn/docx/M0qRdF1cLokrxvxyrXScJ64FnEe)

