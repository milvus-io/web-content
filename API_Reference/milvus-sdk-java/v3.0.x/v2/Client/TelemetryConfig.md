# TelemetryConfig

A `TelemetryConfig` holds the client telemetry configuration used to report metrics, heartbeats, and server-pushed commands.

```java
io.milvus.telemetry.TelemetryConfig
```

## Constructor

This builder creates a telemetry configuration.

```java
TelemetryConfig.builder()
    .enabled(boolean enabled)
    .heartbeatIntervalMs(long heartbeatIntervalMs)
    .samplingRate(double samplingRate)
    .errorMaxCount(int errorMaxCount)
    .clientId(String clientId)
    .build()
```

**BUILDER METHODS:**

- `enabled(boolean enabled)`

    Whether telemetry reporting is enabled. Defaults to `true`.

- `heartbeatIntervalMs(long heartbeatIntervalMs)`

    Milliseconds between heartbeats, which is also the metrics window. Each heartbeat carries the operations since the last one. Defaults to `10000`.

- `samplingRate(double samplingRate)`

    Sampling rate of recorded operations (0.0 to 1.0). Defaults to `1.0`.

- `errorMaxCount(int errorMaxCount)`

    The maximum number of recorded errors retained. Defaults to `100`.

- `clientId(String clientId)`

    An optional stable identity. A random UUID is used when empty.

**RETURN TYPE:**

*TelemetryConfig*

**METHODS:**

- `boolean isEnabled()`

    Returns whether telemetry reporting is enabled.

- `long getHeartbeatIntervalMs()`

    Returns the heartbeat interval in milliseconds.

- `double getSamplingRate()`

    Returns the sampling rate of recorded operations.

- `int getErrorMaxCount()`

    Returns the maximum number of recorded errors retained.

- `String getClientId()`

    Returns the stable client identity.

## Example

```java
ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .telemetryConfig(TelemetryConfig.builder()
                .enabled(true)
                .heartbeatIntervalMs(15000)
                .build())
        .build();
```

<!-- category: Client; action: CREATE; addedSince: v3.0.x -->
