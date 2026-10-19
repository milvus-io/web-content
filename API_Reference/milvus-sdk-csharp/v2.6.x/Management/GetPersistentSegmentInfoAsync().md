# GetPersistentSegmentInfoAsync()

Gets the persistent segment info of a collection.

```csharp
public async Task<GetPersistentSegmentInfoResp> GetPersistentSegmentInfoAsync(
    GetPersistentSegmentInfoReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetPersistentSegmentInfoReq
{
    CollectionName = "my_collection"
};

GetPersistentSegmentInfoResp result = await client.GetPersistentSegmentInfoAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection whose persistent segment info to retrieve.

**RETURN TYPE:**

*Task\<GetPersistentSegmentInfoResp\>*

**RETURNS:**

A **GetPersistentSegmentInfoResp** object that contains the persistent segment info of the collection.

```csharp
GetPersistentSegmentInfoResp
    Infos  // -> IReadOnlyList<PersistentSegmentInfo>
```

**PARAMETERS:**

- **Infos** (*IReadOnlyList\<PersistentSegmentInfo\>*) -

    The persistent segments of the collection. Each **PersistentSegmentInfo** has the following members:

    - **CollectionName** (*string*) -

        The name of the collection that owns the segment (from the request; the server reports only the id).

    - **SegmentId** (*long*) -

        The segment id.

    - **CollectionId** (*long*) -

        The id of the collection that owns the segment.

    - **PartitionId** (*long*) -

        The id of the partition that owns the segment.

    - **NumRows** (*long*) -

        The number of rows stored in the segment.

    - **State** (*SegmentState*) -

        The state of the segment. See [SegmentState](SegmentState.md).

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

GetPersistentSegmentInfoResp result = await client.GetPersistentSegmentInfoAsync(new GetPersistentSegmentInfoReq
{
    CollectionName = "my_collection"
});

foreach (PersistentSegmentInfo info in result.Infos)
{
    Console.WriteLine($"Segment {info.SegmentId}: {info.NumRows} rows, state {info.State}");
}
```
