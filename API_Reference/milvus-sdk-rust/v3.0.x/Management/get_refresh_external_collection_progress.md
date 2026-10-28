# get_refresh_external_collection_progress()

Retrieves the state and progress of a refresh-external-collection job.

```rust
pub async fn get_refresh_external_collection_progress(&self, request: GetRefreshExternalCollectionProgressRequest) -> Result<GetRefreshExternalCollectionProgressResponse>
```

## Request Syntax

```rust
let request = GetRefreshExternalCollectionProgressRequest::builder()
    .job_id(job_id)
    .build()?;
```

**REQUEST FIELDS:**

- `job_id: i64`

    Identifier of the refresh job, as returned by [RefreshExternalCollection](refresh_external_collection.md). Must be greater than zero.

**RETURN TYPE:**

*Result\<GetRefreshExternalCollectionProgressResponse\>*

**RETURNS:**

A **GetRefreshExternalCollectionProgressResponse** containing the refresh job information. Returns an `Error` if the operation fails.

```rust
GetRefreshExternalCollectionProgressResponse
    job_info() // -> &RefreshExternalCollectionJobInfo
```

**METHODS:**

- `job_info()` (*&RefreshExternalCollectionJobInfo*) -

    The refresh job information. See [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).

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

    - `get_external_spec()` (*&str*) -

        The detailed external specification reported by the server.

    - `get_start_time()` (*u64*) -

        The start time of the refresh job.

    - `get_end_time()` (*u64*) -

        The end time of the refresh job.

## Example

```rust
let request = GetRefreshExternalCollectionProgressRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_refresh_external_collection_progress(request).await?;
println!("state: {:?}", resp.job_info().get_state());
```
