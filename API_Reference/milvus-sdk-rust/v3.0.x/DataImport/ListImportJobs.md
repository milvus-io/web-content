# ListImportJobs()

Lists bulk-import jobs visible to the target deployment.

```rust
pub async fn list_import_jobs(&self, request: ListImportJobsRequest) -> Result<BulkImportResponse>
```

## Request Syntax

```rust
let request = ListImportJobsRequest::builder()
    .collection_name("books")
    .page_size(10)
    .current_page(1)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database that holds the collection.

- `collection_name: String`

    Name of the collection to filter jobs by.

- `cluster_id: String`

    Cluster ID for Zilliz Cloud deployments. Cannot be combined with `project_id` and `region_id`.

- `project_id: String`

    Project ID for Zilliz Cloud deployments. Must be specified together with `region_id`.

- `region_id: String`

    Region ID for Zilliz Cloud deployments. Must be specified together with `project_id`.

- `page_size: u32`

    Number of jobs per page. Must be greater than zero. Defaults to `10`.

- `current_page: u32`

    Page number to return, starting from `1`. Must be greater than zero. Defaults to `1`.

**RETURNS:**

*Result\<BulkImportResponse\>*

`BulkImportResponse` exposes `code()`, `message()`, and `data()`, where `data()` holds the endpoint-specific job list. Returns `Error` on failure.

## Example

```rust
let request = ListImportJobsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = bulk.list_import_jobs(request).await?;
```
