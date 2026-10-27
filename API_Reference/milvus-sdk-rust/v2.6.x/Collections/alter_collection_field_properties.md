# alter_collection_field_properties()

Alters the properties of a field in a collection.

```rust
pub async fn alter_collection_field_properties(&self, request: AlterCollectionFieldPropertiesRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AlterCollectionFieldPropertiesRequest::builder()
    .collection_name("books")
    .field_name("vector")
    .property("mmap.enabled", "true")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection that owns the field. Required.

- `field_name: String`

    Name of the field to alter. Required.

- `properties: HashMap<String, String>`

    Properties to set or update on the field. At least one property is required. Use `property()` to add one.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AlterCollectionFieldPropertiesRequest::builder()
    .collection_name("books")
    .field_name("vector")
    .property("mmap.enabled", "true")
    .build()?;
client.alter_collection_field_properties(request).await?;
```
