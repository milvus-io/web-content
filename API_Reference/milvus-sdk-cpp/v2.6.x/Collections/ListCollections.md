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

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListCollectionsResponse carries the list of collections and brief information for each.

- **response** (*ListCollectionsResponse*) -

    - **CollectionNames** (*const std::vector<std::string>&*) -

        Get collections names.

    - **CollectionInfos** (*const std::vector<CollectionInfo>&*) -

        Get brief informations of collections.

        - **Name** (*const std::string&*) -

            Name of the collection.

        - **ID** (*int64_t*) -

            Internal ID of the collection.

        - **CreatedTime** (*uint64_t*) -

            The utc time when the collection is created.

        - **MemoryPercentage** (*uint64_t*) -

            Loading percentage of the collection.

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

milvus::ListCollectionsResponse resp_list_coll;
status = client->ListCollections(
    milvus::ListCollectionsRequest()
        .WithDatabaseName(db_name), 
    resp_list_coll
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "
Collections:" << std::endl;
for (auto& name : resp_list_coll.CollectionNames()) {
    std::cout << "	" << name << std::endl;
}
```
