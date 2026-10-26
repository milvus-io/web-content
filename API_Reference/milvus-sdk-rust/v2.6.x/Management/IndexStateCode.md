# IndexStateCode

This enum represents the build state of an index, as returned in each [IndexDesc](IndexDesc.md).

```rust
pub enum IndexStateCode {
    None,
    Unissued,
    InProgress,
    Finished,
    Failed,
    Retry,
}
```

**Constants:**

- **None**

    No index has been created for the field. This is the default.

- **Unissued**

    The index build task has been created but has not started running.

- **InProgress**

    The index build is currently in progress.

- **Finished**

    The index build has completed successfully.

- **Failed**

    The index build failed.

- **Retry**

    The index build failed but will be retried.

## Example

```rust
for desc in resp.indexes() {
    if desc.get_state() == IndexStateCode::Finished {
        println!("index {} is ready", desc.get_index_name());
    }
}
```
