# DropPartition()

Drops a partition and its associated index and segment data.

```rust
pub async fn drop_partition(
    &self,
    request: DropPartitionRequest,
) -> Result<()>
```

## Request Syntax

```rust
let request = DropPartitionRequest::builder()
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

*Result\<()\>*

Returns `Ok(())` on success, or `Error` on failure.

## Example

```rust
let request = DropPartitionRequest::builder()
    .collection_name("quick_setup")
    .partition_name("partitionA")
    .build()?;
client.drop_partition(request).await?;
```
