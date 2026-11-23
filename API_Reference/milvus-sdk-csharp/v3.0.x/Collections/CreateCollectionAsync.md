# CreateCollectionAsync()

Creates a collection.

The method has two overloads: a general one that creates a collection from a `CreateCollectionReq` with an explicit schema, and a convenience one that creates a simple collection with a primary-key field and a float vector field from a `CreateSimpleCollectionReq` (an `AutoIndex` index is created on the vector field and the collection is loaded automatically).

```csharp
public async Task CreateCollectionAsync(CreateCollectionReq request, CancellationToken cancellationToken = default)
public Task CreateCollectionAsync(CreateSimpleCollectionReq request, CancellationToken cancellationToken = default)
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
    ConsistencyLevel = ConsistencyLevel.Bounded,
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

    The consistency level to be used by the collection. Defaults to `ConsistencyLevel.Bounded`. See [ConsistencyLevel](ConsistencyLevel.md).

- `ShardsNum` (*int*) -

    The number of shards for the collection to create. Defaults to 1; 0 means the server default.

- `Properties` (*IDictionary\<string, string\>*) -

    Collection-level properties (e.g. TTL, consistency override, timezone, warmup), applied at creation time.

- `NumPartitions` (*long?*) -

    The number of default physical partitions, only used in partition-key mode. Must be at least 1 when set.

- `Indexes` (*IReadOnlyList\<IndexParam\>*) -

    Optional indexes to create immediately after the collection is created. When set, the collection is also loaded automatically after the indexes are built. See [IndexParam](../Management/IndexParam.md).

## CreateSimpleCollectionReq

The request for the simple-collection overload. Creates a simple collection with a primary-key field and a float vector field. An `AutoIndex` index is created on the vector field and the collection is loaded automatically.

```csharp
public Task CreateCollectionAsync(CreateSimpleCollectionReq request, CancellationToken cancellationToken = default)
```

```csharp
var request = new CreateSimpleCollectionReq
{
    CollectionName = "my_collection",
    PrimaryFieldName = "id",
    PrimaryFieldType = DataType.Int64,
    VectorFieldName = "embedding",
    Dimension = 4,
    ConsistencyLevel = ConsistencyLevel.Bounded,
    MetricType = MetricType.Cosine
};

await client.CreateCollectionAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the collection to create.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `PrimaryFieldName` (*string*) -

    The name of the primary-key field. Defaults to `"id"`.

- `PrimaryFieldType` (*DataType*) -

    The data type of the primary-key field: `DataType.Int64` (default) or `DataType.VarChar`. See [DataType](DataType.md).

- `MaxLength` (*int*) -

    The maximum length of the primary-key field when `PrimaryFieldType` is `DataType.VarChar`. Defaults to 65535.

- `VectorFieldName` (*string*) -

    The name of the vector field. Defaults to `"vector"`.

- `Dimension` (*int*) -

    The dimensionality of the vector field. Must be specified (non-zero).

- `ConsistencyLevel` (*ConsistencyLevel*) -

    The consistency level of the collection. Defaults to `ConsistencyLevel.Bounded`. See [ConsistencyLevel](ConsistencyLevel.md).

- `MetricType` (*MetricType*) -

    The metric type used for the vector index and search. Defaults to `MetricType.Cosine`. See [MetricType](../Vector/MetricType.md).

- `AutoID` (*bool*) -

    Whether primary-key values are automatically generated. Defaults to `false`.

- `EnableDynamicFields` (*bool*) -

    Whether to enable dynamic fields. Defaults to `true`.

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
