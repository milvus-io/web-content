# ReleaseCollection()

Releases a collection's loaded data from query nodes while retaining its definition.

```rust
pub async fn release_collection(&self, request: ReleaseCollectionRequest) -> Result<()>
```

## Request Syntax

```rust
let request = ReleaseCollectionRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to release. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = ReleaseCollectionRequest::builder()
    .collection_name("books")
    .build()?;
client.release_collection(request).await?;
```
