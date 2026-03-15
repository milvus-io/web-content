# list_roles()

This operation lists all custom roles.

## Request syntax

```python
list_roles(
    timeout: Optional[float] = None
) -> dict
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of role names.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **BaseException**

    This exception will be raised when this operation fails.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a role
client.create_role(role_name="read_only")

# 3. List all roles
client.list_roles()

# ['admin', 'public', 'read_only']
```

## Related methods

- [create_role()](https://zilliverse.feishu.cn/docx/OUz3drncZo1Er8xyITZcYz66nWE)

- [describe_role()](https://zilliverse.feishu.cn/docx/JJz3dFrE2oJP3AxySWYcJlf4nMh)

- [drop_role()](https://zilliverse.feishu.cn/docx/Vmxpd3MttodOE3x3V11cVTeunDh)

- [grant_privilege()](https://zilliverse.feishu.cn/docx/W39Wdr7S6ohrtfxI8r7cyTeInlb)

- [grant_role()](https://zilliverse.feishu.cn/docx/DsnpdZuDGo77TYxFuYvcDpOgnIf)

- [revoke_privileges()](https://zilliverse.feishu.cn/docx/UP2GdfHHzoIQ56x2JvScs0sAnzh)

- [revoke_role()](https://zilliverse.feishu.cn/docx/JJOId59ePoMLefxz1ChcBZ6inOh)

