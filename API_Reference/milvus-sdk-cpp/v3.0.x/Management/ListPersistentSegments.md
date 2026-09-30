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

The response's `Segments()` list contains `SegmentInfo` values. In addition to segment ID, collection ID, partition ID, row count, and state, each `SegmentInfo` value includes collection name, segment level, storage version, and sorted state.

**SegmentLevel values:**

- `UNKNOWN = -1`

- `LEGACY = 0`

- `L0 = 1`

- `L1 = 2`

- `L2 = 3`

**SegmentInfo methods:**

- `const std::string& CollectionName() const`

    Returns the collection name.

- `SegmentLevel Level() const`

    Returns the segment level.

- `int64_t StorageVersion() const`

    Returns the storage version.

- `bool IsSorted() const`

    Returns whether the segment is sorted.

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
