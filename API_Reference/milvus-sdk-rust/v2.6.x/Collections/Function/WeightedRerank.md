# WeightedRerank

Weighted-score reranking configuration used by [hybrid_search](../../Vector/hybrid_search.md) to combine the results of multiple sub-searches. It derefs to [Function](Function.md), so all `Function` members are available.

```rust
pub struct WeightedRerank
```

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults (the weighted reranker with empty weights).
- `weights(value)` - Sets the per-sub-request weights and returns the updated value.
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
        SubSearchRequest::builder()
            .vector_field("sparse_vector")
            .vectors(SearchVectors::SparseFloat(vec![]))
            .build()?,
    ])
    .rerank(WeightedRerank::new().weights(vec![0.5, 0.5]))
    .limit(5)
    .build()?;
client.hybrid_search(request).await?;
```
