# Delete()

This operation deletes entities from a collection by a filter expression or by their primary keys. Exactly one deletion condition must be provided: the request is rejected if both the filter and the ID list are set, or if neither is set.

```cpp
Status Delete(const DeleteRequest& request, DeleteResponse& response)
```

## Request Syntax

```cpp
auto request = DeleteRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name)
    .WithFilter(filter)
    .AddFilterTemplate(key, filter_template)
    .WithFilterTemplates(filter_templates)
    .AddFilterTemplate(key, filter_template)
    .WithIDs(id_array)
    .WithIDs(id_array);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used when it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to delete entities from.

- `WithPartitionName(const std::string& partition_name)`

    Sets the partition name; the default partition is used when it is empty. Optional.

- `WithFilter(const std::string& filter)`

    Sets the boolean filter expression that matches the entities to delete. Either a filter or primary keys must be set, but not both.

- `AddFilterTemplate(std::string key, nlohmann::json&& filter_template)`

    Adds a named filter template that fills a placeholder in the filter expression, improving parsing performance for long value lists; valid template values are boolean, numeric, string, or array, and it only takes effect when the filter expression is not empty. Optional.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets the filter templates as a map from placeholder names to template values; only takes effect when the filter expression is not empty. Optional.

- `AddFilterTemplate(const std::string& key, nlohmann::json&& filter_template)`

    Adds a named filter template that fills a placeholder in the filter expression, improving parsing performance for long value lists; valid template values are boolean, numeric, string, or array, and it only takes effect when the filter expression is not empty. Optional.

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets the primary keys of the entities to delete; the parameter takes an rvalue reference, so pass std::move(ids), and it only takes effect when the filter expression is empty. Either a filter or primary keys must be set, but not both.

- `WithIDs(std::vector<std::string>&& id_array)`

    Sets the primary keys of the entities to delete; the parameter takes an rvalue reference, so pass std::move(ids), and it only takes effect when the filter expression is empty. Either a filter or primary keys must be set, but not both.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the DeleteResponse output parameter is filled with the DML results, including the number of entities actually deleted.

- **response** (*DeleteResponse*) -

    - **Results** (*const DmlResults&*) -

        Get result of dml operation.

        - **IdArray** (*const IDArray&*) -

            The id array for entities which are inserted or deleted.

            - **IsIntegerID** (*bool*) -

                Indicate this is an integer id array.

            - **IntIDArray** (*const std::vector<int64_t>&*) -

                Return integer id array.

            - **StrIDArray** (*const std::vector<std::string>&*) -

                Return string id array.

            - **GetRowCount** (*uint64_t*) -

                Get row count.

        - **Timestamp** (*uint64_t*) -

            The operation timestamp marked by server side.

        - **InsertCount** (*uint64_t*) -

            The number of inserted rows.

        - **DeleteCount** (*uint64_t*) -

            The number of deleted rows.

        - **UpsertCount** (*uint64_t*) -

            The number of upserted rows.

        - **Cost** (*int64_t*) -

            The cost of the operation in vcus, -1 if the server did not report it.

**ERROR HANDLING:**

- **std::exception**

    Request construction, transport, or response processing fails. Inspect the returned Status or the exception message for failure details.

## Example

Delete entities matching a filter expression after connecting a MilvusClientV2; the deleted count is available through response.Results().DeleteCount().

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::string filter = "age > 18 and city in [\"beijing\", \"shanghai\"]";
milvus::DeleteResponse response;
status = client->Delete(milvus::DeleteRequest()
                            .WithCollectionName("my_collection")
                            .WithFilter(filter),
                        response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
