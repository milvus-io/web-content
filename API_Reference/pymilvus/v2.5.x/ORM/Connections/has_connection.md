# has_connection()

This operation checks if a connection with the given alias has already been established.

## Request Syntax

```python
has_connection(alias: str)
```

**PARAMETERS:**

- **alias** (*string*) -

    **[REQUIRED]**

    A connection alias.

**RETURN TYPE:**

*Boolean*

**RETURNS:**

A Boolean value indicating whether the connection exists.

<div class="admonition note">

<p><b>notes</b></p>

<p>An existing connection alias does not necessarily indicates that the corresponding connection has been established.</p>
<p>This operation evaluates to <strong>True</strong> only if the connection alias exists and the corresponding connection has been established.</p>

</div>

**EXCEPTIONS:**

- **ConnectionConfigException**

    This exception will be raised when the connection configuration is invalid.

## Examples

```python
from pymilvus import connections

connections.has_connection(alias="default")

# Output
# True
```

## Related operations

The following operations are related to `has_connection()`:

- [add_connection()](add_connection.md)

- [connect()](connect.md)

- [disconnect()](disconnect.md)

- [get_connection_addr()](get_connection_addr.md)

- [list_connections()](list_connections.md)

- [remove_connection()](remove_connection.md)

