# create_user()

<div class="alert warning">

**Deprecated.**

This API is an ORM-style PyMilvus API and will be removed in PyMilvus 3.1. Use `MilvusClient` instead.

</div>

This operation creates a user with a password.

## Request Syntax

```python
create_user(
    user: str,
    password: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **user** (*str*) -

    **[REQUIRED]**

    The name of the user to create.

- **password** (*str*) -

    **[REQUIRED]**

    The password for the user.

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
from pymilvus import connections, utility

# Connect to localhost:19530
connections.connect()

utility.create_user(
    user="analyst_user",
    password="P@ssw0rd!",
)
```
