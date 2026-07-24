# CreateCollection()

This operation creates a collection.

## Request Syntax

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

