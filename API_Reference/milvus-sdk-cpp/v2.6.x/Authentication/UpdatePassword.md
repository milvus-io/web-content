# UpdatePassword()

This operation updates a user's password.

## Request Syntax

**REQUEST METHODS:**

- `WithUserName(const std::string& name)`

     Sets the name of the user.

- `WithOldPassword(const std::string& password)`

     Sets the password of the user.

- `WithNewPassword(const std::string& password)`

     Sets the user's new password.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

