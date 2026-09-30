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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to create.

- `WithDescription(const std::string& description)`

    Sets the description of the collection.

- `WithCollectionSchema(const CollectionSchemaPtr& schema)`

    Sets the collection schema that defines the fields of the collection. Takes a shared pointer to the schema (const CollectionSchemaPtr&).

- `WithNumPartitions(int64_t num_partitions)`

    Sets the number of partitions created when the collection uses a partition key field.

- `WithNumShards(int64_t num_shards)`

    Sets the number of shards of the collection.

- `WithConsistencyLevel(ConsistencyLevel level)`

    Sets the default consistency level of the collection.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets collection-level properties, such as "collection.ttl.seconds" to define a TTL retention window. The map is passed by rvalue reference, so pass it with std::move.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single collection-level property as a key-value pair.

- `WithIndexes(std::vector<IndexDesc>&& indexes)`

    Sets the indexes to create along with the collection. The vector is passed by rvalue reference, so pass it with std::move.

- `AddIndex(IndexDesc&& index)`

    Adds a single index to create along with the collection. The index is passed by rvalue reference, so pass it with std::move.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection was created successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

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
