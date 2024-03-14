
# using_database()

This operation sets a database as the default for the current connection.

## Request Syntax

A Milvus cluster ships with a default database named __default__. All collection operations are performed within the default database. You can use this method to change the default database.

```python
using_database(
    db_name: str,
    using: str
)
```

__PARAMETERS:__

- __db_name__ (_string_) -

    __[REQUIRED]__

    Name of the database to be set as the default database.

- __using__ (_string_) -

    Alias of the connection. Defaults to __default__.

__RETURN TYPE:__

None

__RETURNS:__

None

__EXCEPTIONS:__

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

