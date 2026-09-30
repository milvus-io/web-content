# Query()

This operation queries entities in a collection that match a filter expression, or a set of primary keys, and returns the matching records through the response parameter. Callers check the returned Status and read the matched records from the response's query results.

```cpp
Status Query(const QueryRequest& request, QueryResponse& response)
```

## Request Syntax

```cpp
auto request = QueryRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .AddPartitionName(partition_name)
    .WithOutputFields(output_field_names)
    .AddOutputField(output_field)
    .WithConsistencyLevel(consistency_level)
    .WithIDs(id_array)
    .WithIDs(id_array)
    .WithFilter(filter)
    .AddFilterTemplate(key, filter_template)
    .WithFilterTemplates(filter_templates)
    .WithLimit(limit)
    .WithOffset(offset)
    .WithIgnoreGrowing(ignore_growing)
    .AddExtraParam(key, value)
    .WithTimezone(timezone);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name to query; the client's default database is used if it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to query, which cannot be empty.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names to constrain the query scope; if empty, the entire collection is queried. Optional.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name to constrain the query scope. Optional.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the names of the fields to return in the query results. Optional.

- `AddOutputField(const std::string& output_field)`

    Adds a field name to return in the query results. Optional.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level used for this query; if unset, the collection's default level applies. Optional.

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets the primary keys to query, accepting either integer or string IDs. Note: IDs and filter cannot be set at the same time. Optional.

- `WithIDs(std::vector<std::string>&& id_array)`

    Sets the primary keys to query, accepting either integer or string IDs. Note: IDs and filter cannot be set at the same time. Optional.

- `WithFilter(std::string filter)`

    Sets the filter expression that matched entities must satisfy.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds a filter template value that substitutes a placeholder in the filter expression; only takes effect when the filter is not empty. Valid template values are boolean, numeric, string, or array. Optional.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets the filter template values used to substitute placeholders in the filter expression; only take effect when the filter is not empty. Optional.

- `WithLimit(int64_t limit)`

    Sets the maximum number of entities to return; only available when the filter expression is empty. Note: this value is stored in the extra params. Optional.

- `WithOffset(int64_t offset)`

    Sets the number of entities to skip; only available when the filter expression is empty. Note: this value is stored in the extra params. Optional.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets whether to ignore data in growing segments during the query. Note: this value is stored in the extra params. Optional.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Adds an extra parameter key-value pair to the request. Optional.

- `WithTimezone(const std::string& timezone)`

    Sets the timezone, which takes effect for Timestamptz fields. Note: this value is stored in the extra params. Optional.

**RETURNS:**

*Status*

Returns a Status indicating whether the query succeeded, with the matching records and their requested output field data delivered in the response's query results.

- **response** (*QueryResponse*) -

    - **Results** (*const QueryResults&*) -

        Get result of query operation.

        - **OutputField** (*FieldDataPtr*) -

            Get an output field by name.

            - **Name** (*const std::string&*) -

                Get field name.

            - **Type** ([DataType](../Collections/DataType.md)) -

                Get field data type.

            - **ElementType** ([DataType](../Collections/DataType.md)) -

                Get the element type for an array field.

            - **Count** (*size_t*) -

                Total number of field elements.

        - **OutputFields** (*const std::vector<FieldDataPtr>&*) -

            Get all output fields data.

            - **Name** (*const std::string&*) -

                Get field name.

            - **Type** ([DataType](../Collections/DataType.md)) -

                Get field data type.

            - **ElementType** ([DataType](../Collections/DataType.md)) -

                Get the element type for an array field.

            - **Count** (*size_t*) -

                Total number of field elements.

        - **OutputFieldNames** (*const std::set<std::string>&*) -

            Get output field names specified by query().

        - **OutputRows** (*Status*) -

            Get all output rows.

        - **OutputRow** (*Status*) -

            Get row data. Throw exception if the i is out of bound.

        - **GetRowCount** (*uint64_t*) -

            Get row count of the result. Return the value of count(*) when you query with count(*).

    - **SessionTs** (*uint64_t*) -

**ERROR HANDLING:**

- **std::exception**

    When request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Query with a filter expression after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::QueryRequest()
    .WithCollectionName("book")
    .WithFilter("word_count > 10000")
    .AddOutputField("book_id")
    .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);

milvus::QueryResponse response;
status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto results = response.Results();
std::cout << "matched entities: " << results.GetRowCount() << std::endl;
auto ids = results.OutputField<milvus::Int64FieldData>("book_id");
if (ids) {
    for (const auto& id : ids->Data()) {
        std::cout << id << std::endl;
    }
}
```
