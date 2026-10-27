# list_partitions()

Lists the partitions defined for a collection.

```rust
pub async fn list_partitions(
    &self,
    request: ListPartitionsRequest,
) -> Result<ListPartitionsResponse>
```

## Request Syntax

```rust
let request = ListPartitionsRequest::builder()
    .collection_name("quick_setup")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection. Required.

**RETURN TYPE:**

*Result\<ListPartitionsResponse\>*

**RETURNS:**

A **ListPartitionsResponse** containing the names and information of the partitions. Returns an `Error` if the operation fails.

```rust
ListPartitionsResponse
    partition_names() // -> &[String]
    partitions() // -> &[PartitionInfo]
```

**METHODS:**

- `partition_names()` (*&[String]*) -

    The names of the partitions.

- `partitions()` (*&[PartitionInfo]*) -

    Detailed information about each partition.

    - `get_name()` (*&str*) -

        The name of the partition.

    - `get_id()` (*i64*) -

        The ID of the partition.

    - `get_created_timestamp()` (*u64*) -

        The creation timestamp of the partition.

    - `get_created_utc_timestamp()` (*u64*) -

        The UTC creation timestamp of the partition.

    - `get_in_memory_percentage()` (*i64*) -

        The percentage of partition data loaded in memory.

    - `is_loaded()` (*bool*) -

        Whether the partition is loaded.

## Example

```rust
let request = ListPartitionsRequest::builder()
    .collection_name("quick_setup")
    .build()?;
let resp = client.list_partitions(request).await?;
println!("partitions: {:?}", resp.partition_names());
```
