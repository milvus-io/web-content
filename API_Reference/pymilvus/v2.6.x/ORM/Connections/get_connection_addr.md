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

- [add_connection()](https://zilliverse.feishu.cn/docx/C37ldNLbFog6ThxA23ScMldnnmb)

- [connect()](https://zilliverse.feishu.cn/docx/KzCXdTVVSoOmkbxuFjsccDlXnff)

- [disconnect()](https://zilliverse.feishu.cn/docx/IpSBdcabbosobvxQkAEcv6CvnJd)

- [has_connection()](https://zilliverse.feishu.cn/docx/XeZwdeK64oGD8rx9DA3ciqNinnh)

- [list_connections()](https://zilliverse.feishu.cn/docx/DyPldeRNXo4nMqxQeE0cMnd2nEf)

- [remove_connection()](https://zilliverse.feishu.cn/docx/L4KSdOVTEotaiyxjTddcVRDhn3E)

