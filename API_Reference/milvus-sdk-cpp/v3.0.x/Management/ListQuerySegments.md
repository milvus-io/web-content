# ListQuerySegments()

This operation retrieves information about loaded segments from query nodes.

```cpp
Status ListQuerySegments(const ListQuerySegmentsRequest& request, ListQuerySegmentsResponse& response)
```

## Request Syntax

```cpp
auto request = ListQuerySegmentsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& name)`

    Sets the name of the collection.

**RETURNS:**

*Status* with *ListQuerySegmentsResponse*

Check `status.IsOk()` to confirm success.

The response's `Segments()` list contains `QuerySegmentInfo` values. `QuerySegmentInfo` inherits the segment metadata methods from `SegmentInfo` and also exposes memory size for the loaded segment.

**SegmentInfo methods:**

- `const std::string& CollectionName() const`

    Returns the collection name.

- `SegmentLevel Level() const`

    Returns the segment level.

- `int64_t StorageVersion() const`

    Returns the storage version.

- `bool IsSorted() const`

    Returns whether the segment is sorted.

**QuerySegmentInfo methods:**

- `int64_t MemSize() const`

    Returns the memory size of the query segment.

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

milvus::ListQuerySegmentsResponse response;
status = client->ListQuerySegments(
    milvus::ListQuerySegmentsRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Segment count: " << response.Segments().size() << std::endl;
```
