# FunctionChainExpr

A function invocation expression used by a function-chain operation, such as `num_combine`, `decay`, or `round_decimal`.

```java
io.milvus.v2.service.vector.request.FunctionChainExpr
```

## Constructor

This builder creates a function expression with a name, arguments, and named parameters.

```java
FunctionChainExpr.builder()
    .name(String name)
    .arg(FunctionChainArg arg)
    .param(String key, Object value)
    .build()
```

**BUILDER METHODS:**

- `name(String name)`

    The expression name, e.g. `"num_combine"`.

- `arg(FunctionChainArg arg)`

    Appends an argument, which can be a column reference or a literal.

- `param(String key, Object value)`

    Sets a named parameter of the expression.

**RETURN TYPE:**

*FunctionChainExpr*

**METHODS:**

- `String getName()`

    Returns the expression name.

- `List<FunctionChainArg> getArgs()`

    Returns the expression arguments.

- `Map<String, FunctionParamValue> getParams()`

    Returns the named parameters of the expression.

## Example

```java
FunctionChainExpr expr = FunctionChainExpr.builder()
        .name("num_combine")
        .arg(FunctionChainArg.col("$score"))
        .arg(FunctionChainArg.col("freshness"))
        .param("mode", "weighted")
        .build();
```

<!-- category: Vector; action: CREATE; addedSince: v3.0.x -->
