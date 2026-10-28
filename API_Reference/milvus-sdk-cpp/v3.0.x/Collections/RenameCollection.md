# RenameCollection()

This operation renames a collection.

```cpp
Status RenameCollection(const RenameCollectionRequest& request)
```

## Request Syntax

```cpp
auto request = RenameCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name1)
    .WithNewCollectionName(collection_name2)
    .WithTargetDatabaseName(db_name2);
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

- `WithNewCollectionName(const std::string& collection_name)`

    Set the new name of the collection.

- `SetNewCollectionName(const std::string& collection_name)`

    Set new name of the collection.

- `WithTargetDatabaseName(const std::string& db_name)`

    Set the name of the target database. The renamed collection is moved to this database. The default database applies if it is empty.

- `SetTargetDatabaseName(const std::string& db_name)`

    Set the target database name.

**RETURNS:**

*[Status](../Client/Status.md)*

Check `status.IsOk()` to confirm success.

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

status = client->RenameCollection(
    milvus::RenameCollectionRequest()
        .WithCollectionName("old_collection")
        .WithNewCollectionName("new_collection"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
