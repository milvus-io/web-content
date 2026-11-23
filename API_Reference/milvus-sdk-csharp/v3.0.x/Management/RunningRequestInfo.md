# RunningRequestInfo

One Search, HybridSearch or Query request that a proxy is executing.

```csharp
public sealed class RunningRequestInfo
{
    public string RequestId { get; }
    public long ProxyId { get; }
    public string Type { get; }
    public string DatabaseName { get; }
    public string CollectionName { get; }
    public string User { get; }
    public string ClientAddr { get; }
    public long Nq { get; }
    public long TopK { get; }
    public string Expr { get; }
    public long StartTimeMs { get; }
    public long QueuedMs { get; }
    public long ElapsedMs { get; }
    public string State { get; }
    public IReadOnlyList<long> TaskIds { get; }
    public string TraceId { get; }
    public bool Cancellable { get; }
}
```

**PARAMETERS:**

- `RequestId` (*string*) -

    The request id, an opaque string such as `"25-to03zu-rs"`; pass it to `CancelRequestsAsync` unchanged.

- `ProxyId` (*long*) -

    The node id of the proxy that holds the request.

- `Type` (*string*) -

    The request type: `Search`, `HybridSearch` or `Query`.

- `DatabaseName` (*string*) -

    The database name.

- `CollectionName` (*string*) -

    The collection name.

- `User` (*string*) -

    The user who issued the request.

- `ClientAddr` (*string*) -

    The client address seen by the proxy.

- `Nq` (*long*) -

    The number of query vectors.

- `TopK` (*long*) -

    The top-k of the request.

- `Expr` (*string*) -

    The leading part (at most 256 bytes) of the filter expression.

- `StartTimeMs` (*long*) -

    The time the request started, in milliseconds since the Unix epoch.

- `QueuedMs` (*long*) -

    How long the request's first task waited in the proxy queue, in milliseconds; 0 until that task starts.

- `ElapsedMs` (*long*) -

    How long the request has been running, in milliseconds. In a `CancelRequestsAsync` answer it is how long the request had been running when it was canceled.

- `State` (*string*) -

    The request state: `Queued`, `Running` or `Canceling`. In a `CancelRequestsAsync` answer it is the state before the cancel, or `Canceling` when the call repeated an earlier cancel.

- `TaskIds` (*IReadOnlyList\<long\>*) -

    The ids of the proxy tasks the request has created.

- `TraceId` (*string*) -

    The trace id of the request.

- `Cancellable` (*bool*) -

    Whether the request can be canceled.

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

ListRunningRequestsResp result = await client.ListRunningRequestsAsync(new ListRunningRequestsReq());

foreach (RunningRequestInfo request in result.Requests)
{
    Console.WriteLine($"{request.RequestId}: {request.Type} on {request.CollectionName}, " +
        $"{request.ElapsedMs} ms, state {request.State}");
}
```
