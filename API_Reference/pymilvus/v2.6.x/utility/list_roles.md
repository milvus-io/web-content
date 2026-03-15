# list_roles()

This operation lists the information about all existing roles.

## Request Syntax

```python
list_roles(
    include_user_info: bool,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **include_user_info** (*bool*) - 

    **[REQUIRED]**

    Whether Milvus lists users associated with the listed roles.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*RoleInfo*

**RETURNS:**

A **RoleInfo** object that contains a list of **RoleItem** objects.

```python
├── RoleInfo
│   └── groups  
│       └── RoleItem
│           ├── role_name
│           ├── users
```

A **RoleItem** object contains the following fields:

- **role_name** (*str*)

    The name of the role.

- **users** (*str*)

    The users to whom the role is granted to.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, Role, utility

# Connection to localhost:19530
connections.connect()

# Create a user
user = utility.create_user(user="admin", password="123456")

# Create a role
role=Role(
    name="admin",
)

role.create()

# Add the user to the role
role.add_user(username="admin")

# List role information
utility.list_roles(include_user_info=True)

# RoleInfo groups:
# - RoleItem: <role_name:admin>, <users:('admin',)>
# - RoleItem: <role_name:public>, <users:()>
```

## Related operations

The following operations are related to `list_roles()`

- [Role](https://zilliverse.feishu.cn/docx/LZL1d0kckouPXNxJLCmcwbCTnkG)

- [create_user()](https://zilliverse.feishu.cn/docx/N44ndTSrgoEBx7xCID5cXRS7n1c)

- [delete_user()](https://zilliverse.feishu.cn/docx/E7zOdU2JpoqaU5xNYXvcAjgPnNh)

- [list_user()](https://zilliverse.feishu.cn/docx/JeG6d5Sg2oPmXPxEhnyciq4snNd)

- [list_users()](https://zilliverse.feishu.cn/docx/MtF2dkZcso4XduxM194cUaiinqb)

- [list_usernames()](https://zilliverse.feishu.cn/docx/RXi3dgtNYogU0cxmTsgcdT72nsc)

- [reset_password()](https://zilliverse.feishu.cn/docx/K1Npdj5Ddod6UWxRN2ecf6K4nxf)

- [update_password()](https://zilliverse.feishu.cn/docx/SGjed7w9toewDlxmXHKc7BFancf)

