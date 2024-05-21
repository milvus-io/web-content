# get_connection_addr()

This operation retrieves the configuration of the specified connection by alias.

## Request Syntax

```python
get_connection_addr(alias: str)
```

**PARAMETERS:**

- **alias** (*string*) -

    **[REQUIRED]**

    A connection alias.

**RETURN TYPE:**

*Dictionary*

**RETURNS:**

A dictionary containing the connection configuration.

**EXCEPTIONS:**

- **ConnectionConfigException**

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.get_connection_addr(alias="default")

# Output
# {'address': 'localhost:19530', 'user': ''}
```

## Related operations

The following operations are related to `get_connection_addr()`:

- [add_connection()](add_connection.md)

- [connect()](connect.md)

- [disconnect()](disconnect.md)

- [has_connection()](has_connection.md)

- [list_connections()](list_connections.md)

- [remove_connection()](remove_connection.md)

