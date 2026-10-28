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

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The persisted segment information is carried in the response object.

- **response** (*ListPersistentSegmentsResponse*) -

    - **Result** (*const std::vector<SegmentInfo>&*) -

        Get information of segments.

        - **CollectionID** (*int64_t*) -

            Collection ID which the segment belongs to.

        - **CollectionName** (*const std::string&*) -

            Collection name which the segment belongs to.

        - **IndexID** (*int64_t*) -

            Index ID of the segment.

        - **IndexName** (*std::string*) -

            Index name of the segment.

        - **IsSorted** (*bool*) -

            Whether the segment is sorted.

        - **Level** (*SegmentLevel*) -

            Level of the segment.
            See [SegmentLevel](SegmentLevel.md).

        - **MemSize** (*int64_t*) -

            Memory size of the segment.

        - **NodeID** (*int64_t*) -

            Node ID of the segment.

        - **NodeIDs** (*const std::vector<int64_t>&*) -

            Node ID list of the segment.

        - **PartitionID** (*int64_t*) -

            Partition ID which the segment belongs to.

        - **RowCount** (*int64_t*) -

            Row count of the segment.

        - **SegmentID** (*int64_t*) -

            ID of the segment.

        - **State** (*SegmentState*) -

            Current state of the segment.
            See [SegmentState](SegmentState.md).

        - **StorageVersion** (*int64_t*) -

            Storage version of the segment.

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

milvus::ListPersistentSegmentsResponse response;
status = client->ListPersistentSegments(
    milvus::ListPersistentSegmentsRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Segment count: " << response.Result().size() << std::endl;
```
