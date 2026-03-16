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

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**
    The name of an existing collection.

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

# Check whether a partition exists
collection.has_collection(
    collection_name="test_collection",
) # True
```

## Related operations

- [drop_collection()](https://zilliverse.feishu.cn/docx/FHcYdN4apoI5TIx0LxScISvtn0f)

- [flush_all()](https://zilliverse.feishu.cn/docx/Uwsfd443boKKgyx2zZTcYDqKnCe)

- [get_query_segment_info()](https://zilliverse.feishu.cn/docx/CB9edh2ySoJyWhxBoLcchPj9nxg)

- [has_partition()](https://zilliverse.feishu.cn/docx/KsmadNcXRoElO2xJi5HcJO57nwb)

- [list_collections()](https://zilliverse.feishu.cn/docx/QgxEdfBMSodYo6xCg24cH3hInr4)

- [rename_collection()](https://zilliverse.feishu.cn/docx/M0qRdF1cLokrxvxyrXScJ64FnEe)

