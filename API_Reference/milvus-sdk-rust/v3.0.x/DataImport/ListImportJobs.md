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

    **Zilliz Cloud only.** Cluster ID of the target deployment. Cannot be combined with `project_id` and `region_id`.

- `project_id: String`

    **Zilliz Cloud only.** Project ID of the target deployment. Must be specified together with `region_id`.

- `region_id: String`

    **Zilliz Cloud only.** Region ID of the target deployment. Must be specified together with `project_id`.

- `page_size: u32`

    Number of jobs per page. Must be greater than zero. Defaults to `10`.

- `current_page: u32`

    Page number to return, starting from `1`. Must be greater than zero. Defaults to `1`.

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
let request = ListImportJobsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = bulk.list_import_jobs(request).await?;
```
