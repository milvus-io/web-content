# MetricsInfo

Aggregated count/latency metrics of a set of operations, as reported by `GetClientTelemetryAsync`. Mirrors the proto `common.Metrics`.

```csharp
public sealed class MetricsInfo
{
    public long RequestCount { get; }
    public long SuccessCount { get; }
    public long ErrorCount { get; }
    public double AvgLatencyMs { get; }
    public double P99LatencyMs { get; }
    public double MaxLatencyMs { get; }
}
```

**PARAMETERS:**

- `RequestCount` (*long*) -

    The number of requests observed.

- `SuccessCount` (*long*) -

    The number of successful requests.

- `ErrorCount` (*long*) -

    The number of failed requests.

- `AvgLatencyMs` (*double*) -

    The average request latency in milliseconds.

- `P99LatencyMs` (*double*) -

    The p99 request latency in milliseconds.

- `MaxLatencyMs` (*double*) -

    The maximum request latency in milliseconds.

## OperationMetricsInfo

The metrics of a single operation type, both globally and per collection. Mirrors the proto `common.OperationMetrics`.

```csharp
public sealed class OperationMetricsInfo
{
    public string Operation { get; }
    public MetricsInfo Global { get; }
    public IReadOnlyDictionary<string, MetricsInfo> CollectionMetrics { get; }
}
```

**PARAMETERS:**

- `Operation` (*string*) -

    The operation name, e.g. `"Search"` or `"Insert"`.

- `Global` (*MetricsInfo*) -

    The operation's metrics aggregated across all collections.

- `CollectionMetrics` (*IReadOnlyDictionary\<string, MetricsInfo\>*) -

    The operation's metrics per collection, keyed by collection name.

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

Console.WriteLine($"Aggregated requests: {result.Aggregated.RequestCount}, " +
    $"p99 {result.Aggregated.P99LatencyMs} ms");
```
