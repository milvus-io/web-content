# ListPartitions()

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

**RETURNS:**

*Result\<ListPartitionsResponse\>*

`ListPartitionsResponse` exposes `partition_names()`, returning the names of all partitions in the collection. Returns `Error` on failure.

## Example

```rust
let request = ListPartitionsRequest::builder()
    .collection_name("quick_setup")
    .build()?;
let resp = client.list_partitions(request).await?;
println!("partitions: {:?}", resp.partition_names());
```
