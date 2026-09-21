# UnpinSnapshotData()

Releases a snapshot data pin created by [PinSnapshotData](PinSnapshotData.md).

```rust
pub async fn unpin_snapshot_data(&self, request: UnpinSnapshotDataRequest) -> Result<()>
```

## Request Syntax

```rust
let request = UnpinSnapshotDataRequest::builder()
    .pin_id(pin_id)
    .build()?;
```

**REQUEST FIELDS:**

- `pin_id: i64`

    Identifier of the data pin to release, as returned by [PinSnapshotData](PinSnapshotData.md). Must be greater than zero.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = UnpinSnapshotDataRequest::builder()
    .pin_id(pin_id)
    .build()?;
client.unpin_snapshot_data(request).await?;
```
