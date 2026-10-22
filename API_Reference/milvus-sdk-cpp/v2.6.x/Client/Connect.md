# Connect()

This operation establishes a connection to the Milvus server using the supplied ConnectParam, which carries the server URI, authentication credentials (a token, or a username and password), and connection options such as connect timeout, keepalive settings, TLS, and database name. Other client methods can be used only after the connection is established successfully.

```cpp
Status Connect(const ConnectParam& connect_param)
```

**RETURNS:**

*Status*

Returns a Status indicating whether the connection was established successfully; on failure, the Status code and message describe the cause.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status (NOT_CONNECTED, TIMEOUT, or RPC_FAILED) carrying the underlying error message; for example when URI parsing, gRPC channel creation, or the connection handshake fails, such as an invalid URI, an unreachable server, or an expired connect timeout. Exceptions raised while creating the gRPC channel are caught internally and converted to a failed Status rather than propagating. Inspect `status.IsOk()`, `Code()`, and `Message()` for details. See [Status](Status.md).

## Example

Create a client instance, construct a URI-based ConnectParam with a token, connect to the local Milvus server, and check the returned Status.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
