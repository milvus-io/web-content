# FunctionChainExpr

[Function](../../Collections/Function/Function.md) invocation expression used by a function-chain operation, e.g. `"num_combine"`, `"decay"`, `"round_decimal"`.

```cpp
FunctionChainExpr();
explicit FunctionChainExpr(std::string name);
```

**PARAMETERS:**

- **name** (*std::string*)

    Expression name, e.g. `"num_combine"`.

**METHODS:**

- `FunctionChainExpr& AddColumnArg(const std::string& column)`

    Appends a column-reference argument.

- `FunctionChainExpr& AddLiteralArg(const nlohmann::json& literal)`

    Appends a literal argument.

- `FunctionChainExpr& AddParam(const std::string& key, const nlohmann::json& value)`

    Sets a named parameter of the expression.

- `const std::string& Name() const`

    Returns the expression name.

- `const std::vector<FunctionChainExprArg>& Args() const`

    Returns the expression arguments.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

    Returns the named parameters of the expression.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// Build a num_combine expression that multiplies $score and $boost
auto expr = FunctionChainExpr("num_combine")
    .AddColumnArg("$score")
    .AddColumnArg("$boost")
    .AddParam("method", "multiply");
```
