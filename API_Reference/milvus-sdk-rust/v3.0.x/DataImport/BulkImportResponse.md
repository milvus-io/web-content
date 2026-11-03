# BulkImportResponse

The envelope returned by the Milvus bulk-import REST endpoints: the server `code`/`message` plus the endpoint-specific `data` payload. `bulk_import()`, `abort_import()`, `commit_import()`, `get_import_progress()`, and `list_import_jobs()` all return this same response type.

```rust
pub struct BulkImportResponse
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
let resp = bulk.bulk_import(
    BulkImportRequest::builder()
        .collection_name("my_collection")
        .files(vec![["/tmp/data.json".to_string()]])
        .build()?,
).await?;
println!("job: {:?}, state: {:?}", resp.job_id(), resp.state());
```
