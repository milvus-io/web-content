# ListSnapshots()

Lists snapshot names for a collection, or for the whole database when the collection name is omitted.

```rust
pub async fn list_snapshots(&self, request: ListSnapshotsRequest) -> Result<ListSnapshotsResponse>
```

## Request Syntax

```rust
let request = ListSnapshotsRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose snapshots are listed. When empty, all snapshots in the database are returned.

**RETURNS:**

*Result\<ListSnapshotsResponse\>*

`ListSnapshotsResponse` exposes `snapshots()` returning the snapshot names. Returns an `Error` on failure.

## Example

```rust
let request = ListSnapshotsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.list_snapshots(request).await?;
for name in resp.snapshots() {
    println!("snapshot: {name}");
}
```
