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

- [drop_collection()](https://zilliverse.feishu.cn/docx/FHcYdN4apoI5TIx0LxScISvtn0f)

- [flush_all()](https://zilliverse.feishu.cn/docx/Uwsfd443boKKgyx2zZTcYDqKnCe)

- [get_query_segment_info()](https://zilliverse.feishu.cn/docx/CB9edh2ySoJyWhxBoLcchPj9nxg)

- [has_collection()](https://zilliverse.feishu.cn/docx/TWOxdwDYRo4CCHxDdZbc7IOznCg)

- [has_partition()](https://zilliverse.feishu.cn/docx/KsmadNcXRoElO2xJi5HcJO57nwb)

- [rename_collection()](https://zilliverse.feishu.cn/docx/M0qRdF1cLokrxvxyrXScJ64FnEe)

