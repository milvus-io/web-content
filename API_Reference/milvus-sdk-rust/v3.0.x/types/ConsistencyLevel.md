# ConsistencyLevel

This enum specifies the consistency guarantee applied to reads.

```rust
pub enum ConsistencyLevel {
    Strong,
    Session,
    Bounded,
    Eventually,
    Customized,
}
```

**VARIANTS:**

- `Strong`

    Reads see all data committed before the request starts. Strongest guarantee, highest latency.

- `Session`

    Uses a per-session timestamp shared across operations so a read sees data written earlier by the same session.

- `Bounded`

    Reads tolerate staleness within a bounded time window, trading a little recency for lower latency.

- `Eventually`

    Reads may see data from some time in the past. Weakest guarantee, lowest latency.

- `Customized`

    Lets the server apply its own configured consistency policy when the request carries no explicit setting. This is the default.

## Example

```rust
let request = SearchRequest::builder()
    .collection_name("books")
    .vector_field("embedding")
    .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4]]))
    .limit(5)
    .consistency_level(ConsistencyLevel::Strong)
    .build()?;
```
