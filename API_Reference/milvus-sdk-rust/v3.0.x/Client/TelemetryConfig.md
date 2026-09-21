# TelemetryConfig

Client-side telemetry settings.

```rust
use milvus::v2::types::TelemetryConfig;
```

Configured on a [ConnectConfig](ConnectConfig.md) through its `telemetry` field. Telemetry is enabled by default. An initial `enabled` value of `false` prevents the heartbeat task from starting. If an already-running client is disabled by a server command, operation collection and metric payloads stop while its lightweight command heartbeat continues to deliver acknowledgements and receive a later re-enable.

## Construction

- `TelemetryConfig::new() -> TelemetryConfig`

    Creates telemetry settings initialized with the SDK defaults: `enabled = true`, `heartbeat_interval = 10s`, `sampling_rate = 1.0`, `error_max_count = 100`, `client_id = ""`.

## PARAMETERS

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | `true` | Whether telemetry is enabled at connection startup. |
| `heartbeat_interval` | `Duration` | `10s` | Heartbeat interval. A zero value is normalized to the 10-second default when a client constructs its telemetry runtime. |
| `sampling_rate` | `f64` | `1.0` | Operation sampling rate. Values are clamped to `0.0..=1.0`. |
| `error_max_count` | `usize` | `100` | Maximum number of recent errors retained by the client. A zero value is normalized to 100 when a client constructs its telemetry runtime. |
| `client_id` | `String` | `""` | Pinned client identifier that remains stable across process restarts. An empty value asks the SDK to generate a new process-local UUID. |

## METHODS

Each field has a consuming setter, a mutable setter, and a getter.

- `enabled(mut self, enabled: bool) -> Self` — enables or disables telemetry at connection startup. `set_enabled(&mut self, enabled)` and `is_enabled() -> bool` are also available.
- `heartbeat_interval(mut self, interval: Duration) -> Self` — sets the heartbeat interval. `set_heartbeat_interval(&mut self, interval)` and `get_heartbeat_interval() -> Duration` are also available.
- `sampling_rate(mut self, rate: f64) -> Self` — sets the operation sampling rate, clamped to `0.0..=1.0`. `set_sampling_rate(&mut self, rate)` and `get_sampling_rate() -> f64` are also available.
- `error_max_count(mut self, count: usize) -> Self` — sets the maximum number of retained recent errors. `set_error_max_count(&mut self, count)` and `get_error_max_count() -> usize` are also available.
- `client_id(mut self, client_id: impl Into<String>) -> Self` — pins a stable client identifier. `set_client_id(&mut self, client_id)` and `get_client_id() -> &str` are also available.
