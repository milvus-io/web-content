# Connect()

This operation establishes the connection between the client and the Milvus server using the given connection parameters.

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

Returns a [Status](Status.md) indicating whether the connection was established successfully.

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

- `WithTelemetryConfig(const TelemetryConfig& config)`

    Sets the client telemetry configuration.

#### TelemetryConfig

TelemetryConfig members:

**PARAMETERS:**

- **enabled** (*bool*)

    Whether telemetry reporting is enabled. Default: `true`.

- **heartbeat_interval_ms** (*uint64_t*)

    Milliseconds between heartbeats, which is also the metrics window. Each heartbeat carries the operations since the last one. The coordinator answers a telemetry query from the window before the newest, so what a caller reads is between one and two intervals old. Default: `10000`.

- **sampling_rate** (*double*)

    Sampling rate of recorded operations (0.0 to 1.0). Default: `1.0`.

- **error_max_count** (*size_t*)

    Maximum number of recorded errors retained. Default: `100`.

- **client_id** (*std::string*)

    Optional stable identity; a random UUID is used when empty.

**ERROR HANDLING:**

- **[Status](Status.md)**

    Failures are reported through the returned [Status](Status.md). The SDK converts internal exceptions into a non-OK [Status](Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Connects to a Milvus server using a URI and token credentials, then checks the returned status.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
