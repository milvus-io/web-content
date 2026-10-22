# GetLoadState()

This operation gets the load state of the collection or partitions.

```cpp
Status GetLoadState(const GetLoadStateRequest& request, GetLoadStateResponse& response)
```

## Request Syntax

```cpp
auto request = GetLoadStateRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names);
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

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names. This is optional, and when set, this operation returns the load state of the specified partitions. If this is empty, this operation returns the load state of the specified collection.

- `SetPartitionNames(std::set<std::string>&& partition_names)`

    Set partition names to get load state of the partition. If partition name list is empty, will get load state of the collection.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name to get its load state.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the GetLoadStateResponse carries the load state and loading progress.

- **response** (*GetLoadStateResponse*) -

    - **State** (*LoadState*) -

        Get loading state.

    - **Progress** (*int64_t*) -

        Get percent value of loading progress.

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

milvus::GetLoadStateResponse load_response;
status = client->GetLoadState(
    milvus::GetLoadStateRequest()
        .WithDatabaseName(db_name)
        .WithCollectionName(collection_name),
    load_response
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "\tCollection load state: " << std::to_string(load_response.State()) << std::endl;
```
