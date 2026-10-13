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

**RETURN TYPE:**

*Result\<ListSnapshotsResponse\>*

**RETURNS:**

A **ListSnapshotsResponse** containing the names of the snapshots. Returns an `Error` if the operation fails.

```rust
ListSnapshotsResponse
    snapshots() // -> &[String]
```

**METHODS:**

- `snapshots()` (*&[String]*) -

    The names of the snapshots.

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
