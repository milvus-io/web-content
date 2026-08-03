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

## Request Syntax

```cpp
StructFieldSchema(name, description)
    .WithName(name)
    .WithDescription(description)
    .WithMaxCapacity(capacity)
    .AddField(field_schema);
```

**REQUEST METHODS:**

- `StructFieldSchema& WithName(std::string name)`

    Sets the field name and returns the schema for chaining.

- `StructFieldSchema& WithDescription(std::string description)`

    Sets the description and returns the schema for chaining.

- `StructFieldSchema& WithMaxCapacity(int64_t capacity)`

    Sets the maximum number of elements the struct field can hold. Returns the schema for chaining.

- `StructFieldSchema& AddField(const FieldSchema& field_schema)`

    Appends a sub-field (vector field within the struct) and returns the schema for chaining. For FieldSchema details see FieldSchema.

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
