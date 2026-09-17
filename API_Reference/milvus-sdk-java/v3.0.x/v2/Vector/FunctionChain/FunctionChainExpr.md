# FunctionChainExpr

A `FunctionChainExpr` instance is an expression evaluated by a `map` operation inside a function chain.

```java
io.milvus.v2.service.vector.request.FunctionChainExpr
```

## Constructor

This constructor initializes a new `FunctionChainExpr` instance.

```java
FunctionChainExpr.builder()
    .name(String name)
    .arg(FunctionChainArg arg)
    .param(String key, Object value)
    .build()
```

**BUILDER METHODS:**

- `name(String name)`

    The name of the expression.

- `arg(FunctionChainArg arg)`

    Adds an argument to the expression. The argument is either a column reference or a literal value; see FunctionChainArg.

- `param(String key, Object value)`

    Adds a named parameter to the expression.

**RETURN TYPE:**

*FunctionChainExpr*

**RETURNS:**

A **FunctionChainExpr** instance.

**GETTERS:**

- `String getName()` — Returns the expression name.
- `List<FunctionChainArg> getArgs()` — Returns the expression arguments.
- `Map<String, FunctionParamValue> getParams()` — Returns the named parameters.
