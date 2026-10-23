# CompactAsync()

Compacts a collection (merging segments), returning the compaction id.

```csharp
public async Task<CompactResp> CompactAsync(CompactReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CompactReq
{
    CollectionName = "my_collection",
    IsMajorCompaction = true
};

CompactResp result = await client.CompactAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to compact.

- `IsMajorCompaction` (*bool*) -

    Whether to perform a major compaction, merging all segments regardless of their size.

- `IsL0Compaction` (*bool*) -

    When true, compacts only the L0 delta segments (unindexed, unsorted recent writes) into sealed segments.

- `TargetSize` (*long?*) -

    The target segment size for the compaction. When set, the server aims to produce segments of at most this size. The value is interpreted in `TargetSizeUnit` units (default `"mb"`) and converted to MB before being sent to the server.

- `TargetSizeUnit` (*string?*) -

    The unit of `TargetSize`: `"b"`, `"kb"`, `"mb"` (default), `"gb"`, `"tb"` or `"pb"`.

**RETURN TYPE:**

*Task\<CompactResp\>*

**RETURNS:**

A **CompactResp** object that contains the compaction id and plan count.

```csharp
CompactResp
    CompactionId        // -> long
    CompactionPlanCount // -> int
```

**PARAMETERS:**

- **CompactionId** (*long*) -

    The id of the compaction, used to poll its state and plans.

- **CompactionPlanCount** (*int*) -

    The number of compaction plans created for this compaction.

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

CompactResp result = await client.CompactAsync(new CompactReq
{
    CollectionName = "my_collection",
    IsMajorCompaction = true
});

Console.WriteLine($"Compaction id: {result.CompactionId}");
```
