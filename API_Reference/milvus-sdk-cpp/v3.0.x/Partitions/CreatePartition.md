# CreatePartition()

This operation creates a partition in a collection.

```cpp
Status CreatePartition(const CreatePartitionRequest& request)
```

## Request Syntax

```cpp
auto request = CreatePartitionRequest()
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

status = client->CreatePartition(milvus::CreatePartitionRequest()
                                     .WithDatabaseName(db_name)
                                     .WithCollectionName(collection_name)
                                     .WithPartitionName(partition_name));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
