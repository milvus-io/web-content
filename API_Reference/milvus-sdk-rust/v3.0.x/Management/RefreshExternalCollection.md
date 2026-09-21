# RefreshExternalCollection()

Refreshes an external collection from its external data source.

```rust
pub async fn refresh_external_collection(&self, request: RefreshExternalCollectionRequest) -> Result<RefreshExternalCollectionResponse>
```

The operation is asynchronous and returns a job id that can be polled through [GetRefreshExternalCollectionProgress](GetRefreshExternalCollectionProgress.md).

## Request Syntax

```rust
let request = RefreshExternalCollectionRequest::builder()
    .collection_name("books")
    .external_source("data_source")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the external collection to refresh. Required.

- `external_source: String`

    Name of the external data source to refresh from.

- `external_spec: Option<serde_json::Value>`

    Optional external-source specification as a JSON object.

**RETURNS:**

*Result\<RefreshExternalCollectionResponse\>*

`RefreshExternalCollectionResponse` exposes `job_id()` identifying the refresh job, usable with [GetRefreshExternalCollectionProgress](GetRefreshExternalCollectionProgress.md). Returns an `Error` on failure.

## Example

```rust
let request = RefreshExternalCollectionRequest::builder()
    .collection_name("books")
    .external_source("data_source")
    .build()?;
let resp = client.refresh_external_collection(request).await?;
println!("job_id: {}", resp.job_id());
```
