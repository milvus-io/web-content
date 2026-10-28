# GetPartitionStatistics()

This operation gets the partition statistics.

```cpp
Status GetPartitionStatistics(const GetPartitionStatsRequest& request, GetPartitionStatsResponse& response)
```

## Request Syntax

```cpp
auto request = GetPartitionStatsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionName(const std::string& partition_name)`

    Sets the name of a partition.

- `SetPartitionName(const std::string& partition_name)`

    Sets the partition name.

- `WithPartitionName(const std::string& partition_name)`

    Sets the partition name.

- `SetCollectionName(const std::string& collection_name)`

    Sets the collection name.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection name.

- `SetDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name. Use the default database when it is empty.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. On success, the GetPartitionStatsResponse carries the partition statistics, which currently contain only the row count.

- **response** (*GetPartitionStatsResponse*) -

    - **Stats** (*const PartitionStat&*) -

        Get partition stats.

        - **Name** (*const std::string&*) -

            Get partition name.

        - **RowCount** (*uint64_t*) -

            Return row count of this partition.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetPartitionStatsResponse response;
status = client->GetPartitionStatistics(
    milvus::GetPartitionStatsRequest()
        .WithCollectionName("my_collection")
        .WithPartitionName("my_partition"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Row count: " << response.Stats().RowCount() << std::endl;
```
