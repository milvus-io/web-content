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

- **Unknown**

    The refresh state is unknown. This is the default.

- **Pending**

    The refresh task has been created but has not started running.

- **InProgress**

    The refresh task is running.

- **Completed**

    The refresh task completed successfully.

- **Failed**

    The refresh task failed.

## Example

```rust
use milvus::v2::prelude::*;

let request = GetRefreshExternalCollectionProgressRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_refresh_external_collection_progress(request).await?;
match resp.job_info().get_state() {
    RefreshExternalCollectionStateCode::Completed => println!("refresh completed"),
    RefreshExternalCollectionStateCode::Failed => println!("refresh failed: {}", resp.job_info().get_reason()),
    _ => println!("refresh in progress"),
}
```
