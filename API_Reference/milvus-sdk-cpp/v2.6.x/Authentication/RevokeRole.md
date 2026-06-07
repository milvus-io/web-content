# RevokeRole()

This operation revokes a role from a user.

## Request Syntax

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the target use of this operation.

- `WithRoleName(const std::string& name)`

    Sets the name of the role to be granted.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

