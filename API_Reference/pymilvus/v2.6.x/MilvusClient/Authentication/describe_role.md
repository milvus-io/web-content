# describe_role()

This operation returns the privileges granted to a role and the role description.

## Request Syntax

```python
describe_role(
    role_name: str,
    timeout: Optional[float] = None
) -> dict
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to describe.

- **timeout** (*float*) -

    The timeout duration for this operation.

**RETURN TYPE:**

*dict*

A dictionary that contains `role`, `description`, and `privileges`.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **ParamError**

    This exception will be raised when a parameter value is invalid.

## Examples

```python
role_info = client.describe_role(role_name="analytics_reader")
print(role_info["description"])
print(role_info["privileges"])
```
