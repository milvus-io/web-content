# create_user()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation creates a user with a password.

## Request Syntax

```python
create_user(
    user: str,
    password: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **user** (*str*) -

    **[REQUIRED]**

    The name of the user to create.

- **password** (*str*) -

    **[REQUIRED]**

    The password for the user.

- **timeout** (*float*) -

    The timeout duration for this operation.

**RETURN TYPE:**

*None*

**RETURNS:**

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

- **ParamError**

    This exception will be raised when a parameter value is invalid.

## Example

```python
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

utility.create_user(
    user="analyst_user",
    password="P@ssw0rd!",
)
```

## Related operations

The following operations are related to `create_user()`

- [Role](../Role/Role.md)

- [delete_user()](delete_user.md)

- [list_roles()](list_roles.md)

- [list_user()](list_user.md)

- [list_users()](list_users.md)

- [list_usernames()](list_usernames.md)

- [reset_password()](reset_password.md)

- [update_password()](update_password.md)
