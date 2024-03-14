
# add_user()

This operation adds an existing user to the current role. Once added, the user gets permissions allowed for the current role and can perform certain operations.

## Request Syntax

```python
add_user(
    username: str
)
```

__PARAMETERS:__

- __username__ (_str_) -

    __[REQUIRED]__

    The name of the user to add to a role.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

_None_

__EXCEPTIONS:__

- __MilvusException__

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

