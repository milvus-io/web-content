
# get_users()

This operation lists all users associated with the current role.

## Request Syntax

```python
get_users()
```

__PARAMETERS__

N/A

__RETURN TYPE:__

_tuple_

__RETURNS:__

A tuple that contains the names of all users added to the current role.

## Examples

```python
from pymilvus import Role

# Get an existing role
role = Role(name="admin")

# List all users associated with the current role
users = role.get_users() # (admin, )
```

