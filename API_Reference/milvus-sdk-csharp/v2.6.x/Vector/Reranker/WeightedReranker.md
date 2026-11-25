# WeightedReranker

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

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// A weighted reranker that assigns 0.7 to the first leg and 0.3 to the second
IReranker reranker = new WeightedReranker(0.7f, 0.3f);
```
