# FunctionChainArg

A single argument of a function-chain expression: either a column reference or a literal value.

```java
io.milvus.v2.service.vector.request.FunctionChainArg
```

## Methods

- `static FunctionChainArg col(String name)`

    Creates a column-reference argument for the given field name.

- `static FunctionChainArg literal(Object value)`

    Creates a literal-value argument.

- `boolean isColumn()`

    Returns `true` if this argument is a column reference.

- `String getColumnName()`

    Returns the column name when this argument is a column reference.

- `FunctionParamValue getLiteral()`

    Returns the literal value when this argument is a literal.

## Example

```java
FunctionChainArg arg = FunctionChainArg.col("$score");
FunctionChainArg literal = FunctionChainArg.literal(0.7);
```

<!-- category: Vector; action: CREATE; addedSince: v3.0.x -->
