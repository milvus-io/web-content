# CollectionSchema

This class defines the schema of a collection by specifying its fields and dynamic-field settings. An alias `CollectionSchemaPtr` (a `std::shared_ptr<CollectionSchema>`) is provided for convenience. Pass the pointer to `CreateCollectionRequest::WithCollectionSchema()` when creating a collection.

**PARAMETERS:**

- **name** (*std::string*)

    Sets the Collection name. In MilvusClientV2 this is set via `CreateCollectionRequest::WithCollectionName()` and this constructor parameter is ignored.

- **desc** (*std::string*)

    Sets the optional human-readable description. Default: `""`.

- **shard_num** (*int32_t*)

    Sets the number of shards. Must be greater than `0`. Default: `1`. In MilvusClientV2, set this via `CreateCollectionRequest::WithNumShards()` instead.

- **enable_dynamic_field** (*bool*)

    When `true`, entities may contain fields that are not declared in the schema. The extra fields are stored internally in a JSON field named `$meta`. Default: `true`.

## Methods

**Adding fields:**

- `bool AddField(const FieldSchema& field_schema)`

    Appends a regular field to the schema. Returns `true` on success. Use `FieldSchema` to specify the field name, `DataType`, and type-specific settings (e.g., `WithDimension()` for vector fields, `WithMaxLength()` for VARCHAR fields, `WithPrimaryKey(true)` for the primary key).

- `const std::vector<FieldSchema>& Fields() const`

    Returns the list of field schemas added so far.

- `bool AddStructField(const StructFieldSchema& field_schema)`

    Appends a struct field (multi-vector type). Returns `true` on success.

- `const std::vector<StructFieldSchema>& StructFields() const`

    Returns the list of struct field schemas.

- `void AddFunction(const FunctionPtr& function)`

    Attaches a built-in function (e.g., a BM25 tokenizer function) to the schema.

- `const std::vector<FunctionPtr>& Functions() const`

    Returns the list of functions attached to the schema.

**Dynamic field:**

- `void SetEnableDynamicField(bool enable_dynamic_field)`

    Enables or disables dynamic fields at runtime.

- `bool EnableDynamicField() const`

    Returns whether dynamic fields are enabled.

**Introspection:**

- `std::string PrimaryFieldName() const`

    Returns the name of the primary key field.

- `std::unordered_set<std::string> AnnsFieldNames() const`

    Returns the names of all vector (ANNS) fields in the schema.

## Example

