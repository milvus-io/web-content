# GetTelemetry()

Gets the client-side telemetry manager that records operation metrics, reports them to the server over a heartbeat loop, and handles server-pushed commands.

Mirrors the Java SDK's `getTelemetry` / the C++ SDK's `GetTelemetry`.

```csharp
public ClientTelemetryManager GetTelemetry()
```

## Request Syntax

```csharp
ClientTelemetryManager telemetry = client.GetTelemetry();
```

**RETURN TYPE:**

*ClientTelemetryManager*

**RETURNS:**

A [ClientTelemetryManager](ClientTelemetryManager.md) that records per-operation metrics (for `Insert`, `Delete`, `Upsert`, `Search`, `HybridSearch`, `Query` and `RunAnalyzer`), reports them to the server over a heartbeat loop, and handles server-pushed commands. The manager is enabled by default (see [TelemetryConfig](TelemetryConfig.md) on `ConnectConfig`); dispose it or the client to stop the heartbeat loop.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

ClientTelemetryManager telemetry = client.GetTelemetry();
Console.WriteLine($"Telemetry ready: {telemetry.IsReady}");
Console.WriteLine($"Client id: {telemetry.ClientId}");
```
