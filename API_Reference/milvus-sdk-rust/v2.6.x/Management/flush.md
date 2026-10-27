# flush()

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

**RETURN TYPE:**

*Result\<FlushResponse\>*

**RETURNS:**

A **FlushResponse** containing the flushed segment IDs and timestamps. Returns an `Error` if the operation fails.

```rust
FlushResponse
    database_name() // -> &str
    segment_ids() // -> &HashMap<String, Vec<i64>>
    flush_timestamps() // -> &HashMap<String, u64>
```

**METHODS:**

- `database_name()` (*&str*) -

    The database that holds the flushed collection.

- `segment_ids()` (*&HashMap<String, Vec<i64>>*) -

    The segment IDs produced for each flushed collection.

- `flush_timestamps()` (*&HashMap<String, u64>*) -

    The flush timestamps per collection.

## Example

```rust
let request = FlushRequest::builder()
    .collection_names(["books"])
    .wait_flushed_ms(60_000)
    .build()?;
let resp = client.flush(request).await?;
```
