# FunctionChain

This class describes a function chain, a sequence of map/sort/limit operations that transform search results server-side. Pass a `FunctionChain` to `SearchRequest::WithFunctionChains()` or `SearchRequest::AddFunctionChain()`. Function chains and rerank cannot be used together.

```cpp
FunctionChain(FunctionChainStage stage, std::string name = "");

auto chain = FunctionChain(FunctionChainStage::L1_RERANK)
    .WithName("chain_name")
    .Map(output, expr)
    .Sort(by, desc, tie_break_col)
    .Limit(limit, offset)
    .AddOp(op);
```

**PARAMETERS:**

- **stage** (*FunctionChainStage*)

    Execution stage where the function chain runs.

- **name** (*std::string*)

    Optional name of the chain. Default: `""`.

**METHODS:**

- `FunctionChain& WithName(std::string name)`

    Sets the name of the chain.

- `FunctionChain& Map(const std::string& output, const FunctionChainExpr& expr)`

    Appends a `map` operation that computes a new output column from the given expression.

- `FunctionChain& Sort(const std::string& by, bool desc = true, const std::string& tie_break_col = "")`

    Appends a `sort` operation ordered by the given column. The `desc` flag controls the sort direction and `tie_break_col` provides a secondary column used to break ties.

- `FunctionChain& Limit(int64_t limit, int64_t offset = 0)`

    Appends a `limit` operation that keeps at most `limit` rows after skipping `offset` rows.

- `FunctionChain& AddOp(const FunctionChainOp& op)`

    Appends a raw operation to the chain.

- `FunctionChainStage Stage() const`

    Returns the execution stage of the chain.

- `Name() const`

    Returns the name of the chain.

## FunctionChainStage

Enum specifying the execution stages where a function chain can run. Numeric values mirror `schema.proto` `FunctionChainStage`.

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

A reference to a column by name.

```cpp
FunctionChainColumnRef(std::string name);
auto ref = col("column_name");
```

- `Name() const` / `SetName(std::string name)` — Gets or sets the referenced column name.
- Free function `col(const std::string& name)` — Constructs a column reference.

## FunctionChainExprArg

A single argument of a function-chain expression: either a column reference or a JSON literal.

```cpp
explicit FunctionChainExprArg(FunctionChainColumnRef column);
explicit FunctionChainExprArg(nlohmann::json literal);
```

- `bool IsColumn() const` — Returns `true` when the argument references a column.
- `bool IsLiteral() const` — Returns `true` when the argument is a literal value.
- `ColumnName() const` — Returns the column name when the argument is a column.
- `Literal() const` — Returns the literal JSON value when the argument is a literal.

## FunctionChainExpr

An expression evaluated by a `map` operation.

```cpp
FunctionChainExpr();
explicit FunctionChainExpr(std::string name);

auto expr = FunctionChainExpr("expr_name")
    .AddColumnArg(column_name)
    .AddLiteralArg(literal)
    .AddParam(key, value);
```

- `FunctionChainExpr& AddColumnArg(const std::string& column)` — Adds a column argument.
- `FunctionChainExpr& AddLiteralArg(const nlohmann::json& literal)` — Adds a literal argument.
- `FunctionChainExpr& AddParam(const std::string& key, const nlohmann::json& value)` — Adds a named parameter.
- `Name() const` — Returns the expression name.
- `const std::vector<FunctionChainExprArg>& Args() const` — Returns all arguments.
- `const std::unordered_map<std::string, nlohmann::json>& Params() const` — Returns all parameters.

## FunctionChainOp

A single operation (`map`, `sort`, or `limit`) in a function chain.

```cpp
FunctionChainOp();
explicit FunctionChainOp(std::string op);

auto op = FunctionChainOp("map")
    .WithExpr(expr)
    .AddInput(input)
    .AddOutput(output)
    .AddParam(key, value);
```

- `FunctionChainOp& WithExpr(const FunctionChainExpr& expr)` — Sets the operation expression.
- `FunctionChainOp& AddInput(const std::string& input)` — Adds an input column.
- `FunctionChainOp& AddOutput(const std::string& output)` — Adds an output column.
- `FunctionChainOp& AddParam(const std::string& key, const nlohmann::json& value)` — Adds a named parameter.
- `Op() const` — Returns the operation name.
- `bool HasExpr() const` — Returns whether an expression is set.
- `const FunctionChainExpr& Expr() const` — Returns the operation expression.
- `Inputs() const` — Returns all input columns.
- `Outputs() const` — Returns all output columns.
- `const std::unordered_map<std::string, nlohmann::json>& Params() const` — Returns all parameters.
