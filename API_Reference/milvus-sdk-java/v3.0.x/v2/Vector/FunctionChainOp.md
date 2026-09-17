# FunctionChainOp

A `FunctionChainOp` instance is a single operation in a [FunctionChain](FunctionChain.md). Supported operations are `map`, `sort`, and `limit`.

```java
io.milvus.v2.service.vector.request.FunctionChainOp
```

## Constants

- `OP_MAP` - The `map` operation.

- `OP_SORT` - The `sort` operation.

- `OP_LIMIT` - The `limit` operation.

## Constructor

This constructor initializes a new `FunctionChainOp` instance via its fluent builder.

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

    The operation name. Use one of the `OP_*` constants.

- `expr(FunctionChainExpr expr)`

    The expression evaluated by the operation.

- `inputs(List<String> inputs)`

    The input columns of the operation.

- `outputs(List<String> outputs)`

    The output columns of the operation.

- `params(Map<String, FunctionParamValue> params)`

    The parameters of the operation.

**RETURN TYPE:**

*FunctionChainOp*

**RETURNS:**

A **FunctionChainOp** instance.

## Methods

- `getOp()`

    Returns the operation name.

- `getExpr()`

    Returns the expression of the operation.

- `getInputs()`

    Returns the input columns of the operation.

- `getOutputs()`

    Returns the output columns of the operation.

- `getParams()`

    Returns the parameters of the operation.
