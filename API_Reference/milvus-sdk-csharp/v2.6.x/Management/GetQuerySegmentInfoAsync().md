# GetQuerySegmentInfoAsync()

Gets the loaded query-segment info of a collection.

```csharp
public async Task<GetQuerySegmentInfoResp> GetQuerySegmentInfoAsync(
    GetQuerySegmentInfoReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetQuerySegmentInfoReq
{
    CollectionName = "my_collection"
};

GetQuerySegmentInfoResp result = await client.GetQuerySegmentInfoAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection whose query segment info to retrieve.

**RETURN TYPE:**

*Task\<GetQuerySegmentInfoResp\>*

**RETURNS:**

A **GetQuerySegmentInfoResp** object that contains the loaded query-segment info of the collection.

```csharp
GetQuerySegmentInfoResp
    Infos  // -> IReadOnlyList<QuerySegmentInfo>
```

**PARAMETERS:**

- **Infos** (*IReadOnlyList\<QuerySegmentInfo\>*) -

    The loaded query segments of the collection. Each **QuerySegmentInfo** has the following members:

    - **CollectionName** (*string*) -

        The name of the collection that owns the segment (from the request; the server reports only the id).

    - **SegmentId** (*long*) -

        The segment id.

    - **CollectionId** (*long*) -

        The id of the collection that owns the segment.

    - **PartitionId** (*long*) -

        The id of the partition that owns the segment.

    - **MemSize** (*long*) -

        The memory size of the segment in bytes.

    - **NumRows** (*long*) -

        The number of rows stored in the segment.

    - **IndexName** (*string*) -

        The name of the index built on the segment.

    - **IndexId** (*long*) -

        The id of the index built on the segment.

    - **State** (*SegmentState*) -

        The state of the segment. See [SegmentState](SegmentState.md).

    - **NodeIds** (*IReadOnlyList\<long\>*) -

        The query nodes serving the segment.

    - **Level** (*SegmentLevel*) -

        The level of the segment (sealed, growing, etc.).

    - **IsSorted** (*bool*) -

        Whether the segment is sorted.

    - **StorageVersion** (*long*) -

        The storage format version of the segment.

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

GetQuerySegmentInfoResp result = await client.GetQuerySegmentInfoAsync(new GetQuerySegmentInfoReq
{
    CollectionName = "my_collection"
});

foreach (QuerySegmentInfo info in result.Infos)
{
    Console.WriteLine($"Segment {info.SegmentId}: {info.MemSize} bytes, served by {info.NodeIds.Count} nodes");
}
```
