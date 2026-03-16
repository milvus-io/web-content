# add_user()

This operation adds an existing user to the current role. Once added, the user gets permissions allowed for the current role and can perform certain operations.

## Request Syntax

```python
add_user(
    username: str
)
```

**PARAMETERS:**

- **username** (*str*) -

    **[REQUIRED]**

    The name of the user to add to a role.

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

The following operations are related to `add_user()`:

- [create()](create.md)

- [drop()](drop.md)

- [get_users()](get_users.md)

- [grant()](grant.md)

- [is_exist()](is_exist.md)

- [list_grant()](list_grant.md)

- [list_grants()](list_grants.md)

- [remove_user()](remove_user.md)

- [revoke()](revoke.md)

