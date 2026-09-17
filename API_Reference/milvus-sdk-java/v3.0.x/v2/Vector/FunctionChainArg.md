# FunctionChainArg

A `FunctionChainArg` instance is an argument to a [FunctionChainExpr](FunctionChainExpr.md). It refers either to a column or to a literal value.

```java
io.milvus.v2.service.vector.request.FunctionChainArg
```

## Static Methods

- `col(String name)`

    Creates a column argument that refers to the given column. The column name must be a non-empty string.

- `literal(Object value)`

    Creates a literal argument with the given value.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when `col()` receives an empty or null column name.

## Methods

- `isColumn()`

    Returns `true` if this argument refers to a column.

- `getColumnName()`

    Returns the column name when this is a column argument; otherwise `null`.

- `getLiteral()`

    Returns the literal value when this is a literal argument; otherwise `null`.
