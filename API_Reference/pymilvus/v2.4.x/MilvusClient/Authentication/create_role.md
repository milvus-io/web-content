# create_role()

This operation creates a custom role.

## Request syntax

```python
create_role(
    role_name: str,
    timeout: Optional[float] = None
) -> None
```

__PARAMETERS:__

- __role_name__ (_str_) -

    __[REQUIRED]__

    The name of the role to create.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

- __BaseException__

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
```

## Related methods

- [describe_role()](./Authentication/describe_role.md)

- [drop_role()](./Authentication/drop_role.md)

- [grant_privilege()](./Authentication/grant_privilege.md)

- [grant_role()](./Authentication/grant_role.md)

- [list_roles()](./Authentication/list_roles.md)

- [revoke_privileges()](./Authentication/revoke_privileges.md)

- [revoke_role()](./Authentication/revoke_role.md)

