# QueryParameters

A set of optional parameters for performing a query.

```csharp
public sealed class QueryParameters
{
    public int? Limit { get; set; }
    public int? Offset { get; set; }
    public ConsistencyLevel? ConsistencyLevel { get; set; }
    public ulong? GuaranteeTimestamp { get; set; }
    public ulong? TimeTravelTimestamp { get; set; }
    public IList<string> PartitionNames { get; }
    public IList<string> OutputFields { get; }
    public bool? IgnoreGrowing { get; set; }
    public string? Timezone { get; set; }
    public IDictionary<string, object> FilterTemplates { get; }
    public IReadOnlyList<object>? Ids { get; set; }
    public IDictionary<string, string> ExtraParameters { get; }
}
```

**PARAMETERS:**

- `Limit` (*int?*) -

    The maximum number of rows to return. The sum of this value and `Offset` must be between 1 and 16384.

- `Offset` (*int?*) -

    The number of rows to skip. The sum of this value and `Limit` must be between 1 and 16384.

- `ConsistencyLevel` (*ConsistencyLevel?*) -

    The consistency level to be used in the query. Defaults to the consistency level configured for the collection. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `GuaranteeTimestamp` (*ulong?*) -

    If set, guarantees that the query is performed after any updates up to the provided timestamp.

- `TimeTravelTimestamp` (*ulong?*) -

    Specifies an optional time travel timestamp; the query gets results based on the data at that point in time.

- `PartitionNames` (*IList\<string\>*) -

    An optional list of partitions to be queried in the collection. Entries are added via the collection-initializer syntax `PartitionNames = { ... }`.

- `OutputFields` (*IList\<string\>*) -

    The names of the fields to be returned from the query. Entries are added via the collection-initializer syntax `OutputFields = { ... }`.

- `IgnoreGrowing` (*bool?*) -

    Whether to ignore the growing segments during the query.

- `Timezone` (*string?*) -

    The timezone used for the query, e.g. `"+08:00"` or `"America/New_York"`.

- `FilterTemplates` (*IDictionary\<string, object\>*) -

    Named expression-template values used by the query's filter expression, for parameterized filters; placeholders are written with curly braces inside the expression. Entries are added via the collection-initializer syntax `FilterTemplates = { ... }`.

- `Ids` (*IReadOnlyList\<object\>?*) -

    The primary key values identifying the rows to return. Mutually exclusive with the query's expression; when set, an expression is generated from the collection's primary key field.

- `ExtraParameters` (*IDictionary\<string, string\>*) -

    Additional query parameters passed through to the server verbatim, mirroring the Java SDK's `QueryReq.queryParams` map. Entries are added via the collection-initializer syntax `ExtraParameters = { ... }`.
