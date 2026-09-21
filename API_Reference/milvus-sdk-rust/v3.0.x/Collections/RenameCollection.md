# RenameCollection()

Renames a collection, optionally moving it to another database.

```rust
pub async fn rename_collection(&self, request: RenameCollectionRequest) -> Result<()>
```

## Request Syntax

```rust
let request = RenameCollectionRequest::builder()
    .collection_name("books")
    .new_collection_name("library")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Current name of the collection. Required.

- `new_collection_name: String`

    New name of the collection. Required.

- `new_database_name: Option<String>`

    Database to move the collection to; defaults to the current database.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = RenameCollectionRequest::builder()
    .collection_name("books")
    .new_collection_name("library")
    .build()?;
client.rename_collection(request).await?;
```
