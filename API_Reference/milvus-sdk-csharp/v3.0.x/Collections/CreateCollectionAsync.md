# CreateCollectionAsync()

Creates a collection with the given schema.

```csharp
public async Task CreateCollectionAsync(CreateCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var schema = new CollectionSchema { Name = "my_collection" };
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.Fields.Add(FieldSchema.CreateVarchar("title", maxLength: 256));
schema.Fields.Add(FieldSchema.CreateFloatVector("embedding", dimension: 128));

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema,
    ConsistencyLevel = ConsistencyLevel.BoundedStaleness,
    ShardsNum = 1
});
```

**REQUEST PARAMETERS:**

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `CollectionName` (*string*) -

    The name of the collection to create.

- `Schema` (*CollectionSchema?*) -

    The schema definition for the collection. See [CollectionSchema](CollectionSchema.md).

- `ConsistencyLevel` (*ConsistencyLevel*) -

    The consistency level to be used by the collection. Defaults to `ConsistencyLevel.BoundedStaleness`. See [ConsistencyLevel](ConsistencyLevel.md).

- `ShardsNum` (*int*) -

    The number of shards for the collection to create. Defaults to 1; 0 means the server default.

- `Properties` (*IDictionary\<string, string\>*) -

    Collection-level properties (e.g. TTL, consistency override, timezone, warmup), applied at creation time.

- `NumPartitions` (*long?*) -

    The number of default physical partitions, only used in partition-key mode. Must be at least 1 when set.

- `Indexes` (*IReadOnlyList\<IndexParam\>*) -

    Optional indexes to create immediately after the collection is created. When set, the collection is also loaded automatically after the indexes are built. See [IndexParam](../Management/IndexParam.md).

**RETURN TYPE:**

*Task*

**RETURNS:**

This method does not return a value.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

var schema = new CollectionSchema { Name = "my_collection" };
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.Fields.Add(FieldSchema.CreateVarchar("title", maxLength: 256));
schema.Fields.Add(FieldSchema.CreateFloatVector("embedding", dimension: 128));

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema
});
```
