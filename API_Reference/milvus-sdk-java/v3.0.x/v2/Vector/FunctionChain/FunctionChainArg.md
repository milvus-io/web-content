# FunctionChainArg

A `FunctionChainArg` instance is a single argument of a function-chain expression: either a column reference or a literal value.

```java
io.milvus.v2.service.vector.request.FunctionChainArg
```

## Static Factories

A `FunctionChainArg` has no public builder. Create an instance with one of the following static factories:

```java
FunctionChainArg.col(String name);
FunctionChainArg.literal(Object value);
```

- `col(String name)`

    Creates a column-reference argument referencing the given column.

- `literal(Object value)`

    Creates a literal argument wrapping the given value.

**METHODS:**

- `boolean isColumn()` — Returns whether the argument references a column.
- `String getColumnName()` — Returns the referenced column name when the argument is a column.
- `FunctionParamValue getLiteral()` — Returns the literal value when the argument is a literal.
