# ConnectParam

This class holds the connection parameters passed to `MilvusClient::Connect()`. Use the constructor overloads for quick setup, then chain `With*()` methods to configure advanced settings such as TLS, keepalive, and timeouts.

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

## Request Syntax

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

## Example

