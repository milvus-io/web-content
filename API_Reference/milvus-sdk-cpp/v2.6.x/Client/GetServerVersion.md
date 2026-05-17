# GetServerVersion()

This operation returns the Milvus server version.

**PARAMETERS:**

- **version** (*std::string&*)

    Sets a variable that holds the returned server version number.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

