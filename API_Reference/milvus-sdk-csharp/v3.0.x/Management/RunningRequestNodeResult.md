# RunningRequestNodeResult

The outcome of a `ListRunningRequestsAsync` or `CancelRequestsAsync` call on one proxy.

Both calls are sent to every proxy. A proxy that did not answer contributed nothing to the result; its requests are missing from it.

```csharp
public sealed class RunningRequestNodeResult
{
    public long NodeId { get; }
    public int ErrorCode { get; }
    public string Reason { get; }
    public bool Unimplemented { get; }
    public bool IsSuccess { get; }
}
```

**PARAMETERS:**

- `NodeId` (*long*) -

    The node id of the proxy.

- `ErrorCode` (*int*) -

    The error code of the proxy's answer; 0 means the proxy answered.

- `Reason` (*string*) -

    The error message when the proxy did not answer.

- `Unimplemented` (*bool*) -

    Whether the proxy is too old to serve the call, as during a rolling upgrade. Such a proxy holds no listable requests.

- `IsSuccess` (*bool*) -

    Whether the proxy answered the call.

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

foreach (RunningRequestNodeResult node in result.NodeResults)
{
    Console.WriteLine(node.IsSuccess
        ? $"Proxy {node.NodeId} answered"
        : $"Proxy {node.NodeId} did not answer: {node.Reason}");
}
```
