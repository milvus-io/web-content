# HybridSearchAsync()

Performs a hybrid search, combining the results of multiple ANN searches with a reranker.

```csharp
public async Task<SearchResp> HybridSearchAsync(HybridSearchReq request, CancellationToken cancellationToken = default)
```

## Request Syntax

```csharp
var request = new HybridSearchReq
{
    CollectionName = "my_collection",
    SearchRequests =
    [
        new AnnSearchReq
        {
            VectorFieldName = "embedding",
            Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
            MetricType = MetricType.L2,
            Limit = 10,
            Expression = "pages > 300"
        },
        new AnnSearchReq
        {
            VectorFieldName = "sparse",
            Texts = ["The Hobbit"],
            Limit = 10
        }
    ],
    Reranker = new RrfReranker(),
    Limit = 5,
    Parameters = new SearchParameters { OutputFields = { "title" } }
};

SearchResp results = await client.HybridSearchAsync(request);
```

**REQUEST PARAMETERS:**

- `CollectionName` (*string*) -

    The name of the collection to search in.

- `DatabaseName` (*string?*) -

    An optional database name to operate on. When empty, the client's currently selected database is used.

- `SearchRequests` (*IReadOnlyList\<AnnSearchReq\>*) -

    The individual ANN search requests to combine. Each `AnnSearchReq` is a nested request type describing one vector field to search, with these members:

    - `VectorFieldName` (*string*) -

        The name of the vector field to search in.

    - `Vectors` (*IReadOnlyList\<ReadOnlyMemory\<float\>\>*) -

        The query vectors to search for (dense float vectors). Exactly one of `Vectors`, `SparseVectors`, `Float16Vectors`, `BFloat16Vectors`, `BinaryVectors`, `Int8Vectors`, `Texts` or `EmbeddingLists` must be set.

    - `SparseVectors` (*IReadOnlyList\<SparseVector\<float\>\>?*) -

        The sparse query vectors to search for. When set, `Vectors` must be empty. See [SparseVector](SparseVector.md).

    - `Float16Vectors` (*IReadOnlyList\<ReadOnlyMemory\<ushort\>\>?*) -

        The float16 query vectors to search for. When set, `Vectors` must be empty.

    - `BFloat16Vectors` (*IReadOnlyList\<ReadOnlyMemory\<ushort\>\>?*) -

        The bfloat16 query vectors to search for. When set, `Vectors` must be empty.

    - `BinaryVectors` (*IReadOnlyList\<ReadOnlyMemory\<byte\>\>?*) -

        The binary query vectors to search for (raw bytes). When set, `Vectors` must be empty.

    - `Int8Vectors` (*IReadOnlyList\<ReadOnlyMemory\<sbyte\>\>?*) -

        The int8 query vectors to search for. When set, `Vectors` must be empty.

    - `Texts` (*IReadOnlyList\<string\>?*) -

        The text query strings to search for (embedded-text / BM25 targets). When set, `Vectors` must be empty.

    - `EmbeddingLists` (*IReadOnlyList\<EmbeddingList\>?*) -

        The embedding lists to search for, used for Array-of-Struct vector sub-fields (e.g. searching `"clips[vector]"` with a MAX_SIM metric). See [EmbeddingList](EmbeddingList.md).

    - `Limit` (*int*) -

        The maximum number of results to return for this leg, also known as `topk`. The sum of `Limit` and `Offset` must be in [1, 16384].

    - `MetricType` (*MetricType*) -

        The metric type used to measure the distance between vectors for this leg. Defaults to `MetricType.Invalid`, letting the server infer it from the index. See [MetricType](MetricType.md).

    - `Expression` (*string?*) -

        A boolean expression to filter the results of this leg.

    - `Offset` (*int?*) -

        The number of entities to skip for this leg.

    - `RoundDecimal` (*long?*) -

        The number of decimal places to round the scores to for this leg.

    - `Radius` (*string?*) -

        The search radius for range searches on binary/float vectors.

    - `RangeFilter` (*string?*) -

        The range filter for range searches on binary/float vectors.

    - `GroupByField` (*string?*) -

        The field to group the results of this leg by.

    - `GroupSize` (*int?*) -

        The maximum number of results per group for this leg.

    - `StrictGroupSize` (*bool?*) -

        Whether the group size is strict for this leg.

    - `IgnoreGrowing` (*bool?*) -

        Whether to ignore the growing segments for this leg.

    - `Timezone` (*string?*) -

        The timezone used for this leg, e.g. `"+08:00"` or `"America/New_York"`.

    - `FunctionScoreReranker` (*IReranker?*) -

        A structured function-score reranker (boost / decay / model) for this leg, mapped to the proto `schema.FunctionScore`. When set, it takes precedence over `Rerank`. See [Reranker](Reranker.md).

    - `Rerank` (*string?*) -

        The reranker to apply to this leg's results (e.g. `"rrf"`). Setting this property causes the request to throw when the search is issued; use an `IReranker` such as `RrfReranker` or `WeightedReranker` instead.

    - `ExtraParameters` (*IDictionary\<string, string\>*) -

        Additional search parameters passed through to the server for this leg. Entries are added via the collection-initializer syntax `ExtraParameters = { ... }`.

    - `FilterTemplates` (*IDictionary\<string, object\>*) -

        Named expression-template values used by `Expression` for this leg, for parameterized filters. Entries are added via the collection-initializer syntax `FilterTemplates = { ... }`.

    - `Highlighter` (*IDictionary\<string, string\>*) -

        The highlighter settings used to highlight matched terms for this leg. Entries are added via the collection-initializer syntax `Highlighter = { ... }`.

    - `HighlightType` (*HighlightType?*) -

        The type of highlighter to apply (lexical or semantic).

