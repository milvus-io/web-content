# TelemetryConfig

This struct holds the client telemetry configuration used to report metrics, heartbeat, and server-pushed commands. Pass a `TelemetryConfig` to `ConnectParam::WithTelemetryConfig()` when connecting.

```cpp
struct TelemetryConfig {
    bool enabled{true};
    uint64_t heartbeat_interval_ms{10000};
    double sampling_rate{1.0};
    size_t error_max_count{100};
    std::string client_id;
};
```

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

## Example

```cpp
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
milvus::TelemetryConfig telemetry_config;
telemetry_config.enabled = true;
connect_param.WithTelemetryConfig(telemetry_config);
```

<!-- category: Client; action: CREATE; addedSince: v3.0.x -->
