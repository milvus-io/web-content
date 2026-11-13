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

- **data_type** (*DataType*)

    Sets the data type of the field. See `DataType` for all supported values.
    See [DataType](DataType.md).

- **description** (*std::string*)

    Sets the optional human-readable description. Default: `""`.

- **is_primary_key** (*bool*)

    When `true`, this field is the primary key. Each collection must have exactly one primary key field. Only `INT64` and `VARCHAR` are supported as primary key types. Default: `false`.

- **auto_id** (*bool*)

    When `true`, the server auto-generates primary key values on insert. Only valid if `is_primary_key` is `true`. Default: `false`.

**METHODS:**

- `FieldSchema& WithName(std::string name)`

    Sets the field name.

- `void SetName(std::string name)`

    Sets the field name.

- `const std::string& Name() const`

    Returns the field name.

- `FieldSchema& WithDataType(DataType data_type)`

    Sets the logical field type. See [DataType](DataType.md).

- `void SetDataType(DataType dt)`

    Sets the logical field type. See [DataType](DataType.md).

- `DataType FieldDataType() const`

    Returns the logical field type.

- `FieldSchema& WithDescription(std::string description)`

    Sets the optional field description.

- `void SetDescription(std::string description)`

    Sets the optional field description.

- `const std::string& Description() const`

    Returns the field description.

- `WithPrimaryKey(bool is_primary_key)`

    Marks this field as the primary key. Only `INT64` and `VARCHAR` fields can be primary keys.

- `void SetPrimaryKey(bool is_primary_key)`

    Marks this field as the primary key.

- `bool IsPrimaryKey() const`

    Returns whether this field is the primary key.

- `WithAutoID(bool auto_id)`

    Enables server-side auto-generation of primary key values on insert. Only valid when `WithPrimaryKey(true)` is also set.

- `void SetAutoID(bool auto_id)`

    Enables server-side auto-generation of primary key values on insert.

- `bool AutoID() const`

    Returns whether primary key values are auto-generated on insert.

- `WithDimension(uint32_t dimension)`

    Sets the vector dimension. **Required** for `FLOAT_VECTOR`, `FLOAT16_VECTOR`, `BFLOAT16_VECTOR`, and `INT8_VECTOR` fields. For `BINARY_VECTOR`, the dimension must be a multiple of 8.

- `bool SetDimension(uint32_t dimension)`

    Sets the vector dimension. Returns whether the dimension was applied.

- `uint32_t Dimension() const`

    Returns the vector dimension.

- `WithMaxLength(uint32_t length)`

    Sets the maximum byte length for a `VARCHAR` field. **Required** for `VARCHAR` fields. Maximum: 65535.

- `void SetMaxLength(uint32_t length)`

    Sets the maximum byte length for a `VARCHAR` field.

- `uint32_t MaxLength() const`

    Returns the maximum byte length for a `VARCHAR` field.

- `WithElementType(DataType dt)`

    Sets the element type for an `ARRAY` field. **Required** for `ARRAY` fields. Supported element types: all scalar types except `JSON`.

- `void SetElementType(DataType dt)`

    Sets the element type for an `ARRAY` field.

- `DataType ElementType() const`

    Returns the element type of an `ARRAY` field.

- `WithMaxCapacity(uint32_t capacity)`

    Sets the maximum number of elements in an `ARRAY` field. **Required** for `ARRAY` fields.

- `void SetMaxCapacity(uint32_t capacity)`

    Sets the maximum number of elements in an `ARRAY` field.

- `uint32_t MaxCapacity() const`

    Returns the maximum number of elements in an `ARRAY` field.

- `WithPartitionKey(bool partition_key)`

    Designates this field as the partition key. At most one field per collection can be the partition key.

- `void SetPartitionKey(bool partition_key)`

    Designates this field as the partition key.

- `bool IsPartitionKey() const`

    Returns whether this field is the partition key.

- `WithClusteringKey(bool clustering_key)`

    Designates this field as the clustering key for data clustering. At most one field per collection.

- `void SetClusteringKey(bool clustering_key)`

    Designates this field as the clustering key for data clustering.

- `bool IsClusteringKey() const`

    Returns whether this field is the clustering key.

- `WithNullable(bool nullable)`

    Allows `null` values for this field. Supported for all scalar fields except the primary key. Default: `false`.

- `void SetNullable(bool nullable)`

    Allows `null` values for this field.

- `bool IsNullable() const`

    Returns whether `null` values are allowed for this field.

- `WithDefaultValue(const nlohmann::json& val)`

    Sets a default value used when an entity does not provide a value for this field. Not supported for `JSON` or `ARRAY` fields.

- `void SetDefaultValue(const nlohmann::json& val)`

    Sets a default value used when an entity does not provide a value for this field.

- `nlohmann::json DefaultValue() const`

    Returns the default value of the field.

- `EnableAnalyzer(bool enable)`

    Enables tokenization/text analysis for a `VARCHAR` field. Required for text match and full-text search features.

- `bool IsEnableAnalyzer() const`

    Returns whether text analysis is enabled for this field.

- `EnableMatch(bool enable)`

    Enables `TEXT_MATCH` filtering on a `VARCHAR` field. Requires `EnableAnalyzer(true)`.

- `bool IsEnableMatch() const`

    Returns whether `TEXT_MATCH` filtering is enabled for this field.

- `WithAnalyzerParams(const nlohmann::json& params)`

    Sets the text analyzer configuration (tokenizer, filters, etc.) for a `VARCHAR` field. Cannot be used together with `WithMultiAnalyzerParams()`.

- `void SetAnalyzerParams(const nlohmann::json& params)`

    Sets the text analyzer configuration for a `VARCHAR` field.

- `nlohmann::json AnalyzerParams() const`

    Returns the text analyzer configuration of the field.

- `WithMultiAnalyzerParams(const nlohmann::json& params)`

    Sets per-language analyzer configuration for multi-language text fields. Cannot be used together with `WithAnalyzerParams()`.

- `void SetMultiAnalyzerParams(const nlohmann::json& params)`

    Sets per-language analyzer configuration for multi-language text fields.

- `nlohmann::json MultiAnalyzerParams() const`

    Returns the per-language analyzer configuration of the field.

- `void SetTypeParams(const std::map<std::string, std::string>& params)`

    Merges extra key-value settings into the field. The values set through `SetDimension`/`SetMaxLength`/`SetMaxCapacity` are stored in the type params as a map.

- `void SetTypeParams(std::map<std::string, std::string>&& params)`

    Merges extra key-value settings into the field. The map is passed by rvalue reference.

- `const std::map<std::string, std::string>& TypeParams() const`

    Returns the extra key-value settings of the field.

- `FieldSchema& AddTypeParam(const std::string& key, const std::string& val)`

    Adds one extra key-value setting to the field.

- `FieldSchema& WithExternalField(std::string field_name)`

    Maps this schema field to the corresponding field in an external source. Used with external collections.

- `void SetExternalField(std::string external_field)`

    Maps this schema field to the corresponding field in an external source.

- `const std::string& ExternalField() const`

    Returns the mapped external source field name.

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
