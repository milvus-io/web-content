# drop_database_properties()

This operation drops the setting of the specified properties.

## Request Syntax

```python
drop_database_properties(
    db_name: str,
    property_keys: List[str],
    **kwargs,
)
```

**PARAMETERS:**

- **db_name** (*str*) -

    **[REQUIRED]**

    Name of the database whose properties are to be dropped.

- **property_keys** (*list[str]*) -

    **[REQUIRED]**

    Names of the properties to drop. Possible database properties are as follows:

      - **database.replica.number** (*int*) - Number of replicas for the database.

      - **database.resource_groups** (*list[str]*) - Resource groups dedicated to the database.

      - **database.diskQuota.mb** (*int*) - Disk quota allocated to the database in megabytes (**MB**).

      - **database.max.collections** (*int*) - Maximum number of collections allowed in the database.

      - **database.force.deny.writing** (*bool*) - Whether to deny all write operations in the database.

      - **database.force.deny.reading** (*bool*) - Whether to deny all read operations in the database.

    - **database.replica.number** (*int*) - Number of replicas for the database.

    - **database.resource_groups** (*list[str]*) - Resource groups dedicated to the database.

    - **database.diskQuota.mb** (*int*) - Disk quota allocated to the database in megabytes (**MB**).

    - **database.max.collections** (*int*) - Maximum number of collections allowed in the database.

    - **database.force.deny.writing** (*bool*) - Whether to deny all write operations in the database.

    - **database.force.deny.reading** (*bool*) - Whether to deny all read operations in the database.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

client.drop_database_properties(
    db_name="my_db",
    property_keys=["database.replica.number", "database.diskQuota.mb"]
)
```
