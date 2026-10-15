# CreateCollection()

This operation creates a collection with the given schema and options.

```cpp
Status CreateCollection(const CreateCollectionRequest& request)
```

## Request Syntax

```cpp
auto request = CreateCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithDescription(description)
    .WithCollectionSchema(schema)
    .WithNumPartitions(num_partitions)
    .WithNumShards(num_shards)
    .WithConsistencyLevel(level)
    .WithProperties(properties)
    .AddProperty(key, property)
    .WithIndexes(indexes)
    .AddIndex(index);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database in which the collection is created.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to create.

- `SetCollectionName(const std::string& collection_name)`

    Set name of the collection. Note: due to history reason, the CollectionSchema also contains a collection name. SetCollectionName() will override the collection name of CollectionSchema.

- `WithDescription(const std::string& description)`

    Sets the description of the collection.

- `SetDescription(const std::string& description)`

    Set the description of the collection.

- `WithCollectionSchema(const CollectionSchemaPtr& schema)`

    Sets the collection schema that defines the fields of the collection. Takes a shared pointer to the schema (const CollectionSchemaPtr&).

- `SetCollectionSchema(const CollectionSchemaPtr& schema)`

    Set collection schema.

- `WithNumPartitions(int64_t num_partitions)`

    Sets the number of partitions created when the collection uses a partition key field.

- `SetNumPartitions(int64_t num_partitions)`

    Set number of partitions when there is a partition key.

- `WithNumShards(int64_t num_shards)`

    Sets the number of shards of the collection.

- `SetNumShards(int64_t num_shards)`

    Set number of shards of the collection. Note: due to history reason, the CollectionSchema also contains a shards number. SetNumShards() will override the shards_num of CollectionSchema.

- `WithConsistencyLevel(ConsistencyLevel level)`

    Sets the default consistency level of the collection.

- `SetConsistencyLevel(ConsistencyLevel level)`

    Set default consistency level of this collection.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets collection-level properties, such as "collection.ttl.seconds" to define a TTL retention window. The map is passed by rvalue reference, so pass it with std::move.

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set properties of this collection. For example, "collection.ttl.seconds" sets a collection-level TTL retention window.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single collection-level property as a key-value pair.

- `WithIndexes(std::vector<IndexDesc>&& indexes)`

    Sets the indexes to create along with the collection. The vector is passed by rvalue reference, so pass it with std::move.

- `SetIndexes(std::vector<IndexDesc>&& indexes)`

    Set indexes to be created.

- `AddIndex(IndexDesc&& index)`

    Adds a single index to create along with the collection. The index is passed by rvalue reference, so pass it with std::move.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection was created successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call CreateCollection() on a connected MilvusClientV2 to create a collection with a schema and a consistency level.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const std::string db_name = "default";
const std::string collection_name = "book";
const std::string description = "a collection for books";

milvus::CollectionSchema schema(collection_name);
schema.AddField(milvus::FieldSchema("id", milvus::DataType::INT64, "", true, false));
schema.AddField(milvus::FieldSchema("vector", milvus::DataType::FLOAT_VECTOR, "").WithDimension(8));

auto request = milvus::CreateCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithDescription(description)
    .WithCollectionSchema(std::make_shared<milvus::CollectionSchema>(schema))
    .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);
status = client->CreateCollection(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
