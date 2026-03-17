# ListPersistentSegments()

This operation retrieves information about persisted segments from data nodes.

```cpp
Status ListPersistentSegments(const ListPersistentSegmentsRequest& request, ListPersistentSegmentsResponse& response)
```

## Request Syntax

```cpp
auto request = ListPersistentSegmentsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& name)`

    Sets the name of the collection.

**RETURNS:**

*Status* with *ListPersistentSegmentsResponse*

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

milvus::ListPersistentSegmentsResponse response;
status = client->ListPersistentSegments(
    milvus::ListPersistentSegmentsRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Segment count: " << response.Segments().size() << std::endl;
```
