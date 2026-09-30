# DropCollectionField()

Drops a field from a collection.

```rust
pub async fn drop_collection_field(&self, request: DropCollectionFieldRequest) -> Result<()>
```

## Request Syntax

```rust
let request = DropCollectionFieldRequest::builder()
    .collection_name("books")
    .field_name("vector")
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alter. Required.

- `field_name: Option<String>`

    Name of the field to drop. Exactly one of `field_name` or `field_id` must be specified.

- `field_id: Option<i64>`

    ID of the field to drop. Exactly one of `field_name` or `field_id` must be specified.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = DropCollectionFieldRequest::builder()
    .collection_name("books")
    .field_name("vector")
    .build()?;
client.drop_collection_field(request).await?;
```
