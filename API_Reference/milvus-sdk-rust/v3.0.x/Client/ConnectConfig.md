# ConnectConfig

Connection settings used to create a [ClientV2](MilvusClientV2.md).

```rust
use milvus::v2::ConnectConfig;

let config = ConnectConfig::new()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .database("books");
```

## Construction

- `ConnectConfig::new() -> ConnectConfig`

    Creates a value initialized with the SDK defaults.

## PARAMETERS

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `uri` | `String` | `"http://localhost:19530"` | URI of the Milvus server, for example `http://localhost:19530`. |
| `token` | `Option<String>` | `None` | Access token in the form `username:password`, base64-encoded before being sent as gRPC `authorization` metadata. |
| `tls_server_name` | `Option<String>` | `None` | Overrides the DNS name used to verify the Milvus server's TLS certificate. |
| `ca_certificate` | `Option<String>` | `None` | Path to a PEM-encoded custom CA certificate file. |
| `client_certificate` | `Option<String>` | `None` | Path to the PEM-encoded client certificate file used for mutual TLS. |
| `client_key` | `Option<String>` | `None` | Path to the PEM-encoded client private-key file used for mutual TLS. |
| `connect_timeout` | `Duration` | `10s` | Maximum time `ClientV2::new` waits for Milvus to become ready. |
| `rpc_timeout` | `Duration` | `Duration::ZERO` | Timeout applied to each RPC attempt; `ZERO` disables the timeout. |
| `keepalive_time` | `Duration` | `10s` | Time between HTTP/2 keep-alive probes sent to the server. |
| `keepalive_timeout` | `Duration` | `5s` | Timeout for the server to respond to a keep-alive probe. |
| `keepalive_while_idle` | `bool` | `true` | Whether to send keep-alive probes while the connection is idle. |
| `database` | `String` | `""` | Database selected on connection; the `default` database is used when empty. |
| `retry` | `RetryConfig` | `RetryConfig::new()` | Retry policy applied to V2 RPC calls. See [RetryConfig](RetryConfig.md). |
| `telemetry` | `TelemetryConfig` | `TelemetryConfig::new()` | Client-side telemetry settings. See [TelemetryConfig](TelemetryConfig.md). |

## METHODS

Each field has a consuming setter, a mutable setter, and a getter.

- `uri(mut self, uri: impl Into<String>) -> Self` — sets the server URI. `set_uri(&mut self, uri)` and `get_uri() -> &str` are also available.
- `token(mut self, token: impl Into<String>) -> Self` — sets the access token. `set_token(&mut self, token)` and `get_token() -> &Option<String>` are also available.
- `tls_server_name(mut self, value: impl Into<String>) -> Self` — overrides the TLS certificate verification name. `set_tls_server_name(&mut self, value)` and `get_tls_server_name() -> &Option<String>` are also available.
- `ca_certificate(mut self, value: impl Into<String>) -> Self` — sets the custom CA certificate file path. `set_ca_certificate(&mut self, value)` and `get_ca_certificate() -> &Option<String>` are also available.
- `client_certificate(mut self, value: impl Into<String>) -> Self` — sets the client certificate file path for mutual TLS. `set_client_certificate(&mut self, value)` and `get_client_certificate() -> &Option<String>` are also available.
- `client_key(mut self, value: impl Into<String>) -> Self` — sets the client private-key file path for mutual TLS. `set_client_key(&mut self, value)` and `get_client_key() -> &Option<String>` are also available.
- `connect_timeout(mut self, timeout: Duration) -> Self` — sets the maximum connect wait. `set_connect_timeout(&mut self, timeout)` and `get_connect_timeout() -> Duration` are also available.
- `rpc_timeout(mut self, timeout: Duration) -> Self` — sets the per-RPC timeout. `set_rpc_timeout(&mut self, timeout)` and `get_rpc_timeout() -> Duration` are also available.
- `keepalive_time(mut self, value: Duration) -> Self` — sets the keep-alive probe interval. `set_keepalive_time(&mut self, value)` and `get_keepalive_time() -> Duration` are also available.
- `keepalive_timeout(mut self, value: Duration) -> Self` — sets the keep-alive probe timeout. `set_keepalive_timeout(&mut self, value)` and `get_keepalive_timeout() -> Duration` are also available.
- `keepalive_while_idle(mut self, value: bool) -> Self` — sets whether keep-alive probes are sent while idle. `set_keepalive_while_idle(&mut self, value)` and `get_keepalive_while_idle() -> bool` are also available.
- `database(mut self, database: impl Into<String>) -> Self` — sets the database selected on connection. `set_database(&mut self, database)` and `get_database() -> &str` are also available.
- `retry(mut self, retry: RetryConfig) -> Self` — sets the retry policy. `set_retry(&mut self, retry)` and `get_retry() -> &RetryConfig` are also available.
- `telemetry(mut self, telemetry: TelemetryConfig) -> Self` — sets the telemetry configuration. `set_telemetry(&mut self, telemetry)` and `get_telemetry() -> &TelemetryConfig` are also available.
- `username_password(self, username: &str, password: &str) -> Self` — sets the token from a username and password pair.
