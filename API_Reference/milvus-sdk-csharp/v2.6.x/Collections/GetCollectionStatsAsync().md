# GetCollectionStatsAsync()

Gets the statistics of a collection.

```csharp
public async Task<GetCollectionStatsResp> GetCollectionStatsAsync(GetCollectionStatsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new GetCollectionStatsReq
{
    CollectionName = "my_collection"
};

GetCollectionStatsResp result = await client.GetCollectionStatsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection.

**RETURN TYPE:**

*Task\<GetCollectionStatsResp\>*

**RETURNS:**

A **GetCollectionStatsResp** object that contains the collection statistics.

```csharp
GetCollectionStatsResp
    Name       // -> string
    RowCount   // -> long
    Stats      // -> IReadOnlyDictionary<string, string>
```

**PARAMETERS:**

- **Name** (*string*) -

    The name of the collection these statistics belong to.

- **RowCount** (*long*) -

    The number of rows in the collection.

- **Stats** (*IReadOnlyDictionary\<string, string\>*) -

    The complete collection statistics as reported by the server.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Responses.Collection;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

GetCollectionStatsResp result = await client.GetCollectionStatsAsync(new GetCollectionStatsReq
{
    CollectionName = "my_collection"
});
```
