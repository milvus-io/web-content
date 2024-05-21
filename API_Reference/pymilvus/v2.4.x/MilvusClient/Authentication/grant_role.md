# grant_role()

This operation grants a role to a user.

## Request syntax

```python
grant_role(
    user_name: str,
    role_name: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of an existing user.

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to assign.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

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

# 3. Create a user
client.create_user(user_name="user_1", password="P@ssw0rd")

# 4. Grant the role to the user
client.grant_role(user_name="user_1", role_name="read_only")
```

## Related methods

- [create_role()](create_role.md)

- [describe_role()](describe_role.md)

- [drop_role()](drop_role.md)

- [grant_privilege()](grant_privilege.md)

- [list_roles()](list_roles.md)

- [revoke_privileges()](revoke_privileges.md)

- [revoke_role()](revoke_role.md)

