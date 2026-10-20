# CreateSimpleCollectionAsync()

Creates a simple collection with a primary-key field and a float vector field. An `AutoIndex` index is created on the vector field and the collection is loaded automatically.

```csharp
public Task CreateCollectionAsync(CreateSimpleCollectionReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new CreateSimpleCollectionReq
{
    CollectionName = "my_collection",
    PrimaryFieldName = "id",
    PrimaryFieldType = DataType.Int64,
    VectorFieldName = "embedding",
    Dimension = 4,
    ConsistencyLevel = ConsistencyLevel.BoundedStaleness,
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

    The consistency level of the collection. Defaults to `ConsistencyLevel.BoundedStaleness`. See [ConsistencyLevel](ConsistencyLevel.md).

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

await client.CreateCollectionAsync(new CreateSimpleCollectionReq
{
    CollectionName = "my_collection",
    PrimaryFieldName = "id",
    PrimaryFieldType = DataType.Int64,
    VectorFieldName = "embedding",
    Dimension = 4,
    MetricType = MetricType.L2
});
```
