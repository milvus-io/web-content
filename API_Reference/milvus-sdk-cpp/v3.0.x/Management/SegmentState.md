# SegmentState

This enum describes the runtime state of a segment returned by `ListQuerySegments()` or `ListPersistentSegments()`.

```cpp
enum class SegmentState {
    UNKNOWN = 0,
    NOT_EXIST = 1,
    GROWING = 2,
    SEALED = 3,
    FLUSHED = 4,
    FLUSHING = 5,
    DROPPED = 6,
};
```

**Constants:**

- **UNKNOWN** (0) - The segment state is unknown.

- **NOT_EXIST** (1) - The segment does not exist.

- **GROWING** (2) - The segment is growing and accepting writes.

- **SEALED** (3) - The segment is sealed and no longer accepts writes.

- **FLUSHED** (4) - The segment has been flushed to storage.

- **FLUSHING** (5) - The segment is being flushed to storage.

- **DROPPED** (6) - The segment has been dropped.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
using namespace milvus;

// ListQuerySegments() reports the runtime state of each segment in the collection
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
              << " state=" << static_cast<int>(seg.State()) << std::endl;
}
```
