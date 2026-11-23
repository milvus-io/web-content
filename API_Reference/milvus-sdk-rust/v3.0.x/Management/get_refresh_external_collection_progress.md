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

## Example

```rust
let request = GetRefreshExternalCollectionProgressRequest::builder()
    .job_id(job_id)
    .build()?;
let resp = client.get_refresh_external_collection_progress(request).await?;
println!("state: {:?}", resp.job_info().get_state());
```
