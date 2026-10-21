# ListPartitions()

This operation lists the partitions in a collection.

```cpp
Status ListPartitions(const ListPartitionsRequest& request, ListPartitionsResponse& response)
```

## Request Syntax

```cpp
auto request = ListPartitionsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set database name. If database name is empty, will list collections of the default database.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set name of the collection.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListPartitionsResponse carries the list of partitions and brief information for each.

- **response** (*ListPartitionsResponse*) -

    - **PartitionsNames** (*const std::vector<std::string>&*) -

        Get partition names.

    - **PartitionInfos** (*const std::vector<PartitionInfo>&*) -

        Get informations of partitions.

        - **Name** (*std::string*) -

            Get name of this partition.

        - **Id** (*int64_t*) -

            Get internal id of this partition.

        - **CreatedUtcTimestamp** (*uint64_t*) -

            Get the utc timestamp calculated by created_timestamp.

        - **InMemoryPercentage** (*int64_t*) -

            **Deprecated.** Always returns `0`. Use `GetLoadState()` for the load state.

        - **Loaded** (*bool*) -

            **Deprecated.** Always returns `false`. Use `GetLoadState()` for the load state.

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

milvus::ListPartitionsResponse resp_list_part;
status = client->ListPartitions(
    milvus::ListPartitionsRequest().WithDatabaseName(db_name).WithCollectionName(collection_name), resp_list_part);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "\nPartitions of " << collection_name << ":" << std::endl;
for (auto& info : resp_list_part.PartitionInfos()) {
    std::cout << "\t" << info.Name() << std::endl;
}
```
