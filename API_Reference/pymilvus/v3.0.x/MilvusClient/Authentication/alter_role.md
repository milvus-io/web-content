# alter_role()

This operation updates the description of an existing role.

## Request syntax

```python
client.alter_role(
    role_name: str,
    description: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to alter.

- **description** (*str*) -

    **[REQUIRED]**

    The new description of the role.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.alter_role(
    role_name="analytics_reader",
    description="Read-only access for the analytics team",
)
```

## Related methods

- [create_role()](create_role.md)

- [describe_role()](describe_role.md)

- [drop_role()](drop_role.md)

- [list_roles()](list_roles.md)
