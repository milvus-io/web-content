# commit_import()

Commits a bulk-import job after all its data files have been uploaded and flushed.

```rust
pub async fn commit_import(&self, request: DescribeImportRequest) -> Result<BulkImportResponse>
```

## Request Syntax

```rust
let request = DescribeImportRequest::builder()
    .job_id("job-1")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: String`

    Name of the database that holds the collection.

- `job_id: String`

    ID of the import job to commit. Required.

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
let request = DescribeImportRequest::builder()
    .job_id("job-1")
    .build()?;
let resp = bulk.commit_import(request).await?;
```
