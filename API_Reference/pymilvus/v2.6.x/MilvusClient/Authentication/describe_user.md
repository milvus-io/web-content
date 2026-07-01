# describe_user()

This operation returns the roles assigned to a user and the user description.

## Request Syntax

```python
describe_user(
    user_name: str,
    timeout: Optional[float] = None
) -> dict
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of the user to describe.

- **timeout** (*float*) -

    The timeout duration for this operation.

**RETURN TYPE:**

*dict*

A dictionary that contains `user_name`, `roles`, and `description`.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **ParamError**

    This exception will be raised when a parameter value is invalid.

## Examples

```python
user_info = client.describe_user(user_name="analyst_user")
print(user_info["roles"])
print(user_info["description"])
```
