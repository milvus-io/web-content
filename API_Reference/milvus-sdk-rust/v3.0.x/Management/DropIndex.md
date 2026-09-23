# DropIndex()

Drops an index from a collection.

```rust
pub async fn drop_index(&self, request: DropIndexRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropIndexRequest::builder()
    .collection_name("books")
    .field_name("embedding")
    .index_name("embedding_idx")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection whose index to drop. Required.

- `field_name: String`

    Name of the indexed field.

- `index_name: String`

    Name of the index to drop. When empty, the index on `field_name` is dropped.

**RETURNS:**

*Result\<()\>*

Returns `Ok(())` on success, or an `Error` on failure.

## Example

```rust
let request = DropIndexRequest::builder()
    .collection_name("books")
    .index_name("embedding_idx")
    .build()?;
client.drop_index(request).await?;
```
