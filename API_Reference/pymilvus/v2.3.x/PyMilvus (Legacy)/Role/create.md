
# create()

This operation creates the current role. 

## Request Syntax

```python
create()
```

__PARAMETERS:__

N/A

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

