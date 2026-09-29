# ReleasePartitions()

Releases selected partitions from query-node memory without dropping their data.

```rust
pub async fn release_partitions(
    &self,
    request: ReleasePartitionsRequest,
) -> Result<()>
```

## Request Syntax

```rust
let request = ReleasePartitionsRequest::builder()
    .collection_name("quick_setup")
    .partition_names(["partitionA", "partitionB"])
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection. Required.

- `partition_names: Vec<String>`

    Names of the partitions to release. Must contain at least one value. Required.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or `Error` on failure.

## Example

```rust
let request = ReleasePartitionsRequest::builder()
    .collection_name("quick_setup")
    .partition_names(["partitionA", "partitionB"])
    .build()?;
client.release_partitions(request).await?;
```
