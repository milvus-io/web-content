# CollectionSchema

Schema definition for a collection, including its fields, struct fields, and functions.

```rust
pub struct CollectionSchema
```

**PARAMETERS:**

- `description: String`

    Description of the collection.

- `enable_dynamic_field: bool`

    Whether dynamic fields are enabled. Defaults to `false`.

- `fields: Vec<FieldSchema>`

    The scalar and vector fields of the collection. See [FieldSchema](FieldSchema.md).

- `struct_fields: Vec<StructFieldSchema>`

    The struct (nested) fields of the collection. See [StructFieldSchema](StructFieldSchema.md).

- `functions: Vec<Function>`

    The functions of the collection, such as BM25 or text-embedding functions.

- `properties: HashMap<String, String>`

    Collection-level properties, such as TTL settings.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `description(value)` / `set_description(value)` / `get_description()` - Sets or returns the description.
- `enable_dynamic_field(value)` / `set_enable_dynamic_field(value)` / `is_dynamic_field_enabled()` - Sets or returns whether dynamic fields are enabled.
- `fields(value)` / `set_fields(value)` / `get_fields()` - Sets or returns the fields.
- `struct_fields(value)` / `set_struct_fields(value)` / `get_struct_fields()` - Sets or returns the struct fields.
- `functions(value)` / `set_functions(value)` / `get_functions()` - Sets or returns the functions.
- `properties(value)` / `set_properties(value)` / `get_properties()` - Sets or returns the properties.
- `add_field(field)` - Adds one field to the existing values.
- `add_struct_field(field)` - Adds one struct field to the existing values.
- `add_function(function)` - Adds one function to the existing values.
- `property(key, value)` - Sets one property.

## Example

```rust
let schema = CollectionSchema::new()
    .description("a collection of books")
    .add_field(FieldSchema::new().name("id").data_type(DataType::Int64).primary_key(true))
    .add_field(FieldSchema::new().name("title").data_type(DataType::VarChar).max_length(256))
    .add_field(FieldSchema::new().name("embedding").data_type(DataType::FloatVector).dimension(4));

let request = CreateCollectionRequest::builder()
    .collection_name("books")
    .schema(schema)
    .build()?;
client.create_collection(request).await?;
```
