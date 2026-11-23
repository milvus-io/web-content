# TelemetryConfig

Configuration for the client-side telemetry manager, mirroring the Java/C++/Rust V2 SDKs' `TelemetryConfig`.

```csharp
public sealed class TelemetryConfig
{
    public bool Enabled { get; set; } = true;
    public long HeartbeatIntervalMs { get; set; } = 10000;
    public double SamplingRate { get; set; } = 1.0;
    public int ErrorMaxCount { get; set; } = 100;
    public string? ClientId { get; set; }
}
```

**PARAMETERS:**

- `Enabled` (*bool*) -

    Whether telemetry is enabled. Defaults to `true`; when `false`, no heartbeat traffic is emitted.

- `HeartbeatIntervalMs` (*long*) -

    The heartbeat interval in milliseconds. Defaults to 10000 (10 seconds); values ≤ 0 normalize to the default. The server may push a config that overrides this while the client is connected.

- `SamplingRate` (*double*) -

    The fraction of operations sampled for metrics, in [0, 1]. Defaults to 1.0 (sample everything).

- `ErrorMaxCount` (*int*) -

    The maximum number of recent telemetry errors retained. Defaults to 100; values ≤ 0 normalize to 100.

- `ClientId` (*string?*) -

    An optional stable client id. When empty, a random id is generated and reported as unstable.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus",
    Telemetry = new TelemetryConfig
    {
        Enabled = true,
        HeartbeatIntervalMs = 5000,
        SamplingRate = 0.5,
        ErrorMaxCount = 200,
        ClientId = "my-client"
    }
});
await client.ConnectAsync();
```
