# EntityRow

This type alias represents one row of entity data as a JSON map of field name to value.

```rust
pub type EntityRow = serde_json::Map<String, serde_json::Value>;
```

## Example

```rust
let rows: Vec<EntityRow> = vec![serde_json::json!({
    "id": 1,
    "title": "book title",
    "embedding": [0.1, 0.2, 0.3, 0.4],
}).as_object().unwrap().clone()];
```
