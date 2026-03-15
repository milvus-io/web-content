# remove_user()

This operation removes a user from the current role. Once removed, the user will lose the permissions allowed for the current role.

## Request Syntax

```python
remove_user(
    username: str
)
```

**PARAMETERS:**

- **username** (*str*) -

    **[REQUIRED]**

    The name of the user to remove from a role.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Get an existing role
role = Role(name=role_name)

# Remove the specified user from the current role
role.remove_user(username)

# List all users of the current role
users = role.get_users()
```

## Related operations

The following operations are related to `add_user()`:

- [add_user()](https://zilliverse.feishu.cn/docx/W7GJdpYrYoYhSaxW6uzcVAZinYf)

- [create()](https://zilliverse.feishu.cn/docx/G3h4d3jx6oXFHBxFZlyc9jLKnTO)

- [drop()](https://zilliverse.feishu.cn/docx/KEzNdJPoDoHOjlx2FC8cNcHqngg)

- [get_users()](https://zilliverse.feishu.cn/docx/CCOhd671iog6rRxu8aOcaPncnLK)

- [grant()](https://zilliverse.feishu.cn/docx/BapSdVXjQoQXnbxnRYScCagAn1f)

- [is_exist()](https://zilliverse.feishu.cn/docx/F8WOdIoz4okn5OxMEymcXNuRnkb)

- [list_grant()](https://zilliverse.feishu.cn/docx/JXNXdQuwhoYmZQxSohNcdxtwnzh)

- [list_grants()](https://zilliverse.feishu.cn/docx/YRoGdgQmWoIEaJx84ICcHTILnMe)

- [revoke()](https://zilliverse.feishu.cn/docx/UUJWdoEnjoXx69xahsScdMVSnzf)

