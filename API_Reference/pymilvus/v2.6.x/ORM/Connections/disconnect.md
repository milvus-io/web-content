# disconnect()

This operation disconnects the client from the specified connection.

## Request Syntax

```python
disconnect(alias: str)
```

**PARAMETERS:**

- **alias** (*string*) -

    **[REQUIRED]**

    A connection alias.

**RETURN TYPE:**

None

**RETURNS:**

None

**EXCEPTIONS:**

- **ConnectionConfigException**

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.disconnect(alias="default")
```

## Related operations

The following operations are related to `disconnect()`:

- [add_connection()](add_connection.md)

- [connect()](connect.md)

- [get_connection_addr()](get_connection_addr.md)

- [has_connection()](has_connection.md)

- [list_connections()](list_connections.md)

- [remove_connection()](remove_connection.md)

