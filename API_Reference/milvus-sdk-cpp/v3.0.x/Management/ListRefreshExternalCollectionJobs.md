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

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The refresh job list is carried in the response object.

- **response** (*ListRefreshExternalCollectionJobsResponse*) -

    - **Jobs** (*const std::vector<RefreshExternalCollectionJobInfo>&*) -

        Get the refresh jobs. Each entry is a `RefreshExternalCollectionJobInfo` with the members documented on its own page.
        See [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).
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

auto request = milvus::ListRefreshExternalCollectionJobsRequest();
milvus::ListRefreshExternalCollectionJobsResponse response;
status = client->ListRefreshExternalCollectionJobs(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
