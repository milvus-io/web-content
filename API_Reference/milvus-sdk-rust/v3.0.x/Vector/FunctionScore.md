# FunctionScore

This struct carries reranking functions and combination settings used by search. It is used both as a V2 request input and as a response domain object.

```rust
pub struct FunctionScore
```

**PARAMETERS:**

- `functions: Vec<Function>`

    Reranking functions applied to the candidate set.

- `params: HashMap<String, serde_json::Value>`

    Combination settings for the reranking functions.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `functions(value)` / `set_functions(value)` / `get_functions()` - Sets or returns the functions.
- `add_function(value)` - Adds one function to the existing values.
- `params(value)` / `set_params(value)` / `get_params()` - Sets or returns the params.

## Example

```rust
let rerank = FunctionScore::new()
    .add_function(RRFRerank::new().k(60));
```
