# GetFlushAllState()

Retrieves the state of an earlier flush-all operation.

```rust
pub async fn get_flush_all_state(&self, request: GetFlushAllStateRequest) -> Result<GetFlushAllStateResponse>
```

## Request Syntax

```rust
let request = GetFlushAllStateRequest::builder()
    .flush_all_timestamp(flush_all_ts)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `flush_all_timestamp: u64`

    Timestamp returned by an earlier [FlushAll](FlushAll.md) operation.

- `channel_timestamps: HashMap<String, u64>`

    Per-channel timestamps to query instead of the aggregate `flush_all_timestamp`.

**RETURNS:**

*Result\<GetFlushAllStateResponse\>*

`GetFlushAllStateResponse` exposes `is_flushed()` returning whether the flush-all operation has completed. Returns an `Error` on failure.

## Example

```rust
let request = GetFlushAllStateRequest::builder()
    .flush_all_timestamp(flush_all_ts)
    .build()?;
let resp = client.get_flush_all_state(request).await?;
assert!(resp.is_flushed());
```
