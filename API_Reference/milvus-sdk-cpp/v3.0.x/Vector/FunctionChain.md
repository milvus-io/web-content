# FunctionChain

A `FunctionChain` is a builder that composes a rerank/refine pipeline of `map`, `sort`, and `limit` operations for a search, and serializes it to the gRPC `FunctionChain` message.

```cpp
milvus::FunctionChain
```

## Constructor

Constructs a function chain.

```cpp
FunctionChain();
```

## Methods

- `FunctionChain& WithName(std::string name)`

    Sets the chain name.

- `FunctionChain& Map(const std::string& output, const FunctionChainExpr& expr)`

    Appends a `map` operation that writes an expression result to an output field.

- `FunctionChain& Sort(const std::string& by, bool desc = true, const std::string& tie_break_col = "")`

    Appends a `sort` operation by column, optionally with a tie-break column.

- `FunctionChain& Limit(int64_t limit, int64_t offset = 0)`

    Appends a `limit` operation with an optional offset.

- `FunctionChain& AddOp(const FunctionChainOp& op)`

    Appends a raw operation.

- `FunctionChainStage Stage() const`

    Gets the execution stage of the chain.

- `const std::string& Name() const`

    Gets the chain name.

- `const std::vector<FunctionChainOp>& Ops() const`

    Gets the operations of the chain in pipeline order.

## FunctionChainStage

Execution stages where a function chain can run. Numeric values mirror `schema.proto` `FunctionChainStage`.

```cpp
enum class FunctionChainStage {
    UNSPECIFIED = 0,
    INGESTION = 1,
    PRE_PROCESS = 2,
    L0_RERANK = 3,
    L1_RERANK = 4,
    L2_RERANK = 5,
    POST_PROCESS = 6,
};
```

## FunctionChainColumnRef

A reference to a collection field used as a function-chain argument.

```cpp
FunctionChainColumnRef();
explicit FunctionChainColumnRef(std::string name);
```

**METHODS:**

- `const std::string& Name() const`

    Gets the referenced field name.

- `void SetName(std::string name)`

    Sets the referenced field name.

A convenience constructor is also available:

```cpp
FunctionChainColumnRef col(const std::string& name);
```

Creates a column reference for use in a function-chain expression.

## FunctionChainExprArg

A single argument of a function-chain expression: either a column reference or a literal.

```cpp
FunctionChainExprArg();
explicit FunctionChainExprArg(FunctionChainColumnRef column);
explicit FunctionChainExprArg(nlohmann::json literal);
```

**METHODS:**

- `bool IsColumn() const`

    Returns whether this argument is a column reference.

- `bool IsLiteral() const`

    Returns whether this argument is a literal value.

- `const std::string& ColumnName() const`

    Gets the column name when this argument is a column reference.

- `const nlohmann::json& Literal() const`

    Gets the literal value when this argument is a literal.

## FunctionChainExpr

Function invocation expression used by a function-chain operation, e.g. `num_combine`, `decay`, `round_decimal`.

```cpp
FunctionChainExpr();
explicit FunctionChainExpr(std::string name);
```

**METHODS:**

- `FunctionChainExpr& AddColumnArg(const std::string& column)`

    Appends a column-reference argument to the expression.

- `FunctionChainExpr& AddLiteralArg(const nlohmann::json& literal)`

    Appends a literal argument to the expression.

- `FunctionChainExpr& AddParam(const std::string& key, const nlohmann::json& value)`

    Sets a named parameter of the expression.

- `const std::string& Name() const`

    Gets the expression name.

- `const std::vector<FunctionChainExprArg>& Args() const`

    Gets the expression arguments.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

    Gets the named parameters of the expression.

## FunctionChainOp

A single operation in a function-chain pipeline, such as `map`, `sort`, or `limit`.

```cpp
FunctionChainOp();
explicit FunctionChainOp(std::string op);
```

**METHODS:**

- `FunctionChainOp& WithExpr(const FunctionChainExpr& expr)`

    Attaches a function expression to this operation.

- `FunctionChainOp& AddInput(const std::string& input)`

    Adds an input column to this operation.

- `FunctionChainOp& AddOutput(const std::string& output)`

    Adds an output column to this operation.

- `FunctionChainOp& AddParam(const std::string& key, const nlohmann::json& value)`

    Sets a named parameter of this operation.

- `const std::string& Op() const`

    Gets the operation name.

- `bool HasExpr() const`

    Returns whether this operation carries a function expression.

- `const FunctionChainExpr& Expr() const`

    Gets the attached function expression.

- `const std::vector<std::string>& Inputs() const`

    Gets the input columns of this operation.

- `const std::vector<std::string>& Outputs() const`

    Gets the output columns of this operation.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

    Gets the named parameters of this operation.

## Example

```cpp
auto request = SearchRequest()
    .WithCollectionName("demo")
    .AddFloatVector(std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f})
    .WithFunctionChains(std::vector<FunctionChain>{
        FunctionChain()
            .WithName("fresh_popular_rerank")
            .Sort("$score", true, "$id")
            .Limit(10)});
```
