# ModelRerank

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

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// Rescore results with an external reranking model
ModelRerank model = new ModelRerank("model_score")
    .WithProvider("cohere")
    .WithQueries(["What is Milvus?"])
    .WithEndpoint("https://api.example.com/rerank");

FunctionScore? functionScore = model.ToFunctionScore();
```
