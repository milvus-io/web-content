# FunctionChain

This class builds a function chain that post-processes search results. A function chain runs a pipeline of operations (map, sort, limit, ...) on the result columns of a `Search` call. Pass one or more `FunctionChain` objects to `SearchRequest::WithFunctionChains()` or `SearchRequest::AddFunctionChain()`. Function chains and rerank cannot be used together.

```cpp
FunctionChain();
explicit FunctionChain(FunctionChainStage stage, std::string name = "");
```

**PARAMETERS:**

- **stage** (*FunctionChainStage*)

    Execution stage of the chain. For search result post-processing, use `FunctionChainStage::L0_RERANK`, `L1_RERANK`, or `L2_RERANK`.

- **name** (*std::string*)

    Chain name. Default: `""`.

**METHODS:**

- `FunctionChain& WithName(std::string name)`

    Sets the chain name.

- `FunctionChain& Map(const std::string& output, const FunctionChainExpr& expr)`

    Appends a map operation that writes an expression result to the given output column.

- `FunctionChain& Sort(const std::string& by, bool desc = true, const std::string& tie_break_col = "")`

    Appends a sort operation by the given column, optionally with a tie-break column.

- `FunctionChain& Limit(int64_t limit, int64_t offset = 0)`

    Appends a limit operation with an optional offset.

- `FunctionChain& AddOp(const FunctionChainOp& op)`

    Appends a raw operation to the pipeline.

- `FunctionChainStage Stage() const`

    Returns the execution stage of the chain.

- `const std::string& Name() const`

    Returns the chain name.

- `const std::vector<FunctionChainOp>& Ops() const`

    Returns the operations of the chain in pipeline order.

## FunctionChainStage

Execution stage where a function chain runs. Numeric values mirror `schema.proto FunctionChainStage`.

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

**VALUES:**

- **UNSPECIFIED** (0) - Unset stage.

- **INGESTION** (1) - Runs during data ingestion.

- **PRE_PROCESS** (2) - Runs before the search.

- **L0_RERANK** (3) - First rerank stage on search results.

- **L1_RERANK** (4) - Second rerank stage on search results.

- **L2_RERANK** (5) - Third rerank stage on search results.

- **POST_PROCESS** (6) - Runs after the search.

## FunctionChainColumnRef

A reference to a collection field used as a function-chain argument.

```cpp
FunctionChainColumnRef();
explicit FunctionChainColumnRef(std::string name);
```

- **name** (*std::string*) — Field name, e.g. `"$score"`.

**METHODS:**

- `const std::string& Name() const` — Returns the referenced field name.

- `void SetName(std::string name)` — Sets the referenced field name.

## col()

Creates a column reference for use in a function-chain expression.

```cpp
FunctionChainColumnRef col(const std::string& name);
```

- **name** (*std::string*) — The referenced field name.

## FunctionChainExprArg

A single argument of a function-chain expression: either a column reference or a literal.

```cpp
FunctionChainExprArg();
explicit FunctionChainExprArg(FunctionChainColumnRef column);
explicit FunctionChainExprArg(nlohmann::json literal);
```

**METHODS:**

- `bool IsColumn() const` — Returns `true` if this argument is a column reference.

- `bool IsLiteral() const` — Returns `true` if this argument is a literal value.

- `const std::string& ColumnName() const` — Returns the column name when this is a column reference.

- `const nlohmann::json& Literal() const` — Returns the literal value when this is a literal.

## FunctionChainExpr

Function invocation expression used by a function-chain operation, e.g. `"num_combine"`, `"decay"`, `"round_decimal"`.

```cpp
FunctionChainExpr();
explicit FunctionChainExpr(std::string name);
```

- **name** (*std::string*) — Expression name, e.g. `"num_combine"`.

**METHODS:**

- `FunctionChainExpr& AddColumnArg(const std::string& column)` — Appends a column-reference argument.

- `FunctionChainExpr& AddLiteralArg(const nlohmann::json& literal)` — Appends a literal argument.

- `FunctionChainExpr& AddParam(const std::string& key, const nlohmann::json& value)` — Sets a named parameter of the expression.

- `const std::string& Name() const` — Returns the expression name.

- `const std::vector<FunctionChainExprArg>& Args() const` — Returns the expression arguments.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const` — Returns the named parameters of the expression.

## FunctionChainOp

A single operation in a function-chain pipeline, such as `"map"`, `"sort"`, or `"limit"`.

```cpp
FunctionChainOp();
explicit FunctionChainOp(std::string op);
```

- **op** (*std::string*) — Operation name, e.g. `"map"`, `"sort"`, `"limit"`.

**METHODS:**

- `FunctionChainOp& WithExpr(const FunctionChainExpr& expr)` — Attaches a function expression to this operation.

- `FunctionChainOp& AddInput(const std::string& input)` — Adds an input column to this operation.

- `FunctionChainOp& AddOutput(const std::string& output)` — Adds an output column to this operation.

- `FunctionChainOp& AddParam(const std::string& key, const nlohmann::json& value)` — Sets a named parameter of this operation.

- `const std::string& Op() const` — Returns the operation name.

- `bool HasExpr() const` — Returns `true` if a function expression is attached.

- `const FunctionChainExpr& Expr() const` — Returns the attached function expression.

- `const std::vector<std::string>& Inputs() const` — Returns the input columns of this operation.

- `const std::vector<std::string>& Outputs() const` — Returns the output columns of this operation.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const` — Returns the named parameters of this operation.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

// Build a function chain that combines and re-scores search results.
auto expr = milvus::FunctionChainExpr("num_combine")
    .AddColumnArg("$score")
    .AddColumnArg("$boost")
    .AddParam("method", "multiply");

auto chain = milvus::FunctionChain(milvus::FunctionChainStage::L1_RERANK, "combine_chain")
    .Map("$score", expr)
    .Sort("$score", true)
    .Limit(10);

auto request = milvus::SearchRequest()
    .WithCollectionName("demo")
    .WithLimit(10)
    .AddFloatVector({0.1f, 0.2f, 0.3f})
    .WithFunctionChains({chain});

milvus::SearchResponse response;
util::CheckStatus(client->Search(request, response));
```

<!-- category: Vector; action: CREATE; addedSince: v3.0.x -->
