# AddCollectionField()

Adds a field to an existing collection.

```rust
pub async fn add_collection_field(&self, request: AddCollectionFieldRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AddCollectionFieldRequest::builder()
    .collection_name("books")
    .field(
        FieldSchema::new()
            .name("vector")
            .data_type(DataType::FloatVector)
            .dimension(128)
            .nullable(true),
    )
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alter. Required.

- `field: Option<FieldSchema>`

    The `FieldSchema` describing the new field. Vector fields added to an existing collection require `nullable(true)`. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AddCollectionFieldRequest::builder()
    .collection_name("books")
    .field(
        FieldSchema::new()
            .name("vector")
            .data_type(DataType::FloatVector)
            .dimension(128)
            .nullable(true),
    )
    .build()?;
client.add_collection_field(request).await?;
```
