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

    Gets a structured `FunctionScore` for this reranker, or `null` when the reranker uses the `rank_params` channel instead. See [FunctionScore](../Collections/FunctionScore.md).

**FunctionReranker\<T\>:**

Base class for function-score (boost/decay/model) rerankers; converts to a `FunctionScore` for the proto `schema.FunctionScore` wire member.

```csharp
public abstract class FunctionReranker<T> : IReranker where T : FunctionReranker<T>
{
    public FunctionType Type { get; }
    public string RerankerName { get; }
    public IDictionary<string, string> Params { get; }
    public IList<string> InputFieldNames { get; }
}
```

**PARAMETERS:**

- `Type` (*FunctionType*) -

    The function type (always `FunctionType.Rerank` for rerankers). See [FunctionType](../Collections/FunctionType.md).

- `RerankerName` (*string*) -

    The rerank strategy name (`"boost"` / `"decay"` / `"model"`) the server identifies the function by.

- `Params` (*IDictionary\<string, string\>*) -

    The rerank function's parameters (boost/decay/model settings).

- `InputFieldNames` (*IList\<string\>*) -

    The input field names the rerank function operates on; decay/model require one.

**RrfReranker:**

A Reciprocal Rank Fusion (RRF) reranker that combines results based on their reciprocal ranks, scoring each document as the sum of `1 / (k + rank)` across all input searches.

```csharp
public sealed class RrfReranker : IReranker
{
    public RrfReranker(float k) { ... }
    public float K { get; }
}
```

**PARAMETERS:**

- `K` (*float*) -

    The constant used in the RRF formula; higher values give more weight to lower-ranked results. Defaults to 60.

**METHODS:**

- `RrfReranker(float k)` (*constructor*) -

    Creates a new RRF reranker with a specified k value, which must be greater than or equal to 1.

**WeightedReranker:**

A weighted reranker that combines results using specified weights for each input search; the final score of each document is a weighted sum of its scores from each input search.

```csharp
public sealed class WeightedReranker : IReranker
{
    public WeightedReranker(params float[] weights) { ... }
    public IReadOnlyList<float> Weights { get; }
}
```

**PARAMETERS:**

- `Weights` (*IReadOnlyList\<float\>*) -

    The weights to apply to each input search. The number of weights must match the number of ANN search requests.

**METHODS:**

- `WeightedReranker(params float[] weights)` (*constructor*) -

    Creates a new weighted reranker with the specified weights.

**BoostRerank:**

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

**DecayRerank:**

A function-score reranker applying a gaussian/exponential/linear decay to results by a scalar field, mapped to the proto `schema.FunctionScore`.

```csharp
public sealed class DecayRerank : FunctionReranker<DecayRerank>
{
    public DecayRerank(string name) { ... }
    public DecayRerank WithInputField(string field) { ... }
    public DecayRerank WithFunction(string function) { ... }
    public DecayRerank WithOrigin<T>(T origin) { ... }
    public DecayRerank WithOffset<T>(T offset) { ... }
    public DecayRerank WithScale<T>(T scale) { ... }
    public DecayRerank WithDecay(float decay) { ... }
}
```

**METHODS:**

- `DecayRerank(string name)` (*constructor*) -

    Creates a decay reranker.

- `WithInputField(string field)` -

    Sets the field the decay applies to; the server requires exactly one input field for decay functions.

- `WithFunction(string function)` -

    Sets the decay function: `"gauss"`, `"exp"` or `"linear"`.

- `WithOrigin<T>(T origin)` -

    Sets the reference point (origin) of the decay curve.

- `WithOffset<T>(T offset)` -

    Sets the no-decay zone around the origin.

- `WithScale<T>(T scale)` -

    Sets the scale: the position at which relevance drops to the decay value.

- `WithDecay(float decay)` -

    Sets the decay value (the score at the scale position).

**ModelRerank:**

A function-score reranker that uses a model service to recompute relevance, mapped to the proto `schema.FunctionScore`.

```csharp
public sealed class ModelRerank : FunctionReranker<ModelRerank>
{
    public ModelRerank(string name) { ... }
    public ModelRerank WithProvider(string provider) { ... }
    public ModelRerank WithQueries(IEnumerable<string> queries) { ... }
    public ModelRerank WithEndpoint(string endpoint) { ... }
}
```

**METHODS:**

- `ModelRerank(string name)` (*constructor*) -

    Creates a model reranker.

- `WithProvider(string provider)` -

    Sets the model service provider.

- `WithQueries(IEnumerable<string> queries)` -

    Sets the query strings used by the model to compute relevance; the count must equal the number of queries in the search.

- `WithEndpoint(string endpoint)` -

    Sets the model service endpoint URL.
