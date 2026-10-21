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

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithPartitionName(const std::string& partition_name)`

    Sets the names of the partitions. If it is empty, the default partition applies.

- `SetPartitionName(const std::string& partition_name)`

    Set the partition name. If partition name is empty, will use the default partition.

- `WithFilter(const std::string& filter)`

    Sets a filter expression.

- `SetFilter(const std::string& filter)`

    Set filter expression.

- `AddFilterTemplate(std::string key, nlohmann::json&& filter_template)`

    Adds a filter template. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets filter templates. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `SetFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Set filter templates. Only take effect when filter is not empty.

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets a set of integer primary keys. This takes effect only if `WithFilter()` is empty.

- `SetIDs(std::vector<int64_t>&& id_array)`

    Set integer primary keys to be deleted. Only take effect when filter is empty.

- `WithIDs(std::vector<std::string>&& id_array)`

    Sets a set of string primary keys. This takes effect only if `WithFilter()` is empty.

- `SetIDs(std::vector<std::string>&& id_array)`

    Set string primary keys to be deleted. Only take effect when filter is empty.

**RETURNS:**

*Status* with *DeleteResponse*

Check `status.IsOk()` to confirm success.

### DmlResults

This class carries the outcome of a data-mutation operation (insert, upsert, or delete). It is accessed via `Results()` on `InsertResponse`, `UpsertResponse`, or `DeleteResponse`.

```cpp
const DmlResults& results = response.Results();
```

**METHODS:**

- `const IDArray& IdArray() const`

    The IDs of the entities that were inserted, upserted, or deleted. For auto-ID collections the server fills this in after insert. See IDArray for how to read integer or string IDs.

- `uint64_t Timestamp() const`

    Server-side operation timestamp. Can be passed as the `guarantee_timestamp` in subsequent search or query calls to ensure read-your-writes consistency.

- `uint64_t InsertCount() const`

    Number of rows that were inserted. Populated for `InsertResponse` and `UpsertResponse`.

- `uint64_t DeleteCount() const`

    Number of rows that were deleted. Populated for `DeleteResponse` and `UpsertResponse`.

- `uint64_t UpsertCount() const`

    Number of rows that were upserted (inserted as new or replaced existing). Populated for `UpsertResponse`.

- `int64_t Cost() const`

    Returns the operation cost in VCU reported by the server, -1 when unavailable.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details. See [StatusCode](../Client/StatusCode.md).

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
