# TelemetryConfig

A `TelemetryConfig` builder holds the client telemetry configuration used when creating a `MilvusClientV2` instance via `ConnectConfig.telemetryConfig()`.

```java
io.milvus.telemetry.TelemetryConfig
```

## Constructor

This constructor initializes a new `TelemetryConfig` instance.

```java
TelemetryConfig.builder()
    .enabled(boolean enabled)
    .heartbeatIntervalMs(long heartbeatIntervalMs)
    .samplingRate(double samplingRate)
    .errorMaxCount(int errorMaxCount)
    .clientId(String clientId)
    .build()
```

You can also use `TelemetryConfig.defaults()` to obtain the default configuration.

**BUILDER METHODS:**

- `enabled(boolean enabled)`

    Whether telemetry reporting is enabled. Default: `true`.

- `heartbeatIntervalMs(long heartbeatIntervalMs)`

    Milliseconds between heartbeats, which is also the metrics window. Default: `10000`.

- `samplingRate(double samplingRate)`

    Fraction of operations sampled for telemetry. Default: `1.0`.

- `errorMaxCount(int errorMaxCount)`

    Maximum number of recent errors retained for diagnostics. Default: `100`.

- `clientId(String clientId)`

    Optional client identifier. When empty, a random identifier is generated.

**RETURN TYPE:**

*TelemetryConfig*

**RETURNS:**

A **TelemetryConfig** instance.

## Example

```java
import io.milvus.telemetry.TelemetryConfig;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;

TelemetryConfig telemetryConfig = TelemetryConfig.builder()
    .heartbeatIntervalMs(5000)
    .samplingRate(0.5)
    .build();

ConnectConfig config = ConnectConfig.builder()
    .uri("http://localhost:19530")
    .token("root:Milvus")
    .telemetryConfig(telemetryConfig)
    .build();

MilvusClientV2 client = new MilvusClientV2(config);
```
