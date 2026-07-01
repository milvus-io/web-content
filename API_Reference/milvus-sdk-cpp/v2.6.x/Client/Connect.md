# Connect()

This operation connects to Milvus server.

**PARAMETERS:**

- **connect_param** (*const [ConnectParam](ConnectParam.md)&*)

    Sets the connection parameters.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

