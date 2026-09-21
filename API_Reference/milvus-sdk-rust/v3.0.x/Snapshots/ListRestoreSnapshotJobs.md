# ListRestoreSnapshotJobs()

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

**RETURNS:**

*Result\<ListRestoreSnapshotJobsResponse\>*

`ListRestoreSnapshotJobsResponse` exposes `jobs()` returning a slice of `RestoreSnapshotJobInfo`, each with the job id, snapshot and collection names, state, progress, reason, start time, and time cost. Returns an `Error` on failure.

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
