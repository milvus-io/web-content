# Delete()

This operation deletes entities by a filtering expression or an ID array.

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
    .WithFilterTemplates(value)
    .WithIDs(id_array);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionName(const std::string& partition_name)`

    Sets the names of the partitions. If it is empty, the default partition applies.

- `WithFilter(const std::string& filter)`

    Sets a filter expression.

- `AddFilterTemplate(std::string key, nlohmann::json&& filter_template)`

    Adds a filter template. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets filter templates. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets a set of integer primary keys. This takes effect only if `WithFilter()` is empty.

**RETURNS:**

*Status* with *DeleteResponse*

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

milvus::DeleteResponse resp_delete;
status = client->Delete(milvus::DeleteRequest()
                            .WithCollectionName(collection_name)
                            .WithPartitionName(partition_name)
                            .WithFilter(field_id + "== 5"),
                        resp_delete);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
