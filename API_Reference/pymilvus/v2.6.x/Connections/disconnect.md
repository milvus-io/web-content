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

- [add_connection()](https://zilliverse.feishu.cn/docx/C37ldNLbFog6ThxA23ScMldnnmb)

- [connect()](https://zilliverse.feishu.cn/docx/KzCXdTVVSoOmkbxuFjsccDlXnff)

- [get_connection_addr()](https://zilliverse.feishu.cn/docx/H2zBdRHVtovNQGxvb0xcwpSKnBd)

- [has_connection()](https://zilliverse.feishu.cn/docx/XeZwdeK64oGD8rx9DA3ciqNinnh)

- [list_connections()](https://zilliverse.feishu.cn/docx/DyPldeRNXo4nMqxQeE0cMnd2nEf)

- [remove_connection()](https://zilliverse.feishu.cn/docx/L4KSdOVTEotaiyxjTddcVRDhn3E)

