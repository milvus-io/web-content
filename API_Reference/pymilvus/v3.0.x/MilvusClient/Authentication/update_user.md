# update_user()

This operation updates the description of an existing user.

## Request syntax

```python
client.update_user(
    user_name: str,
    description: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of an existing user.

- **description** (*str*) -

    **[REQUIRED]**

    The new description of the user.

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

client.update_user(
    user_name="user_1",
    description="Data engineer with full access",
)
```

## Related methods

- [create_user()](create_user.md)

- [describe_user()](describe_user.md)

- [drop_user()](drop_user.md)

- [list_users()](list_users.md)
