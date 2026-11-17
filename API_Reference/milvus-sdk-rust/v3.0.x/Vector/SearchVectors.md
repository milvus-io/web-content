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

**Constants:**

- **Float(Vec<Vec<f32>>)**

    Dense vectors of 32-bit floats, one slice per query.

- **Binary(Vec<Vec<u8>>)**

    Binary vectors stored as packed bytes, one slice per query.

- **Float16(Vec<Vec<u16>>)**

    Half-precision float vectors, one slice per query.

- **BFloat16(Vec<Vec<u16>>)**

    BFloat16 vectors, one slice per query.

- **SparseFloat(Vec<SparseVector>)**

    Sparse vectors, one per query.

- **Int8(Vec<Vec<i8>>)**

    Int8 vectors, one slice per query.

- **EmbeddedText(Vec<String>)**

    Plain text inputs embedded by the server for search.

- **EmbeddingLists(Vec<EmbeddingList>)**

    Struct-vector inputs, each carrying its own list of embeddings.

## EmbeddingList

A list of embeddings used by struct-vector search.

```rust
pub struct EmbeddingList
```

**PARAMETERS:**

- `values: EmbeddingListValues`

    The vector payload of the list. Each embedding list is type-homogeneous: all vectors in one list use the same element type (`Float`, `Binary` or `Int8`), matching the `EmbList*` placeholder the server expects for struct-vector search.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `vectors(value)` / `set_vectors(value)` / `get_vectors()` - Sets or returns the float vectors.
- `add_vector(value)` - Adds one float vector to the existing values.
- `binary_vectors(value)` / `set_binary_vectors(value)` / `get_binary_vectors()` - Sets the binary vectors (packed bytes) or returns them; `get_binary_vectors()` returns `None` when the list is not binary-typed.
- `add_binary_vector(value)` - Adds one binary vector to the existing values.
- `int8_vectors(value)` / `set_int8_vectors(value)` / `get_int8_vectors()` - Sets the int8 vectors or returns them; `get_int8_vectors()` returns `None` when the list is not int8-typed.
- `add_int8_vector(value)` - Adds one int8 vector to the existing values.

## EmbeddingListValues

The vector payload held by one struct-vector embedding list.

```rust
pub enum EmbeddingListValues
```

**Constants:**

- `Float(Vec<Vec<f32>>)`

    32-bit float vectors, one slice per query.

- `Binary(Vec<Vec<u8>>)`

    Binary vectors stored as packed bytes, one slice per query.

- `Int8(Vec<Vec<i8>>)`

    Int8 vectors, one slice per query.

## Example

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("struct_vec")
    .vectors(SearchVectors::EmbeddingLists(vec![
        EmbeddingList::new().int8_vectors(vec![vec![1, -2, 3]]),
        EmbeddingList::new().binary_vectors(vec![vec![0b10101010]]),
    ]))
    .limit(5)
    .build()?;
```
