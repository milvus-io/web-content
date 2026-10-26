# AbortImport()

Aborts a bulk-import job.

```rust
pub async fn abort_import(&self, request: DescribeImportRequest) -> Result<BulkImportResponse>
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

    ID of the import job to abort. Required.

- `cluster_id: String`

    **Zilliz Cloud only.** Cluster ID of the target deployment. Cannot be combined with `project_id` and `region_id`.

- `project_id: String`

    **Zilliz Cloud only.** Project ID of the target deployment. Must be specified together with `region_id`.

- `region_id: String`

    **Zilliz Cloud only.** Region ID of the target deployment. Must be specified together with `project_id`.

**RETURN TYPE:**

*Result\<BulkImportResponse\>*

**RETURNS:**

A **BulkImportResponse** containing the bulk-import endpoint response. Returns an `Error` if the operation fails.

```rust
BulkImportResponse
    code() // -> i64
    message() // -> &str
    data() // -> &Value
    get_data_field() // -> Option<&Value>
    job_id() // -> Option<&str>
    state() // -> Option<&str>
    progress() // -> Option<i64>
    reason() // -> Option<&str>
```

**METHODS:**

- `code()` (*i64*) -

    The response status code.

- `message()` (*&str*) -

    The response message.

- `data()` (*&Value*) -

    The raw response data payload.

- `get_data_field()` (*Option<&Value>*) -

    A named field from the response data, when present.

- `job_id()` (*Option<&str>*) -

    The job ID reported by the endpoint, when present.

- `state()` (*Option<&str>*) -

    The job state reported by the endpoint, when present.

- `progress()` (*Option<i64>*) -

    The job progress reported by the endpoint, when present.

- `reason()` (*Option<&str>*) -

    The failure reason reported by the endpoint, when present.

## Example

```rust
let request = DescribeImportRequest::builder()
    .job_id("job-1")
    .build()?;
let resp = bulk.abort_import(request).await?;
```
