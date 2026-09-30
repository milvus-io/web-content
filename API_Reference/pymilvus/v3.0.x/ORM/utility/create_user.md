# create_user()

This operation creates a user with a password.

## Request Syntax

```python
create_user(
    user_name: str,
    password: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of the user to create.

- **password** (*str*) -

    **[REQUIRED]**

    The password for the user.

- **timeout** (*float*) -

    The timeout duration for this operation.

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
client.create_user(
    user_name="analyst_user",
    password="P@ssw0rd!",
)
```
