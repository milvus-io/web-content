# GetRestoreSnapshotState()

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

    Identifier of the restore job, as returned by [RestoreSnapshot](RestoreSnapshot.md). Must be greater than zero.

**RETURNS:**

*Result\<GetRestoreSnapshotStateResponse\>*

`GetRestoreSnapshotStateResponse` exposes `job_info()` returning a `RestoreSnapshotJobInfo` with the job id, snapshot and collection names, `RestoreSnapshotStateCode` state, progress percentage, failure reason, start time, and time cost. Returns an `Error` on failure.

## Example

```rust
let request = GetRestoreSnapshotStateRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_restore_snapshot_state(request).await?;
println!("state: {:?}, progress: {}", resp.job_info().get_state(), resp.job_info().get_progress());
```
