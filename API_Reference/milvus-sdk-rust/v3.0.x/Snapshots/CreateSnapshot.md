# CreateSnapshot()

Creates a snapshot of a collection.

```rust
pub async fn create_snapshot(&self, request: CreateSnapshotRequest) -> Result<()>
```

`compaction_protection_seconds` protects the referenced segments from compaction for the given duration; `0` disables the protection.

## Request Syntax

```rust
let request = CreateSnapshotRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to snapshot. Required.

- `snapshot_name: String`

    Name of the snapshot to create. Required.

- `description: String`

    Description of the snapshot.

- `compaction_protection_seconds: i64`

    Number of seconds the referenced segments are protected from compaction; `0` disables the protection. Must not be negative.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success; returns an `Error` on failure.

## Example

```rust
let request = CreateSnapshotRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .compaction_protection_seconds(3600)
    .build()?;
client.create_snapshot(request).await?;
```
