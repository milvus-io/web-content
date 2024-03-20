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

__PARAMETERS:__

- __user__ (_string_) - 

    __[REQUIRED]__

    The name of the new user to create. The value should start with a letter and can only contain underline, letters and numbers.

- __password__ (_string_) - 

    __[REQUIRED]__

    The corresponding password to the new user to create. 

    The password must be a string of 8 to 64 characters and must include at least three of the following character types: uppercase letters, lowercase letters, numbers, and special characters.

- __using__ (_string_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __MilvusException__

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

- [Role](./ORM/Role.md)

- [delete_user()](./delete_user.md)

- [list_roles()](./list_roles.md)

- [list_user()](./list_user.md)

- [list_users()](./list_users.md)

- [list_usernames()](./list_usernames.md)

- [reset_password()](./reset_password.md)

- [update_password()](./update_password.md)

