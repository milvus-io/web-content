# CreatePartition()

Creates a named partition in an existing collection.

```rust
pub async fn create_partition(
    &self,
    request: CreatePartitionRequest,
) -> Result<()>
```

## Request Syntax

```rust
let request = CreatePartitionRequest::builder()
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
let request = CreatePartitionRequest::builder()
    .collection_name("quick_setup")
    .partition_name("partitionA")
    .build()?;
client.create_partition(request).await?;
```
