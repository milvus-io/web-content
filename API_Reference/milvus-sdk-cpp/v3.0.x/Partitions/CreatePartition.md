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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionName(const std::string& partition_name)`

    Sets the name of the partition.

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

status = client->CreatePartition(milvus::CreatePartitionRequest()
                                     .WithDatabaseName(db_name)
                                     .WithCollectionName(collection_name)
                                     .WithPartitionName(partition_name));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
