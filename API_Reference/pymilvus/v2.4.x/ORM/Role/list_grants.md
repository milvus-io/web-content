# list_grants()

This operation lists all privileges granted to the current role.

## Request Syntax

```python
list_grants(
    db_name: str
)
```

**PARAMETERS:**

- **db_name** (*str*)

    The name of a database in which Milvus carries out this operation.

    If the specified database does not exist, an empty result returns.

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

The **GrantItem** objects contains the following fields:

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Get an existing role
role = Role(name="root")

# List all privileges granted to the current role.
res = list_grants(
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

- [list_grant()](list_grant.md)

- [remove_user()](remove_user.md)

- [revoke()](revoke.md)

