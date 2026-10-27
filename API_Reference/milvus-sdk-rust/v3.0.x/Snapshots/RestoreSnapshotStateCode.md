# RestoreSnapshotStateCode

This enum represents the state of a snapshot restore job.

```rust
pub enum RestoreSnapshotStateCode {
    Unknown,
    Pending,
    Executing,
    Completed,
    Failed,
}
```

**Constants:**

- **Unknown**

    The restore state is unknown. This is the default.

- **Pending**

    The restore task has been created but has not started running.

- **Executing**

    The restore task is running.

- **Completed**

    The restore task completed successfully.

- **Failed**

    The restore task failed.
