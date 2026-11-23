# refresh_external_collection()

Refreshes an external collection from its external data source.

```rust
pub async fn refresh_external_collection(&self, request: RefreshExternalCollectionRequest) -> Result<RefreshExternalCollectionResponse>
```

The operation is asynchronous and returns a job id that can be polled through [GetRefreshExternalCollectionProgress](get_refresh_external_collection_progress.md).

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

    The external source URI to refresh from.

    Provide `external_source` and `external_spec` together, or omit both; when both are omitted, the refresh reuses the persisted source and spec.

- `external_spec: Option<serde_json::Value>`

    Optional external-source specification as a JSON object.

    The specification carries secondary parameters such as `format`. Possible `format` values are `parquet`, `vortex`, `lance-table`, `iceberg-table`, and `milvus-table`. For `milvus-table`, set `external_source` to a Milvus snapshot metadata JSON path, for example `s3://bucket/snapshots/{collection_id}/metadata/{snapshot_id}.json`.

**RETURN TYPE:**

*Result\<RefreshExternalCollectionResponse\>*

**RETURNS:**

A **RefreshExternalCollectionResponse** containing the ID of the refresh job. Returns an `Error` if the operation fails.

```rust
RefreshExternalCollectionResponse
    job_id() // -> i64
```

**METHODS:**

- `job_id()` (*i64*) -

    The ID of the refresh job.

## Example

```rust
let request = RefreshExternalCollectionRequest::builder()
    .collection_name("books")
    .external_source("data_source")
    .build()?;
let resp = client.refresh_external_collection(request).await?;
println!("job_id: {}", resp.job_id());
```
