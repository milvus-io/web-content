# AddCollectionStructField()

Adds a struct (array-of-structs) field to an existing collection.

```rust
pub async fn add_collection_struct_field(&self, request: AddCollectionStructFieldRequest) -> Result<()>
```

## Request Syntax

```rust
let request = AddCollectionStructFieldRequest::builder()
    .collection_name("books")
    .struct_field(
        StructFieldSchema::new()
            .name("events")
            .nullable(true)
            .add_field(
                FieldSchema::new()
                    .name("embedding")
                    .data_type(DataType::FloatVector)
                    .dimension(128),
            ),
    )
    .build()?;
```

**REQUEST FIELDS:**

- `database_name: Option<String>`

    Name of the target database; uses the default database when empty.

- `collection_name: String`

    Name of the collection to alter. Required.

- `struct_field: Option<StructFieldSchema>`

    The `StructFieldSchema` describing the new struct field. Adding a struct field to an existing collection requires `nullable(true)`. Required.

**RETURNS:**

*Result\<()\>*

Returns an empty result indicating success. Returns `Error` on failure.

## Example

```rust
let request = AddCollectionStructFieldRequest::builder()
    .collection_name("books")
    .struct_field(
        StructFieldSchema::new()
            .name("events")
            .nullable(true)
            .add_field(
                FieldSchema::new()
                    .name("embedding")
                    .data_type(DataType::FloatVector)
                    .dimension(128),
            ),
    )
    .build()?;
client.add_collection_struct_field(request).await?;
```
