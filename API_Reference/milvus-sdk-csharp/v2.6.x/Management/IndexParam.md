# IndexParam

Describes an index to create as part of `CreateCollectionAsync`; the index is created immediately after the collection is created, and the collection is then loaded automatically.

```csharp
public sealed class IndexParam
{
    public IndexParam(string fieldName, string? indexName = null, IndexType? indexType = null, MetricType? metricType = null) { ... }
    public string FieldName { get; }
    public string? IndexName { get; }
    public IndexType? IndexType { get; }
    public MetricType? MetricType { get; }
    public IDictionary<string, object> ExtraParams { get; }
}
```

**PARAMETERS:**

- `FieldName` (*string*) -

    The field name to create the index on.

- `IndexName` (*string?*) -

    The index name. Defaults to `"_default_idx"`.

- `IndexType` (*IndexType?*) -

    The index type. When unset, the index type is omitted from the request and the server picks its default. See [IndexType](IndexType.md).

- `MetricType` (*MetricType?*) -

    The metric type. For vector fields, must match the metric used for search. See [MetricType](../Vector/MetricType.md).

- `ExtraParams` (*IDictionary\<string, object\>*) -

    Additional index parameters, serialized to their string form on the wire. The `dim` entry must be an integral value. Entries are added via the collection-initializer syntax `ExtraParams = { ... }`.

**METHODS:**

- `IndexParam(string fieldName, string? indexName = null, IndexType? indexType = null, MetricType? metricType = null)` (*constructor*) -

    Creates an index descriptor.

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

var indexParam = new IndexParam("embedding", indexType: IndexType.AutoIndex, metricType: MetricType.Cosine)
{
    ExtraParams = { ["dim"] = 128 }
};

var schema = new CollectionSchema { Name = "my_collection" };
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.Fields.Add(FieldSchema.CreateFloatVector("embedding", dimension: 128));

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema,
    Indexes = [indexParam]
});
```
