# FunctionChain

A named chain of post-processing stages applied to search results, usable at the top level and per ANN-search leg of `SearchAsync()` and `HybridSearchAsync()`. Related types (`FunctionChainOp`, `FunctionChainExpr`, `FunctionChainArg`, `FunctionParamValue`) are documented in the sections below.

```csharp
public sealed class FunctionChain
{
    public string Name { get; set; }
    public IReadOnlyList<FunctionChainStage> Stages { get; set; }
}
```

**FIELDS:**

- `Name` - The function-chain name (required).

- `Stages` - The ordered chain stages (each names an operation and supplies exactly one argument).

## FunctionChainOp

The chain operations available at v3.0.0: .

## FunctionChainExpr

- `Op` - The operation to apply (a `FunctionChainOp`).

- `Arg` - The operation argument (exactly one).

## FunctionChainArg

- `Name` - The argument name.

- `Value` - The argument value (a `FunctionParamValue`).

## FunctionParamValue

A dynamically-typed parameter value for function-chain arguments. Values can be built from scalars, strings, field references, and nested values via `FunctionParamValue.From(...)`.
