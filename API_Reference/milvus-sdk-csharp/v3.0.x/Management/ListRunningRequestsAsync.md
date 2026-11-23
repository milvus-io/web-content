# ListRunningRequestsAsync()

Lists the Search, HybridSearch and Query requests running on every proxy of the cluster.

```csharp
public async Task<ListRunningRequestsResp> ListRunningRequestsAsync(
    ListRunningRequestsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListRunningRequestsReq
{
    DatabaseName = "default",
    CollectionName = "my_collection",
    User = "alice",
    MinElapsedMs = 5000
};

ListRunningRequestsResp result = await client.ListRunningRequestsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string*) -

    The database name to match exactly. When empty (default), requests of every database are listed.

- `CollectionName` (*string*) -

    The collection name to match exactly. When empty (default), requests of every collection are listed.

- `User` (*string*) -

    The user whose requests to list. When empty (default), every user's requests are listed. A caller without the `ListRunningRequests` privilege may only see their own requests: empty then means the caller, and any other name is denied.

- `MinElapsedMs` (*long*) -

    The minimum time, in milliseconds, a request has been running. A non-positive value (the default zero) means no constraint.

**RETURN TYPE:**

*Task\<ListRunningRequestsResp\>*

**RETURNS:**

A **ListRunningRequestsResp** object that contains the running requests reported by the proxies that answered.

```csharp
ListRunningRequestsResp
    Requests     // -> IReadOnlyList<RunningRequestInfo>
    NodeResults  // -> IReadOnlyList<RunningRequestNodeResult>
```

**PARAMETERS:**

- **Requests** (*IReadOnlyList\<RunningRequestInfo\>*) -

    The running requests reported by the proxies that answered. A proxy that did not answer contributes nothing here; it is reported in `NodeResults` instead. See [RunningRequestInfo](RunningRequestInfo.md).

- **NodeResults** (*IReadOnlyList\<RunningRequestNodeResult\>*) -

    The outcome on each proxy: one entry per proxy the call was sent to. A proxy that did not answer has a non-zero `RunningRequestNodeResult.ErrorCode` and its requests are missing from `Requests`. See [RunningRequestNodeResult](RunningRequestNodeResult.md).

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

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

ListRunningRequestsResp result = await client.ListRunningRequestsAsync(new ListRunningRequestsReq
{
    MinElapsedMs = 5000
});

foreach (RunningRequestInfo request in result.Requests)
{
    Console.WriteLine($"{request.RequestId}: {request.Type} on {request.CollectionName}, " +
        $"{request.ElapsedMs} ms");
}
```
