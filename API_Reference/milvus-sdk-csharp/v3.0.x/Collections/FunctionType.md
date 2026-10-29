# FunctionType

Represents the type of a function in a collection schema.

```csharp
public enum FunctionType
{
    Unknown = 0,
    Bm25 = 1,
    TextEmbedding = 2,
    Rerank = 3,
    MinHash = 4,
    MolFingerprint = 5
}
```

**Constants:**

- **Unknown** (0)

    The function type is unknown.

- **Bm25** (1)

    A BM25 full-text-search function.

- **TextEmbedding** (2)

    A text-embedding function.

- **Rerank** (3)

    A reranking function.

- **MinHash** (4)

    A MinHash LSH function that hashes text into a binary signature.

- **MolFingerprint** (5)

    A molecular-fingerprint function.
