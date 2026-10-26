# FlushAll()

Flushes pending insert data for all collections into durable storage.

```rust
pub async fn flush_all(&self, request: FlushAllRequest) -> Result<FlushAllResponse>
```

## Request Syntax

```rust
let request = FlushAllRequest::builder()
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `wait_flushed_ms: i64`

    Maximum time to wait for the cluster-wide flush to complete. Zero waits indefinitely; negative values are invalid.

**RETURN TYPE:**

*Result\<FlushAllResponse\>*

**RETURNS:**

A **FlushAllResponse** containing the flush-all timestamp. Returns an `Error` if the operation fails.

```rust
FlushAllResponse
    flush_all_timestamp() // -> u64
```

**METHODS:**

- `flush_all_timestamp()` (*u64*) -

    The timestamp of the flush-all operation.

## Example

```rust
let request = FlushAllRequest::builder()
    .wait_flushed_ms(60_000)
    .build()?;
let resp = client.flush_all(request).await?;
println!("flush_all_ts: {}", resp.flush_all_timestamp());
```
