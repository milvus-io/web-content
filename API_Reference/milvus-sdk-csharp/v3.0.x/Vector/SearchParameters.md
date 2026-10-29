# SearchParameters

A set of optional parameters for performing a search.

```csharp
public sealed class SearchParameters
{
    public int? Offset { get; set; }
    public ConsistencyLevel? ConsistencyLevel { get; set; }
    public ulong? GuaranteeTimestamp { get; set; }
    public ulong? TimeTravelTimestamp { get; set; }
    public string? Expression { get; set; }
    public long? RoundDecimal { get; set; }
    public IDictionary<string, string> ExtraParameters { get; }
    public bool? IgnoreGrowing { get; set; }
    public string? GroupByField { get; set; }
    public int? GroupSize { get; set; }
    public bool? StrictGroupSize { get; set; }
    public IList<string> OutputFields { get; }
    public IList<string> PartitionNames { get; }
    public string? Timezone { get; set; }
    public string? Radius { get; set; }
    public string? RangeFilter { get; set; }
    public string? Rerank { get; set; }
    public IReranker? FunctionScoreReranker { get; set; }
    public IDictionary<string, object> FilterTemplates { get; }
    public IDictionary<string, string> Highlighter { get; }
    public HighlightType? HighlightType { get; set; }
}
```

**PARAMETERS:**

- `Ef` (*int?*) -

    The `ef` search parameter for HNSW-style indexes.

- `Nprobe` (*int?*) -

    The `nprobe` search parameter for IVF-style indexes.

- `DropRatioSearch` (*double?*) -

    The `drop_ratio_search` parameter for sparse or vector indexes. Valid range: [0, 1).

- `AnalyzerName` (*string?*) -

    The analyzer name for full-text search.

- `Hints` (*string?*) -

    Search hints passed to the server.

- `JsonPath` (*string?*) -

    The JSON path to search within a JSON field.

- `JsonType` (*string?*) -

    The JSON type hint for the searched path.

- `PageRetainOrder` (*bool?*) -

    Whether to retain the original order when paging results.

- `Offset` (*int?*) -

    The number of entities to skip during the search. The sum of this value and the search limit must be between 1 and 16384.

- `ConsistencyLevel` (*ConsistencyLevel?*) -

    The consistency level to be used in the search. Defaults to the consistency level configured for the collection. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `GuaranteeTimestamp` (*ulong?*) -

    If set, guarantees that the search is performed after any updates up to the provided timestamp.

- `TimeTravelTimestamp` (*ulong?*) -

    Specifies an optional time travel timestamp; the search gets results based on the data at that point in time.

- `Expression` (*string?*) -

    A boolean expression to filter the search results.

- `RoundDecimal` (*long?*) -

    The number of decimal places to round the scores to. Must be between 0 and 6.

- `ExtraParameters` (*IDictionary\<string, string\>*) -

    Additional search parameters passed through to the server. Entries are added via the collection-initializer syntax `ExtraParameters = { ... }`.

- `IgnoreGrowing` (*bool?*) -

    Whether to ignore the growing segments during the search.

- `GroupByField` (*string?*) -

    The field to group the search results by.

- `GroupSize` (*int?*) -

    The maximum number of results per group when grouping is used.

- `StrictGroupSize` (*bool?*) -

    Whether the group size is strict.

- `OutputFields` (*IList\<string\>*) -

    The names of the fields to be returned from the search. Entries are added via the collection-initializer syntax `OutputFields = { "title" }`.

- `PartitionNames` (*IList\<string\>*) -

    An optional list of partitions to be searched in the collection. Entries are added via the collection-initializer syntax `PartitionNames = { ... }`.

- `Timezone` (*string?*) -

    The timezone used for the search, e.g. `"+08:00"` or `"America/New_York"`.

- `Radius` (*string?*) -

    The search radius for range searches on binary/float vectors, used together with `RangeFilter` to bound the distance/similarity of the returned hits. The value is sent as a plain numeric string, e.g. `Radius = "0.6"`.

- `RangeFilter` (*string?*) -

    The range filter for range searches on binary/float vectors, combined with `Radius` to define the accepted distance interval. The value is sent as a plain numeric string, e.g. `RangeFilter = "0.2"`.

- `Rerank` (*string?*) -

    The reranker to apply to the search results (e.g. `"rrf"`), which causes the request conversion to throw an `ArgumentException` when the search is issued. Use `FunctionScoreReranker` or an `IReranker` such as `RrfReranker` instead.

- `FunctionScoreReranker` (*IReranker?*) -

    A structured function-score reranker (boost / decay / model) to apply to the search, mapped to the proto `schema.FunctionScore`. Takes precedence over `Rerank` when set. See [Reranker](Reranker.md).

- `FilterTemplates` (*IDictionary\<string, object\>*) -

    Named expression-template values used by the `Expression` filter, for parameterized filters. Entries are added via the collection-initializer syntax `FilterTemplates = { ... }`.

- `Highlighter` (*IDictionary\<string, string\>*) -

    The highlighter settings (key-value pairs) used to highlight matched terms in the results. Entries are added via the collection-initializer syntax `Highlighter = { ... }`.

- `HighlightType` (*HighlightType?*) -

    The type of highlighter to apply (lexical or semantic). When `null`, the server applies its default (lexical).

The type of highlighter used to produce matched-term highlights in search results.

```csharp
public enum HighlightType
{
    Lexical = 0,
    Semantic = 1
}
```

**Constants:**

- **Lexical** (0)

    Lexical (BM25/keyword-based) highlighting. The server default.

- **Semantic** (1)

    Semantic (embedding-based) highlighting.
