# GetRefreshExternalCollectionProgress()

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

    Identifier of the refresh job, as returned by [RefreshExternalCollection](RefreshExternalCollection.md). Must be greater than zero.

**RETURNS:**

*Result\<GetRefreshExternalCollectionProgressResponse\>*

`GetRefreshExternalCollectionProgressResponse` exposes `job_info()` returning a `RefreshExternalCollectionJobInfo` with the job id, collection name, `RefreshExternalCollectionStateCode` state, progress, and reason. Returns an `Error` on failure.

## Example

```rust
let request = GetRefreshExternalCollectionProgressRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_refresh_external_collection_progress(request).await?;
println!("state: {:?}", resp.job_info().get_state());
```
