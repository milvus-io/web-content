# GrantPrivilegeV2()

This operation grants a privilege or a privilege group to a role.

## Request Syntax

**REQUEST METHODS:**

- `WithRoleName(const std::string& name)`

     Sets the role's name.

- `WithDatabaseName(const std::string& db_name)`

     Sets the target database name for the role.

- `WithCollectionName(const std::string& collection_name)`

     Sets the target collection name for the role.

- `WithPrivilege(const std::string& privilege)`

     Sets the name of the privilege to assign to the role. For available privileges, refer to [this page](https://milvus.io/docs/grant_privileges.md).

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

