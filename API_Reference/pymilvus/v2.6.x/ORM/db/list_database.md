# list_database()

This operation returns a list of database names from the connected Milvus instance.

```python
list_database(
    using: str,
    timeout: float | None
)
```

## Request Syntax

```python
from pymilvs import db

db.list_database()
```

**PARAMETERS:**

- **using** (*string*) -

    Alias of the connection. Defaults to **default**.

- **timeout** (*float* | *None*)

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*List*

**RETURNS:**

A list of database names.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus import connections, db

conn = connections.connect(
    host="127.0.0.1", 
    port=19530
)

db.list_database()

# Output
# ["default", "test"]
```

## Related operations

The following operations are related to `list_database()`:

- [create_database()](create_database.md)

- [drop_database()](drop_database.md)

- [using_database()](using_database.md)

