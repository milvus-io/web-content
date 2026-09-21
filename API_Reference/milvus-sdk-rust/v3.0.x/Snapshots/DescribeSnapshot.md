# DescribeSnapshot()

Describes a snapshot of a collection.

```rust
pub async fn describe_snapshot(&self, request: DescribeSnapshotRequest) -> Result<DescribeSnapshotResponse>
```

## Request Syntax

```rust
let request = DescribeSnapshotRequest::builder()
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

    Name of the snapshot to describe. Required.

**RETURNS:**

*Result\<DescribeSnapshotResponse\>*

`DescribeSnapshotResponse` exposes `name()`, `description()`, `collection_name()`, `partition_names()` returning the partitions included in the snapshot, `create_ts()` returning the create timestamp, and `s3_location()` returning the location of the snapshot meta file when exported. Returns an `Error` on failure.

## Example

```rust
let request = DescribeSnapshotRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .build()?;
let resp = client.describe_snapshot(request).await?;
println!("created at {}", resp.create_ts());
```
