# remove_user()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation removes a user from the current role. Once removed, the user will lose the permissions allowed for the current role.

## Request Syntax

```python
remove_user(
    username: str
)
```

**PARAMETERS:**

- **username** (*str*) -

    **[REQUIRED]**

    The name of the user to remove from a role.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role
from pymilvus import utility

# Create a user
utility.create_user(user="user_1", password="password")

# Create a role and add the user to it
role = Role("read_only")
role.create()
role.add_user("user_1")

# Remove the specified user from the role
role.remove_user("user_1")

# List all users of the role
users = role.get_users()
```

## Related operations

The following operations are related to `add_user()`:

- [add_user()](add_user.md)

- [create()](create.md)

- [drop()](drop.md)

- [get_users()](get_users.md)

- [grant()](grant.md)

- [is_exist()](is_exist.md)

- [list_grant()](list_grant.md)

- [list_grants()](list_grants.md)

- [revoke()](revoke.md)

