# FunctionScore

A **FunctionScore** instance combines multiple **[Function](../Collections/Function.md)** instances in a configurable manner. It is used both as a V2 request input for single-vector search reranking and as a response domain object.

```rust
pub struct FunctionScore
```

**PARAMETERS:**

- `functions: Vec<[Function](../Collections/Function.md)>`

    The reranking functions applied to the candidate set. See [Function](../Collections/Function.md).

- `params: HashMap<String, serde_json::Value>`

    The combination settings for the reranking functions.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `functions(value)` / `set_functions(value)` / `get_functions()` - Sets or returns the functions.
- `add_function(value)` - Adds one function to the existing values.
- `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the params.

## Example

```rust
let score = FunctionScore::new()
    .add_function(boost_ranker);
let request = SearchRequest::builder()
    .collection_name("my_collection")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .rerank(score)
    .build()?;
```
