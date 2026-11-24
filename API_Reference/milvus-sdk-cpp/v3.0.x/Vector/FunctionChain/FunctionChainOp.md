# FunctionChainOp

A single operation in a function-chain pipeline, such as `"map"`, `"sort"`, or `"limit"`.

```cpp
FunctionChainOp();
explicit FunctionChainOp(std::string op);
```

**PARAMETERS:**

- **op** (*std::string*)

    Operation name, e.g. `"map"`, `"sort"`, `"limit"`.

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

    Returns the operation name.

- `bool HasExpr() const`

    Returns `true` if a function expression is attached.

- `const FunctionChainExpr& Expr() const`

    Returns the attached function expression.

- `const std::vector<std::string>& Inputs() const`

    Returns the input columns of this operation.

- `const std::vector<std::string>& Outputs() const`

    Returns the output columns of this operation.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

    Returns the named parameters of this operation.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// A raw map operation with an expression
auto op = FunctionChainOp("map")
    .WithExpr(FunctionChainExpr("round_decimal"))
    .AddOutput("$score");
```
