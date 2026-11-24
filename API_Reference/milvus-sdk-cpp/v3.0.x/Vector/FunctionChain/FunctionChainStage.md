# FunctionChainStage

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

**Constants:**

- **UNSPECIFIED** (0) - Unset stage.

- **INGESTION** (1) - Runs during data ingestion.

- **PRE_PROCESS** (2) - Runs before the search.

- **L0_RERANK** (3) - First rerank stage on search results.

- **L1_RERANK** (4) - Second rerank stage on search results.

- **L2_RERANK** (5) - Third rerank stage on search results.

- **POST_PROCESS** (6) - Runs after the search.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// Build a FunctionChain that reranks search results
auto chain = FunctionChain(FunctionChainStage::L1_RERANK, "combine_chain")
    .Sort("$score", true)
    .Limit(10);
```
