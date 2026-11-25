# Reranker

Rerankers used in hybrid search to combine results from multiple vector searches.

```csharp
public interface IReranker
{
    IReadOnlyList<KeyValuePair<string, string>> ToRankParams();
    FunctionScore? ToFunctionScore();
}
```

**METHODS:**

- `ToRankParams()` -

    Gets the rank parameters describing this reranker's strategy, used for `rank_params`-based strategies such as RRF and weighted.

- `ToFunctionScore()` -

    Gets a structured `FunctionScore` for this reranker, or `null` when the reranker uses the `rank_params` channel instead. See [FunctionScore](../../Collections/FunctionScore.md).

## Related types

- [FunctionReranker\<T\>](FunctionReranker.md)

- [RrfReranker](RrfReranker.md)

- [WeightedReranker](WeightedReranker.md)

- [BoostRerank](BoostRerank.md)

- [DecayRerank](DecayRerank.md)

- [ModelRerank](ModelRerank.md)

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
    Reranker = new RrfReranker(60),
    Limit = 5
});
```
