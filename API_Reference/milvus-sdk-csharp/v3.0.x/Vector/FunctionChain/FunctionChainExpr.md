# FunctionChainExpr

A named function invocation used by a function-chain `map` operation. Mirrors pymilvus's `FunctionChainExpr` / the Java SDK's `FunctionChainExpr`.

```csharp
public sealed class FunctionChainExpr
{
    public string Name { get; set; } = "";
    public IList<FunctionChainArg> Args { get; } = new List<FunctionChainArg>();
    public IDictionary<string, FunctionParamValue> Params { get; } = new Dictionary<string, FunctionParamValue>();
}
```

**PARAMETERS:**

- `Name` (*string*) -

    The function implementation name, e.g. `"expr"`, `"sum"` or `"rerank_model"`.

- `Args` (*IList\<FunctionChainArg\>*) -

    The ordered expression arguments, interpreted by the function implementation by position. See [FunctionChainArg](FunctionChainArg.md).

- `Params` (*IDictionary\<string, FunctionParamValue\>*) -

    The expression-level keyword parameters. See [FunctionParamValue](FunctionParamValue.md).

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// A num_combine expression that multiplies $score and $boost
var expr = new FunctionChainExpr
{
    Name = "num_combine",
    Args = { FunctionChainArg.Column("$score"), FunctionChainArg.Column("$boost") },
    Params = { ["method"] = FunctionParamValue.From("multiply") }
};
```
