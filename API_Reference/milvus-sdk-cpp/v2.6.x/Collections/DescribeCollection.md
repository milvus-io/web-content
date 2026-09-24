# DescribeCollection()

This operation fetches the full description of a collection, including its schema and properties. The description is populated into the response object supplied by the caller.

```cpp
Status DescribeCollection(const DescribeCollectionRequest& request, DescribeCollectionResponse& response)
```

## Request Syntax

```cpp
auto request = DescribeCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is left empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to describe.

**RETURNS:**

*Status*

Returns a Status indicating success or failure, and fills the supplied DescribeCollectionResponse with the collection's description, which is accessible through its Desc() accessor.

- **response** (*DescribeCollectionResponse*) -

    - **Desc** (*const CollectionDesc&*) -

        Get collection description.

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

    When the RPC transport fails or the server returns an error for the describe request. Inspect the returned Status message for the failure details.

## Example

Fetch and consume a collection description after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::DescribeCollectionResponse response;
status = client->DescribeCollection(
    milvus::DescribeCollectionRequest()
        .WithDatabaseName("default")
        .WithCollectionName("book"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Collection ID: " << response.Desc().ID() << std::endl;
```
