# get_import_progress()

Gets the current state and progress of one bulk-import job.

`DescribeImportRequest` is an alias for `GetImportProgressRequest`; use it with [CommitImport](commit_import.md) and [AbortImport](abort_import.md) to describe the same job being finalized.

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

    **Zilliz Cloud only.** Cluster ID of the target deployment. Cannot be combined with `project_id` and `region_id`.

- `project_id: String`

    **Zilliz Cloud only.** Project ID of the target deployment. Must be specified together with `region_id`.

- `region_id: String`

    **Zilliz Cloud only.** Region ID of the target deployment. Must be specified together with `project_id`.

**RETURN TYPE:**

*Result\<BulkImportResponse\>*

**RETURNS:**

A **[BulkImportResponse](BulkImportResponse.md)** object containing the bulk-import endpoint response. Returns an `Error` if the operation fails. See [BulkImportResponse](BulkImportResponse.md) for its methods.

## Example

```rust
let request = GetImportProgressRequest::builder()
    .job_id("job-1")
    .build()?;
let resp = bulk.get_import_progress(request).await?;
println!("state: {:?}, progress: {:?}", resp.state(), resp.progress());
```
