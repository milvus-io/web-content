# HasCollection()

This operation checks whether the specified collection exists.

```cpp
Status HasCollection(const HasCollectionRequest& request, HasCollectionResponse& response)
```

## Request Syntax

```cpp
auto request = HasCollectionRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the target collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. Whether the collection exists is carried in the response object.

- **response** (*HasCollectionResponse*) -

    - **Has** (*bool*) -

        Get whether the collection exists or not.

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

milvus::HasCollectionResponse response;
status = client->HasCollection(
    milvus::HasCollectionRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Collection exists: " << response.Has() << std::endl;
```
