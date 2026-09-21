# AlterCollectionProperties()

Alters the properties of a collection.

```rust
pub async fn alter_collection_properties(&self, request: AlterCollectionPropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AlterCollectionPropertiesRequest::builder()
    .collection_name("books")
    .property("collection.ttl.seconds", "60")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alter. Required.

- `properties: HashMap<String, String>`

    Properties to set or update. At least one property is required. Use `property()` to add one.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AlterCollectionPropertiesRequest::builder()
    .collection_name("books")
    .property("collection.ttl.seconds", "60")
    .build()?;
client.alter_collection_properties(request).await?;
```
