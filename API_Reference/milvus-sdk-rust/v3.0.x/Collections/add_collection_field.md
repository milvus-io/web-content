# add_collection_field()

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

    The `FieldSchema` describing the new field. Vector fields added to an existing collection require `nullable(true)`. Required. See [FieldSchema](FieldSchema.md).

    A struct sub-field is added with a bracketed `struct[sub]` path in the field name, for example `clips[note]`; the parent struct and the child must be C-style identifiers. Nested Array sub-fields set `element_type` and may set `element_nullable(true)`. Sub-field adds never fall back to the legacy add-field RPC, matching pymilvus.

**RETURN TYPE:**

*Result\<()\>*

**RETURNS:**

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

let sub_field = AddCollectionFieldRequest::builder()
    .collection_name("books")
    .field(
        FieldSchema::new()
            .name("clips[note]")
            .data_type(DataType::VarChar)
            .max_length(64)
            .nullable(true),
    )
    .build()?;
client.add_collection_field(sub_field).await?;
```
