# FunctionChainArg

A `FunctionChainArg` instance represents a single argument of a [FunctionChainExpr](FunctionChainExpr.md), either a reference to a column or a literal value.

```java
io.milvus.v2.service.vector.request.FunctionChainArg
```

## Constructor

A `FunctionChainArg` is not constructed directly. Use the static factory methods `col()` and `literal()` to create a column reference or a literal value.

```java
FunctionChainArg.col(String name)
FunctionChainArg.literal(Object value)
```

**FACTORY METHODS:**

- `col(String name)`

    Creates a `FunctionChainArg` that references the column with the given name. The name must be non-empty.

- `literal(Object value)`

    Creates a `FunctionChainArg` that holds the given literal value.

**RETURN TYPE:**

*FunctionChainArg*

**RETURNS:**

A **FunctionChainArg** instance.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when the column name is empty or request validation fails.

## Example

```java
FunctionChainArg colArg = FunctionChainArg.col("$score");
FunctionChainArg litArg = FunctionChainArg.literal("abstract");
```
