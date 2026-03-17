# Query()

This operation issues a query with a set of criteria and returns a list of records that exactly match the query.

```cpp
Status Query(const QueryRequest& request, QueryResponse& response)
```

## Request Syntax

```cpp
auto request = QueryRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .WithOutputFields(output_field_names)
    .WithConsistencyLevel(consistency_level)
    .WithFilter(filter)
    .WithFilterTemplates(value)
    .WithLimit(limit)
    .WithOffset(offset)
    .WithIgnoreGrowing(ignore_growing)
    .WithTimezone(timezone);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the names of the partitions. If it is empty, the default partition applies.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the output field names.

- `AddOutputField(const std::string& output_field)`

    Adds an output field.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level. 

- `WithFilter(std::string filter)`

    Sets a filter expression.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds a filter template. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets filter templates. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithLimit(int64_t limit)`

    Sets the number of entities to return. This is available only when the filter expression is empty.

- `WithOffset(int64_t offset)`

    Sets the offset value. This is available only when the filter expression is empty.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets whether to ignore growing segments.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Add an extra param.

- `WithTimezone(const std::string& timezone)`

    Sets the timezone. This applies only to the Timestamptz field. For details, refer to [this page](https://milvus.io/docs/single-vector-search.md#Temporarily-set-a-timezone-for-a-search).

**RETURNS:**

*Status* with *QueryResponse*

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

auto request = milvus::QueryRequest()
                   .WithCollectionName(collection_name)
                   .AddPartitionName(partition_name)
                   .WithFilter(field_id + " in [1, 5, 10]")
                   .AddOutputField(field_id)
                   .AddOutputField(field_name)
                   .AddOutputField(field_age)
                   // set to EVENTUALLY level since the last query uses STRONG level and no data changed
                   .WithConsistencyLevel(milvus::ConsistencyLevel::EVENTUALLY);

std::cout << "\nQuery with expression: " << request.Filter() << std::endl;
milvus::QueryResponse response;
status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto query_results = response.Results();
milvus::EntityRows output_rows;
status = query_results.OutputRows(output_rows);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Query results:" << std::endl;
for (const auto& row : output_rows) {
    std::cout << "\t" << row << std::endl;
}
```
