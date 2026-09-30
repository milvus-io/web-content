# TruncateCollection()

Removes all entities from a collection.

```rust
pub async fn truncate_collection(&self, request: TruncateCollectionRequest) -> Result<()>
```

## Request Syntax

```rust
let request = TruncateCollectionRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to truncate. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = TruncateCollectionRequest::builder()
    .collection_name("books")
    .build()?;
client.truncate_collection(request).await?;
```
