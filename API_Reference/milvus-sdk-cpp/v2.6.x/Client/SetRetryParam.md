# SetRetryParam()

This operation resets the retry rules for each RPC call.

**PARAMETERS:**

- **retry_param** (*const [RetryParam](RetryParam.md)&*)

    Sets the retry parameters.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

