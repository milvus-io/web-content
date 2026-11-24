# FunctionChain

This class builds a function chain that post-processes search results. A function chain runs a pipeline of operations (map, sort, limit, ...) on the result columns of a `Search` call. Pass one or more `FunctionChain` objects to `SearchRequest::WithFunctionChains()` or `SearchRequest::AddFunctionChain()`. [Function](../../Collections/Function/Function.md) chains and rerank cannot be used together.

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

- `WithName(std::string name)`

    Sets the chain name.

- `Map(const std::string& output, const FunctionChainExpr& expr)`

    Appends a map operation that writes an expression result to the given output column.

- `Sort(const std::string& by, bool desc = true, const std::string& tie_break_col = "")`

    Appends a sort operation by the given column, optionally with a tie-break column.

- `Limit(int64_t limit, int64_t offset = 0)`

    Appends a limit operation with an optional offset.

- `AddOp(const FunctionChainOp& op)`

    Appends a raw operation to the pipeline.

- `FunctionChainStage Stage() const`

    Returns the execution stage of the chain.

- `const std::string& Name() const`

    Returns the chain name.

- `const std::vector<FunctionChainOp>& Ops() const`

    Returns the operations of the chain in pipeline order.

## Related types

- [FunctionChainStage](FunctionChainStage.md)

- [FunctionChainColumnRef](FunctionChainColumnRef.md)

- [FunctionChainExprArg](FunctionChainExprArg.md)

- [FunctionChainExpr](FunctionChainExpr.md)

- [FunctionChainOp](FunctionChainOp.md)

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = milvus::MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

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
auto status = client->Search(request, response);
```
