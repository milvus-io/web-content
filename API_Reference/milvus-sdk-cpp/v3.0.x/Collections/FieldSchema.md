# FieldSchema

This class describes a single field in a collection schema. Pass `FieldSchema` instances to `CollectionSchema::AddField()` when defining a collection's structure. `FieldSchema` supports a fluent With* builder API so definitions can be chained on a single line.

```cpp
FieldSchema();
FieldSchema(std::string name, DataType data_type,
            std::string description = "",
            bool is_primary_key = false,
            bool auto_id = false);
```

**PARAMETERS:**

- **name** (*std::string*)

    Sets the field name. Must be unique within the collection.

- **data_type** (*[DataType](DataType.md)*)

    Sets the data type of the field. See `DataType` for all supported values.

- **description** (*std::string*)

    Sets the optional human-readable description. Default: `""`.

- **is_primary_key** (*bool*)

    When `true`, this field is the primary key. Each collection must have exactly one primary key field. Only `INT64` and `VARCHAR` are supported as primary key types. Default: `false`.

- **auto_id** (*bool*)

    When `true`, the server auto-generates primary key values on insert. Only valid if `is_primary_key` is `true`. Default: `false`.

## Request Syntax

```cpp
FieldSchema(name, data_type)
    .WithPrimaryKey(is_primary_key)
    .WithAutoID(auto_id)
    .WithDimension(dimension)
    .WithMaxLength(max_length)
    .WithElementType(element_type)
    .WithMaxCapacity(max_capacity)
    .WithPartitionKey(partition_key)
    .WithClusteringKey(clustering_key)
    .WithNullable(nullable)
    .WithDefaultValue(default_value)
    .EnableAnalyzer(enable_analyzer)
    .EnableMatch(enable_match)
    .WithAnalyzerParams(params)
    .WithMultiAnalyzerParams(params);
```

**REQUEST METHODS:**

- `WithPrimaryKey(bool is_primary_key)`

    Marks this field as the primary key. Only `INT64` and `VARCHAR` fields can be primary keys.

- `WithAutoID(bool auto_id)`

    Enables server-side auto-generation of primary key values on insert. Only valid when `WithPrimaryKey(true)` is also set.

- `WithDimension(uint32_t dimension)`

    Sets the vector dimension. **Required** for `FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR`, and `INT8_VECTOR` fields. For `BINARY_VECTOR`, the dimension must be a multiple of 8.

- `WithMaxLength(uint32_t length)`

    Sets the maximum byte length for a `VARCHAR` field. **Required** for `VARCHAR` fields. Maximum: 65535.

- `WithElementType(DataType dt)`

    Sets the element type for an `ARRAY` field. **Required** for `ARRAY` fields. Supported element types: all scalar types except `JSON`.

- `WithMaxCapacity(uint32_t capacity)`

    Sets the maximum number of elements in an `ARRAY` field. **Required** for `ARRAY` fields.

- `WithPartitionKey(bool partition_key)`

    Designates this field as the partition key. At most one field per collection can be the partition key.

- `WithClusteringKey(bool clustering_key)`

    Designates this field as the clustering key for data clustering. At most one field per collection.

- `WithNullable(bool nullable)`

    Allows `null` values for this field. Supported for all scalar fields except the primary key. Default: `false`.

- `WithDefaultValue(const nlohmann::json& val)`

    Sets a default value used when an entity does not provide a value for this field. Not supported for `JSON` or `ARRAY` fields.

- `EnableAnalyzer(bool enable)`

    Enables tokenization/text analysis for a `VARCHAR` field. Required for text match and full-text search features.

- `EnableMatch(bool enable)`

    Enables `TEXT_MATCH` filtering on a `VARCHAR` field. Requires `EnableAnalyzer(true)`.

- `WithAnalyzerParams(const nlohmann::json& params)`

    Sets the text analyzer configuration (tokenizer, filters, etc.) for a `VARCHAR` field. Cannot be used together with `WithMultiAnalyzerParams()`.

- `WithMultiAnalyzerParams(const nlohmann::json& params)`

    Sets per-language analyzer configuration for multi-language text fields. Cannot be used together with `WithAnalyzerParams()`.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <milvus/MilvusClientV2.h>
using namespace milvus;

CollectionSchemaPtr schema = std::make_shared<CollectionSchema>();

// INT64 primary key with auto-generated IDs
schema->AddField(FieldSchema("id", DataType::INT64, "primary key")
                     .WithPrimaryKey(true).WithAutoID(true));

// VARCHAR field with text search enabled
schema->AddField(FieldSchema("title", DataType::VARCHAR, "article title")
                     .WithMaxLength(512)
                     .EnableAnalyzer(true)
                     .EnableMatch(true));

// Nullable INT32 field with a default value
schema->AddField(FieldSchema("views", DataType::INT32, "view count")
                     .WithNullable(true)
                     .WithDefaultValue(0));

// ARRAY of up to 5 VARCHAR tags
schema->AddField(FieldSchema("tags", DataType::ARRAY, "tag list")
                     .WithElementType(DataType::VARCHAR)
                     .WithMaxCapacity(5));

// 128-dim float vector
schema->AddField(FieldSchema("vec", DataType::FLOAT_VECTOR, "embedding")
                     .WithDimension(128));

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
client->CreateCollection(
    CreateCollectionRequest()
        .WithCollectionName("my_collection")
        .WithCollectionSchema(schema)
        .AddIndex(IndexDesc("vec", "", IndexType::HNSW, MetricType::COSINE)));
```
