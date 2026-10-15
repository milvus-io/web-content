# RestoreSnapshot()

This operation restores a snapshot into a target collection. Use it to create a restored collection without overwriting the source.

```cpp
Status RestoreSnapshot(const RestoreSnapshotRequest& request, RestoreSnapshotResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::RestoreSnapshotRequest()
    .WithSnapshotName("snapshot_20260617")
    .WithSourceDatabaseName("default")
    .WithSourceCollectionName("book")
    .WithTargetDatabaseName("default")
    .WithTargetCollectionName("book_restored");
```

**REQUEST METHODS:**

- `WithSnapshotName(const std::string& snapshot_name)`

    Sets the snapshot to restore.

- `SetSnapshotName(const std::string& snapshot_name)`

    Set the name of the snapshot to restore.

- `WithSourceDatabaseName(const std::string& db_name)`

    Sets the source database.

- `SetSourceDatabaseName(const std::string& db_name)`

    Set the source database name.

- `WithSourceCollectionName(const std::string& collection_name)`

    Sets the source collection.

- `SetSourceCollectionName(const std::string& collection_name)`

    Set the source collection name.

- `WithTargetDatabaseName(const std::string& db_name)`

    Sets the target database.

- `SetTargetDatabaseName(const std::string& db_name)`

    Set the target database name.

- `WithTargetCollectionName(const std::string& collection_name)`

    Sets the target collection.

- `SetTargetCollectionName(const std::string& collection_name)`

    Set the target collection name.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The restore job ID is carried in the response object.

- **response** (*RestoreSnapshotResponse*) -

    - **JobID** (*int64_t*) -

        Get the restore job identifier.

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

auto request = milvus::RestoreSnapshotRequest()
    .WithSnapshotName("snapshot_20260617")
    .WithSourceDatabaseName("default")
    .WithSourceCollectionName("book")
    .WithTargetDatabaseName("default")
    .WithTargetCollectionName("book_restored");
milvus::RestoreSnapshotResponse response;
status = client->RestoreSnapshot(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
