# FunctionChainColumnRef

A reference to a collection field used as a function-chain argument.

```cpp
FunctionChainColumnRef();
explicit FunctionChainColumnRef(std::string name);
```

**PARAMETERS:**

- **name** (*std::string*)

    Field name, e.g. `"$score"`.

**METHODS:**

- `const std::string& Name() const`

    Returns the referenced field name.

- `void SetName(std::string name)`

    Sets the referenced field name.

## col()

Creates a column reference for use in a function-chain expression.

```cpp
FunctionChainColumnRef col(const std::string& name);
```

- **name** (*std::string*) — The referenced field name.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// Reference a result column inside a function-chain expression
auto column = col("$score");
```
