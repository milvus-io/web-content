# PinSnapshotData()

This operation pins snapshot data for a time-to-live window. Use it to keep snapshot data available during restore or external copy workflows.

```cpp
Status PinSnapshotData(const PinSnapshotDataRequest& request, PinSnapshotDataResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::PinSnapshotDataRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithSnapshotName("snapshot_20260617")
    .WithTtlSeconds(86400);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection name.

- `WithSnapshotName(const std::string& snapshot_name)`

    Sets the snapshot name.

- `WithTtlSeconds(int64_t ttl_seconds)`

    Sets how long snapshot data should remain pinned.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **std::exception**

    This exception can be raised if the request cannot be sent or the response cannot be parsed.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::PinSnapshotDataRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithSnapshotName("snapshot_20260617")
    .WithTtlSeconds(86400);
milvus::PinSnapshotDataResponse response;
status = client->PinSnapshotData(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
