# Status

This class carries the result of an SDK call: a [StatusCode](#statuscode), a human-readable message, and the underlying RPC/server error codes when the call fails. Every `MilvusClient` and `MilvusClientV2` operation returns a `Status`; check `IsOk()` to determine whether the operation succeeded.

```cpp
Status();

Status(StatusCode code, std::string msg);

Status(StatusCode code, std::string msg, int32_t rpc_err_code, int32_t server_err_code, int32_t legacy_server_code);
```

**PARAMETERS:**

- **code** (*StatusCode*)

    Client-side status code. See [StatusCode](#statuscode).

- **msg** (*std::string*)

    Error message.

- **rpc_err_code** (*int32_t*)

    Error code from the gRPC library.

- **server_err_code** (*int32_t*)

    Server-side error code returned by Milvus v2.4 and later versions.

- **legacy_server_code** (*int32_t*)

    Legacy server-side error code returned by Milvus v2.2/v2.3.

**METHODS:**

- `static Status OK()`

    Returns a success status.

- `bool IsOk() const`

    Returns `true` if the operation succeeded.

- `StatusCode Code() const`

    Returns the status code (general client-side error code). See [StatusCode](#statuscode).

- `const std::string& Message() const`

    Returns the error message.

- `int32_t RpcErrCode() const`

    Returns the error code from the gRPC library, as listed in the [gRPC status codes](https://grpc.github.io/grpc/cpp/md_doc_statuscodes.html).

- `int32_t ServerCode() const`

    Returns the server-side error code of Milvus v2.4 and later versions.

- `int32_t LegacyServerCode() const`

    Returns the legacy server-side error code of Milvus v2.2/v2.3.

## StatusCode

This enum identifies the SDK and server error categories returned in `Status`.

```cpp
enum class StatusCode {
    OK = 0,
    UNKNOWN_ERROR = 1,
    NOT_SUPPORTED,
    NOT_CONNECTED,
    CLIENT_BUSY,
    INVALID_ARGUMENT = 1000,
    INVALID_AGUMENT = 1000,
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

- **CLIENT_BUSY** - The client is busy handling another request.

- **INVALID_ARGUMENT** (1000) - A request argument is invalid.

- **INVALID_AGUMENT** (1000) - Deprecated spelling alias of `INVALID_ARGUMENT` (both have the value 1000).

- **RPC_FAILED** - The RPC failed before or during transport.

- **SERVER_FAILED** - The server reported a failure.

- **TIMEOUT** - The operation timed out.

- **DIMENSION_NOT_EQUAL** (2000) - Vector dimensions do not match.

- **VECTOR_IS_EMPTY** - A vector payload is empty.

- **JSON_PARSE_ERROR** - A JSON payload could not be parsed.

- **DATA_UNMATCH_SCHEMA** - Data does not match the collection schema.

## Example

Create a client instance, connect to the local Milvus server, and inspect the returned Status.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << "code: " << (int)status.Code() << ", message: " << status.Message() << std::endl;
}
```
