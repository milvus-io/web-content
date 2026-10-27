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

    - `get_job_id()` (*i64*) -

        The ID of the restore job.

    - `get_snapshot_name()` (*&str*) -

        The name of the snapshot being restored.

    - `get_database_name()` (*&str*) -

        The database that holds the restored collection.

    - `get_collection_name()` (*&str*) -

        The collection being restored.

    - `get_state()` (*RestoreSnapshotStateCode*) -

        The state of the restore job. See [RestoreSnapshotStateCode](RestoreSnapshotStateCode.md).

    - `get_progress()` (*i32*) -

        The progress of the restore job.

    - `get_reason()` (*&str*) -

        The failure reason, when the job failed.

    - `get_start_time()` (*u64*) -

        The start timestamp of the restore job, in milliseconds.

    - `get_time_cost()` (*u64*) -

        The time cost of the restore job, in milliseconds.

## Example

```rust
let request = GetRestoreSnapshotStateRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_restore_snapshot_state(request).await?;
println!("state: {:?}, progress: {}", resp.job_info().get_state(), resp.job_info().get_progress());
```
