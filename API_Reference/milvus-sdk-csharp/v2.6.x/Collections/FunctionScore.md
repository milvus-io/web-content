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
