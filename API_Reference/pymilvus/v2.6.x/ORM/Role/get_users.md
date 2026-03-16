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

- [add_user()](add_user.md)

- [create()](create.md)

- [drop()](drop.md)

- [grant()](grant.md)

- [is_exist()](is_exist.md)

- [list_grant()](list_grant.md)

- [list_grants()](list_grants.md)

- [remove_user()](remove_user.md)

- [revoke()](revoke.md)

