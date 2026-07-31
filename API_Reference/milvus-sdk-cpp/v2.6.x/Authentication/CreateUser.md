# CreateUser()

This operation creates a user account with a username and password for logging into Milvus.

## Request Syntax

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

    Sets the name of the user.

- `WithPassword(const std::string& password)`

    Sets the password of the user.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

