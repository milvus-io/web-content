# DescribeRole()

This operation returns the description of a specific role.

## Request Syntax

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

     Sets the role's name.

- `WithDatabaseName(const std::string& db_name)`

     Sets the name of a database to which the role is assigned.

**RETURNS:**

*Status* with *DescribeRoleResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

