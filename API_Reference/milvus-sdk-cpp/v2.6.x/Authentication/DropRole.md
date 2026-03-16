# DropRole()

This operation drops a role.

## Request Syntax

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

     Sets the name of the role.

- `WithForceDrop(bool force_drop)`

     Sets the flag whether to force drop the role.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

