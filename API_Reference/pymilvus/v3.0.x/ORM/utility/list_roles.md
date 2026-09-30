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

**PARAMETERS:**

- **include_user_info** (*bool*) - 

    **[REQUIRED]**

    Whether Milvus lists users associated with the listed roles.

- **using** (*str*) - 

    The alias of the employed connection.

    The default value is **default**, indicating that this operation employs the default connection.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*RoleInfo*

**RETURNS:**

A **RoleInfo** object that contains a list of **RoleItem** objects.

```python
├── RoleInfo
│   └── groups  
│       └── RoleItem
│           ├── role_name
│           ├── users
```

A **RoleItem** object contains the following fields:

- **role_name** (*str*)

    The name of the role.

- **users** (*str*)

    The users to whom the role is granted to.

**EXCEPTIONS:**

- **MilvusException**

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

## Related operations

The following operations are related to `list_roles()`

- [Role](../Role/Role.md)

- [create_user()](create_user.md)

- [delete_user()](delete_user.md)

- [list_user()](list_user.md)

- [list_users()](list_users.md)

- [list_usernames()](list_usernames.md)

- [reset_password()](reset_password.md)

- [update_password()](update_password.md)

