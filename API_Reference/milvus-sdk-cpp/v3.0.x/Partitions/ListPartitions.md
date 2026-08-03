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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

**RETURNS:**

*Status* with *ListPartitionsResponse*

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
