# FunctionChainExpr

A `FunctionChainExpr` instance is a named expression used inside a `map` operation of a [FunctionChain](FunctionChain.md).

```java
io.milvus.v2.service.vector.request.FunctionChainExpr
```

## Constructor

This constructor initializes a new `FunctionChainExpr` instance via its fluent builder.

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

    Adds a parameter to the expression. Keys must be non-empty strings.

**RETURN TYPE:**

*FunctionChainExpr*

**RETURNS:**

A **FunctionChainExpr** instance.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when `name` is empty or `arg` is `null`.

## Methods

- `getName()`

    Returns the name of the expression.

- `getArgs()`

    Returns the arguments of the expression.

- `getParams()`

    Returns the parameters of the expression.
