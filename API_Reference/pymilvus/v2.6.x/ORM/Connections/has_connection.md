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

<div class="alert note">

An existing connection alias does not necessarily indicates that the corresponding connection has been established.

This operation evaluates to **True** only if the connection alias exists and the corresponding connection has been established.

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

- [add_connection()](https://zilliverse.feishu.cn/docx/C37ldNLbFog6ThxA23ScMldnnmb)

- [connect()](https://zilliverse.feishu.cn/docx/KzCXdTVVSoOmkbxuFjsccDlXnff)

- [disconnect()](https://zilliverse.feishu.cn/docx/IpSBdcabbosobvxQkAEcv6CvnJd)

- [get_connection_addr()](https://zilliverse.feishu.cn/docx/H2zBdRHVtovNQGxvb0xcwpSKnBd)

- [list_connections()](https://zilliverse.feishu.cn/docx/DyPldeRNXo4nMqxQeE0cMnd2nEf)

- [remove_connection()](https://zilliverse.feishu.cn/docx/L4KSdOVTEotaiyxjTddcVRDhn3E)

