# GetCollectionStats()

This operation returns collection statistics; it currently only returns row count.

```cpp
Status GetCollectionStats(const GetCollectionStatsRequest& request, GetCollectionStatsResponse& response)
```

## Request Syntax

```cpp
auto request = GetCollectionStatsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

**RETURNS:**

*Status* with *GetCollectionStatsResponse*

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

milvus::GetCollectionStatsResponse response;
status = client->GetCollectionStats(
    milvus::GetCollectionStatsRequest()
        .WithCollectionName(collection_name),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Collection " << collection_name << " row count: " << response.Stats().RowCount() << std::endl;
```
