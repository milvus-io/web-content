# delete_user()

This operation deletes an existing user.

## Request Syntax

```python
delete_user(
    user: str,
    password: str,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **user** (*string*) - 

    **[REQUIRED]**

    The name of the new user to delete.

- **password** (*string*) - 

    **[REQUIRED]**

    The corresponding password to the new user to create.

    Setting this to an incorrect password results in a **MilvusException**.

- **using** (*string*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, utility

# Connection to localhost:19530
connections.connect()

# Delete an existing user
user = utility.delete_user(user="admin", password="123456")
```

## Related operations

The following operations are related to `delete_user()`

- [Role](../Role/Role.md)

- [create_user()](create_user.md)

- [list_roles()](list_roles.md)

- [list_user()](list_user.md)

- [list_users()](list_users.md)

- [list_usernames()](list_usernames.md)

- [reset_password()](reset_password.md)

- [update_password()](update_password.md)

