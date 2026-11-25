# RRFRerank

Reciprocal-rank-fusion (RRF) reranking configuration used by [hybrid_search](../../Vector/hybrid_search.md) to combine the results of multiple sub-searches. It derefs to [Function](Function.md), so all `Function` members are available.

```rust
pub struct RRFRerank
```

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults (the RRF reranker with `k = 60`).
- `k(value)` - Sets the `k` parameter and returns the updated value.
- `function(value)` / `set_function(value)` / `get_function()` - Sets or returns the underlying function.

## Example

```rust
let request = HybridSearchRequest::builder()
    .collection_name("books")
    .sub_requests(vec![
        SubSearchRequest::builder()
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
            .build()?,
    ])
    .rerank(RRFRerank::new().k(60))
    .limit(5)
    .build()?;
client.hybrid_search(request).await?;
```
