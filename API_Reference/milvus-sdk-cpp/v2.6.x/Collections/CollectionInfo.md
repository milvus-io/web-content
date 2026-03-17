# CollectionInfo

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

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

ListCollectionsResponse response;
auto status = client->ListCollections(
    ListCollectionsRequest().WithDatabaseName("default"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const CollectionsInfo& infos = response.CollectionInfos();
for (const auto& info : infos) {
    std::cout << "Name:    " << info.Name() << "\n"
              << "ID:      " << info.ID() << "\n"
              << "Created: " << info.CreatedTime() << "\n";
}
```
