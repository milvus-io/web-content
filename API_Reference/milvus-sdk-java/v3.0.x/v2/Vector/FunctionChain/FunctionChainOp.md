# FunctionChainOp

A `FunctionChainOp` instance is a single operation (`map`, `sort`, or `limit`) inside a function chain.

```java
io.milvus.v2.service.vector.request.FunctionChainOp
```

## Constructor

This constructor initializes a new `FunctionChainOp` instance. The `OP_MAP`, `OP_SORT`, and `OP_LIMIT` constants identify the operation type.

```java
FunctionChainOp.builder()
    .op(String op)
    .expr(FunctionChainExpr expr)
    .inputs(List<String> inputs)
    .outputs(List<String> outputs)
    .params(Map<String, FunctionParamValue> params)
    .build()
```

**BUILDER METHODS:**

- `op(String op)`

    The operation name. Use the `OP_MAP`, `OP_SORT`, or `OP_LIMIT` constant.

- `expr(FunctionChainExpr expr)`

    The expression evaluated by the operation.

- `inputs(List<String> inputs)`

    The input columns consumed by the operation.

- `outputs(List<String> outputs)`

    The output columns produced by the operation.

- `params(Map<String, FunctionParamValue> params)`

    Named parameters for the operation.

**RETURN TYPE:**

*FunctionChainOp*

**RETURNS:**

A **FunctionChainOp** instance.

**GETTERS:**

- `String getOp()` — Returns the operation name.
- `FunctionChainExpr getExpr()` — Returns the operation expression.
- `List<String> getInputs()` — Returns the input columns.
- `List<String> getOutputs()` — Returns the output columns.
- `Map<String, FunctionParamValue> getParams()` — Returns the named parameters.
