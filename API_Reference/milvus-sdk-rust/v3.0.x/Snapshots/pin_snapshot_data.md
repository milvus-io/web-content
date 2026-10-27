# pin_snapshot_data()

Pins the data referenced by a snapshot so it is not reclaimed.

```rust
pub async fn pin_snapshot_data(&self, request: PinSnapshotDataRequest) -> Result<PinSnapshotDataResponse>
```

`ttl_seconds` of `0` means the pin never expires; otherwise it auto-expires after the given number of seconds. The returned pin id is passed to [UnpinSnapshotData](unpin_snapshot_data.md).

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

**RETURN TYPE:**

*Result\<PinSnapshotDataResponse\>*

**RETURNS:**

A **PinSnapshotDataResponse** containing the ID of the pin. Returns an `Error` if the operation fails.

```rust
PinSnapshotDataResponse
    pin_id() // -> i64
```

**METHODS:**

- `pin_id()` (*i64*) -

    The ID of the pin.

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
