# ListRefreshExternalCollectionJobs()

Lists refresh-external-collection jobs for a collection, or for the whole database when the collection name is omitted.

```rust
pub async fn list_refresh_external_collection_jobs(&self, request: ListRefreshExternalCollectionJobsRequest) -> Result<ListRefreshExternalCollectionJobsResponse>
```

## Request Syntax

```rust
let request = ListRefreshExternalCollectionJobsRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose refresh jobs are listed. When empty, refresh jobs of all collections in the database are returned.

**RETURNS:**

*Result\<ListRefreshExternalCollectionJobsResponse\>*

`ListRefreshExternalCollectionJobsResponse` exposes `jobs()` returning a slice of `RefreshExternalCollectionJobInfo`, each with the job id, collection name, state, progress, and reason. Returns an `Error` on failure.

## Example

```rust
let request = ListRefreshExternalCollectionJobsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_refresh_external_collection_jobs(request).await?;
for job in resp.jobs() {
    println!("job {}: {:?}", job.get_job_id(), job.get_state());
}
```
