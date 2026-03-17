# CreateCollection()

This operation creates a collection.

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
    .WithProperties(value)
    .WithIndexes(indexes);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

    <div class="alert note">
    
    Historically, **[CollectionSchema](CollectionSchema.md)** also contains a collection name. **WithCollectionName()** will override the collection name specified in **[CollectionSchema](CollectionSchema.md)**.

    </div>

- `WithDescription(const std::string& description)`

    Sets the name of the collection. 

    <div class="alert note">
    
    Historically, **[CollectionSchema](CollectionSchema.md)** also contains a description. **WithDescription()** will override the collection description specified in **[CollectionSchema](CollectionSchema.md)**.

    </div>

- `WithCollectionSchema(const [CollectionSchemaPtr](CollectionSchema.md)& schema)`

    Sets the collection schema.

- `WithNumPartitions(int64_t num_partitions)`

    Sets the number of partitions when a partition key is present.

- `WithNumShards(int64_t num_shards)`

    Sets the number of shards of the collection. 

    <div class="alert note">
    
    Historically, **[CollectionSchema](CollectionSchema.md)** also contains the number of shards. **WithNumShards()** will override the number of shards specified in **[CollectionSchema](CollectionSchema.md)**.

    </div>

- `WithConsistencyLevel([ConsistencyLevel](ConsistencyLevel.md) level)`

    Sets the default consistency level of this collection.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets properties of this collection.

- `AddProperty(const std::string& key, const std::string& property)`

    Sets a property of this collection.

- `WithIndexes(std::vector<[IndexDesc](../Management/IndexDesc.md)>&& indexes)`

    Sets the indexes to be created.

- `AddIndex([IndexDesc](../Management/IndexDesc.md)&& index)`

    Adds an index to the collection being created.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr collection_schema = std::make_shared<milvus::CollectionSchema>();
collection_schema->AddField({field_id, milvus::DataType::INT64, "user id", true, false});
milvus::FieldSchema varchar_scheam{field_name, milvus::DataType::VARCHAR, "user name"};
varchar_scheam.SetMaxLength(100);
collection_schema->AddField(varchar_scheam);
collection_schema->AddField({field_age, milvus::DataType::INT8, "user age"});
collection_schema->AddField(
    milvus::FieldSchema(field_face, milvus::DataType::FLOAT_VECTOR, "face signature").WithDimension(dimension));

// define indexes
milvus::IndexDesc index_vector(field_face, "", milvus::IndexType::IVF_FLAT, milvus::MetricType::COSINE);
index_vector.AddExtraParam(milvus::NLIST, "100");
milvus::IndexDesc index_sort(field_age, "", milvus::IndexType::STL_SORT);
milvus::IndexDesc index_varchar(field_name, "", milvus::IndexType::TRIE);

// drop collection if it exists, the CreateCollectionRequest with indexes will automatically create indexes
// for this collection and load the collection
status = client->DropCollection(
    milvus::DropCollectionRequest().WithCollectionName(collection_name).WithDatabaseName(db_name));
status = client->CreateCollection(
    milvus::CreateCollectionRequest()
        .WithDatabaseName(db_name)
        .WithCollectionName(collection_name)
        .WithDescription("my collection")
        .WithNumShards(1)
        .WithCollectionSchema(collection_schema)
        .AddIndex(std::move(index_vector))
        .AddIndex(std::move(index_sort))
        .AddIndex(std::move(index_varchar))
        .AddProperty("my_prop", "dummy")                    // add a customized property
        .AddProperty(milvus::COLLECTION_TTL_SECONDS, "60")  // configure a built-in property
        .WithConsistencyLevel(milvus::ConsistencyLevel::STRONG));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
