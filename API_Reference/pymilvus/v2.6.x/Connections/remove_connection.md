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

- [add_connection()](https://zilliverse.feishu.cn/docx/C37ldNLbFog6ThxA23ScMldnnmb)

- [connect()](https://zilliverse.feishu.cn/docx/KzCXdTVVSoOmkbxuFjsccDlXnff)

- [disconnect()](https://zilliverse.feishu.cn/docx/IpSBdcabbosobvxQkAEcv6CvnJd)

- [get_connection_addr()](https://zilliverse.feishu.cn/docx/H2zBdRHVtovNQGxvb0xcwpSKnBd)

- [has_connection()](https://zilliverse.feishu.cn/docx/XeZwdeK64oGD8rx9DA3ciqNinnh)

- [list_connections()](https://zilliverse.feishu.cn/docx/DyPldeRNXo4nMqxQeE0cMnd2nEf)

