# SegmentLevel

This enum identifies the level of a segment returned by `ListQuerySegments()` or `ListPersistentSegments()`.

```cpp
enum class SegmentLevel {
    UNKNOWN = -1,
    LEGACY = 0,
    L0 = 1,
    L1 = 2,
    L2 = 3,
};
```

**Constants:**

- **UNKNOWN** (-1) - The segment level is unknown.

- **LEGACY** (0) - Legacy segment.

- **L0** (1) - Level-0 segment (delta log).

- **L1** (2) - Level-1 sealed segment.

- **L2** (3) - Level-2 sealed segment.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
using namespace milvus;

// ListQuerySegments() reports the level of each segment in the collection
auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

ListQuerySegmentsResponse response;
auto status = client->ListQuerySegments(
    ListQuerySegmentsRequest().WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& seg : response.Result()) {
    std::cout << "segment " << seg.SegmentID()
              << " level=" << static_cast<int>(seg.Level()) << std::endl;
}
```
