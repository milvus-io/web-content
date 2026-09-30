# ListRestoreSnapshotJobs()

This operation lists restore-snapshot jobs. Use it to inspect restore history and active restore operations.

```cpp
Status ListRestoreSnapshotJobs(const ListRestoreSnapshotJobsRequest& request, ListRestoreSnapshotJobsResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::ListRestoreSnapshotJobsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book_restored");
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

auto request = milvus::ListRestoreSnapshotJobsRequest()
    .WithDatabaseName("default")
    .WithCollectionName("book_restored");
milvus::ListRestoreSnapshotJobsResponse response;
status = client->ListRestoreSnapshotJobs(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: Snapshots; action: CREATE; addedSince: v3.0.x -->
