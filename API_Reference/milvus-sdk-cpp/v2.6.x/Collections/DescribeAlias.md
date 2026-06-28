# DescribeAlias()

This operation returns the description of an alias.

## Request Syntax

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithAlias(const std::string& alias)`

    Sets the name of the alias.

**RETURNS:**

*Status* with *DescribeAliasResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

