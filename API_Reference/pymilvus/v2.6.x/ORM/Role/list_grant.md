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

**PARAMETERS:**

- **object** (*str*)

    **[REQUIRED]**

    The type of the object to grant the privilege.

    The value is case-sensitive, and possible options are **Collection**, **Global**, and **User**. For details, refer to [Users & Roles](https://milvus.io/docs/users_and_roles.md).

- **object_name** (*str*)

    **[REQUIRED]**

    The name of a target object of the type specified in **object**.

    It can be a collection name, a user name, or a wild card (*).

- **db_name** (*str*)

    The name of a database the object belongs to. If left unspecified, the default database applies.

**RETURN TYPE:**

*GrantInfo*

**RETURNS:**

A **GrantInfo** object that contains a list of **GrantItem** objects.

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

A **GrantItem** object contains the following fields:

- **object** (*str*)

    The type of the object to which the privilege belongs.

- **object_name** (*str*)

    The name of the object to which the role is granted the specified privilege.

- **role_name** (*str*)

    The name of the role to check.

- **grantor_name** (*str*）

    The name of the user who granted a specific role to a user.

- **privilege** (*str*)

    The privilege that is granted to the role.

- **db_name** (str)

    The name of the database in which this operation has been executed.

**EXCEPTIONS:**

- **MilvusException**

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

- [add_user()](add_user.md)

- [create()](create.md)

- [drop()](drop.md)

- [get_users()](get_users.md)

- [grant()](grant.md)

- [is_exist()](is_exist.md)

- [list_grants()](list_grants.md)

- [remove_user()](remove_user.md)

- [revoke()](revoke.md)

