# using_database()

This operation sets a database as the default for the current connection.

## Request Syntax

A Milvus cluster ships with a default database named **default**. All collection operations are performed within the default database. You can use this method to change the default database.

```python
using_database(
    db_name: str,
    using: str
)
```

**PARAMETERS:**

- **db_name** (*string*) -

    **[REQUIRED]**

    Name of the database to be set as the default database.

- **using** (*string*) -

    Alias of the connection. Defaults to **default**.

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus import connections, db

conn = connections.connect(
    host="127.0.0.1", 
    port=19530
)

db.using_database("test")

## You can directly use a database upon the connection as follows.
## However, the specified database should exist beforehand.
conn = connections.connect(host="127.0.0.1", port=19530, db_name="test")
```

## Related operations

The following operations are related to `using_database()`:

- [create_database()](create_database.md)

- [drop_database()](drop_database.md)

- [list_database()](list_database.md)

