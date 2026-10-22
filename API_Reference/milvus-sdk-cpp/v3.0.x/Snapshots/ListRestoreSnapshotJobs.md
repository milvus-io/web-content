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

*Status*

Returns a Status indicating whether the operation succeeded. The restore job list is carried in the response object.

- **response** (*ListRestoreSnapshotJobsResponse*) -

    - **Jobs** (*const std::vector<RestoreSnapshotJobInfo>&*) -

        Get the restore jobs.

        - **CollectionName** (*const std::string&*) -

            Source collection name of the restore job.

        - **DatabaseName** (*const std::string&*) -

            Source database name of the restore job.

        - **JobID** (*int64_t*) -

            Restore job identifier.

        - **Progress** (*int32_t*) -

            Restore progress in percent (0 to 100).

        - **Reason** (*const std::string&*) -

            Failure reason of the restore job, empty when the job has not failed.

        - **SnapshotName** (*const std::string&*) -

            Name of the snapshot being restored.

        - **StartTime** (*uint64_t*) -

            Start timestamp of the restore job.

        - **State** (*[RestoreSnapshotStateCode](RestoreSnapshotStateCode.md)*) -

            Current state of the restore job.

        - **TimeCost** (*uint64_t*) -

            Elapsed time of the restore job in milliseconds.

**ERROR HANDLING:**

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
