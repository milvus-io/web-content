# ListCollectionsAsync()

Lists all collections in the database.

```csharp
public async Task<ListCollectionsResp> ListCollectionsAsync(ListCollectionsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new ListCollectionsReq
{
    OnlyShowLoaded = true
};

ListCollectionsResp result = await client.ListCollectionsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `OnlyShowLoaded` (*bool*) -

    When `true`, only loaded collections are returned. When `false` (default), all collections are returned.

**RETURN TYPE:**

*Task\<ListCollectionsResp\>*

**RETURNS:**

A **ListCollectionsResp** object that contains the list of collections and their metadata.

```csharp
ListCollectionsResp
    CollectionNames      // -> IReadOnlyList<string>
    CollectionIds        // -> IReadOnlyList<long>
    CreatedTimestamps    // -> IReadOnlyList<ulong>
    CreatedUtcTimestamps // -> IReadOnlyList<ulong>
    InMemoryPercentages  // -> IReadOnlyList<long>
    ShardsNums           // -> IReadOnlyList<int>
```

**PARAMETERS:**

- **CollectionNames** (*IReadOnlyList\<string\>*) -

    The names of the collections.

- **CollectionIds** (*IReadOnlyList\<long\>*) -

    The IDs of the collections.

- **CreatedTimestamps** (*IReadOnlyList\<ulong\>*) -

    The hybrid timestamps at which the collections were created, aligned with `CollectionNames`.

- **CreatedUtcTimestamps** (*IReadOnlyList\<ulong\>*) -

    The UTC timestamps at which the collections were created, aligned with `CollectionNames`.

- **InMemoryPercentages** (*IReadOnlyList\<long\>*) -

    The percentage of each collection loaded into memory, aligned with `CollectionNames`.

- **ShardsNums** (*IReadOnlyList\<int\>*) -

    The number of shards of each collection, aligned with `CollectionNames`. A value of zero means the collection predates stored shard counts; the server derives the value from its virtual channels.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

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

ListCollectionsResp result = await client.ListCollectionsAsync(new ListCollectionsReq
{
    OnlyShowLoaded = true
});
```
