# CreateSnapshot()

This operation creates a snapshot for a collection. Use it before destructive maintenance or restore testing.

```cpp
Status CreateSnapshot(const CreateSnapshotRequest& request)
```

## Request Syntax

```cpp
auto request = milvus::CreateSnapshotRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithSnapshotName("snapshot_20260617")
    .WithDescription("before quarterly reindex")
    .WithCompactionProtectionSeconds(3600);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database that contains the collection.

- `SetDatabaseName(const std::string& db_name)`

    Set the target database name.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection to snapshot.

- `SetCollectionName(const std::string& collection_name)`

    Set the target collection name.

- `WithSnapshotName(const std::string& snapshot_name)`

    Sets the name of the snapshot to create.

- `SetSnapshotName(const std::string& snapshot_name)`

    Set the target snapshot name.

- `WithDescription(const std::string& description)`

    Sets an optional snapshot description.

- `SetDescription(const std::string& description)`

    Set the snapshot description.

- `WithCompactionProtectionSeconds(int64_t seconds)`

    Sets how long compaction should preserve data needed by the snapshot.

- `SetCompactionProtectionSeconds(int64_t seconds)`

    Set the compaction protection window in seconds.

**RETURNS:**

*Status*

**EXCEPTIONS:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::CreateSnapshotRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithSnapshotName("snapshot_20260617")
    .WithDescription("before quarterly reindex")
    .WithCompactionProtectionSeconds(3600);
status = client->CreateSnapshot(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
