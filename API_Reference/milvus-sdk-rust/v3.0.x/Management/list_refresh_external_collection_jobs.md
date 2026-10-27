# list_refresh_external_collection_jobs()

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

**RETURN TYPE:**

*Result\<ListRefreshExternalCollectionJobsResponse\>*

**RETURNS:**

A **ListRefreshExternalCollectionJobsResponse** containing the refresh jobs. Returns an `Error` if the operation fails.

```rust
ListRefreshExternalCollectionJobsResponse
    jobs() // -> &[RefreshExternalCollectionJobInfo]
```

**METHODS:**

- `jobs()` (*&[RefreshExternalCollectionJobInfo]*) -

    The refresh jobs. See [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).

    - `get_job_id()` (*i64*) -

        The ID of the refresh job.

    - `get_collection_name()` (*&str*) -

        The name of the refreshed collection.

    - `get_state()` (*RefreshExternalCollectionStateCode*) -

        The state of the refresh job. See [RefreshExternalCollectionStateCode](RefreshExternalCollectionStateCode.md).

    - `get_progress()` (*i32*) -

        The progress of the refresh job.

    - `get_reason()` (*&str*) -

        The failure reason, when the job failed.

    - `get_external_source()` (*&str*) -

        The external source of the refreshed data.

    - `get_start_time()` (*u64*) -

        The start time of the refresh job.

    - `get_end_time()` (*u64*) -

        The end time of the refresh job.

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
