# Flush()

Flushes pending insert data for a collection into durable storage.

```rust
pub async fn flush(&self, request: FlushRequest) -> Result<FlushResponse>
```

## Request Syntax

```rust
let request = FlushRequest::builder()
    .collection_names(["books"])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_names: Vec<String>`

    Names of the collections to flush. At least one non-empty value is required.

- `wait_flushed_ms: i64`

    Maximum time to wait for all returned segments to be flushed. Zero waits indefinitely; negative values are invalid.

**RETURNS:**

*Result\<FlushResponse\>*

`FlushResponse` exposes `database_name()`, `segment_ids()` returning the per-collection segment IDs, and `flush_timestamps()` returning the per-collection flush timestamps. Returns an `Error` on failure.

## Example

```rust
let request = FlushRequest::builder()
    .collection_names(["books"])
    .wait_flushed_ms(60_000)
    .build()?;
let resp = client.flush(request).await?;
```
