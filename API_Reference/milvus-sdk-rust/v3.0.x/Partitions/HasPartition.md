# HasPartition()

Checks whether a named partition exists in a collection.

```rust
pub async fn has_partition(
    &self,
    request: HasPartitionRequest,
) -> Result<HasPartitionResponse>
```

## Request Syntax

```rust
let request = HasPartitionRequest::builder()
    .collection_name("quick_setup")
    .partition_name("partitionA")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection. Required.

- `partition_name: String`

    Name of the partition. Required.

**RETURNS:**

*Result\<HasPartitionResponse\>*

`HasPartitionResponse` exposes `exists()`, returning `true` when the partition exists. Returns `Error` on failure.

## Example

```rust
let request = HasPartitionRequest::builder()
    .collection_name("quick_setup")
    .partition_name("partitionA")
    .build()?;
let resp = client.has_partition(request).await?;
println!("exists: {}", resp.exists());
```
