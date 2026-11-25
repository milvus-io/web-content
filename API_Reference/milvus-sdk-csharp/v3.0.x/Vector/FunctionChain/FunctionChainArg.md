# FunctionChainArg

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

    The literal argument value, or `null` when `ColumnName` is used. See [FunctionParamValue](FunctionParamValue.md).

**METHODS:**

- `Column(string name)` (*static*) -

    Creates a column-reference argument, e.g. `"$score"` or a field name.

- `Literal(object value)` (*static*) -

    Creates a literal argument, converted via `FunctionParamValue.From(object?)`.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// A column reference and a literal argument
FunctionChainArg column = FunctionChainArg.Column("$score");
FunctionChainArg literal = FunctionChainArg.Literal(0.5);
```
