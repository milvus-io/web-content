# delete_user()

This operation deletes an existing user.

## Request Syntax

```python
delete_user(
    user: str,
    password: str,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **user** (*string*) - 

    **[REQUIRED]**

    The name of the new user to delete.

- **password** (*string*) - 

    **[REQUIRED]**

    The corresponding password to the new user to create.

    Setting this to an incorrect password results in a **MilvusException**.

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

# Delete an existing user
user = utility.delete_user(user="admin", password="123456")
```

## Related operations

The following operations are related to `delete_user()`

- [Role](https://zilliverse.feishu.cn/docx/LZL1d0kckouPXNxJLCmcwbCTnkG)

- [create_user()](https://zilliverse.feishu.cn/docx/N44ndTSrgoEBx7xCID5cXRS7n1c)

- [list_roles()](https://zilliverse.feishu.cn/docx/ClLXdDs64oixJBxlIrCcEB2dngb)

- [list_user()](https://zilliverse.feishu.cn/docx/JeG6d5Sg2oPmXPxEhnyciq4snNd)

- [list_users()](https://zilliverse.feishu.cn/docx/MtF2dkZcso4XduxM194cUaiinqb)

- [list_usernames()](https://zilliverse.feishu.cn/docx/RXi3dgtNYogU0cxmTsgcdT72nsc)

- [reset_password()](https://zilliverse.feishu.cn/docx/K1Npdj5Ddod6UWxRN2ecf6K4nxf)

- [update_password()](https://zilliverse.feishu.cn/docx/SGjed7w9toewDlxmXHKc7BFancf)

