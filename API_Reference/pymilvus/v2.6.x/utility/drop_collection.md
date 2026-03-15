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

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of a collection to delete.

- **timeout** (*float*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

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

- [flush_all()](https://zilliverse.feishu.cn/docx/Uwsfd443boKKgyx2zZTcYDqKnCe)

- [get_query_segment_info()](https://zilliverse.feishu.cn/docx/CB9edh2ySoJyWhxBoLcchPj9nxg)

- [has_collection()](https://zilliverse.feishu.cn/docx/TWOxdwDYRo4CCHxDdZbc7IOznCg)

- [has_partition()](https://zilliverse.feishu.cn/docx/KsmadNcXRoElO2xJi5HcJO57nwb)

- [list_collections()](https://zilliverse.feishu.cn/docx/QgxEdfBMSodYo6xCg24cH3hInr4)

- [rename_collection()](https://zilliverse.feishu.cn/docx/M0qRdF1cLokrxvxyrXScJ64FnEe)

