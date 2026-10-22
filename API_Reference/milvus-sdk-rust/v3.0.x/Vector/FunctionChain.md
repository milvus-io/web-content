# FunctionChain

This struct describes a named sequence of operations applied to search results, attached to a search request through `SearchRequestBuilder::function_chains`.

```rust
pub struct FunctionChain
```

**PARAMETERS:**

- `name: String`

    Name of the chain.

- `stage: FunctionChainStage`

    Execution stage of the chain. Must not be `Unspecified` when used for search.

- `ops: Vec<FunctionChainOp>`

    Ordered operations in the chain. Must contain at least one operation.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` / `set_name(value)` / `get_name()` - Sets or returns the chain name.
- `stage(value)` / `set_stage(value)` / `get_stage()` - Sets or returns the execution stage.
- `ops(value)` / `set_ops(value)` / `get_ops()` - Sets or returns the ordered operations.
- `add_op(op)` - Appends a raw `FunctionChainOp`, for operations the fluent conveniences do not expose, such as `filter` or `merge`.
- `map(output, expr)` - Appends a `map` operation that writes an expression result to an output column.
- `sort(by, desc, tie_break_col)` - Appends a `sort` operation by a column, optionally with a tie-break column.
- `limit(limit, offset)` - Appends a `limit` operation with an optional offset.
- `validate()` - Validates that the chain can be attached to a search request.

## FunctionChainStage

```rust
pub enum FunctionChainStage {
    Unspecified,
    Ingestion,
    PreProcess,
    L0Rerank,
    L1Rerank,
    L2Rerank,
    PostProcess,
}
```

- `Unspecified` - Unset stage; the default. Not supported for search.
- `Ingestion` - Stage applied during data ingestion.
- `PreProcess` - Stage applied before search.
- `L0Rerank` / `L1Rerank` / `L2Rerank` - Rerank stages at increasing levels.
- `PostProcess` - Stage applied after search.

## FunctionChainArg

```rust
pub enum FunctionChainArg {
    Column(String),
    Literal(FunctionParamValue),
}
```

- `Column(String)` - References an input column by name.
- `Literal(FunctionParamValue)` - Carries a literal parameter value.

The helper function `col(name)` builds a `FunctionChainArg::Column`.

## FunctionParamValue

```rust
pub enum FunctionParamValue {
    Bool(bool),
    Int(i64),
    Double(f64),
    String(String),
    Bytes(Vec<u8>),
    Array(Vec<FunctionParamValue>),
    Object(HashMap<String, FunctionParamValue>),
}
```

- `Bool(bool)` / `Int(i64)` / `Double(f64)` / `String(String)` / `Bytes(Vec<u8>)` - Scalar parameter values.
- `Array(Vec<FunctionParamValue>)` - An array of parameter values, built with `FunctionParamValue::array(...)`.
- `Object(HashMap<String, FunctionParamValue>)` - A map of parameter values, built with `FunctionParamValue::object(...)`.

`FunctionParamValue` implements `From` conversions for bool, integer, float, string, byte-slice, array, and object types.

## FunctionChainExpr

This struct describes a named expression with arguments and parameters used by a `map` operation.

```rust
pub struct FunctionChainExpr
```

**PARAMETERS:**

- `name: String`

    Name of the expression, for example `num_combine`.

- `args: Vec<FunctionChainArg>`

    Expression arguments, either column references or literals.

- `params: HashMap<String, FunctionParamValue>`

    Expression parameters.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` / `set_name(value)` - Sets the expression name.
- `args(value)` / `set_args(value)` / `add_arg(value)` - Sets, returns, or appends expression arguments.
- `params(value)` / `set_params(value)` / `add_param(key, value)` - Sets, returns, or adds expression parameters.
- `get_name()` / `get_args()` / `get_params()` - Returns the configured values.

## FunctionChainOp

This struct describes one operation in a function chain.

```rust
pub struct FunctionChainOp
```

**PARAMETERS:**

- `op: String`

    Operation name, such as `map`, `sort`, or `limit`.

- `expr: Option<FunctionChainExpr>`

    Expression attached to the operation, required for `map`.

- `inputs: Vec<String>`

    Input columns of the operation.

- `outputs: Vec<String>`

    Output columns of the operation.

- `params: HashMap<String, FunctionParamValue>`

    Operation parameters.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `op(value)` / `set_op(value)` / `get_op()` - Sets or returns the operation name.
- `expr(value)` / `set_expr(value)` / `get_expr()` - Sets or returns the expression.
- `inputs(value)` / `set_inputs(value)` / `add_input(value)` - Sets, returns, or appends input columns.
- `outputs(value)` / `set_outputs(value)` / `add_output(value)` - Sets, returns, or appends output columns.
- `params(value)` / `set_params(value)` / `add_param(key, value)` - Sets, returns, or adds operation parameters.

## Example

```rust
let chain = FunctionChain::new()
    .name("post_process")
    .stage(FunctionChainStage::PostProcess)
    .map("score_boosted", FunctionChainExpr::new().name("num_combine").add_arg(col("score")).add_param("weight", 1.5))
    .limit(5, 0);
```
