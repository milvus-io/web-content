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

__PARAMETERS:__

- __using__ (_string_) -

    Alias of the connection. Defaults to __default__.

- __timeout__ (_float _|_ None_)

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_List_

__RETURNS:__

A list of database names.

__EXCEPTIONS:__

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

- [create_database()](./create_database.md)

- [drop_database()](./drop_database.md)

- [using_database()](./using_database.md)

