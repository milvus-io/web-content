# update_password()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation updates a user password and can also update the user description.

## Request Syntax

```python
update_password(
    user_name: str,
    old_password: str,
    new_password: str,
    reset_connection: Optional[bool] = False,
    timeout: Optional[float] = None,
    description: Optional[str] = None
) -> None
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of the user whose password or description is to be updated.

- **old_password** (*str*) -

    **[REQUIRED]**

    The current password of the user. Provide this together with `new_password` when changing the password.

- **new_password** (*str*) -

    **[REQUIRED]**

    The new password for the user. Provide this together with `old_password` when changing the password.

- **timeout** (*float*) -

    The timeout duration for this operation.

**RETURN TYPE:**

*None*

**RETURNS:**

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

- **ParamError**

    This exception will be raised when a parameter value is invalid.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")
client.create_user(
    user_name="analyst_user",
    password="P@ssw0rd!",
    description="Read-only analyst account",
)

client.update_password(
    user_name="analyst_user",
    old_password="P@ssw0rd!",
    new_password="N3wP@ssw0rd!",
    reset_connection=False,
    description="Read-only analyst account",
)
```
