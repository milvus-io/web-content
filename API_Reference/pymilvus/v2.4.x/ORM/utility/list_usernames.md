# list_usernames()

This operation lists the names of all existing users.

## Request Syntax

```python
list_usernames(
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list that contains the names of all existing users.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# List all existing usernames
users = utility.list_usernames()
```

## Related operations

The following operations are related to `list_usernames()`

- [Role](../Role/Role.md)

- [create_user()](create_user.md)

- [delete_user()](delete_user.md)

- [list_roles()](list_roles.md)

- [list_user()](list_user.md)

- [list_users()](list_users.md)

- [reset_password()](reset_password.md)

- [update_password()](update_password.md)

