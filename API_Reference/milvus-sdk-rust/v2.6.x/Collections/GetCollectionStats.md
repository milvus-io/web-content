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

**RETURNS:**

*Result\<GetCollectionStatsResponse\>*

`GetCollectionStatsResponse` exposes `name()` returning the collection name, `row_count()` returning the server-reported row count (when present), and `statistics()` returning the full key-value statistics map. Returns `Error` on failure.

## Example

```rust
let request = GetCollectionStatsRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.get_collection_stats(request).await?;
println!("row count: {:?}", resp.row_count());
```
