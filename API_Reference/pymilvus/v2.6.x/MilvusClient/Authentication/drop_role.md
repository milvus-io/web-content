# drop_role()

This operation drops a custom role.

## Request syntax

```python
drop_role(
    role_name: str,
    force_drop: bool = False,
    timeout: Optional[float] = None,
    **kwargs,
) -> None
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to drop.

- **force_drop** (*bool*) -

    Whether to forcefully drop the role even if it has privileges or users assigned. Defaults to **False**.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

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

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Create a role
client.create_role(role_name="read_only")

# Drop a role
client.drop_role(role_name="read_only")

# Force drop a role with assigned privileges
client.drop_role(role_name="custom_role", force_drop=True)
```
