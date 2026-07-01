# update_user()

This operation updates the description of an existing user without changing the user password.

## Request Syntax

```python
update_user(
    user_name: str,
    description: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of the user to update.

- **description** (*str*) -

    **[REQUIRED]**

    The new description of the user. Use an empty string to clear the description.

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
client.update_user(
    user_name="analyst_user",
    description="Read-only analyst account",
)
```
