# DropSnapshot()

Drops a snapshot of a collection.

```rust
pub async fn drop_snapshot(&self, request: DropSnapshotRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropSnapshotRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the snapshot. Required.

- `snapshot_name: String`

    Name of the snapshot to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = DropSnapshotRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .build()?;
client.drop_snapshot(request).await?;
```
