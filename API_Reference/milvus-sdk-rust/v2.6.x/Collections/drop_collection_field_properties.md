# drop_collection_field_properties()

Removes properties from a field in a collection.

```rust
pub async fn drop_collection_field_properties(&self, request: DropCollectionFieldPropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropCollectionFieldPropertiesRequest::builder()
    .collection_name("books")
    .field_name("vector")
    .property_key("mmap.enabled")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the field. Required.

- `field_name: String`

    Name of the field to alter. Required.

- `property_keys: HashSet<String>`

    Keys of the properties to remove from the field. At least one key is required. Use `property_key()` to add one.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = DropCollectionFieldPropertiesRequest::builder()
    .collection_name("books")
    .field_name("vector")
    .property_key("mmap.enabled")
    .build()?;
client.drop_collection_field_properties(request).await?;
```
