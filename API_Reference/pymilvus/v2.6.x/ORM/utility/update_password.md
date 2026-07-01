# update_password()

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

- **reset_connection** (*bool*) -

    Whether to reset the client connection with the new password after the password is updated.

- **timeout** (*float*) -

    The timeout duration for this operation.

- **description** (*str*) -

    An optional new description for the user.

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
client.update_password(
    user_name="analyst_user",
    old_password="P@ssw0rd!",
    new_password="N3wP@ssw0rd!",
    reset_connection=True,
    description="Read-only analyst account",
)
```
