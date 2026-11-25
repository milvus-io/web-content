# FunctionParamValue

A dynamically-typed parameter value for function-chain arguments. Values can be built from scalars, strings, field references, and nested values via `FunctionParamValue.From(...)`.

```csharp
public sealed class FunctionParamValue
{
    public static FunctionParamValue From(object? value) { ... }
    public static FunctionParamValue FromArray(IEnumerable<FunctionParamValue> values) { ... }
    public static FunctionParamValue FromObject(IReadOnlyDictionary<string, FunctionParamValue> fields) { ... }
}
```

**METHODS:**

- `From(object? value)` (*static*) -

    Creates a parameter value from a CLR value. Supported types mirror the Java SDK's `FunctionParamValue.from`: `bool`, integral numbers (signed and unsigned, the latter range-checked to int64), `float` / `double`, `string`, `byte[]`, and collections.

- `FromArray(IEnumerable<FunctionParamValue> values)` (*static*) -

    Creates an array parameter value.

- `FromObject(IReadOnlyDictionary<string, FunctionParamValue> fields)` (*static*) -

    Creates an object (map) parameter value.

## Example

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// Wrap a scalar and an array as function-chain parameter values
FunctionParamValue weight = FunctionParamValue.From(0.5);
FunctionParamValue tags = FunctionParamValue.FromArray(
    new[] { FunctionParamValue.From("a"), FunctionParamValue.From("b") });
```
