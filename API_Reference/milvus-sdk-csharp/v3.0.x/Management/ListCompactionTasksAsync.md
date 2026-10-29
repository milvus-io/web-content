# ListCompactionTasksAsync()

Lists the compaction tasks of a collection.

```csharp
public async Task<GetCompactionPlansResp> ListCompactionTasksAsync(ListCompactionTasksReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListCompactionTasksReq
{
    CollectionName = "my_collection"
};

GetCompactionPlansResp result = await client.ListCompactionTasksAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to list the compaction tasks of.

**RETURN TYPE:**

*Task\<GetCompactionPlansResp\>*

**RETURNS:**

A **GetCompactionPlansResp** object that contains the per-task metadata of the collection's compaction tasks. For the complete response shape, see [GetCompactionPlansAsync](GetCompactionPlansAsync.md).

```csharp
GetCompactionPlansResp
    CompactionId    // -> long?
    CollectionName  // -> string?
    State           // -> CompactionState
    MergeInfos      // -> IReadOnlyList<CompactionMergeInfo>
```

**PARAMETERS:**

- **CompactionId** (*long?*) -

    The ID of the compaction whose plans are reported, or `null` when the tasks were selected by collection name.

- **CollectionName** (*string?*) -

    The name of the collection the reported compaction tasks belong to, or `null` when the plans were selected by compaction ID.

- **State** (*CompactionState*) -

    The aggregate state of the compaction. See [CompactionState](CompactionState.md).

- **MergeInfos** (*IReadOnlyList\<CompactionMergeInfo\>*) -

    The merge plans for the compaction: each entry maps the source segments onto a target segment. Each **CompactionMergeInfo** exposes the full per-task metadata:

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

GetCompactionPlansResp result = await client.ListCompactionTasksAsync(new ListCompactionTasksReq
{
    CollectionName = "my_collection"
});
```
