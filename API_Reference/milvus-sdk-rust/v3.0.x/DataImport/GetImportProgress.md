# GetImportProgress()

Gets the current state and progress of one bulk-import job.

```rust
pub async fn get_import_progress(&self, request: GetImportProgressRequest) -> Result<BulkImportResponse>
```

## Request Syntax

```rust
let request = GetImportProgressRequest::builder()
    .job_id("job-1")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database that holds the collection.

- `job_id: String`

    ID of the import job. Required.

- `cluster_id: String`

    Cluster ID for Zilliz Cloud deployments. Cannot be combined with `project_id` and `region_id`.

- `project_id: String`

    Project ID for Zilliz Cloud deployments. Must be specified together with `region_id`.

- `region_id: String`

    Region ID for Zilliz Cloud deployments. Must be specified together with `project_id`.

**RETURNS:**

*Result\<BulkImportResponse\>*

`BulkImportResponse` exposes `code()`, `message()`, and `data()`, with the convenience accessors `state()`, `progress()`, and `reason()` for the endpoint-specific job state. Returns `Error` on failure.

## Example

```rust
let request = GetImportProgressRequest::builder()
    .job_id("job-1")
    .build()?;
let resp = bulk.get_import_progress(request).await?;
println!("state: {:?}, progress: {:?}", resp.state(), resp.progress());
```
