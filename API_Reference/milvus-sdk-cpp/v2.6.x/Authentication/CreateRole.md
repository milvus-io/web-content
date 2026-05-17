# CreateRole()

This operation creates a role with specific privileges.

## Request Syntax

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

    Sets the role's name.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

