
# drop_database()

This operation drops a database using the provided database name.

## Request Syntax

```python
drop_database(
    db_name: str,
    using: str,
    timeout: float | None
)
```

__PARAMETERS:__

- __db_name__ (_string_) -

    __[REQUIRED]__

    Name of the database to be dropped.

- __using__ (_string_) -

    Alias of the connection. Defaults to __default__.

- __timeout__ (_float _|_ None_)

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

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

db.drop_database(db_name="test")
```

