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

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListPersistentSegmentsResponse carries the persisted segment information.

- **response** (*ListPersistentSegmentsResponse*) -

    - **Result** (*const std::vector<SegmentInfo>&*) -

        Get informations of segments.

        - **CollectionID** (*int64_t*) -

            The collection id which this segment belongs to.

        - **PartitionID** (*int64_t*) -

            The partition id which this segment belongs to.

        - **SegmentID** (*int64_t*) -

            ID of the segment.

        - **RowCount** (*int64_t*) -

            Row count of the segment.

        - **State** (*[SegmentState](SegmentState.md)*) -

            Current state of the segment.

        - **CollectionName** (*const std::string&*) -

            The collection name which this segment belongs to.

        - **Level** (*[SegmentLevel](SegmentLevel.md)*) -

            Level of the segment.

        - **StorageVersion** (*int64_t*) -

            Storage version of the segment.

        - **IsSorted** (*bool*) -

            Whether the segment is sorted.

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
