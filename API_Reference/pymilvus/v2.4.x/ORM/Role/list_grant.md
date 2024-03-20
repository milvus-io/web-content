# list_grant()

This operation lists the relationship between the current role and the specified object.

## Request Syntax

```python
list_grant(
    object: str,
    object_name: str,
    db_name: str
)
```

__PARAMETERS:__

- __object__ (_str_)

    __[REQUIRED]__

    The type of the object to grant the privilege.

    The value is case-sensitive, and possible options are __Collection__, __Global__, and __User__. For details, refer to [Users & Roles](https://milvus.io/docs/users_and_roles.md).

- __object_name__ (_str_)

    __[REQUIRED]__

    The name of a target object of the type specified in __object__.

    It can be a collection name, a user name, or a wild card (*).

- __db_name__ (_str_)

    The name of a database the object belongs to. If left unspecified, the default database applies.

__RETURN TYPE:__

_GrantInfo_

__RETURNS:__

A __GrantInfo__ object that contains a list of __GrantItem__ objects.

```python
├── GrantInfo
│   └── groups  
│       └── GrantItem
│           ├── object
│           ├── object_name
│           ├── role_name
│           ├── grantor_name
│           ├── privilege
│           └── db_name
```

A __GrantItem__ object contains the following fields:

- __object__ (_str_)

    The type of the object to which the privilege belongs.

- __object_name__ (_str_)

    The name of the object to which the role is granted the specified privilege.

- __role_name__ (_str_)

    The name of the role to check.

- __grantor_name__ (_str_）

    The name of the user who granted a specific role to a user.

- __privilege__ (_str_)

    The privilege that is granted to the role.

- __db_name__ (str)

    The name of the database in which this operation has been executed.

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Get an existing role
role = Role(name="root")

# List the relationship between the current role and the specified object.
res = list_grant(
    object="Collection",
    object_name="test_collection",
    db_name="test_db"
)
```

## Related operations

The following operations are related to `get_replicas()`:

- [add_user()](./add_user.md)

- [create()](./create.md)

- [drop()](./drop.md)

- [get_users()](./get_users.md)

- [grant()](./grant.md)

- [is_exist()](./is_exist.md)

- [list_grants()](./list_grants.md)

- [remove_user()](./remove_user.md)

- [revoke()](./revoke.md)

