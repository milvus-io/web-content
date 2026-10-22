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

*Status*

Returns a Status indicating whether the operation succeeded. On success, the ListQuerySegmentsResponse carries the loaded segment information.

- **response** (*ListQuerySegmentsResponse*) -

    - **Result** (*const std::vector<QuerySegmentInfo>&*) -

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

        - **IndexName** (*std::string*) -

            Index name of the segment.

        - **IndexID** (*int64_t*) -

            Index id of the segment.

        - **NodeID** (*int64_t*) -

            **Deprecated.** Since v2.4 a segment can load on multiple nodes. Use `NodeIDs()` instead.

        - **NodeIDs** (*const std::vector<int64_t>&*) -

            Node id list of the segment.

        - **MemSize** (*int64_t*) -

            Memory size of the segment.

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

milvus::ListQuerySegmentsResponse response;
status = client->ListQuerySegments(
    milvus::ListQuerySegmentsRequest()
        .WithCollectionName("my_collection"),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Segment count: " << response.Result().size() << std::endl;
```
