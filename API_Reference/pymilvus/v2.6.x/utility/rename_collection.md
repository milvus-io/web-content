# rename_collection()

This operation renames an existing collection and optionally moves the collection to a new database.

<div class="alert note">

Aliases created for the target collection remain intact after this operation.

</div>

## Request Syntax

```python
rename_collection(
    old_collection_name: str,
    new_collection_name: str,
    new_db_name: str = "default",
    timeout: float | None,
    using: str = "default",
)
```

**PARAMETERS:**

- **old_collection_name** (*str*) -

    **[REQUIRED]**
    The original name of the target collection.

    Setting this to a non-existing collection results in a **MilvusException**.

- **new_collection_name** (*str*) -

    **[REQUIRED]**

    The name of the target collection after this operation.

    Setting this to the value of **old_collection_name** results in a **MilvusException**.

- **new_db_name** (*str*) -

    The name of the database to which the collection belongs after this operation.

    The value defaults to **default**. Setting this to a database rather than the one the collection belongs to before this operation moves this collection to the specified database.

    Setting this to a non-existing database results in a **MilvusException**.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Examples

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

# Renames a collection
utility.rename_collection(
    old_collection_name="test_collection_1",
    new_collection_name="test_collection_2",
)

# Renames a collection and moves it to a new database
utility.rename_collection(
    old_collection_name="test_collection_1",
    new_collection_name="test_collection_2",
    new_db_name="new_database"
)
```

## Related operations

The following operations are related to `rename_collection()`:

- [drop_collection()](https://zilliverse.feishu.cn/docx/FHcYdN4apoI5TIx0LxScISvtn0f)

- [flush_all()](https://zilliverse.feishu.cn/docx/Uwsfd443boKKgyx2zZTcYDqKnCe)

- [get_query_segment_info()](https://zilliverse.feishu.cn/docx/CB9edh2ySoJyWhxBoLcchPj9nxg)

- [has_collection()](https://zilliverse.feishu.cn/docx/TWOxdwDYRo4CCHxDdZbc7IOznCg)

- [has_partition()](https://zilliverse.feishu.cn/docx/KsmadNcXRoElO2xJi5HcJO57nwb)

- [list_collections()](https://zilliverse.feishu.cn/docx/QgxEdfBMSodYo6xCg24cH3hInr4)

