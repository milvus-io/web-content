# create_user()

This operation creates a new user with a corresponding password.

## Request Syntax

```python
create_user(
    user: str,
    password: str,
    using: str,
    timeout: float | None
)
```

```python
from pymilvus import utility

# Create a new user
utility.create_user(
    user="string",
    password="string",
    using="default"
)
```

**PARAMETERS:**

- **user** (*string*) - 

    **[REQUIRED]**

    The name of the new user to create. The value should start with a letter and can only contain underline, letters and numbers.

- **password** (*string*) - 

    **[REQUIRED]**

    The corresponding password to the new user to create. 

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

