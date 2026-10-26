# ListCompactionTasks

Lists the compaction tasks of a collection.

```csharp
public async Task<GetCompactionPlansResp> ListCompactionTasksAsync(ListCompactionTasksReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListCompactionTasksReq
{

};

var resp = await client.ListCompactionTasksAsync(new ListCompactionTasksReq
{

});
```

**REQUEST PARAMETERS:**



**RETURN TYPE:**

*GetCompactionPlansResp*

**RETURNS:**

A **GetCompactionPlansResp** object.

- `CompactionId` (*long?*) -

    The overall compaction ID.

- `State` - The compaction state. See [CompactionState](CompactionState.md).

- `MergeInfos` (*IReadOnlyList\<CompactionMergeInfo\>*) -

    The per-task metadata. See [GetCompactionPlansAsync](GetCompactionPlansAsync.md) for the full response shape.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Management;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
});

var resp = await client.ListCompactionTasksAsync(new ListCompactionTasksReq
{

});
```
