# list_connections()

This operation returns a list of all connection names and handler objects.

## Request Syntax

```python
list_connections()
```

**PARAMETERS:**

None

**RETURN TYPE:**

*List*

**RETURNS:**

A list of all connection names and handler objects.

**EXCEPTIONS:**

None

## Examples

```python
from pymilvus import connections

connections.connect(
    uri='https://localhost:19530',
    token='root:Milvus'
)
connections.list_connections()

# Output
# [('default', <pymilvus.client.grpc_handler.GrpcHandler at 0x13743b967>)]
```

## Related operations

The following operations are related to `list_connections()`:

- [add_connection()](add_connection.md)

- [connect()](connect.md)

- [disconnect()](disconnect.md)

- [get_connection_addr()](get_connection_addr.md)

- [has_connection()](has_connection.md)

- [remove_connection()](remove_connection.md)

