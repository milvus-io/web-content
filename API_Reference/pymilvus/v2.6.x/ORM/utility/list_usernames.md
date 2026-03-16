# list_usernames()

This operation lists the names of all existing users.

## Request Syntax

```python
list_usernames(
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list that contains the names of all existing users.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# List all existing usernames
users = utility.list_usernames()
```

## Related operations

The following operations are related to `list_usernames()`

- [Role](https://zilliverse.feishu.cn/docx/LZL1d0kckouPXNxJLCmcwbCTnkG)

- [create_user()](https://zilliverse.feishu.cn/docx/N44ndTSrgoEBx7xCID5cXRS7n1c)

- [delete_user()](https://zilliverse.feishu.cn/docx/E7zOdU2JpoqaU5xNYXvcAjgPnNh)

- [list_roles()](https://zilliverse.feishu.cn/docx/ClLXdDs64oixJBxlIrCcEB2dngb)

- [list_user()](https://zilliverse.feishu.cn/docx/JeG6d5Sg2oPmXPxEhnyciq4snNd)

- [list_users()](https://zilliverse.feishu.cn/docx/MtF2dkZcso4XduxM194cUaiinqb)

- [reset_password()](https://zilliverse.feishu.cn/docx/K1Npdj5Ddod6UWxRN2ecf6K4nxf)

- [update_password()](https://zilliverse.feishu.cn/docx/SGjed7w9toewDlxmXHKc7BFancf)

