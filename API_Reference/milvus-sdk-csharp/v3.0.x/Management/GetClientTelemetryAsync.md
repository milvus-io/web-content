# GetClientTelemetryAsync()

Retrieves the server-side client-telemetry report for the connected SDK clients.

This is a server-side read of the telemetry the server has collected from clients that registered their `ClientInfo` on connect and are still heartbeating. It is distinct from the client-side telemetry manager exposed by `MilvusClientV2.GetTelemetry()`, which pushes heartbeats and metrics and handles server-pushed commands but does not expose this read.

```csharp
public async Task<GetClientTelemetryResp> GetClientTelemetryAsync(
    GetClientTelemetryReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetClientTelemetryReq
{
    Database = "default",
    ClientId = "abc-123",
    IncludeMetrics = true
};

GetClientTelemetryResp result = await client.GetClientTelemetryAsync(request);
```

**REQUEST PARAMETERS:**

- `Database` (*string?*) -

    An optional database name to filter the reported clients by. When empty, all databases are reported.

- `ClientId` (*string?*) -

    An optional client id to limit the report to a single connected client.

- `IncludeMetrics` (*bool*) -

    Whether to include per-operation metrics in the report.

- `CommandId` (*string?*) -

    When set, only the reply to this command is returned, instead of every reply the matching clients have accumulated.

**RETURN TYPE:**

*Task\<GetClientTelemetryResp\>*

**RETURNS:**

A **GetClientTelemetryResp** object that contains the telemetry of each connected client plus the aggregated metrics.

```csharp
GetClientTelemetryResp
    Clients     // -> IReadOnlyList<ClientTelemetryInfo>
    Aggregated  // -> MetricsInfo
```

**PARAMETERS:**

- **Clients** (*IReadOnlyList\<ClientTelemetryInfo\>*) -

    The telemetry of each connected client. Each **ClientTelemetryInfo** has the following members:

    - **ClientInfo** (*ClientInfo*) -

        The identifying information of the client (SDK type/version, user, host, local time, reserved fields). A **ClientInfo** has the following members:

        - `SdkType` (*string*) - The SDK type, e.g. `"CSharp"`.

        - `SdkVersion` (*string*) - The SDK version.

        - `LocalTime` (*string*) - The client's local time.

        - `User` (*string*) - The authenticated user.

        - `Host` (*string*) - The client host.

        - `Reserved` (*IReadOnlyDictionary\<string, string\>*) - Additional reserved client fields.

    - **LastHeartbeatTime** (*long*) -

        The time of the client's last heartbeat.

    - **Status** (*string*) -

        The client's status.

    - **Databases** (*IReadOnlyList\<string\>*) -

        The databases the client is connected to.

    - **Metrics** (*IReadOnlyList\<OperationMetricsInfo\>*) -

        The per-operation metrics reported by the client, when `IncludeMetrics` was set on the request. See [MetricsInfo](../Client/MetricsInfo.md).

- **Aggregated** (*MetricsInfo*) -

    The metrics aggregated across all reported clients. See [MetricsInfo](../Client/MetricsInfo.md).

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. When authorization is enabled, the server gates this RPC behind telemetry-admin checks and requires the calling user to be the `root` user; a non-root caller receives a permission exception. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetClientTelemetryResp result = await client.GetClientTelemetryAsync(new GetClientTelemetryReq
{
    IncludeMetrics = true
});

Console.WriteLine($"Connected clients: {result.Clients.Count}");
Console.WriteLine($"Aggregated requests: {result.Aggregated.RequestCount}");
```
