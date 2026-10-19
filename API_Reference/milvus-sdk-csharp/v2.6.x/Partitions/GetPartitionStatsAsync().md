# GetPartitionStatsAsync()

Gets the statistics of a partition.

```csharp
public async Task<GetPartitionStatsResp> GetPartitionStatsAsync(GetPartitionStatsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetPartitionStatsReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
};

GetPartitionStatsResp response = await client.GetPartitionStatsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection that contains the partition.

- `PartitionName` (*string*) -

    The name of the partition to get statistics for.

**RETURN TYPE:**

*Task\<GetPartitionStatsResp\>*

**RETURNS:**

A **GetPartitionStatsResp** object that contains the partition statistics.

```csharp
GetPartitionStatsResp
    Name       // -> string
    RowCount   // -> long
    Stats      // -> IReadOnlyDictionary<string, string>
```

**PARAMETERS:**

- **Name** (*string*) -

    The name of the partition these statistics belong to (SDK-derived from the request).

- **RowCount** (*long*) -

    The number of rows in the partition.

- **Stats** (*IReadOnlyDictionary\<string, string\>*) -

    The complete partition statistics as reported by the server.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Partition;
using Milvus.Client.V2.Responses.Partition;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetPartitionStatsResp response = await client.GetPartitionStatsAsync(new GetPartitionStatsReq
{
    CollectionName = "my_collection",
    PartitionName = "recent"
});
```
