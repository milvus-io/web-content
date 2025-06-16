# reset_password()

This operation resets the password for a specific user. 

<div class="admonition note">

<p><b>notes</b></p>

<p>This operation differs from <strong>update_password()</strong> in that this operation also resets the current connection using the newly set credentials.</p>

</div>

## Request Syntax

```python
reset_password(
    user: str,
    old_password: str,
    new_password: str,
    using: str,
    timeout: float | None
)
```

**PARAMETERS:**

- **user** (*str*) - 

    **[REQUIRED]**

    The specific user whose password is to be reset.

- **old_password** (*str*) - 

    **[REQUIRED]**

    The original password for the specified user.

    Setting this to an incorrect password results in a **MilvusException**.

- **new_password** (*str*) - 

    **[REQUIRED]**

    The new password for the specified user. 

    The password must be a string of 8 to 64 characters and must include at least three of the following character types: uppercase letters, lowercase letters, numbers, and special characters.

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

# Create a user
user = utility.create_user(user="admin", password="123456")

# Reset the password for the user.
reset_password(
    user="admin",
    old_password="123456",
    new_password="123456Abc*",
    using="default"
)
```

## Related operations

The following operations are related to `reset_password()`

- [Role](../Role/Role.md)

- [create_user()](create_user.md)

- [delete_user()](delete_user.md)

- [list_roles()](list_roles.md)

- [list_user()](list_user.md)

- [list_users()](list_users.md)

- [list_usernames()](list_usernames.md)

- [update_password()](update_password.md)

