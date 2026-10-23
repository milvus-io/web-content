# GetCompactionPlansAsync()

Gets the compaction plans for a compaction.

```csharp
public async Task<GetCompactionPlansResp> GetCompactionPlansAsync(
    GetCompactionPlansReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetCompactionPlansReq
{
    CompactionId = 450357031542
};

GetCompactionPlansResp result = await client.GetCompactionPlansAsync(request);
```

**REQUEST PARAMETERS:**

- `CompactionId` (*long*) -

    The id of the compaction whose plans to retrieve.


- `CompactionId` (*long?*) -

    The overall compaction ID.

- `CollectionName` (*string?*) -

    The collection the compaction belongs to.

- `Targets` (*IReadOnlyList\<long\>*) -

    The target segment IDs produced by the compaction.

Each **CompactionMergeInfo** additionally exposes the full per-task metadata:

- `PlanId` (*long*) -

    The compaction plan ID.

- `TriggerId` (*long*) -

    The trigger ID of the task.

- `CollectionId` / `PartitionId` (*long*) -

    The collection and partition the task compacts.

- `Channel` (*string*) -

    The channel the task compacts.

- `CompactionType` - The compaction type. See [CompactionType](CompactionType.md).

- `State` - The task state. See [CompactionTaskState](CompactionTaskState.md).

- `FailureReason` (*string*) -

    The failure reason when the task failed.

**RETURN TYPE:**

*Task\<GetCompactionPlansResp\>*

**RETURNS:**

A **GetCompactionPlansResp** object that contains the state of the compaction and its merge plans.

```csharp
GetCompactionPlansResp
    State       // -> CompactionState
    MergeInfos  // -> IReadOnlyList<CompactionMergeInfo>
```

**PARAMETERS:**

- **State** (*CompactionState*) -

    The state of the compaction. See [CompactionState](CompactionState.md).

- **MergeInfos** (*IReadOnlyList\<CompactionMergeInfo\>*) -

    The merge plans for the compaction: each entry maps the source segments onto a target segment. Each **CompactionMergeInfo** has the following members:

    - **Sources** (*IReadOnlyList\<long\>*) -

        The segment IDs that are merged as part of this plan.

    - **Target** (*long*) -

        The target segment ID produced by this merge.

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

GetCompactionPlansResp result = await client.GetCompactionPlansAsync(new GetCompactionPlansReq
{
    CompactionId = 450357031542
});

foreach (CompactionMergeInfo plan in result.MergeInfos)
{
    Console.WriteLine($"Merging {plan.Sources.Count} segments into {plan.Target}");
}
```
