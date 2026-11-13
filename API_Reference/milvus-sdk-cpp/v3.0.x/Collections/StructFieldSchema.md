# StructFieldSchema

This class describes a struct-type field (multi-vector type) in a collection schema. Pass a `StructFieldSchema` instance to `CollectionSchema::AddStructField()` when building a multi-vector schema. `StructFieldSchema` provides a fluent With*/Add* builder API.

```cpp
StructFieldSchema();
explicit StructFieldSchema(std::string name, std::string description = "");
```

**PARAMETERS:**

- **name** (*std::string*)

    Name of the struct field. Must be unique within the collection.

- **description** (*std::string*)

    Optional human-readable description. Default: `""`.

**METHODS:**

- `StructFieldSchema& WithName(std::string name)`

    Sets the field name and returns the schema for chaining.

- `void SetName(std::string name)`

    Sets the field name.

- `const std::string& Name() const`

    Returns the field name.

- `StructFieldSchema& WithDescription(std::string description)`

    Sets the description and returns the schema for chaining.

- `void SetDescription(std::string description)`

    Sets the description of the field.

- `const std::string& Description() const`

    Returns the field description.

- `StructFieldSchema& WithMaxCapacity(int64_t capacity)`

    Sets the maximum number of elements the struct field can hold. Returns the schema for chaining.

- `void SetMaxCapacity(int64_t capacity)`

    Sets the maximum capacity for the struct field.

- `int64_t MaxCapacity() const`

    Returns the maximum capacity of the struct field.

- `StructFieldSchema& WithNullable(bool nullable)`

    Sets whether the struct field can contain empty element lists. Returns the schema for chaining.

- `void SetNullable(bool nullable)`

    Sets whether the struct field is nullable.

- `bool IsNullable() const`

    Returns whether the struct field is nullable.

- `void SetTypeParams(const std::map<std::string, std::string>& params)`

    Merges extra key-value settings into the struct field without overwriting existing keys.

- `void SetTypeParams(std::map<std::string, std::string>&& params)`

    Merges extra key-value settings into the struct field without overwriting existing keys. The map is passed by rvalue reference.

- `const std::map<std::string, std::string>& TypeParams() const`

    Returns the extra key-value settings of the struct field.

- `StructFieldSchema& AddTypeParam(const std::string& key, const std::string& val)`

    Adds one extra key-value setting. If the key already exists, the new value is ignored.

- `StructFieldSchema& AddField(const FieldSchema& field_schema)`

    Appends a sub-field (vector field within the struct) and returns the schema for chaining. For [FieldSchema](FieldSchema.md) details see [FieldSchema](FieldSchema.md).

- `const std::vector<FieldSchema>& Fields() const`

    Returns the list of sub-fields added so far.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

// Build a schema with a STRUCT field containing two vector sub-fields
CollectionSchemaPtr schema = std::make_shared<CollectionSchema>();
schema->AddField(FieldSchema("id", DataType::INT64).WithPrimaryKey(true).WithAutoID(true));

StructFieldSchema struct_field("embeddings", "multi-vector struct field");
struct_field
    .WithMaxCapacity(2)
    .AddField(FieldSchema("dense", DataType::FLOAT_VECTOR).WithDimension(128))
    .AddField(FieldSchema("sparse", DataType::SPARSE_FLOAT_VECTOR));

schema->AddStructField(struct_field);

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
auto status = client->CreateCollection(
    CreateCollectionRequest()
        .WithCollectionName("multi_vec_collection")
        .WithCollectionSchema(schema));
```
