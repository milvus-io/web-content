# list_privilege_groups()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation lists the privilege groups for the current role.

<div class="alert note">

To complete this operation, you need to enable authentication on your Milvus instance. For details, refer to [Authenticate User Access](https://milvus.io/docs/authenticate.md).

</div>

## Request Syntax

```python
list_privilege_groups()
```

**RETURN TYPE:**

*PrivilegeGroupInfo*

**RETURNS:**

A **PrivilegeGroupInfo** object that contains the privilege groups and their privileges.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Role

# Create a role
role = Role("read_only")
role.create()

# Create a privilege group
role.create_privilege_group("read_only_privileges")

# List the privilege groups
res = role.list_privilege_groups()
print(res)
```
