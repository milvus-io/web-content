# ListCollections()

This operation returns a list of all collections, including brief information for each.

```cpp
Status ListCollections(const ListCollectionsRequest& request, ListCollectionsResponse& response)
```

## Request Syntax

```cpp
auto request = ListCollectionsRequest()
    .WithDatabaseName(db_name)
    .WithOnlyShowLoaded(only_show_loaded);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set database name. If database name is empty, will list collections of the default database

- `WithOnlyShowLoaded(bool only_show_loaded)`

    Sets the flag only show loaded collections or show all collections. Default: `false`.

- `SetOnlyShowLoaded(bool only_show_loaded)`

    Set the flag only show loaded collections or show all collections.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. On success, the ListCollectionsResponse carries the list of collections and brief information for each.

- **response** (*ListCollectionsResponse*) -

    - **CollectionNames** (*const std::vector<std::string>&*) -

        Get collections names.

    - **CollectionInfos** (*const std::vector<CollectionInfo>&*) -

        Get brief information of collections. See the `### CollectionInfo` section below.

### CollectionInfo

This class holds summary information about a single collection in a list result. `ListCollectionsResponse::CollectionInfos()` returns a `CollectionsInfo` value, which is a type alias for `std::vector<CollectionInfo>`.

```cpp
CollectionInfo();
CollectionInfo(std::string collection_name, int64_t collection_id, uint64_t create_time);

using CollectionsInfo = std::vector<CollectionInfo>;
```

**METHODS:**

- `const std::string& Name() const`

    Name of the collection.

- `int64_t ID() const`

    Server-assigned internal ID of the collection.

- `uint64_t CreatedTime() const`

    UTC timestamp (microseconds) when the collection was created.

- `uint64_t MemoryPercentage() const`

    Deprecated. Always returns `0`. Use `GetLoadState()` to check the load progress instead.

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

milvus::ListCollectionsResponse resp_list_coll;
status = client->ListCollections(
    milvus::ListCollectionsRequest()
        .WithDatabaseName(db_name), 
    resp_list_coll
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "\nCollections:" << std::endl;
for (auto& name : resp_list_coll.CollectionNames()) {
    std::cout << "\t" << name << std::endl;
}
```
