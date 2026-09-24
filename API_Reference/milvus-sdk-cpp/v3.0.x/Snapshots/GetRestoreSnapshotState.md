# GetRestoreSnapshotState()

This operation gets restore-snapshot job state. Use it to poll restore progress and failure reasons.

```cpp
Status GetRestoreSnapshotState(const GetRestoreSnapshotStateRequest& request, GetRestoreSnapshotStateResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::GetRestoreSnapshotStateRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book_restored")
    .WithSnapshotName("snapshot_20260617");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name.

- `WithCollectionName(const std::string& collection_name)`

    Sets the target collection name.

- `WithSnapshotName(const std::string& snapshot_name)`

    Sets the snapshot name.

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

auto request = milvus::GetRestoreSnapshotStateRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book_restored")
    .WithSnapshotName("snapshot_20260617");
milvus::GetRestoreSnapshotStateResponse response;
status = client->GetRestoreSnapshotState(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
