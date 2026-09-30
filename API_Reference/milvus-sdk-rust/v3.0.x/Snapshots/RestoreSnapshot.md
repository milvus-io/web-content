# RestoreSnapshot()

Restores a snapshot to a new collection.

```rust
pub async fn restore_snapshot(&self, request: RestoreSnapshotRequest) -> Result<RestoreSnapshotResponse>
```

The target collection must not exist. The returned job id tracks the asynchronous restore through [GetRestoreSnapshotState](GetRestoreSnapshotState.md).

## Request Syntax

```rust
let request = RestoreSnapshotRequest::builder()
    .snapshot_name("snapshot_1")
    .source_collection_name("books")
    .target_collection_name("books_restored")
    .build()?;
```

**REQUEST FIELDS:**

- `snapshot_name: String`

    Name of the snapshot to restore. Required.

- `source_database_name: Option<String>`

    Name of the database that owns the source collection; uses the default database when empty.

- `source_collection_name: String`

    Name of the collection the snapshot was taken from. Required.

- `target_database_name: Option<String>`

    Name of the database the restored collection is created in; uses the default database when empty.

- `target_collection_name: String`

    Name of the new collection to create. Must not already exist. Required.

**RETURNS:**

*Result\<RestoreSnapshotResponse\>*

`RestoreSnapshotResponse` exposes `job_id()` identifying the asynchronous restore job, usable with [GetRestoreSnapshotState](GetRestoreSnapshotState.md). Returns an `Error` on failure.

## Example

```rust
let request = RestoreSnapshotRequest::builder()
    .snapshot_name("snapshot_1")
    .source_collection_name("books")
    .target_collection_name("books_restored")
    .build()?;
let resp = client.restore_snapshot(request).await?;
println!("job_id: {}", resp.job_id());
```
