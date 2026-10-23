# BatchDescribeCollectionsAsync()

Describes multiple collections at once, by name and/or collection ID.

```csharp
public async Task<IReadOnlyList<DescribeCollectionResp>> BatchDescribeCollectionsAsync(BatchDescribeCollectionsReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new BatchDescribeCollectionsReq
{
    CollectionNames = ["my_collection", "user"]
};

IReadOnlyList<DescribeCollectionResp> results = await client.BatchDescribeCollectionsAsync(request);
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionNames` (*IReadOnlyList\<string\>*) -

    The names of the collections to describe.

- `CollectionIds` (*IReadOnlyList\<long\>*) -

    The IDs of the collections to describe.

**RETURN TYPE:**

*Task\<IReadOnlyList\<DescribeCollectionResp\>\>*

**RETURNS:**

A read-only list of **DescribeCollectionResp** objects, one per described collection.

```csharp
DescribeCollectionResp
    CollectionId        // -> long
    CollectionName      // -> string
    Schema              // -> CollectionSchema
    ShardsNum           // -> int
    ConsistencyLevel    // -> ConsistencyLevel
    DatabaseName        // -> string
```

**PARAMETERS:**

- **CollectionId** (*long*) -

    The collection ID.

- **CollectionName** (*string*) -

    The collection name.

- **Schema** (*CollectionSchema*) -

    The collection schema. See [CollectionSchema](CollectionSchema.md).

- **ShardsNum** (*int*) -

    The number of shards.

- **ConsistencyLevel** (*ConsistencyLevel*) -

    The consistency level of the collection. See [ConsistencyLevel](ConsistencyLevel.md).

- **DatabaseName** (*string*) -

    The database the collection belongs to, as reported by the server.

For the complete member list and descriptions of each entry, see [DescribeCollectionAsync](DescribeCollectionAsync.md).

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

IReadOnlyList<DescribeCollectionResp> results = await client.BatchDescribeCollectionsAsync(
    new BatchDescribeCollectionsReq
    {
        CollectionNames = ["my_collection", "user"]
    });
```
