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
