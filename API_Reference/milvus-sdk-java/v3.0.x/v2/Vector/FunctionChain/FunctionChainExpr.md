# FunctionChainExpr

A `FunctionChainExpr` instance represents an expression evaluated by a `map` operation in a [FunctionChain](FunctionChain.md).

```java
io.milvus.v2.service.vector.request.FunctionChainExpr
```

## Constructor

This constructor initializes a new `FunctionChainExpr` instance that evaluates an expression over the specified arguments and parameters.

```java
FunctionChainExpr.builder()
    .name(String name)
    .arg(FunctionChainArg arg)
    .param(String key, Object value)
    .build()
```

**BUILDER METHODS:**

- `name(String name)`

    The name of the expression. Must be a non-empty string.

- `arg(FunctionChainArg arg)`

    Adds an argument to the expression. Must not be `null`.

- `param(String key, Object value)`

    Adds a parameter to the expression. Parameter names must be non-empty strings.

**RETURN TYPE:**

*FunctionChainExpr*

**RETURNS:**

A **FunctionChainExpr** instance.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when the name is empty, an argument is `null`, or request validation fails.

## Example

```java
FunctionChainExpr expr = FunctionChainExpr.builder()
        .name("num_combine")
        .arg(FunctionChainArg.col("$score"))
        .arg(FunctionChainArg.col("freshness"))
        .param("mode", "weighted")
        .param("weights", Arrays.asList(0.7, 0.2, 0.1))
        .build();
```
