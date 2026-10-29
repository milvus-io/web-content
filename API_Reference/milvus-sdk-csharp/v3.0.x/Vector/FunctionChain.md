# FunctionChain

A named chain of post-processing stages applied to search results, usable at the top level and per ANN-search leg of `SearchAsync()` and `HybridSearchAsync()`. Related types (`FunctionChainOp`, `FunctionChainExpr`, `FunctionChainArg`, `FunctionParamValue`) are documented in the sections below.

```csharp
public sealed class FunctionChain
{
    public FunctionChainStage Stage { get; set; }
    public string Name { get; set; } = "";
    public IList<FunctionChainOp> Ops { get; } = new List<FunctionChainOp>();
}
```

**PARAMETERS:**

- `Stage` (*FunctionChainStage*) -

    The execution stage where this function chain runs. Must be set to a non-unspecified stage (e.g. `FunctionChainStage.L2Rerank`).

- `Name` (*string*) -

    An optional SDK/debug name of this function chain.

- `Ops` (*IList\<FunctionChainOp\>*) -

    The ordered operations of this function chain, executed by the server in this order.

## FunctionChainOp

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

    The expression evaluated by this operation, when it is an expression-based operation.

- `Inputs` (*IList\<string\>*) -

    The input columns consumed by this operation.

- `Outputs` (*IList\<string\>*) -

    The output columns produced by this operation.

- `Params` (*IDictionary\<string, FunctionParamValue\>*) -

    The operation-level parameters keyed by name.

**METHODS:**

- `Map(string output, FunctionChainExpr expr)` (*static*) -

    Creates a `map` operation computing the `output` column from `expr`.

- `Sort(string by, bool desc, string? tieBreakCol = null)` (*static*) -

    Creates a `sort` operation sorting by the given column.

- `Limit(int limit, int offset = 0)` (*static*) -

    Creates a `limit` operation keeping only `limit` results, skipping the given number of leading results.

## FunctionChainExpr

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

    The ordered expression arguments, interpreted by the function implementation by position.

- `Params` (*IDictionary\<string, FunctionParamValue\>*) -

    The expression-level keyword parameters.

## FunctionChainArg

An argument of a function-chain expression: either a column reference (a collection field, temporary variable, or system name such as `$score`) or a literal value. Mirrors pymilvus's `FunctionChainExprArg` / the Java SDK's `FunctionChainArg`.

```csharp
public sealed class FunctionChainArg
{
    public string? ColumnName { get; init; }
    public FunctionParamValue? LiteralValue { get; init; }
}
```

**PARAMETERS:**

- `ColumnName` (*string?*) -

    The referenced column name, or `null` when `LiteralValue` is used.

- `LiteralValue` (*FunctionParamValue?*) -

    The literal argument value, or `null` when `ColumnName` is used.

**METHODS:**

- `Column(string name)` (*static*) -

    Creates a column-reference argument, e.g. `"$score"` or a field name.

- `Literal(object value)` (*static*) -

    Creates a literal argument, converted via `FunctionParamValue.From(object?)`.

## FunctionParamValue

A dynamically-typed parameter value for function-chain arguments. Values can be built from scalars, strings, field references, and nested values via `FunctionParamValue.From(...)`.

**METHODS:**

- `From(object? value)` (*static*) -

    Creates a parameter value from a CLR value. Supported types mirror the Java SDK's `FunctionParamValue.from`: `bool`, integral numbers (signed and unsigned, the latter range-checked to int64), `float` / `double`, `string`, `byte[]`, and collections.

- `FromArray(IEnumerable<FunctionParamValue> values)` (*static*) -

    Creates an array parameter value.

- `FromObject(IReadOnlyDictionary<string, FunctionParamValue> fields)` (*static*) -

    Creates an object (map) parameter value.
