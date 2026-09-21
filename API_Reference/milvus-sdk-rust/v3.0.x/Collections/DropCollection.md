# DropCollection()

Drops a collection together with its partitions, indexes, and stored segments.

```rust
pub async fn drop_collection(&self, request: DropCollectionRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropCollectionRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to drop. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. This operation is destructive and cannot be undone. Returns `Error` on failure.

## Example

```rust
let request = DropCollectionRequest::builder()
    .collection_name("books")
    .build()?;
client.drop_collection(request).await?;
```
