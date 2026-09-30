# DropCollectionProperties()

Removes properties from a collection.

```rust
pub async fn drop_collection_properties(&self, request: DropCollectionPropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropCollectionPropertiesRequest::builder()
    .collection_name("books")
    .property_key("collection.ttl.seconds")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alter. Required.

- `property_keys: HashSet<String>`

    Keys of the properties to remove. At least one key is required. Use `property_key()` to add one.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = DropCollectionPropertiesRequest::builder()
    .collection_name("books")
    .property_key("collection.ttl.seconds")
    .build()?;
client.drop_collection_properties(request).await?;
```
