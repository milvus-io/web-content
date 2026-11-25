# BoostRerank

Reranker that boosts matches satisfying a filter. Build it with `BoostRerank::new()` and add it to the [FunctionScore](../../Vector/FunctionScore.md) passed to [search](../../Vector/search.md)'s `rerank(...)`. It derefs to [Function](Function.md), so all `Function` members are available.

```rust
pub struct BoostRerank
```

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` - Sets the name and returns the updated value.
- `filter(value)` - Sets the filter expression that boosted matches must satisfy.
- `weight(value)` - Sets the boost weight applied to matching hits.
- `random_score_field(value)` - Sets the field used for randomized scores.
- `random_score_seed(value)` - Sets the seed for randomized scores.
- `function(value)` / `set_function(value)` / `get_function()` - Sets or returns the underlying function.

## Example

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .rerank(
        FunctionScore::new().add_function(
            BoostRerank::new().filter("year > 1900").weight(2.0),
        ),
    )
    .limit(5)
    .build()?;
client.search(request).await?;
```
