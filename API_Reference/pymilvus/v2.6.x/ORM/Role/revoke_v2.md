# revoke_v2()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation revokes a privilege on a collection from the current role.

<div class="alert note">

To complete this operation, you need to enable authentication on your Milvus instance. For details, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

</div>

## Request Syntax

```python
revoke_v2(
    privilege: str,
    collection_name: str,
    db_name: Optional[str] = None
) 
```

**PARAMETERS:**

- **privilege** (*string*)

    **[REQUIRED]**

    The name of the privilege to revoke.

- **collection_name** (*string*)

    **[REQUIRED]**

    The name of the collection to revoke the privilege on.

- **db_name** (*string*)

    The name of the database to which the collection belongs.

    The value defaults to **None**, indicating that the default database is used.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import Role

# Create a role
role = Role("read_only")
role.create()

# Grant a privilege on a collection
role.grant_v2("Insert", "test_collection")

# Revoke the privilege
role.revoke_v2("Insert", "test_collection")
```
