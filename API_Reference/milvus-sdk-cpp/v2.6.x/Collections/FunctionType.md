# FunctionType

Defines the function types available to a Milvus collection schema.

```cpp
enum class FunctionType {
    UNKNOWN = 0,
    BM25 = 1,
    TEXTEMBEDDING = 2,
    RERANK = 3,
};
```

**Constants:**

- **UNKNOWN** (0)

    No function type is set.

- **BM25** (1)

    Generates sparse vectors from text for full-text search.

- **TEXTEMBEDDING** (2)

    Generates dense text embeddings.

- **RERANK** (3)

    Reranks or combines results from multiple vector fields.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <milvus/types/Function.h>
using namespace milvus;

// Add a BM25 full-text-search function to the collection schema
Function bm25("text_bm25", FunctionType::BM25, "Full-text search over the title field");
bm25.AddInputFieldName("title");
bm25.AddOutputFieldName("title_bm25");

CollectionSchema schema("my_collection");
schema.AddFunction(std::make_shared<Function>(bm25));
```
