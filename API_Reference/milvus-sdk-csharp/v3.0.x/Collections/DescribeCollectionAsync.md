# DescribeCollectionAsync()

Describes a collection, returning its schema.

```csharp
public async Task<DescribeCollectionResp> DescribeCollectionAsync(DescribeCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new DescribeCollectionReq
{
    CollectionName = "my_collection"
};

DescribeCollectionResp result = await client.DescribeCollectionAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the collection to describe.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

**RETURN TYPE:**

*Task\<DescribeCollectionResp\>*

**RETURNS:**

A **DescribeCollectionResp** object that contains the collection information and its schema.

```csharp
DescribeCollectionResp
    CollectionId        // -> long
    CollectionName      // -> string
    Schema              // -> CollectionSchema
    ShardsNum           // -> int
    ConsistencyLevel    // -> ConsistencyLevel
    CreatedTimestamp    // -> ulong
    UpdateTimestamp     // -> ulong
    DatabaseName        // -> string
    NumPartitions       // -> long?
    CreatedUtcTimestamp // -> ulong
    SchemaVersion      // -> int?
    Aliases            // -> IReadOnlyList<string>
    Properties         // -> IReadOnlyDictionary<string, string>
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

- **CreatedTimestamp** (*ulong*) -

    The hybrid timestamp at which the collection was created.

- **UpdateTimestamp** (*ulong*) -

    The hybrid timestamp at which the collection's schema was last updated (e.g. by a field or property change).

- **DatabaseName** (*string*) -

    The database the collection belongs to, as reported by the server.

- **NumPartitions** (*long?*) -

    The number of default physical partitions, populated for a partition-key collection; `null` when not applicable.

- **CreatedUtcTimestamp** (*ulong*) -

    The UTC timestamp at which the collection was created, as reported by the server.

- **SchemaVersion** (*int?*) -

    The schema version of the collection, as reported by the server. `null` when the server does not report it.

- **Aliases** (*IReadOnlyList\<string\>*) -

    The aliases of the collection.

- **Properties** (*IReadOnlyDictionary\<string, string\>*) -

    The collection-level properties (e.g. TTL, consistency override, timezone), as set at creation time or via `AlterCollectionProperties`.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Responses.Collection;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

DescribeCollectionResp result = await client.DescribeCollectionAsync(new DescribeCollectionReq
{
    CollectionName = "my_collection"
});
```
