# QueryIterator()

This operation returns a QueryIterator object based on scalar field(s) by filtering expression. 

```cpp
Status QueryIterator(QueryIteratorRequest& request, QueryIteratorPtr& response)
```

<div class="alert note">

Do not disconnect the MilvusClientV2 when the iterator is in use. The order of the returned entities cannot be guaranteed. Read [this document](https://milvus.io/docs/with-iterators.md) for more.

</div>

## Request Syntax

```cpp
auto request = QueryIteratorRequest()
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
    .WithTimezone(timezone)
    .WithReduceStopForBest(reduce_stop_for_best);
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

- `WithReduceStopForBest(bool reduce_stop_for_best)`

    Sets the flag of internal retrieve strategy.

**RETURNS:**

*Status* with *QueryIteratorPtr*

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

milvus::QueryIteratorRequest request;
request.SetCollectionName(collection_name);
request.SetBatchSize(batch);
request.SetOffset(offset);
request.SetLimit(limit);
request.SetFilter(filter);
request.AddOutputField(field_name);
request.AddOutputField(field_age);
request.AddOutputField("a");  // dynamic field

milvus::QueryIteratorPtr iterator;
status = client->QueryIterator(request, iterator);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::set<int64_t> ids;
int pages = 0;
uint64_t total_count = 0;
while (true) {
    milvus::QueryResults batch_results;
    status = iterator->Next(batch_results);
    if (!status.IsOk()) {
        std::cout << status.Message() << std::endl;
    }
    auto batch_count = batch_results.GetRowCount();
    if (batch_count == 0) {
        std::cout << "query iteration finished" << std::endl;
        break;
    }
    pages++;
    total_count += batch_count;

    milvus::EntityRows rows;
    status = batch_results.OutputRows(rows);
    if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
    std::cout << "No." << std::to_string(pages) << " page " << std::to_string(rows.size()) << " rows fetched"
              << std::endl;
    std::cout << "\tthe first row: " << (*rows.begin()).dump() << std::endl;
    std::cout << "\tthe last row: " << (*rows.rbegin()).dump() << std::endl;
    for (const auto& row : rows) {
        // std::cout << row.dump() << std::endl;
        ids.insert(row[field_id].get<int64_t>());
    }
}
```
