# ClientTelemetryManager

The client-side telemetry manager: records per-operation metrics, reports them to the server over a heartbeat loop, and handles server-pushed commands. Mirrors the Java `ClientTelemetryManager` / C++ `GetTelemetry` / Rust `telemetry()`.

Obtained from `MilvusClientV2.GetTelemetry()`. Enabled by default (see [TelemetryConfig](TelemetryConfig.md)); dispose the manager or the client to stop the heartbeat loop.

```csharp
public sealed class ClientTelemetryManager : IDisposable
{
    public static readonly IReadOnlyList<string> Operations;
    public TelemetryConfig Config { get; }
    public string ClientId { get; }
    public bool IsReady { get; }
    public bool IsSupported { get; }
    public string? ConfigHash { get; }
    public string? LastHeartbeatError { get; }
    public IReadOnlyList<TelemetryError> RecentErrors(int maxCount = 100)
    public IReadOnlyList<TelemetrySnapshot> MetricsSnapshots()
    public void RegisterCommandHandler(string commandType, Func<ClientTelemetryCommand, ClientTelemetryCommandReply> handler)
    public void Dispose()
}
```

**PARAMETERS:**

- `Operations` (*static readonly IReadOnlyList\<string\>*) -

    The logical operations recorded by the telemetry manager, matching the Java/C++/Rust SDKs: `Insert`, `Delete`, `Upsert`, `Search`, `HybridSearch`, `Query` and `RunAnalyzer`.

- `Config` (*TelemetryConfig*) -

    The telemetry configuration in effect. See [TelemetryConfig](TelemetryConfig.md).

- `ClientId` (*string*) -

    The client id reported to the server.

- `IsReady` (*bool*) -

    Whether the telemetry manager is ready (the heartbeat loop has started).

- `IsSupported` (*bool*) -

    Whether the server supports the telemetry heartbeat protocol. `false` once an `UNIMPLEMENTED` response is observed.

- `ConfigHash` (*string?*) -

    The config hash reported to the server (a SHA-256 digest over the persistent commands), or `null` before any persistent command has been applied.

- `LastHeartbeatError` (*string?*) -

    The error of the last heartbeat, or `null` when the last heartbeat succeeded.

**METHODS:**

- `RecentErrors(int maxCount = 100)` -

    Returns the most recent telemetry errors, newest first.

- `MetricsSnapshots()` -

    Returns the retained metrics snapshots (one per heartbeat window), newest first, bounded to one hour of history.

- `RegisterCommandHandler(string commandType, Func<ClientTelemetryCommand, ClientTelemetryCommandReply> handler)` -

    Registers a handler for a server-pushed command type. The handler receives the command and returns a reply that is delivered on the next heartbeat. A handler registered for a built-in type (`push_config`, `collection_metrics`, `show_errors`, `show_latency_history`, `get_config`) overrides the built-in behavior.

- `Dispose()` -

    Stops the heartbeat loop and releases the manager. Idempotent; the owning client also disposes it.

## TelemetrySnapshot

A snapshot of the client's telemetry metrics for one logical operation over a heartbeat window.

```csharp
public sealed class TelemetrySnapshot
{
    public string Operation { get; }
    public DateTimeOffset WindowStart { get; }
    public DateTimeOffset WindowEnd { get; }
    public MetricsInfo Global { get; }
    public IReadOnlyDictionary<string, MetricsInfo> CollectionMetrics { get; }
    public IReadOnlyList<double> GlobalLatencySamplesMicros { get; }
}
```

**PARAMETERS:**

- `Operation` (*string*) -

    The logical operation, e.g. `"Search"`.

- `WindowStart` (*DateTimeOffset*) -

    The start of the window this snapshot covers.

- `WindowEnd` (*DateTimeOffset*) -

    The end of the window this snapshot covers.

- `Global` (*MetricsInfo*) -

    The operation's metrics aggregated across all collections. See [MetricsInfo](MetricsInfo.md).

- `CollectionMetrics` (*IReadOnlyDictionary\<string, MetricsInfo\>*) -

    The operation's metrics per collection, keyed by collection name. See [MetricsInfo](MetricsInfo.md).

- `GlobalLatencySamplesMicros` (*IReadOnlyList\<double\>*) -

    The raw global-bucket latency samples (microseconds) retained by this snapshot's ring, used to compute an exact aggregate p99 across windows.

## TelemetryError

A recent telemetry error observed while recording an operation or heartbeating.

```csharp
public sealed class TelemetryError
{
    public DateTimeOffset Timestamp { get; }
    public string Operation { get; }
    public string? Collection { get; }
    public string ErrorMessage { get; }
    public string? RequestId { get; }
}
```

**PARAMETERS:**

- `Timestamp` (*DateTimeOffset*) -

    When the error was observed.

- `Operation` (*string*) -

    The logical operation that failed.

- `Collection` (*string?*) -

    The collection the failed operation targeted, when known.

- `ErrorMessage` (*string*) -

    The error message.

- `RequestId` (*string?*) -

    An optional client request id.

## ClientTelemetryCommand

A command the server pushed to this client, delivered in a heartbeat response.

```csharp
public sealed class ClientTelemetryCommand
{
    public string CommandId { get; }
    public string CommandType { get; }
    public byte[] Payload { get; }
    public long CreateTime { get; }
    public bool Persistent { get; }
    public string? TargetScope { get; }
}
```

**PARAMETERS:**

- `CommandId` (*string*) -

    The command id.

- `CommandType` (*string*) -

    The command type (e.g. `"push_config"`, `"show_errors"`).

- `Payload` (*byte[]*) -

    The command payload (typically a JSON document).

- `CreateTime` (*long*) -

    The server creation timestamp of the command.

- `Persistent` (*bool*) -

    Whether the command is persistent (affects the config hash).

- `TargetScope` (*string?*) -

    The target scope of the command.

## ClientTelemetryCommandReply

The reply to a `ClientTelemetryCommand`, delivered on the next heartbeat.

```csharp
public sealed class ClientTelemetryCommandReply
{
    public ClientTelemetryCommandReply(string commandId, bool success, string errorMessage = "", byte[]? payload = null)
    public string CommandId { get; }
    public bool Success { get; }
    public string ErrorMessage { get; }
    public byte[]? Payload { get; }
}
```

**PARAMETERS:**

- `CommandId` (*string*) -

    The id of the command being replied to.

- `Success` (*bool*) -

    Whether the command was handled successfully.

- `ErrorMessage` (*string*) -

    The error message when `Success` is `false`.

- `Payload` (*byte[]?*) -

    The reply payload (typically a JSON document).

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

foreach (TelemetrySnapshot snapshot in telemetry.MetricsSnapshots())
{
    Console.WriteLine($"{snapshot.Operation}: {snapshot.Global.RequestCount} requests, " +
        $"p99 {snapshot.Global.P99LatencyMs} ms");
}
```
