# ListRefreshExternalCollectionJobs()

This operation lists refresh jobs for external collections. Use it to inspect historical or in-flight external collection refresh activity.

```cpp
Status ListRefreshExternalCollectionJobs(const ListRefreshExternalCollectionJobsRequest& request, ListRefreshExternalCollectionJobsResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::ListRefreshExternalCollectionJobsRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose refresh jobs to list.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The refresh job list is carried in the response object.

- **response** (*ListRefreshExternalCollectionJobsResponse*) -

    - **Jobs** (*const std::vector<RefreshExternalCollectionJobInfo>&*) -

        Get the refresh jobs.

        - **CollectionName** (*const std::string&*) -

            Name of the collection being refreshed.

        - **EndTime** (*uint64_t*) -

            End timestamp of the refresh job.

        - **ExternalSource** (*const std::string&*) -

            External data source, for example an S3 path.

        - **ExternalSpec** (*const nlohmann::json&*) -

            External file specification.

        - **JobID** (*int64_t*) -

            Refresh job identifier.

        - **Progress** (*int32_t*) -

            Refresh progress in percent (0 to 100).

        - **Reason** (*const std::string&*) -

            Failure reason of the refresh job, empty when the job has not failed.

        - **StartTime** (*uint64_t*) -

            Start timestamp of the refresh job.

        - **State** (*RefreshExternalCollectionStateCode*) -

            Current state of the refresh job.

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

auto request = milvus::ListRefreshExternalCollectionJobsRequest();
milvus::ListRefreshExternalCollectionJobsResponse response;
status = client->ListRefreshExternalCollectionJobs(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
