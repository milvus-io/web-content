# SetRpcDeadlineMs()

This operation changes the timeout value in milliseconds for each RPC call.

**PARAMETERS:**

- **timeout_ms** (*uint64_t*)

    Sets the timeout duration in milliseconds.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

