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

- `WithSourceDatabaseName(const std::string& db_name)`

    Sets the source database.

- `WithSourceCollectionName(const std::string& collection_name)`

    Sets the source collection.

- `WithTargetDatabaseName(const std::string& db_name)`

    Sets the target database.

- `WithTargetCollectionName(const std::string& collection_name)`

    Sets the target collection.

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
