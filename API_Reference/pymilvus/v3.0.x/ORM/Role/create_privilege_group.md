# create_privilege_group()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation creates a privilege group for the current role.

<div class="alert note">

To complete this operation, you need to enable authentication on your Milvus instance. For details, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

</div>

## Request Syntax

```python
create_privilege_group(
    privilege_group: str
) 
```

**PARAMETERS:**

- **privilege_group** (*string*)

    **[REQUIRED]**

    The name of the privilege group to create.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation, especially when the privilege group already exists.

## Examples

```python
from pymilvus import Role

# Create a role
role = Role("read_only")
role.create()

# Create a privilege group
role.create_privilege_group("read_only_privileges")
```
