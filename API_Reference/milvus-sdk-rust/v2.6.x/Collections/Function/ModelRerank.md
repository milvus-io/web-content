# ModelRerank

Reranker backed by a configured model. Build it with `ModelRerank::new()` and add it to the [FunctionScore](../../Vector/FunctionScore.md) passed to [search](../../Vector/search.md)'s `rerank(...)`. It derefs to [Function](Function.md), so all `Function` members are available.

```rust
pub struct ModelRerank
```

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` - Sets the name and returns the updated value.
- `provider(value)` - Sets the model provider and returns the updated value.
- `queries(value)` - Sets the queries and returns the updated value.
- `endpoint(value)` - Sets the model endpoint and returns the updated value.
- `max_client_batch_size(value)` - Sets the maximum client batch size and returns the updated value.
- `function(value)` / `set_function(value)` / `get_function()` - Sets or returns the underlying function.

## Example

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .rerank(
        FunctionScore::new().add_function(
            ModelRerank::new()
                .provider("tei")
                .endpoint("http://localhost:8080")
                .max_client_batch_size(16),
        ),
    )
    .limit(5)
    .build()?;
client.search(request).await?;
```
