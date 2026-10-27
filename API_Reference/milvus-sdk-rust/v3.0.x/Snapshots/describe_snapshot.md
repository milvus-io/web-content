# describe_snapshot()

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

**RETURN TYPE:**

*Result\<DescribeSnapshotResponse\>*

**RETURNS:**

A **DescribeSnapshotResponse** containing the snapshot details. Returns an `Error` if the operation fails.

```rust
DescribeSnapshotResponse
    name() // -> &str
    description() // -> &str
    collection_name() // -> &str
    partition_names() // -> &[String]
    create_ts() // -> i64
    s3_location() // -> &str
```

**METHODS:**

- `name()` (*&str*) -

    The name of the snapshot.

- `description()` (*&str*) -

    The description of the snapshot.

- `collection_name()` (*&str*) -

    The collection the snapshot was taken from.

- `partition_names()` (*&[String]*) -

    The partitions covered by the snapshot.

- `create_ts()` (*i64*) -

    The timestamp when the snapshot was created.

- `s3_location()` (*&str*) -

    The S3 location of the snapshot data.

## Example

```rust
let request = DescribeSnapshotRequest::builder()
    .collection_name("books")
    .snapshot_name("snapshot_1")
    .build()?;
let resp = client.describe_snapshot(request).await?;
println!("created at {}", resp.create_ts());
```
