# FunctionType

Defines the function types available to a Milvus collection schema.

```cpp
enum class FunctionType {
    UNKNOWN = 0,
    BM25 = 1,
    TEXTEMBEDDING = 2,
    RERANK = 3,
    MINHASH = 4,
    MOLFINGERPRINT = 5,
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

- **MINHASH** (4)

    Generates MinHash signatures for approximate set similarity.

- **MOLFINGERPRINT** (5)

    Generates molecular fingerprints for chemistry workloads.
