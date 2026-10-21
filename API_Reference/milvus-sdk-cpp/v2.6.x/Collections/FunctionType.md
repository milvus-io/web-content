# FunctionType

This enum identifies the built-in function type associated with a schema-level `Function`.

```cpp
enum class FunctionType {
    UNKNOWN = 0,
    BM25 = 1,
    TEXTEMBEDDING = 2,
    RERANK = 3,
};
```

**VALUES:**

- **UNKNOWN** (0) - Unset or unrecognized function type.

- **BM25** (1) - Built-in BM25 sparse-embedding function.

- **TEXTEMBEDDING** (2) - Text-embedding function.

- **RERANK** (3) - Search reranking function.

## Example

```cpp
#include <milvus/types/FunctionType.h>
using namespace milvus;

auto function = Function();
function.SetFunctionType(FunctionType::BM25);
```
