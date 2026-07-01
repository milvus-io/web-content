# create_role()

This operation creates a role and optionally stores a description for that role.

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

    An optional description of the role.

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
client.create_role(
    role_name="analytics_reader",
    description="Grants read-only access to analytics collections",
)
```
