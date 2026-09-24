# BatchDescribeCollections()

This operation fetches the full descriptions of multiple collections in a single call, selecting them by collection names, collection IDs, or both. Descriptions are returned through the response parameter, while the returned Status reports whether the call succeeded.

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

    Sets the name of the database that the target collections belong to.

- `WithCollectionNames(std::vector<std::string>&& collection_names)`

    Sets the collection names to describe.

- `AddCollectionName(const std::string& collection_name)`

    Adds one collection name to the list of names to describe.

- `WithCollectionIDs(std::vector<int64_t>&& collection_ids)`

    Sets the collection IDs to describe.

- `AddCollectionID(int64_t collection_id)`

    Adds one collection ID to the list of IDs to describe.

**RETURNS:**

*Status*

Returns one collection description (CollectionDesc) per requested collection name or ID in the response, each carrying that collection's schema and runtime details.

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

                    The field is primary key or not. Each collection only has one primary key. Currently only int64 type field can be primary key.

                - **AutoID** (*bool*) -

                    Field item's id is auto-generated or not. If ths flag is true, server will generate id when data is inserted. Else the client must provide id for each entity when insert data.

                - **IsPartitionKey** (*bool*) -

                    Field item's id is partition key or not.

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

                    Get the flag whether the field value is nullable.

                - **DefaultValue** (*const nlohmann::json&*) -

                    Get default value of this field.

            - **StructFields** (*const std::vector<StructFieldSchema>&*) -

                Struct fields schema array.

                - **Name** (*const std::string&*) -

                    Name of this field, cannot be empty.

                - **Description** (*const std::string&*) -

                    Description of this field, can be empty.

                - **MaxCapacity** (*int64_t*) -

                    Get max capacity for the struct field.

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

                        The field is primary key or not. Each collection only has one primary key. Currently only int64 type field can be primary key.

                    - **AutoID** (*bool*) -

                        Field item's id is auto-generated or not. If ths flag is true, server will generate id when data is inserted. Else the client must provide id for each entity when insert data.

                    - **IsPartitionKey** (*bool*) -

                        Field item's id is partition key or not.

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

                        Get the flag whether the field value is nullable.

                    - **DefaultValue** (*const nlohmann::json&*) -

                        Get default value of this field.

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

**ERROR HANDLING:**

- **std::exception**

    When request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Build the request with a database name and collection names, pass both the request and a response object to BatchDescribeCollections(), then read the per-collection descriptions from Descs().

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::BatchDescribeCollectionsRequest()
    .WithDatabaseName("default")
    .WithCollectionNames(std::vector<std::string>{"book", "articles"})
    .AddCollectionName("films");
milvus::BatchDescribeCollectionsResponse response;
status = client->BatchDescribeCollections(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& desc : response.Descs()) {
    std::cout << desc.CollectionName() << ", shards: " << desc.NumShards() << std::endl;
}
```
