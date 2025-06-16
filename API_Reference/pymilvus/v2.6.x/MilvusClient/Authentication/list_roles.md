# list_roles()

This operation lists all custom roles.

## Request syntax

```python
list_roles(
    timeout: Optional[float] = None
) -> dict
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of role names.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **BaseException**

    This exception will be raised when this operation fails.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a role
client.create_role(role_name="read_only")

# 3. List all roles
client.list_roles()

# ['admin', 'public', 'read_only']
```

## Related methods

- [create_role()](create_role.md)

- [describe_role()](describe_role.md)

- [drop_role()](drop_role.md)

- [grant_privilege()](grant_privilege.md)

- [grant_role()](grant_role.md)

- [revoke_privileges()](revoke_privileges.md)

- [revoke_role()](revoke_role.md)

