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

- `schema_version: i32`

    Schema version, assigned by the server.

- `fields: Vec<FieldSchema>`

    The scalar and vector fields of the collection. See [FieldSchema](FieldSchema.md).

- `struct_fields: Vec<StructFieldSchema>`

    The struct (nested) fields of the collection. See [StructFieldSchema](StructFieldSchema.md).

- `functions: Vec<Function>`

    The functions of the collection, such as BM25 or text-embedding functions. See [Function](Function.md).

- `properties: HashMap<String, String>`

    Collection-level properties, such as TTL settings.

- `external_source: String`

    Name of the external source that backs the collection.

- `external_spec: Option<serde_json::Value>`

    External-source specification, when the collection is backed by an external source.

**METHODS:**

- `new()` - Creates a value initialized with its SDK defaults.
- `description(value)` / `set_description(value)` / `get_description()` - Sets or returns the description.
- `enable_dynamic_field(value)` / `set_enable_dynamic_field(value)` / `is_dynamic_field_enabled()` - Sets or returns whether dynamic fields are enabled.
- `get_schema_version()` - Returns the schema version.
- `fields(value)` / `set_fields(value)` / `get_fields()` - Sets or returns the fields.
- `struct_fields(value)` / `set_struct_fields(value)` / `get_struct_fields()` - Sets or returns the struct fields.
- `functions(value)` / `set_functions(value)` / `get_functions()` - Sets or returns the functions.
- `properties(value)` / `set_properties(value)` / `get_properties()` - Sets or returns the properties.
- `add_field(field)` - Adds one field to the existing values.
- `add_struct_field(field)` - Adds one struct field to the existing values.
- `add_function(function)` - Adds one function to the existing values.
- `property(key, value)` - Sets one property.
- `external_source(value)` / `set_external_source(value)` / `get_external_source()` - Sets or returns the external source name.
- `external_spec(value)` / `set_external_spec(value)` / `get_external_spec()` - Sets or returns the external-source specification.

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
