
# remove_user()

This operation removes a user from the current role. Once removed, the user will lose the permissions allowed for the current role.

## Request Syntax

```python
remove_user(
    username: str
)
```

__PARAMETERS:__

- __username__ (_str_) -

    __[REQUIRED]__

    The name of the user to remove from a role.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

_None_

__EXCEPTIONS:__

- __MilvusException__

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

