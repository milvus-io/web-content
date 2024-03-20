# list_user()

This operation lists the information of a specific user.

## Request Syntax

```python
list_user(
    username: str,
    include_role_info: bool,
    using: str,
    timeout: float | None
)
```

__PARAMETERS__

- __username__ (_string_) - 

    __[REQUIRED]__

    The name of the user to list.

- __include_role_info__ (_bool_) - 

    __[REQUIRED]__

    Whether Milvus lists the roles granted to the specified user.

- __using__ (_string_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_UserInfo_

__RETURNS:__

A __UserInfo__ object that contains contains the user information.

```python
├── UserInfo
│   └── groups  
│       └── UserItem
│           ├── username
│           ├── roles
```

A __UserItem__ object contains the following fields:

- __username__ (_str_)

    The name of the user.

- __roles__ (_str_)

    The roles assigned to the user.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, Role, utility

# Connection to localhost:19530
connections.connect()

# List the information of a specific user
users = utility.list_user(
    username="admin", 
    include_role_info=True,
    using="default"
)

# UserInfo groups:
# - UserItem: <username:admin>, <roles:('admin',)>
```

## Related operations

The following operations are related to `list_user()`:

- [Role](./ORM/Role.md)

- [create_user()](./create_user.md)

- [delete_user()](./delete_user.md)

- [list_roles()](./list_roles.md)

- [list_users()](./list_users.md)

- [list_usernames()](./list_usernames.md)

- [reset_password()](./reset_password.md)

- [update_password()](./update_password.md)

