# set_properties()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation sets properties for a database using the provided database name.

## Request Syntax

```python
set_properties(
    db_name: str,
    properties: dict,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **db_name** (*string*) -

    **[REQUIRED]**

    Name of the database.

- **properties** (*dict*) -

    **[REQUIRED]**

    The database properties to set. Supported keys are as follows:

    - **database.replica.number** (*int*) -

        The number of replicas for the database.

    - **database.resource_groups** (*list[str]*) -

        The resource groups to which the database belongs.

- **using** (*string*) -

    Alias of the connection. Defaults to **default**.

- **timeout** (*float* | *None*)

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

None

## Example

```python
from pymilvus import connections, db

conn = connections.connect(
    host="127.0.0.1", 
    port=19530
)

db.set_properties(
    db_name="test",
    properties={"database.replica.number": 3}
)
```
