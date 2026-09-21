# SearchVectors

This enum represents the vector or text inputs accepted by a search request.

```rust
pub enum SearchVectors {
    Float(Vec<Vec<f32>>),
    Binary(Vec<Vec<u8>>),
    Float16(Vec<Vec<u16>>),
    BFloat16(Vec<Vec<u16>>),
    SparseFloat(Vec<SparseVector>),
    Int8(Vec<Vec<i8>>),
    EmbeddedText(Vec<String>),
    EmbeddingLists(Vec<EmbeddingList>),
}
```

**VARIANTS:**

- `Float(Vec<Vec<f32>>)` - Dense vectors of 32-bit floats, one slice per query.
- `Binary(Vec<Vec<u8>>)` - Binary vectors stored as packed bytes, one slice per query.
- `Float16(Vec<Vec<u16>>)` - Half-precision float vectors, one slice per query.
- `BFloat16(Vec<Vec<u16>>)` - BFloat16 vectors, one slice per query.
- `SparseFloat(Vec<SparseVector>)` - Sparse vectors, one per query.
- `Int8(Vec<Vec<i8>>)` - Int8 vectors, one slice per query.
- `EmbeddedText(Vec<String>)` - Plain text inputs embedded by the server for search.
- `EmbeddingLists(Vec<EmbeddingList>)` - Struct-vector inputs, each carrying its own list of embeddings.

## Example

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .limit(5)
    .build()?;
```
