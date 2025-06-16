# alter_database_properties()

This operation modifies the properties of the specified database.

## Request Syntax

```python
alter_database_properties(
    db_name: str, 
    properties: Dict,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **db_name** (*string*) -

    **[REQUIRED]**

    Name of the database whose properties are to be modified.

- **properties** (*dict* | *None*) -

    Properties to modify and their values after the modification. Possible database properties are as follows:

    - **database.replica.number** (*int*) -

        Number of replicas for the database.

    - **database.resource_groups** (*[]str*) -

        Resource groups dedicated to the database.

    - **database.diskQuota.mb** (*int*) -

        Disk quota allocated to the database in megabytes (**MB**).

    - **database.max.collections** (*int*) -

        Maximum number of collections allowed in the database.

    - **database.force.deny.writing** (*bool*) -

        Whether to deny all write operations in the database.

    - **database.force.deny.reading** (*bool*) -

        Whether to deny all read operations in the database.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to *None* indicates that this operation timeouts when any response or error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- `MilvusException` - Raised if any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri, token) # db = "default" 

client.alter_database_properties(
    db_name="my_db",
    properties={"a": "f", "b": "g"}
)
```
