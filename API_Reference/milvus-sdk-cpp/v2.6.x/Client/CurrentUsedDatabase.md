# CurrentUsedDatabase()

This operation returns the currently used database name. This API is useful in multi-database scenarios.

**PARAMETERS:**

- **db_name** (*std::string&*)

    Sets a variable that holds the name of the currently used database.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

