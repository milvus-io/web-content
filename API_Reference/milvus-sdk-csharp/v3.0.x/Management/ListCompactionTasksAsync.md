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

    The merge plans for the compaction: each entry maps the source segments onto a target segment. Each entry is a [CompactionMergeInfo](CompactionMergeInfo.md) carrying the full per-task metadata.

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

GetCompactionPlansResp result = await client.ListCompactionTasksAsync(new ListCompactionTasksReq
{
    CollectionName = "my_collection"
});
```
