
# list_roles()

This operation lists the information about all existing roles.

## Request Syntax

```python
list_roles(
    include_user_info: bool,
    using: str,
    timeout: float | None
)
```

__PARAMETERS:__

- __include_user_info__ (_bool_) - 

    __[REQUIRED]__

    Whether Milvus lists users associated with the listed roles.

- __using__ (_str_) - 

    The alias of the employed connection.

    The default value is __default__, indicating that this operation employs the default connection.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_RoleInfo_

__RETURNS:__

A __RoleInfo__ object that contains a list of __RoleItem__ objects.

```python
├── RoleInfo
│   └── groups  
│       └── RoleItem
│           ├── role_name
│           ├── users
```

A __RoleItem__ object contains the following fields:

- __role_name__ (_str_)

    The name of the role.

- __users__ (_str_)

    The users to whom the role is granted to.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import connections, Role, utility

# Connection to localhost:19530
connections.connect()

# Create a user
user = utility.create_user(user="admin", password="123456")

# Create a role
role=Role(
    name="admin",
)

role.create()

# Add the user to the role
role.add_user(username="admin")

# List role information
utility.list_roles(include_user_info=True)

# RoleInfo groups:
# - RoleItem: <role_name:admin>, <users:('admin',)>
# - RoleItem: <role_name:public>, <users:()>
```

