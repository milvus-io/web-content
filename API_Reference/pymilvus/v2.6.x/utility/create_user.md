# create_user()

This operation creates a new user with a corresponding password.

## Request Syntax

```python
create_user(
    user: str,
    password: str,
    using: str,
    timeout: float | None
)
```

```python
from pymilvus import utility

# Create a new user
utility.create_user(
    user="string",
    password="string",
    using="default"
)
```

**PARAMETERS:**

- **user** (*string*) - 

    **[REQUIRED]**

    The name of the new user to create. The value should start with a letter and can only contain underline, letters and numbers.

- **password** (*string*) - 

    **[REQUIRED]**

    The corresponding password to the new user to create. 

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
```

## Related operations

The following operations are related to `create_user()`

- [Role](https://zilliverse.feishu.cn/docx/LZL1d0kckouPXNxJLCmcwbCTnkG)

- [delete_user()](https://zilliverse.feishu.cn/docx/E7zOdU2JpoqaU5xNYXvcAjgPnNh)

- [list_roles()](https://zilliverse.feishu.cn/docx/ClLXdDs64oixJBxlIrCcEB2dngb)

- [list_user()](https://zilliverse.feishu.cn/docx/JeG6d5Sg2oPmXPxEhnyciq4snNd)

- [list_users()](https://zilliverse.feishu.cn/docx/MtF2dkZcso4XduxM194cUaiinqb)

- [list_usernames()](https://zilliverse.feishu.cn/docx/RXi3dgtNYogU0cxmTsgcdT72nsc)

- [reset_password()](https://zilliverse.feishu.cn/docx/K1Npdj5Ddod6UWxRN2ecf6K4nxf)

- [update_password()](https://zilliverse.feishu.cn/docx/SGjed7w9toewDlxmXHKc7BFancf)

