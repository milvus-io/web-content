# GetCompactionStateAsync()

Gets the state of a compaction.

```csharp
public async Task<GetCompactionStateResp> GetCompactionStateAsync(
    GetCompactionStateReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetCompactionStateReq
{
    CompactionId = 450357031542
};

GetCompactionStateResp result = await client.GetCompactionStateAsync(request);
```

**REQUEST PARAMETERS:**

- `CompactionId` (*long*) -

    The id of the compaction whose state to retrieve.

**RETURN TYPE:**

*Task\<GetCompactionStateResp\>*

**RETURNS:**

A **GetCompactionStateResp** object that contains the state of the compaction together with the per-plan execution counts.

```csharp
GetCompactionStateResp
    State            // -> CompactionState
    ExecutingPlanNo  // -> long
    TimeoutPlanNo    // -> long
    CompletedPlanNo  // -> long
    FailedPlanNo     // -> long
```

**PARAMETERS:**

- **State** (*CompactionState*) -

    The overall state of the compaction. See [CompactionState](CompactionState.md).

- **ExecutingPlanNo** (*long*) -

    The number of merge plans currently executing.

- **TimeoutPlanNo** (*long*) -

    The number of merge plans that timed out.

- **CompletedPlanNo** (*long*) -

    The number of merge plans that completed.

- **FailedPlanNo** (*long*) -

    The number of merge plans that failed.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Utility;
using Milvus.Client.V2.Responses.Utility;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetCompactionStateResp result = await client.GetCompactionStateAsync(new GetCompactionStateReq
{
    CompactionId = 450357031542
});

Console.WriteLine($"Compaction state: {result.State}");
```
