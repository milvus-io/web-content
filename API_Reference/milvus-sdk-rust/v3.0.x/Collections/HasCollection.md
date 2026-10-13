# HasCollection()

Checks whether a collection exists in the request's database.

```rust
pub async fn has_collection(&self, request: HasCollectionRequest) -> Result<HasCollectionResponse>
```

## Request Syntax

```rust
let request = HasCollectionRequest::builder()
    .collection_name("books")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to check. Required.

**RETURN TYPE:**

*Result\<HasCollectionResponse\>*

**RETURNS:**

A **HasCollectionResponse** indicating whether the collection exists. Returns an `Error` if the operation fails.

```rust
HasCollectionResponse
    exists() // -> bool
```

**METHODS:**

- `exists()` (*bool*) -

    Whether the collection exists.

## Example

```rust
let request = HasCollectionRequest::builder()
    .collection_name("books")
    .build()?;
let resp = client.has_collection(request).await?;
println!("exists: {}", resp.exists());
```
