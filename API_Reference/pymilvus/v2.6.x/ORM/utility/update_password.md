# update_password()

This operation updates the password for a specific user.

## Request Syntax

```python
update_password(
    user: str,
    old_password: str,
    new_password: str,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **user** (*str*) - 

    **[REQUIRED]**

    The specific user whose password is to be reset.

- **old_password** (*str*) - 

    **[REQUIRED]**

    The original password for the specified user.

    Setting this to an incorrect password results in a **MilvusException**.

- **new_password** (*str*) - 

    **[REQUIRED]**

    The new password for the specified user. 

    The password must be a string of 8 to 64 characters and must include at least three of the following character types: uppercase letters, lowercase letters, numbers, and special characters.

- **using** (*string*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# Create a user
user = utility.create_user(user="admin", password="123456")

# Update the password for the user.
update_password(
    user="admin",
    old_password="123456",
    new_password="123456Abc*",
    using="default"
)
```

## Related operations

The following operations are related to `update_password()`

- [Role](https://zilliverse.feishu.cn/docx/LZL1d0kckouPXNxJLCmcwbCTnkG)

- [create_user()](https://zilliverse.feishu.cn/docx/N44ndTSrgoEBx7xCID5cXRS7n1c)

- [delete_user()](https://zilliverse.feishu.cn/docx/E7zOdU2JpoqaU5xNYXvcAjgPnNh)

- [list_roles()](https://zilliverse.feishu.cn/docx/ClLXdDs64oixJBxlIrCcEB2dngb)

- [list_user()](https://zilliverse.feishu.cn/docx/JeG6d5Sg2oPmXPxEhnyciq4snNd)

- [list_users()](https://zilliverse.feishu.cn/docx/MtF2dkZcso4XduxM194cUaiinqb)

- [list_usernames()](https://zilliverse.feishu.cn/docx/RXi3dgtNYogU0cxmTsgcdT72nsc)

- [reset_password()](https://zilliverse.feishu.cn/docx/K1Npdj5Ddod6UWxRN2ecf6K4nxf)

