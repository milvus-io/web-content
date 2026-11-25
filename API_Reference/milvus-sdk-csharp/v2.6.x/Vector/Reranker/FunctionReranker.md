# FunctionReranker\<T\>

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

    The function type (always `FunctionType.Rerank` for rerankers). See [FunctionType](../../Collections/FunctionType.md).

- `RerankerName` (*string*) -

    The rerank strategy name (`"boost"` / `"decay"` / `"model"`) the server identifies the function by.

- `Params` (*IDictionary\<string, string\>*) -

    The rerank function's parameters (boost/decay/model settings).

- `InputFieldNames` (*IList\<string\>*) -

    The input field names the rerank function operates on; decay/model require one.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// A function-score reranker converts to a FunctionScore for the wire
BoostRerank boost = new BoostRerank("boost_score").WithWeight(1.2f);
FunctionScore? score = boost.ToFunctionScore();
```
