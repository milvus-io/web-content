# CreateCollection()

This operation creates a collection in the specified database with the given collection schema, along with optional properties, indexes, and a default consistency level. Indexes supplied in the request are created immediately after the collection is created.

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

    Sets the name of the database in which the collection is created; falls back to the connection's current database when omitted. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to create; this name overrides the name held by the CollectionSchema.

- `SetCollectionName(const std::string& collection_name)`

    Set name of the collection. Note: due to history reason, the CollectionSchema also contains a collection name.

- `WithDescription(const std::string& description)`

    Sets the description of the collection; this description overrides the description held by the CollectionSchema. Optional.

- `SetDescription(const std::string& description)`

    Sets the description of the collection; this description overrides the description held by the CollectionSchema. Optional.

- `WithCollectionSchema(const CollectionSchemaPtr& schema)`

    Sets the collection schema that defines the collection's fields, passed as a CollectionSchemaPtr; the operation fails if the schema pointer is null.

- `SetCollectionSchema(const CollectionSchemaPtr& schema)`

    Set collection schema.

- `WithNumPartitions(int64_t num_partitions)`

    Sets the number of partitions to use when the schema contains a partition key field; only sent when greater than zero. Optional.

- `SetNumPartitions(int64_t num_partitions)`

    Set number of partitions when there is a partition key.

- `WithNumShards(int64_t num_shards)`

    Sets the number of shards of the collection, overriding the shards number held by the CollectionSchema; defaults to 1. Optional.

- `SetNumShards(int64_t num_shards)`

    Set number of shards of the collection. Note: due to history reason, the CollectionSchema also contains a shards number.

- `WithConsistencyLevel(ConsistencyLevel level)`

    Sets the default consistency level of the collection, such as ConsistencyLevel::BOUNDED, which is also the default when not set. Optional.

- `SetConsistencyLevel(ConsistencyLevel level)`

    Set default consistency level of this collection.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the collection-level properties as a key-value string map, moved into the request. Optional.

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set properties of this collection.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single collection-level property key-value pair, such as a TTL setting. Optional.

- `WithIndexes(std::vector<IndexDesc>&& indexes)`

    Sets the index descriptors to be created; each index is created immediately after the collection is created. Optional.

- `SetIndexes(std::vector<IndexDesc>&& indexes)`

    Set indexes to be created.

- `AddIndex(IndexDesc&& index)`

    Adds a single index descriptor to be created immediately after the collection is created. Optional.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection was created successfully; an INVALID_ARGUMENT status is returned if the request carries a null collection schema.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details, including the INVALID_ARGUMENT status returned when the collection schema is null.

## Example

Create a collection with an INT64 primary key field and a FLOAT_VECTOR field after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField(milvus::FieldSchema("book_id", milvus::DataType::INT64, "book id", true, false));
schema->AddField(
    milvus::FieldSchema("book_intro", milvus::DataType::FLOAT_VECTOR, "book intro").WithDimension(8));

auto request = milvus::CreateCollectionRequest()
    .WithDatabaseName("default")
    .WithCollectionName("books")
    .WithDescription("a collection of books")
    .WithCollectionSchema(schema)
    .WithNumShards(1)
    .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);
status = client->CreateCollection(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
