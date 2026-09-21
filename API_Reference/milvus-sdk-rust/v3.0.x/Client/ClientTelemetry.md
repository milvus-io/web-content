# ClientTelemetry

A shared client-side telemetry manager that reports operation metrics and errors to the Milvus server over a heartbeat, and executes server-pushed commands.

```rust
use milvus::v2::prelude::*;
```

## Construction

A `ClientTelemetry` is owned by a [ClientV2](MilvusClientV2.md) and obtained through `ClientV2::telemetry()`:

```rust
let telemetry = client.telemetry();
```

The manager starts a heartbeat task when the client connects, unless telemetry is disabled in the [TelemetryConfig](TelemetryConfig.md). Use `with_client_request_id` to attach a request ID to a future's gRPC metadata:

```rust
let request_id = new_client_request_id();
let resp = with_client_request_id(request_id, async {
    client.search(search_request).await
}).await?;
```

- `pub async fn with_client_request_id<F>(request_id: impl Into<String>, future: F) -> F::Output`

    Runs a future with a caller-provided `client_request_id`. The ID must be a non-zero, 32-character lowercase OpenTelemetry TraceID; malformed values are omitted from gRPC metadata and telemetry error correlation.

- `pub fn new_client_request_id() -> String`

    Generates a non-zero, lowercase, 32-character OpenTelemetry TraceID.

## PARAMETERS

`ClientTelemetry` is not constructed directly; it is created internally by `ClientV2` from the [TelemetryConfig](TelemetryConfig.md) in the connect configuration.

## METHODS

- `pub fn client_id(&self) -> &str`

    Returns the stable runtime client identifier sent in heartbeats.

- `pub fn config(&self) -> TelemetryConfig`

    Returns the current effective telemetry configuration.

- `pub fn is_supported(&self) -> bool`

    Reports whether the server is not currently known to reject telemetry as unimplemented.

- `pub fn last_heartbeat_error(&self) -> Option<String>`

    Returns the most recent best-effort heartbeat failure.

- `pub fn recent_errors(&self, max_count: usize) -> Vec<TelemetryErrorInfo>`

    Returns recent operation errors, newest first. Each `TelemetryErrorInfo` carries the error timestamp, operation name, error text, associated collection, and request ID.

- `pub fn snapshots(&self) -> Vec<TelemetrySnapshot>`

    Returns retained metric snapshots in chronological order. Each `TelemetrySnapshot` contains the window start/end and per-operation `TelemetryMetrics` (request counts and latency percentiles).

- `pub fn register_command_handler<F>(&self, command_type: impl Into<String>, handler: F)`

    Registers or replaces a custom command handler where `F: Fn(&ClientTelemetryCommand) -> ClientTelemetryCommandReply + Send + Sync + 'static`. The handler is invoked for server commands of the matching `command_type` and returns a reply acknowledging success or failure.
