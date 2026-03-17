# TransferReplica()

This operation transfers replicas of a collection from one resource group to another.

```cpp
Status TransferReplica(const TransferReplicaRequest& request)
```

## Request Syntax

```cpp
auto request = TransferReplicaRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithSourceGroup(source_group)
    .WithTargetGroup(target_group)
    .WithNumReplicas(num);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name in which the collection is created.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithSourceGroup(const std::string& source_group)`

    Set the name of the source resource group.

- `WithTargetGroup(const std::string& target_group)`

    Set the name of the target resource group.

- `WithNumReplicas(int64_t num)`

    Set the number of replicas to transfer.

**RETURNS:**

*Status*

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

status = client->TransferReplica(
    milvus::TransferReplicaRequest()
        .WithCollectionName("my_collection")
        .WithSourceGroup("source_group")
        .WithTargetGroup("target_group")
        .WithNumReplicas(1));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
