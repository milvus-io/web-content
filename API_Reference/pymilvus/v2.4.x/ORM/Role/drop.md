# drop()

This operation drops an existing role. The operation will succeed if the specified role exists. Otherwise, this operation will fail.

## Request Syntax

```python
drop()
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

# Create a new role
role = Role(name="test")

role.create()

# List all roles
roles = utility.list_roles(include_user_info=True)

# Output
# RoleInfo groups:
# - RoleItem: <role_name:public>, <users:()>
# - RoleItem: <role_name:test>, <users:()>

# Drop the role
role.drop()

# List all roles
roles = utility.list_roles(include_user_info=True)

# Output
# RoleInfo groups:
# - RoleItem: <role_name:public>, <users:()>
```

## Related operations

The following operations are related to `drop()`:

- [add_user()](add_user.md)

- [create()](create.md)

- [get_users()](get_users.md)

- [grant()](grant.md)

- [is_exist()](is_exist.md)

- [list_grant()](list_grant.md)

- [list_grants()](list_grants.md)

- [remove_user()](remove_user.md)

- [revoke()](revoke.md)

