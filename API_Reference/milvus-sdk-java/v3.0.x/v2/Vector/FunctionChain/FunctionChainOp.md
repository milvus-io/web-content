# FunctionChainOp

A `FunctionChainOp` instance represents a single operation (`map`, `sort`, or `limit`) inside a [FunctionChain](FunctionChain.md).

```java
io.milvus.v2.service.vector.request.FunctionChainOp
```

## Constructor

This constructor initializes a new `FunctionChainOp` instance for a `map`, `sort`, or `limit` operation.

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

    The operation name. Use one of the constants `OP_MAP`, `OP_SORT`, or `OP_LIMIT`. Must be a non-empty string.

- `expr(FunctionChainExpr expr)`

    The expression evaluated by a `map` operation.

- `inputs(List<String> inputs)`

    The input columns of the operation. Must not be `null`.

- `outputs(List<String> outputs)`

    The output columns of the operation. Must not be `null`.

- `params(Map<String, FunctionParamValue> params)`

    The parameters of the operation. Must not be `null`.

**RETURN TYPE:**

*FunctionChainOp*

**RETURNS:**

A **FunctionChainOp** instance.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when the operation name is empty or request validation fails.

## Example

```java
FunctionChainOp mapOp = FunctionChainOp.builder()
        .op(FunctionChainOp.OP_MAP)
        .expr(FunctionChainExpr.builder()
                .name("num_combine")
                .arg(FunctionChainArg.col("$score"))
                .build())
        .outputs(Collections.singletonList("$score"))
        .build();
```
