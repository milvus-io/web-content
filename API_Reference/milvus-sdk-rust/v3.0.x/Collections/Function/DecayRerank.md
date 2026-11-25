# DecayRerank

Reranker that applies distance-based score decay. Build it with `DecayRerank::new()` and add it to the [FunctionScore](../../Vector/FunctionScore.md) passed to [search](../../Vector/search.md)'s `rerank(...)`. It derefs to [Function](Function.md), so all `Function` members are available.

```rust
pub struct DecayRerank
```

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` - Sets the name and returns the updated value.
- `decay_function(value)` - Sets the decay function and returns the updated value.
- `origin(value)` - Sets the origin and returns the updated value.
- `offset(value)` - Sets the offset and returns the updated value.
- `scale(value)` - Sets the scale and returns the updated value.
- `decay(value)` - Sets the decay factor and returns the updated value.
- `function(value)` / `set_function(value)` / `get_function()` - Sets or returns the underlying function.

## Example

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .rerank(
        FunctionScore::new().add_function(
            DecayRerank::new()
                .decay_function("gauss")
                .origin(1900)
                .offset(50)
                .scale(10)
                .decay(0.1),
        ),
    )
    .limit(5)
    .build()?;
client.search(request).await?;
```
