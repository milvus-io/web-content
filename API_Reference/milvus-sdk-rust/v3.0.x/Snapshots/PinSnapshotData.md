# PinSnapshotData()

Pins the data referenced by a snapshot so it is not reclaimed.

```rust
pub async fn pin_snapshot_data(&self, request: PinSnapshotDataRequest) -> Result<PinSnapshotDataResponse>
```

`ttl_seconds` of `0` means the pin never expires; otherwise it auto-expires after the given number of seconds. The returned pin id is passed to [UnpinSnapshotData](UnpinSnapshotData.md).

## Request Syntax

```rust
let request = PinSnapshotDataRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .ttl_seconds(3600)
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the snapshot. Required.

- `snapshot_name: String`

    Name of the snapshot whose data is pinned. Required.

- `ttl_seconds: i64`

    Number of seconds the pin stays valid before auto-expiring; `0` means the pin never expires. Must not be negative.

**RETURNS:**

*Result\<PinSnapshotDataResponse\>*

`PinSnapshotDataResponse` exposes `pin_id()` identifying the data pin, usable with [UnpinSnapshotData](UnpinSnapshotData.md). Returns an `Error` on failure.

## Example

```rust
let request = PinSnapshotDataRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .ttl_seconds(3600)
    .build()?;
let resp = client.pin_snapshot_data(request).await?;
println!("pin_id: {}", resp.pin_id());
```
