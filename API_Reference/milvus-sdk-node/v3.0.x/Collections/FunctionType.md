# FunctionType

Defines the type of a schema function that transforms raw data into vectors.

```typescript
export enum FunctionType {
  Unknown = 0,
  BM25 = 1,
  TEXTEMBEDDING = 2,
  RERANK = 3,
  MINHASH = 4,
  MOLFINGERPRINT = 5,
}
```

**Constants:**

- **Unknown** (0)

    Sets the function type to **Unknown**.

- **BM25** (1)

    Sets the function type to **BM25**, a sparse-vector function based on the BM25 algorithm.

- **TEXTEMBEDDING** (2)

    Sets the function type to **TEXTEMBEDDING**, a text-embedding function that produces dense vectors.

- **RERANK** (3)

    Sets the function type to **RERANK**, a reranking function.

- **MINHASH** (4)

    Sets the function type to **MINHASH**, a MinHash function for similarity detection.

- **MOLFINGERPRINT** (5)

    Sets the function type to **MOLFINGERPRINT**, a molecule-fingerprint function.
