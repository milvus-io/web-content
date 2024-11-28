# remove_connection()

This operation removes the connection from the registry by the given alias and disconnects if connected.

## Request Syntax

```python
remove_connection(alias: str)
```

**PARAMETERS:**

- **alias** (*string*) -

    **[REQUIRED]**

    A connection alias

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **ConnectionConfigException**

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.remove_connection(alias="default")
```

## Related operations

The following operations are related to `remove_connection()`:

- [add_connection()](add_connection.md)

- [connect()](connect.md)

- [disconnect()](disconnect.md)

- [get_connection_addr()](get_connection_addr.md)

- [has_connection()](has_connection.md)

- [list_connections()](list_connections.md)

