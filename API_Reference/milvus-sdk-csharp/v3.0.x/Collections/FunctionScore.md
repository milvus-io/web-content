# FunctionScore

A structured rerank configuration used by `search`/`hybridSearch`.

```csharp
public sealed class FunctionScore
{
    public IList<FunctionSchema> Functions { get; }
    public IDictionary<string, string> Params { get; }
}
```

**PARAMETERS:**

- `Functions` (*IList\<FunctionSchema\>*) -

    The rerank functions, each a `FunctionSchema` of type `FunctionType.Rerank`. See [FunctionSchema](FunctionSchema.md).

- `Params` (*IDictionary\<string, string\>*) -

    Function-score-level parameters (sent as the proto `FunctionScore.params` key-value pairs).

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

var boost = new BoostRerank("boost_score")
    .WithFilter("pages > 300")
    .WithWeight(1.2f);

FunctionScore? functionScore = boost.ToFunctionScore();

var request = new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f }],
    Limit = 5,
    Parameters = new SearchParameters
    {
        FunctionScoreReranker = boost
    }
};
```
