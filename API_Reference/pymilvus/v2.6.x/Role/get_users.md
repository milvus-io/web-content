# get_users()

This operation lists all users associated with the current role.

## Request Syntax

```python
get_users()
```

**PARAMETERS**

N/A

**RETURN TYPE:**

*tuple*

**RETURNS:**

A tuple that contains the names of all users added to the current role.

## Examples

```python
from pymilvus import Role

# Get an existing role
role = Role(name="admin")

# List all users associated with the current role
users = role.get_users() # (admin, )
```

## Related operations

The following operations are related to `get_users()`:

- [add_user()](https://zilliverse.feishu.cn/docx/W7GJdpYrYoYhSaxW6uzcVAZinYf)

- [create()](https://zilliverse.feishu.cn/docx/G3h4d3jx6oXFHBxFZlyc9jLKnTO)

- [drop()](https://zilliverse.feishu.cn/docx/KEzNdJPoDoHOjlx2FC8cNcHqngg)

- [grant()](https://zilliverse.feishu.cn/docx/BapSdVXjQoQXnbxnRYScCagAn1f)

- [is_exist()](https://zilliverse.feishu.cn/docx/F8WOdIoz4okn5OxMEymcXNuRnkb)

- [list_grant()](https://zilliverse.feishu.cn/docx/JXNXdQuwhoYmZQxSohNcdxtwnzh)

- [list_grants()](https://zilliverse.feishu.cn/docx/YRoGdgQmWoIEaJx84ICcHTILnMe)

- [remove_user()](https://zilliverse.feishu.cn/docx/SlmSdaD7rocMJsxThNHcOtEknVd)

- [revoke()](https://zilliverse.feishu.cn/docx/UUJWdoEnjoXx69xahsScdMVSnzf)

