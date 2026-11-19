# CompactionMergeInfo

The merge plan of a compaction task, as returned by `GetCompactionPlansAsync()` and `ListCompactionTasksAsync()`.

```csharp
public sealed class CompactionMergeInfo
{
    public IReadOnlyList<long> Sources { get; }
    public long Target { get; }
    public IReadOnlyList<long> Targets { get; }
    public long PlanId { get; }
    public long TriggerId { get; }
    public long CollectionId { get; }
    public long PartitionId { get; }
    public string Channel { get; }
    public CompactionType CompactionType { get; }
    public CompactionTaskState State { get; }
    public string FailureReason { get; }
}
```

**PARAMETERS:**

- `Sources` (*IReadOnlyList\<long\>*) -

    The segment IDs that are merged as part of this plan.

- `Target` (*long*) -

    The target segment ID produced by this merge.

- `Targets` (*IReadOnlyList\<long\>*) -

    The complete set of target segments produced by this compaction, which may be larger than the single legacy `Target`.

- `PlanId` (*long*) -

    The server-side compaction task identifier.

- `TriggerId` (*long*) -

    The ID of the compaction that triggered this plan.

- `CollectionId` (*long*) -

    The ID of the collection being compacted.

- `PartitionId` (*long*) -

    The ID of the partition being compacted.

- `Channel` (*string*) -

    The channel on which the compaction was scheduled.

- `CompactionType` (*CompactionType*) -

    The type of the compaction task. See [CompactionType](CompactionType.md).

- `State` (*CompactionTaskState*) -

    The state of the compaction task. See [CompactionTaskState](CompactionTaskState.md).

- `FailureReason` (*string*) -

    The failure reason of the compaction task, empty when it did not fail.

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

GetCompactionPlansResp result = await client.GetCompactionPlansAsync(new GetCompactionPlansReq
{
    CompactionId = 450357031542
});

foreach (CompactionMergeInfo plan in result.MergeInfos)
{
    Console.WriteLine($"Merging {plan.Sources.Count} segments into {plan.Target}");
}
```
