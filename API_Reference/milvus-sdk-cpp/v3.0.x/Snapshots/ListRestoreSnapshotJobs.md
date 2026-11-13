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

- `SetDatabaseName(const std::string& db_name)`

    Set the target database name.

- `WithCollectionName(const std::string& collection_name)`

    Sets the collection name.

- `SetCollectionName(const std::string& collection_name)`

    Set the target collection name.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The restore job list is carried in the response object.

- **response** (*ListRestoreSnapshotJobsResponse*) -

    - **Jobs** (*const std::vector<RestoreSnapshotJobInfo>&*) -

        Get the restore jobs.
        See [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md).

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

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

