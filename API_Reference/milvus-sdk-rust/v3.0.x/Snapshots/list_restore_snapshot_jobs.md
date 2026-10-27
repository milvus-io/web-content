# list_restore_snapshot_jobs()

Lists restore-snapshot jobs for a collection, or for the whole database when the collection name is omitted.

```rust
pub async fn list_restore_snapshot_jobs(&self, request: ListRestoreSnapshotJobsRequest) -> Result<ListRestoreSnapshotJobsResponse>
```

## Request Syntax

```rust
let request = ListRestoreSnapshotJobsRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose restore jobs are listed. When empty, restore jobs of all collections in the database are returned.

**RETURN TYPE:**

*Result\<ListRestoreSnapshotJobsResponse\>*

**RETURNS:**

A **ListRestoreSnapshotJobsResponse** containing the restore jobs. Returns an `Error` if the operation fails.

```rust
ListRestoreSnapshotJobsResponse
    jobs() // -> &[RestoreSnapshotJobInfo]
```

**METHODS:**

- `jobs()` (*&[RestoreSnapshotJobInfo]*) -

    The restore jobs. See [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md).

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
let request = ListRestoreSnapshotJobsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_restore_snapshot_jobs(request).await?;
for job in resp.jobs() {
    println!("job {}: {:?}", job.get_job_id(), job.get_state());
}
```
