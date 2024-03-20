# is_exist()

This operation checks whether the current role exists.

## Request Syntax

```python
is_exist()
```

__PARAMETERS:__

N/A

__RETURN TYPE:__

_bool_

__RETURNS:__

A boolean value indicating whether the current role exists or not

__EXCEPTIONS:__

_None_

## Examples

```python
from pymilvus import Role, utility

# Get a role
role = Role(name="test")

# Check whether the role exists
role.is_exist()
```

## Related operations

The following operations are related to `is_exist()`:

- [add_user()](./add_user.md)

- [create()](./create.md)

- [drop()](./drop.md)

- [get_users()](./get_users.md)

- [grant()](./grant.md)

- [list_grant()](./list_grant.md)

- [list_grants()](./list_grants.md)

- [remove_user()](./remove_user.md)

- [revoke()](./revoke.md)

