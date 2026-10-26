# FunctionType

Specifies the type of a collection function.

```rust
pub enum FunctionType {
    Unknown,
    Bm25,
    TextEmbedding,
    Rerank,
    MinHash,
    MolFingerprint,
}
```

**VARIANTS:**

- `Unknown`

    Unspecified or unrecognized function type. This is the default.

- `Bm25`

    BM25 ranking function that turns an input text field into a sparse vector output field.

- `TextEmbedding`

    Text-embedding function that turns an input text field into a dense vector output field.

- `Rerank`

    Reranking function that applies a configured reranking strategy to a candidate set.

- `MinHash`

    MinHash function that turns an input text field into a binary MinHash signature.

- `MolFingerprint`

    Molecular-fingerprint function that turns an input SMILES field into a binary fingerprint.

## Example

```rust
let function = Function::new()
    .name("bm25_title")
    .function_type(FunctionType::Bm25);
```
