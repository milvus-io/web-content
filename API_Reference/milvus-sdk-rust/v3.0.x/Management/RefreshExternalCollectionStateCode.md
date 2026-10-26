# RefreshExternalCollectionStateCode

This enum represents the state of an external collection refresh job.

```rust
pub enum RefreshExternalCollectionStateCode {
    Unknown,
    Pending,
    InProgress,
    Completed,
    Failed,
}
```

**Constants:**

- **Unknown** - The refresh state is unknown. This is the default.

- **Pending** - The refresh task has been created but has not started running.

- **InProgress** - The refresh task is running.

- **Completed** - The refresh task completed successfully.

- **Failed** - The refresh task failed.
