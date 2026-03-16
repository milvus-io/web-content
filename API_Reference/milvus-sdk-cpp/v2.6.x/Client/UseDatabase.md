# UseDatabase()

This operation shifts the connection from one database to another.

**PARAMETERS:**

- **db_name** (*const std::string&*)

    Sets the name of the database to use.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

