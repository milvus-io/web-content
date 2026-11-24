# FunctionChainExprArg

A single argument of a function-chain expression: either a column reference or a literal.

```cpp
FunctionChainExprArg();
explicit FunctionChainExprArg(FunctionChainColumnRef column);
explicit FunctionChainExprArg(nlohmann::json literal);
```

**METHODS:**

- `bool IsColumn() const`

    Returns `true` if this argument is a column reference.

- `bool IsLiteral() const`

    Returns `true` if this argument is a literal value.

- `const std::string& ColumnName() const`

    Returns the column name when this is a column reference.

- `const nlohmann::json& Literal() const`

    Returns the literal value when this is a literal.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// A column reference argument inside a function-chain expression
auto arg = FunctionChainExprArg(col("$score"));
```
