# AddPrivilegesToGroup()

This operation adds privileges to a privilege group.

## Request Syntax

**REQUEST METHODS:**

- `WithGroupName(const std::string& name)`

    Set the name of the target privilege group for this operation.

- `WithPrivileges(std::set<std::string>&& privileges)`

    Sets the privileges to be added to the specified group.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

