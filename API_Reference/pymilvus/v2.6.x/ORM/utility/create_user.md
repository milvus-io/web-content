# create_user()

This operation creates a user and optionally stores a description for that user.

## Request Syntax

```python
create_user(
    user_name: str,
    password: str,
    timeout: Optional[float] = None,
    description: Optional[str] = None
) -> None
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of the user to create.

- **password** (*str*) -

    **[REQUIRED]**

    The password for the user. The password must satisfy the server password policy.

- **timeout** (*float*) -

    The timeout duration for this operation. If set to `None`, the client waits until the server responds or an error occurs.

- **description** (*str*) -

    An optional description of the user.

**RETURN TYPE:**

*None*

This operation returns no value.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **ParamError**

    This exception will be raised when a parameter value is invalid.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
client.create_user(
    user_name="analyst_user",
    password="P@ssw0rd!",
    description="Read-only analyst account",
)
```
