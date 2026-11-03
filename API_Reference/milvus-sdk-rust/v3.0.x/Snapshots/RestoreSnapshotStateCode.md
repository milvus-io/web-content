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

## Example

```rust
use milvus::v2::prelude::*;

let request = GetRestoreSnapshotStateRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_restore_snapshot_state(request).await?;
match resp.job_info().get_state() {
    RestoreSnapshotStateCode::Completed => println!("restore completed"),
    RestoreSnapshotStateCode::Failed => println!("restore failed: {}", resp.job_info().get_reason()),
    _ => println!("restore in progress"),
}
```
