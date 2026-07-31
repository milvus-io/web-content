# DropUser()

This operation drops a user.

## Request Syntax

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

