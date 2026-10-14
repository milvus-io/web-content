# GetPartitionStats()

Returns server-reported statistics for a partition, including its row count.

```rust
pub async fn get_partition_stats(
    &self,
    request: GetPartitionStatsRequest,
) -> Result<GetPartitionStatsResponse>
```

## Request Syntax

```rust
let request = GetPartitionStatsRequest::builder()
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

**RETURN TYPE:**

*Result\<GetPartitionStatsResponse\>*

**RETURNS:**

A **GetPartitionStatsResponse** containing the partition statistics. Returns an `Error` if the operation fails.

```rust
GetPartitionStatsResponse
    statistics() // -> &HashMap<String, String>
```

**METHODS:**

- `statistics()` (*&HashMap<String, String>*) -

    The full key-value statistics map, including the server-reported row count when present.

## Example

```rust
let request = GetPartitionStatsRequest::builder()
    .collection_name("quick_setup")
    .partition_name("partitionA")
    .build()?;
let resp = client.get_partition_stats(request).await?;
println!("row_count: {:?}", resp.statistics().get("row_count"));
```
