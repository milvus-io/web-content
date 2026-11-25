# FunctionChainOp

A single operation of a `FunctionChain` pipeline. The `Op` name is a server-recognized operation name (e.g. `"map"`, `"sort"`, `"limit"`); the `Map`, `Sort` and `Limit` factories set a valid op, while the raw builder accepts any non-empty string so future server ops remain expressible.

```csharp
public sealed class FunctionChainOp
{
    public const string OpMap = "map";
    public const string OpSort = "sort";
    public const string OpLimit = "limit";
    public string Op { get; set; } = "";
    public FunctionChainExpr? Expr { get; set; }
    public IList<string> Inputs { get; } = new List<string>();
    public IList<string> Outputs { get; } = new List<string>();
    public IDictionary<string, FunctionParamValue> Params { get; } = new Dictionary<string, FunctionParamValue>();
}
```

**PARAMETERS:**

- `Op` (*string*) -

    The server-recognized operation name, e.g. `"map"`, `"sort"` or `"limit"`.

- `Expr` (*FunctionChainExpr?*) -

    The expression evaluated by this operation, when it is an expression-based operation. See [FunctionChainExpr](FunctionChainExpr.md).

- `Inputs` (*IList\<string\>*) -

    The input columns consumed by this operation.

- `Outputs` (*IList\<string\>*) -

    The output columns produced by this operation.

- `Params` (*IDictionary\<string, FunctionParamValue\>*) -

    The operation-level parameters keyed by name. See [FunctionParamValue](FunctionParamValue.md).

**METHODS:**

- `Map(string output, FunctionChainExpr expr)` (*static*) -

    Creates a `map` operation computing the `output` column from `expr`.

- `Sort(string by, bool desc, string? tieBreakCol = null)` (*static*) -

    Creates a `sort` operation sorting by the given column.

- `Limit(int limit, int offset = 0)` (*static*) -

    Creates a `limit` operation keeping only `limit` results, skipping the given number of leading results.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

var chain = new FunctionChain
{
    Stage = FunctionChainStage.L2Rerank,
    Name = "combine_chain"
};
chain.Ops.Add(FunctionChainOp.Sort("$score", desc: true));
chain.Ops.Add(FunctionChainOp.Limit(10));
```
