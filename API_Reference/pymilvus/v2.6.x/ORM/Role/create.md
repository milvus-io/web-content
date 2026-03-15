# create()

This operation creates the current role. 

## Request Syntax

```python
create()
```

**PARAMETERS:**

N/A

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role, utility

# Get an existing role
role = Role(name="test")

# Create a new role
role.create()

# List all roles
roles = utility.list_roles(include_user_info=True)

# Output
# RoleInfo groups:
# - RoleItem: <role_name:admin>, <users:('admin',)>
# - RoleItem: <role_name:public>, <users:()>
# - RoleItem: <role_name:test>, <users:()>
```

## Related operations

The following operations are related to `create()`:

- [add_user()](https://zilliverse.feishu.cn/docx/W7GJdpYrYoYhSaxW6uzcVAZinYf)

- [drop()](https://zilliverse.feishu.cn/docx/KEzNdJPoDoHOjlx2FC8cNcHqngg)

- [get_users()](https://zilliverse.feishu.cn/docx/CCOhd671iog6rRxu8aOcaPncnLK)

- [grant()](https://zilliverse.feishu.cn/docx/BapSdVXjQoQXnbxnRYScCagAn1f)

- [is_exist()](https://zilliverse.feishu.cn/docx/F8WOdIoz4okn5OxMEymcXNuRnkb)

- [list_grant()](https://zilliverse.feishu.cn/docx/JXNXdQuwhoYmZQxSohNcdxtwnzh)

- [list_grants()](https://zilliverse.feishu.cn/docx/YRoGdgQmWoIEaJx84ICcHTILnMe)

- [remove_user()](https://zilliverse.feishu.cn/docx/SlmSdaD7rocMJsxThNHcOtEknVd)

- [revoke()](https://zilliverse.feishu.cn/docx/UUJWdoEnjoXx69xahsScdMVSnzf)

