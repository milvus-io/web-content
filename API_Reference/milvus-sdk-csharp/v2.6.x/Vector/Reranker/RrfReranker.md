# RrfReranker

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

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// A RRF reranker that combines hybrid-search results by reciprocal ranks
IReranker reranker = new RrfReranker(60);
```
