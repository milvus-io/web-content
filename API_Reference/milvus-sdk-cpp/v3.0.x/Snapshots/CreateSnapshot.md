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
    .WithDescription("before quarterly reindex")
    .WithCompactionProtectionSeconds(3600);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database that contains the collection.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection to snapshot.

- `WithDescription(const std::string& description)`

    Sets an optional snapshot description.

- `WithCompactionProtectionSeconds(int64_t seconds)`

    Sets how long compaction should preserve data needed by the snapshot.

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

auto request = milvus::CreateSnapshotRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book")
    .WithDescription("before quarterly reindex")
    .WithCompactionProtectionSeconds(3600);
status = client->CreateSnapshot(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
