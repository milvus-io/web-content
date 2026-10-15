# HasPartition()

This operation checks whether a partition exists.

```cpp
Status HasPartition(const HasPartitionRequest& request, HasPartitionResponse& response)
```

## Request Syntax

```cpp
auto request = HasPartitionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name);
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

    Sets the name of the partition.

- `SetPartitionName(const std::string& partition_name)`

    Set name of the partition.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. Whether the partition exists is carried in the response object.

- **response** (*HasPartitionResponse*) -

    - **Has** (*bool*) -

        Get whether the partition exists or not.

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

milvus::HasPartitionResponse response;
status = client->HasPartition(
    milvus::HasPartitionRequest()
        .WithCollectionName("my_collection")
        .WithPartitionName("my_partition"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Partition exists: " << response.Has() << std::endl;
```