- `Reranker` (*IReranker*) -

    The reranker used to combine the results of the individual searches. See [Reranker](Reranker.md).

- `Limit` (*int*) -

    The total number of results to return after reranking.

- `Parameters` (*SearchParameters?*) -

    The optional hybrid search parameters (partitions, output fields, consistency, etc.). See [SearchParameters](SearchParameters.md).

**RETURN TYPE:**

*Task\<SearchResp\>*

**RETURNS:**

A **SearchResp** object that contains the combined, reranked search results.

```csharp
SearchResp
    CollectionName     // -> string
    FieldsData         // -> IReadOnlyList<FieldData>
    Ids                // -> Ids
    NumQueries         // -> long
    Scores             // -> IReadOnlyList<float>
    Limit              // -> long
    Limits             // -> IReadOnlyList<long>
    GroupByFieldValue  // -> FieldData?
    AllSearchCount     // -> long?
    SessionTs          // -> ulong
    Recalls            // -> IReadOnlyList<float>?
    Cost               // -> long
    ScannedRemoteBytes // -> long
    ScannedTotalBytes  // -> long
    CacheHitRatio      // -> float?
    SingleResults      // -> IReadOnlyList<SingleResult>?
    HighlightResults   // -> IReadOnlyList<HighlightResult>?
    ElementIndices     // -> IReadOnlyList<long>?
```

**PARAMETERS:**

- **CollectionName** (*string*) -

    The name of the searched collection.

- **FieldsData** (*IReadOnlyList\<FieldData\>*) -

    The returned fields data. See [FieldData](FieldData.md).

- **Ids** (*Ids*) -

    The IDs of the returned rows. When the server returns no results, this is the default [Ids](Ids.md), whose `LongIds`/`StringIds` are both `null`.

- **NumQueries** (*long*) -

    The number of queries executed.

- **Scores** (*IReadOnlyList\<float\>*) -

    The scores of the returned rows.

- **Limit** (*long*) -

    The limit used for the search.

- **Limits** (*IReadOnlyList\<long\>*) -

    The per-query limits.

- **GroupByFieldValue** (*FieldData?*) -

    The group-by field value for each returned row, populated when the search used `SearchParameters.GroupByField`.

- **AllSearchCount** (*long?*) -

    The total number of rows matching the search (across all groups), populated when the search used `SearchParameters.GroupByField`. `null` only when the server returned no results.

- **SessionTs** (*ulong*) -

    The server-side timestamp at which the search was executed, used for session-like operations such as iterators (read-your-writes consistency).

- **Recalls** (*IReadOnlyList\<float\>?*) -

    The recall rates reported by the server, when it reports them. This is a flat per-returned-row array; `null` otherwise.

- **Cost** (*long*) -

    The cost of the search in milliseconds, as reported by the server's `report_value` extra info, or 0 when the server does not report a cost.

- **ScannedRemoteBytes** (*long*) -

    The number of bytes scanned from remote storage during the search, when reported by the server.

- **ScannedTotalBytes** (*long*) -

    The total number of bytes scanned during the search, when reported by the server.

- **CacheHitRatio** (*float?*) -

    The cache hit ratio of the search (0–1), when reported by the server. `null` when not reported.

- **SingleResults** (*IReadOnlyList\<SingleResult\>?*) -

    The per-query-vector results, sliced out of the flat response. One [SingleResult](SingleResult.md) per query vector, each holding that query's top-K scores, primary keys and output fields.

- **HighlightResults** (*IReadOnlyList\<HighlightResult\>?*) -

    The highlight results per field, populated when the search used full-text or hybrid highlighting, one entry per highlighted field. See [HighlightResult](HighlightResult.md). `null` when the server reported none.

- **ElementIndices** (*IReadOnlyList\<long\>?*) -

    The element indices, populated for matched sub-struct elements when the search operated on array/struct fields. `null` when the server reported none.

**EXCEPTIONS:**

- [MilvusException](../Client/MilvusException.md)

    Thrown when the RPC fails or the server returns an error. Inspect the exception message for details.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "localhost:19530",
    Username = "root",
    Password = "Milvus"
});
await client.ConnectAsync();

SearchResp results = await client.HybridSearchAsync(new HybridSearchReq
{
    CollectionName = "my_collection",
    SearchRequests =
    [
        new AnnSearchReq
        {
            VectorFieldName = "embedding",
            Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
            MetricType = MetricType.L2,
            Limit = 10
        },
        new AnnSearchReq
        {
            VectorFieldName = "sparse",
            Texts = ["The Hobbit"],
            Limit = 10
        }
    ],
    Reranker = new RrfReranker(),
    Limit = 5,
    Parameters = new SearchParameters
    {
        OutputFields = { "title" },
        ConsistencyLevel = ConsistencyLevel.Strong
    }
});
```
