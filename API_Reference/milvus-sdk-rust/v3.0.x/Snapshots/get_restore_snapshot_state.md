# get_restore_snapshot_state()

Retrieves the state and progress of a restore-snapshot job.

```rust
pub async fn get_restore_snapshot_state(&self, request: GetRestoreSnapshotStateRequest) -> Result<GetRestoreSnapshotStateResponse>
```

## Request Syntax

```rust
let request = GetRestoreSnapshotStateRequest::builder()
    .job_id(job_id)
    .build()?;
```

**REQUEST FIELDS:**

- `job_id: i64`

    Identifier of the restore job, as returned by [RestoreSnapshot](restore_snapshot.md). Must be greater than zero.

**RETURN TYPE:**

*Result\<GetRestoreSnapshotStateResponse\>*

**RETURNS:**

A **GetRestoreSnapshotStateResponse** containing the restore job information. Returns an `Error` if the operation fails.

```rust
GetRestoreSnapshotStateResponse
    job_info() // -> &RestoreSnapshotJobInfo
```

**METHODS:**

- `job_info()` (*&RestoreSnapshotJobInfo*) -

    The restore job information. See [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md).

## Example

```rust
let request = GetRestoreSnapshotStateRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_restore_snapshot_state(request).await?;
println!("state: {:?}, progress: {}", resp.job_info().get_state(), resp.job_info().get_progress());
```
