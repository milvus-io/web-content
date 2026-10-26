# RestoreSnapshot()

Restores a snapshot to a new collection.

```rust
pub async fn restore_snapshot(&self, request: RestoreSnapshotRequest) -> Result<RestoreSnapshotResponse>
```

The target collection must not exist. The returned job id tracks the asynchronous restore through [GetRestoreSnapshotState](get_restore_snapshot_state.md).

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

**RETURN TYPE:**

*Result\<RestoreSnapshotResponse\>*

**RETURNS:**

A **RestoreSnapshotResponse** containing the ID of the restore job. Returns an `Error` if the operation fails.

```rust
RestoreSnapshotResponse
    job_id() // -> i64
```

**METHODS:**

- `job_id()` (*i64*) -

    The ID of the restore job.

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
