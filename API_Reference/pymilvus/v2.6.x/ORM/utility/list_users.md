# list_users()

This operation lists the information of all existing users.

## Request Syntax

```python
list_users(
    include_role_info: bool,
    using: str,
    timeout: float | None
)
```

**PARAMETERS**

- **include_role_info** (*bool*) - 

    **[REQUIRED]**

    Whether Milvus lists the roles granted to the specified user.

- **using** (*string*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*UserInfo*

**RETURNS:**

A **UserInfo** object that contains contains the user information.

```python
├── UserInfo
│   └── groups  
│       └── UserItem
│           ├── username
│           ├── roles
```

A **UserItem** object contains the following fields:

- **username** (*str*)

    The name of the user.

- **roles** (*str*)

    The roles assigned to the user.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# List the information of all existing users
user = utility.list_users(
    include_role_info=True,
    using="default"
)

# UserInfo groups:
# - UserItem: <username:admin>, <roles:('admin',)>
# - UserItem: <username:root>, <roles:()>
```

## Related operations

The following operations are related to `list_users()`:

- [Role](https://zilliverse.feishu.cn/docx/LZL1d0kckouPXNxJLCmcwbCTnkG)

- [create_user()](https://zilliverse.feishu.cn/docx/N44ndTSrgoEBx7xCID5cXRS7n1c)

- [delete_user()](https://zilliverse.feishu.cn/docx/E7zOdU2JpoqaU5xNYXvcAjgPnNh)

- [list_roles()](https://zilliverse.feishu.cn/docx/ClLXdDs64oixJBxlIrCcEB2dngb)

- [list_user()](https://zilliverse.feishu.cn/docx/JeG6d5Sg2oPmXPxEhnyciq4snNd)

- [list_usernames()](https://zilliverse.feishu.cn/docx/RXi3dgtNYogU0cxmTsgcdT72nsc)

- [reset_password()](https://zilliverse.feishu.cn/docx/K1Npdj5Ddod6UWxRN2ecf6K4nxf)

- [update_password()](https://zilliverse.feishu.cn/docx/SGjed7w9toewDlxmXHKc7BFancf)

