# StatusCode

This enum identifies the SDK and server error categories returned in `Status`.

```cpp
enum class StatusCode {
    OK = 0,
    UNKNOWN_ERROR = 1,
    NOT_SUPPORTED,
    NOT_CONNECTED,
    INVALID_ARGUMENT = 1000,
    INVALID_AGUMENT,
    RPC_FAILED,
    SERVER_FAILED,
    TIMEOUT,
    DIMENSION_NOT_EQUAL = 2000,
    VECTOR_IS_EMPTY,
    JSON_PARSE_ERROR,
    DATA_UNMATCH_SCHEMA,
};
```

**VALUES:**

- **OK** (0) - The operation succeeded.

- **UNKNOWN_ERROR** (1) - An unknown error occurred.

- **NOT_SUPPORTED** - The operation is not supported.

- **NOT_CONNECTED** - The client is not connected.

- **INVALID_ARGUMENT** (1000) - A request argument is invalid.

- **INVALID_AGUMENT** (1000) - Legacy alias returned by some SDK/server paths for an invalid argument.

- **RPC_FAILED** - The RPC failed before or during transport.

- **SERVER_FAILED** - The server reported a failure.

- **TIMEOUT** - The operation timed out.

- **DIMENSION_NOT_EQUAL** (2000) - Vector dimensions do not match.

- **VECTOR_IS_EMPTY** - A vector payload is empty.

- **JSON_PARSE_ERROR** - A JSON payload could not be parsed.

- **DATA_UNMATCH_SCHEMA** - Data does not match the collection schema.

- **DATA_UNMATCH_SCHEMA** - Data does not match the collection schema.
