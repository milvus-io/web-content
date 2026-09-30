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

**RETURNS:**

*Result\<GetPartitionStatsResponse\>*

`GetPartitionStatsResponse` exposes `row_count()`, returning the server-reported row count when present, and `statistics()`, returning the raw statistics map. Returns `Error` on failure.

## Example

```rust
let request = GetPartitionStatsRequest::builder()
    .collection_name("quick_setup")
    .partition_name("partitionA")
    .build()?;
let resp = client.get_partition_stats(request).await?;
println!("row_count: {:?}", resp.row_count());
```
