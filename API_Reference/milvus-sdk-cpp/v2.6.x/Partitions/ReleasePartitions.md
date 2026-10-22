# ReleasePartitions()

This operation releases the data of specific partitions from the query nodes.

```cpp
Status ReleasePartitions(const ReleasePartitionsRequest& request)
```

## Request Syntax

```cpp
auto request = ReleasePartitionsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `WithPartitionNames(const std::set<std::string>& partition_names)`

    Sets the names of the partitions.

- `SetPartitionNames(const std::set<std::string>& partition_names)`

    Set name of the partitions.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition to be released.

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->ReleasePartitions(
    milvus::ReleasePartitionsRequest()
        .WithCollectionName("my_collection")
        .AddPartitionName("partition_1")
        .AddPartitionName("partition_2"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
