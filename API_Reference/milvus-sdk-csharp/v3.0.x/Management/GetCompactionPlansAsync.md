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

    The ID of the compaction whose plans to retrieve.

**RETURN TYPE:**

*Task\<GetCompactionPlansResp\>*

**RETURNS:**

A **GetCompactionPlansResp** object that contains the state of the compaction and its merge plans.

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

    The merge plans for the compaction: each entry maps the source segments onto a target segment. Each entry is a [CompactionMergeInfo](CompactionMergeInfo.md).

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

GetCompactionPlansResp result = await client.GetCompactionPlansAsync(new GetCompactionPlansReq
{
    CompactionId = 450357031542
});

foreach (CompactionMergeInfo plan in result.MergeInfos)
{
    Console.WriteLine($"Merging {plan.Sources.Count} segments into {plan.Target}");
}
```
