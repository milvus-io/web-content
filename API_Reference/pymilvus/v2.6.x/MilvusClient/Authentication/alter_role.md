# alter_role()

This operation updates the description of an existing role.

## Request Syntax

```python
alter_role(
    role_name: str,
    description: str,
    timeout: Optional[float] = None
) -> None
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to update.

- **description** (*str*) -

    **[REQUIRED]**

    The new description of the role. Use an empty string to clear the description.

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
client.alter_role(
    role_name="analytics_reader",
    description="Grants read-only access to analytics collections",
)
```
