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

- [add_connection()](https://zilliverse.feishu.cn/docx/C37ldNLbFog6ThxA23ScMldnnmb)

- [connect()](https://zilliverse.feishu.cn/docx/KzCXdTVVSoOmkbxuFjsccDlXnff)

- [disconnect()](https://zilliverse.feishu.cn/docx/IpSBdcabbosobvxQkAEcv6CvnJd)

- [get_connection_addr()](https://zilliverse.feishu.cn/docx/H2zBdRHVtovNQGxvb0xcwpSKnBd)

- [has_connection()](https://zilliverse.feishu.cn/docx/XeZwdeK64oGD8rx9DA3ciqNinnh)

- [remove_connection()](https://zilliverse.feishu.cn/docx/L4KSdOVTEotaiyxjTddcVRDhn3E)

