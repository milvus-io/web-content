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

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. On success, the GetCollectionStatsResponse carries the collection statistics, which currently contain only the row count.

- **response** (*GetCollectionStatsResponse*) -

    - **Stats** (*const CollectionStat&*) -

        Get collection stats.

        - **Name** (*const std::string&*) -

            Get collection name.

        - **RowCount** (*uint64_t*) -

            Return row count of this collection.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details. See [StatusCode](../Client/StatusCode.md).

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
