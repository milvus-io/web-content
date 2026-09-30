# create_role()

This operation creates a role for role-based access control.

## Request Syntax

```python
create_role(
    role_name: str,
    timeout: Optional[float] = None,
    description: str = ""
) -> None
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to create.

- **timeout** (*float*) -

    The timeout duration for this operation.

- **description** (*str*) -

    The description of the role to create. Defaults to an empty string.

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
client.create_role(role_name="analytics_reader")
```
