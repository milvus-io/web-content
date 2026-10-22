# CompactionStateCode

This enum represents the state of a compaction task, as returned by `GetCompactionState()` and `GetCompactionPlans()`.

```rust
pub enum CompactionStateCode {
    Unknown,
    Executing,
    Completed,
}
```

**VARIANTS:**

- `Unknown`

    The compaction state is unknown. This is the default.

- `Executing`

    A compaction task is currently running.

- `Completed`

    A compaction task has completed.

## Example

```rust
let resp = client.get_compaction_state(request).await?;
if resp.state() == CompactionStateCode::Completed {
    println!("compaction completed");
}
```
