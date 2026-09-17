# TelemetryConfig

This struct holds the client telemetry configuration used by `MilvusClientV2::Connect()` through `ConnectParam::WithTelemetryConfig()`.

```cpp
struct TelemetryConfig {
    bool enabled{true};
    uint64_t heartbeat_interval_ms{10000};
    double sampling_rate{1.0};
    size_t error_max_count{100};
    std::string client_id;
};
```

**FIELDS:**

- **enabled** (*bool*)

    Whether telemetry reporting is enabled. Default: `true`.

- **heartbeat_interval_ms** (*uint64_t*)

    Milliseconds between heartbeats, which is also the metrics window. Each heartbeat carries the operations recorded since the last one. Default: `10000`.

- **sampling_rate** (*double*)

    Fraction of operations sampled for telemetry. Default: `1.0`.

- **error_max_count** (*size_t*)

    Maximum number of recent errors retained for diagnostics. Default: `100`.

- **client_id** (*std::string*)

    Optional client identifier. When empty, a random UUID is generated.
