# StructFieldSchema

Schema definition for a struct (nested) collection field, containing sub-fields defined as `FieldSchema` entries.

```rust
pub struct StructFieldSchema
```

**PARAMETERS:**

- `name: String`

    Name of the struct field.

- `description: String`

    Description of the struct field.

- `max_capacity: u32`

    Maximum number of sub-fields the struct field can hold.

- `fields: Vec<FieldSchema>`

    The sub-fields of the struct. See [FieldSchema](FieldSchema.md).

- `type_params: HashMap<String, String>`

    Struct-level type parameters, such as `mmap.enabled` or `warmup`.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `name(value)` / `set_name(value)` / `get_name()` - Sets or returns the struct field name.
- `description(value)` / `set_description(value)` / `get_description()` - Sets or returns the description.
- `max_capacity(value)` / `set_max_capacity(value)` / `get_max_capacity()` - Sets or returns the maximum capacity.
- `fields(value)` / `set_fields(value)` / `get_fields()` - Sets or returns the sub-fields.
- `add_field(field)` - Adds one sub-field to the existing values.
- `type_params(value)` / `set_type_params(value)` / `get_type_params()` - Sets or returns the type params.
- `type_param(key, value)` - Sets one type param.

## Example

```rust
let struct_field = StructFieldSchema::new()
    .name("address")
    .add_field(FieldSchema::new().name("city").data_type(DataType::VarChar).max_length(128))
    .add_field(FieldSchema::new().name("zip").data_type(DataType::Int64))
    .type_param("mmap.enabled", "true");

let schema = CollectionSchema::new()
    .add_field(FieldSchema::new().name("id").data_type(DataType::Int64).primary_key(true))
    .add_struct_field(struct_field);

let request = CreateCollectionRequest::builder()
    .collection_name("books")
    .schema(schema)
    .build()?;
client.create_collection(request).await?;
```
