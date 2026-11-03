# Connect()

This operation establishes a connection to the Milvus server using the supplied ConnectParam, which carries the server URI, authentication credentials (a token, or a username and password), and connection options such as connect timeout, keepalive settings, TLS, and database name. Other client methods can be used only after the connection is established successfully.

```cpp
Status Connect(const ConnectParam& connect_param)
```

**PARAMETERS:**

- **connect_param** (*const ConnectParam&*)

    Connection parameters carrying the server URI, credentials, and connection options. See the `### ConnectParam` section below.

## Request Syntax

```cpp
auto status = client->Connect(connect_param);
```

**REQUEST METHODS:**

Not applicable; this operation accepts a `ConnectParam` directly and has no request builder methods.

**RETURNS:**

*[Status](Status.md)*

Returns a [Status](Status.md) indicating whether the connection was established successfully; on failure, the [Status](Status.md) code and message describe the cause.

### ConnectParam

This class holds the connection parameters passed to `Connect()`. Use the constructor overloads for quick setup, then chain `With*()` methods to configure advanced settings such as TLS, keepalive, and timeouts.

```cpp
// Recommended: URI only (no authentication)
explicit ConnectParam(const std::string& uri);

// Recommended: URI + token
ConnectParam(const std::string& uri, const std::string& token);

// Deprecated: host/port constructors (replaced by URI-based constructors above)
ConnectParam(std::string host, uint16_t port);
ConnectParam(std::string host, uint16_t port, const std::string& token);
ConnectParam(std::string host, uint16_t port, std::string username, std::string password);
```

**PARAMETERS:**

- **uri** (*const std::string&*)

    Sets the server endpoint, which accepts `http://host:port` for local Milvus or a Zilliz Cloud endpoint URL.

- **token** (*const std::string&*)

    Sets the authorization header value. Use `"username:password"` for a self-hosted instance, or a Zilliz Cloud API key.

- **host** (*std::string*) — *deprecated, use* `uri` *instead*

    Sets the IP address or hostname of the Milvus proxy.

- **port** (*uint16_t*) — *deprecated, use* `uri` *instead*

    Sets the port of the Milvus proxy.

- **username** (*std::string*) — *deprecated, use* `token` *instead*

    Sets the username for authentication.

- **password** (*std::string*) — *deprecated, use* `token` *instead*

    Sets the password for authentication.

**REQUEST METHODS:**

- `WithUri(const std::string& uri)`

    Sets the server URI. Overrides the value supplied in the constructor. Default: `"http://localhost:19530"`.

- `WithToken(const std::string& token)`

    Sets the authorization token. Calling this resets any username/password previously set via `WithAuthorizations()`.

- `WithAuthorizations(std::string username, std::string password)`

    Sets the username and password for authentication. Calling this resets any token previously set via `WithToken()`.

- `WithConnectTimeout(uint64_t connect_timeout_ms)`

    Timeout in milliseconds to wait for the gRPC channel to reach the `READY` state. Default: `10000`.

- `WithKeepaliveTimeMs(uint64_t keepalive_time_ms)`

    Interval in milliseconds between keepalive pings. Default: `10000`.

- `WithKeepaliveTimeoutMs(uint64_t keepalive_timeout_ms)`

    Timeout in milliseconds to wait for a keepalive ping acknowledgement before closing the connection. Default: `5000`.

- `WithKeepaliveWithoutCalls(bool keepalive_without_calls)`

    When `true`, keepalive pings are sent even when there are no active RPCs. Default: `true`.

- `WithRpcDeadlineMs(uint64_t rpc_deadline_ms)`

    Maximum duration in milliseconds allowed for a single RPC call. A value of `0` means no deadline is enforced. Default: `0`.

- `WithTls()`

    Enables TLS encryption without certificate verification.

- `WithTls(const std::string& server_name, const std::string& ca_cert)`

    Enables TLS with server certificate verification using the given CA certificate file path.

- `WithTls(const std::string& server_name, const std::string& cert, const std::string& key, const std::string& ca_cert)`

    Enables mutual TLS (mTLS). Provide the client certificate file, client key file, and CA certificate file paths.

- `WithDbName(const std::string& db_name)`

    Sets the default database to use after connecting. Default: `"default"`.

**ERROR HANDLING:**

- **[Status](Status.md)**

    Failures are reported through the returned [Status](Status.md) (NOT_CONNECTED, TIMEOUT, or RPC_FAILED) carrying the underlying error message; for example when URI parsing, gRPC channel creation, or the connection handshake fails, such as an invalid URI, an unreachable server, or an expired connect timeout. Exceptions raised while creating the gRPC channel are caught internally and converted to a failed [Status](Status.md) rather than propagating. Inspect `status.IsOk()`, `Code()`, and `Message()` for details. See [Status](Status.md).

## Example

Create a client instance, construct a URI-based ConnectParam with a token, connect to the local Milvus server, and check the returned [Status](Status.md).

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
