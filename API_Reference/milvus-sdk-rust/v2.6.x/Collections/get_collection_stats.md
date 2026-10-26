# GetCollectionStats()

Returns statistics for a collection, such as the row count.

```rust
pub async fn get_collection_stats(&self, request: GetCollectionStatsRequest) -> Result<GetCollectionStatsResponse>
```

## Request Syntax

```rust
let request = GetCollectionStatsRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to inspect. Required.

**RETURN TYPE:**

*Result\<GetCollectionStatsResponse\>*

**RETURNS:**

A **GetCollectionStatsResponse** containing the collection statistics. Returns an `Error` if the operation fails.

```rust
GetCollectionStatsResponse
    statistics() // -> &HashMap<String, String>
```

**METHODS:**

- `statistics()` (*&HashMap<String, String>*) -

    The full key-value statistics map, including the server-reported row count when present.

## Example

```rust
let request = GetCollectionStatsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.get_collection_stats(request).await?;
println!("row count: {:?}", resp.statistics().get("row_count"));
```
