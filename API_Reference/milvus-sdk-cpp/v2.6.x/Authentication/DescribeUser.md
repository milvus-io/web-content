# DescribeUser()

This operation returns a user's detailed description.

## Request Syntax

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user.

**RETURNS:**

*Status* with *DescribeUserResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

