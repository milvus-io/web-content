# BatchDescribeCollections()

This operation fetches the full descriptions of multiple collections in a single call.

```cpp
Status BatchDescribeCollections(const BatchDescribeCollectionsRequest& request, BatchDescribeCollectionsResponse& response)
```

## Request Syntax

```cpp
auto request = BatchDescribeCollectionsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionNames(collection_names)
    .AddCollectionName(collection_name)
    .WithCollectionIDs(collection_ids)
    .AddCollectionID(collection_id);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the database that contains the collections to describe.

- `WithCollectionNames(std::vector<std::string>&& collection_names)`

    Sets the names of the collections to describe.

- `AddCollectionName(const std::string& collection_name)`

    Adds the name of one collection to describe.

- `WithCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Sets the IDs of the collections to describe.

- `AddCollectionID(int64_t collection_id)`

    Adds the ID of one collection to describe.

**RETURNS:**

*Status*

Returns a status indicating whether the operation succeeded. The response carries the full descriptions of the requested collections.

- **response** (*BatchDescribeCollectionsResponse*) -

    - **Descs** (*const std::vector<CollectionDesc>&*) -

        Get collection descriptions.

        - **DatabaseName** (*const std::string&*) -

            The database name which this collection belong to.

        - **CollectionName** (*const std::string&*) -

            The collection name.

        - **Description** (*const std::string&*) -

            Description of the collection.

        - **NumShards** (*int64_t*) -

            Shards number of the collection.

        - **Schema** (*const CollectionSchema&*) -

            Collection schema.

            - **Name** (*const std::string&*) -

                Collection name, cannot be empty.

            - **Description** (*const std::string&*) -

                Collection description, can be empty.

            - **ShardsNum** (*int32_t*) -

                Collection shards number, the number must be larger than zero, default value is 2.

            - **EnableDynamicField** (*bool*) -

                Whether undeclared fields are stored in the hidden `meta` dynamic field. When enabled, any field not declared in the schema is stored as a key-value pair in a hidden JSON field named `meta`.

            - **Fields** (*const std::vector<FieldSchema>&*) -

                Fields schema array.

                - **Name** (*const std::string&*) -

                    Name of this field, cannot be empty.

                - **Description** (*const std::string&*) -

                    Description of this field, can be empty.

                - **FieldDataType** ([DataType](DataType.md)) -

                    Field data type.

                - **ElementType** ([DataType](DataType.md)) -

                    Element type of array field.

                - **IsPrimaryKey** (*bool*) -

                    The field is primary key or not. Each collection has exactly one primary key. Only INT64 and VARCHAR fields can be primary keys.

                - **AutoID** (*bool*) -

                    Field item's id is auto-generated or not. Only applies to the primary key field. If true, the server generates IDs on insert. Otherwise the client must provide an ID for each entity.

                - **IsPartitionKey** (*bool*) -

                    Field item's id is partition key or not. A partition key routes each entity to a partition. Partition key fields cannot be nullable.

                - **IsClusteringKey** (*bool*) -

                    Field item's id is clustering key or not.

                - **TypeParams** (*const std::map<std::string, std::string>&*) -

                    Extra key-value pair setting for this field.

                - **Dimension** (*uint32_t*) -

                    Get dimension for a vector field.

                - **MaxLength** (*uint32_t*) -

                    Get max length for a varchar field.

                - **MaxCapacity** (*uint32_t*) -

                    Get max capacity of an array field.

                - **IsEnableAnalyzer** (*bool*) -

                    Get the flag whether enable analyzer.

                - **IsEnableMatch** (*bool*) -

                    Get the flag whether enable text match.

                - **AnalyzerParams** (*nlohmann::json*) -

                    Get analyzer parameters.

                - **MultiAnalyzerParams** (*nlohmann::json*) -

                    Get multi analyzer parameters.

                - **IsNullable** (*bool*) -

                    Get the flag whether the field value is nullable. A nullable field stores NULL when its value is omitted or explicitly NULL on insert. Primary and partition key fields cannot be nullable; vector fields with NULL cannot be filtered by IS NULL expressions.

                - **DefaultValue** (*const nlohmann::json&*) -

                    Get default value of this field.

                - **ExternalField** (*const std::string&*) -

                    Get external field mapping name.

            - **StructFields** (*const std::vector<StructFieldSchema>&*) -

                Struct fields schema array.

                - **Name** (*const std::string&*) -

                    Name of this field, cannot be empty.

                - **Description** (*const std::string&*) -

                    Description of this field, can be empty.

                - **MaxCapacity** (*int64_t*) -

                    Get max capacity for the struct field.

                - **IsNullable** (*bool*) -

                    Whether the struct field is nullable.

                - **Fields** (*const std::vector<FieldSchema>&*) -

                    Get sub fields of the struct field.

                    - **Name** (*const std::string&*) -

                        Name of this field, cannot be empty.

                    - **Description** (*const std::string&*) -

                        Description of this field, can be empty.

                    - **FieldDataType** ([DataType](DataType.md)) -

                        Field data type.

                    - **ElementType** ([DataType](DataType.md)) -

                        Element type of array field.

                    - **IsPrimaryKey** (*bool*) -

                        The field is primary key or not. Each collection has exactly one primary key. Only INT64 and VARCHAR fields can be primary keys.

                    - **AutoID** (*bool*) -

                        Field item's id is auto-generated or not. Only applies to the primary key field. If true, the server generates IDs on insert. Otherwise the client must provide an ID for each entity.

                    - **IsPartitionKey** (*bool*) -

                        Field item's id is partition key or not. A partition key routes each entity to a partition. Partition key fields cannot be nullable.

                    - **IsClusteringKey** (*bool*) -

                        Field item's id is clustering key or not.

                    - **TypeParams** (*const std::map<std::string, std::string>&*) -

                        Extra key-value pair setting for this field.

                    - **Dimension** (*uint32_t*) -

                        Get dimension for a vector field.

                    - **MaxLength** (*uint32_t*) -

                        Get max length for a varchar field.

                    - **MaxCapacity** (*uint32_t*) -

                        Get max capacity of an array field.

                    - **IsEnableAnalyzer** (*bool*) -

                        Get the flag whether enable analyzer.

                    - **IsEnableMatch** (*bool*) -

                        Get the flag whether enable text match.

                    - **AnalyzerParams** (*nlohmann::json*) -

                        Get analyzer parameters.

                    - **MultiAnalyzerParams** (*nlohmann::json*) -

                        Get multi analyzer parameters.

                    - **IsNullable** (*bool*) -

                        Get the flag whether the field value is nullable. A nullable field stores NULL when its value is omitted or explicitly NULL on insert. Primary and partition key fields cannot be nullable; vector fields with NULL cannot be filtered by IS NULL expressions.

                    - **DefaultValue** (*const nlohmann::json&*) -

                        Get default value of this field.

                    - **ExternalField** (*const std::string&*) -

                        Get external field mapping name.

            - **AnnsFieldNames** (*std::unordered_set<std::string>*) -

                Return Anns field names.

            - **PrimaryFieldName** (*std::string*) -

                Return the primary key field name.

            - **Functions** (*const std::vector<FunctionPtr>&*) -

                Get functions array.

                - **Name** (*const std::string&*) -

                    Name of this function, cannot be empty.

                - **Description** (*const std::string&*) -

                    Description of this function, can be empty.

                - **GetFunctionType** (*FunctionType*) -

                    Function type.

                - **InputFieldNames** (*const std::vector<std::string>&*) -

                    Get input field names.

                - **OutputFieldNames** (*const std::vector<std::string>&*) -

                    Get output field names.

                - **Params** (*const std::unordered_map<std::string, std::string>&*) -

                    Get extra param.

            - **ExternalSource** (*const std::string&*) -

                Get external collection source path.

            - **ExternalSpec** (*const nlohmann::json&*) -

                Get external collection spec JSON.

        - **ID** (*int64_t*) -

            Collection id.

        - **Alias** (*const std::vector<std::string>&*) -

            Collection alias.

        - **CreatedTime** (*uint64_t*) -

            Timestamp when the collection created.

        - **UpdateTime** (*uint64_t*) -

            Timestamp when the collection is updated.

        - **Properties** (*const std::unordered_map<std::string, std::string>&*) -

            Collection properties.

        - **ExternalSource** (*const std::string&*) -

            Get the external data source of the collection.

        - **ExternalSpec** (*const nlohmann::json&*) -

            Get the external file specification of the collection.

        - **GetConsistencyLevel** ([ConsistencyLevel](ConsistencyLevel.md)) -

            Consistency level of the collection.

        - **NumPartitions** (*int64_t*) -

            Number of partitions of the collection. Only valid when the collection is created with a partition key.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call BatchDescribeCollections() on a connected MilvusClientV2 to fetch the full descriptions of several collections by name in a single request.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::BatchDescribeCollectionsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionNames(std::move(collection_names))
    .AddCollectionName(collection_name);
milvus::BatchDescribeCollectionsResponse response;
status = client->BatchDescribeCollections(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto descs = response.Descs();
std::cout << "Described " << descs.size() << " collections" << std::endl;
```
