# BoostRerank

A function-score reranker that boosts results matching a filter (or random score on a field), mapped to the proto `schema.FunctionScore`.

```csharp
public sealed class BoostRerank : FunctionReranker<BoostRerank>
{
    public BoostRerank(string name) { ... }
    public BoostRerank WithFilter(string filter) { ... }
    public BoostRerank WithWeight(float weight) { ... }
    public BoostRerank WithRandomScoreField(string field) { ... }
    public BoostRerank WithRandomScoreSeed(long seed) { ... }
}
```

**METHODS:**

- `BoostRerank(string name)` (*constructor*) -

    Creates a boost reranker.

- `WithFilter(string filter)` -

    Sets the filter expression; results matching it get the boost.

- `WithWeight(float weight)` -

    Sets the boost weight applied to matching results.

- `WithRandomScoreField(string field)` -

    Sets the field used to generate a random score.

- `WithRandomScoreSeed(long seed)` -

    Sets the seed for the random score.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// Boost the score of results matching the filter by 1.2x
BoostRerank boost = new BoostRerank("boost_score")
    .WithFilter("pages > 300")
    .WithWeight(1.2f);

FunctionScore? functionScore = boost.ToFunctionScore();
```
