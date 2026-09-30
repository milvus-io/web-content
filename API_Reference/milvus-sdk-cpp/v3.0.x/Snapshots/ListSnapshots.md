# ListSnapshots()

This operation lists snapshots for a collection. Use it to discover available restore points.

```cpp
Status ListSnapshots(const ListSnapshotsRequest& request, ListSnapshotsResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::ListSnapshotsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book");
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection name.

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

auto request = milvus::ListSnapshotsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book");
milvus::ListSnapshotsResponse response;
status = client->ListSnapshots(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
