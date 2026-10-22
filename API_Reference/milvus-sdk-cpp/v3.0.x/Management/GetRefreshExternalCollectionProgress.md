# GetRefreshExternalCollectionProgress()

This operation gets progress for a refresh-external-collection job. Use it to poll job completion and inspect failure reasons.

```cpp
Status GetRefreshExternalCollectionProgress(const GetRefreshExternalCollectionProgressRequest& request, GetRefreshExternalCollectionProgressResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::GetRefreshExternalCollectionProgressRequest()
    .WithJobID(job_id);
```

**REQUEST METHODS:**

- `WithJobID(int64_t job_id)`

    Sets the refresh job ID returned by `RefreshExternalCollection()`.

- `SetJobID(int64_t job_id)`

    Set the refresh job identifier.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded. The refresh job information is carried in the response object.

- **response** (*GetRefreshExternalCollectionProgressResponse*) -

    - **JobInfo** (*const RefreshExternalCollectionJobInfo&*) -

        Get the refresh job information.

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

auto request = milvus::GetRefreshExternalCollectionProgressRequest()
    .WithJobID(job_id);
milvus::GetRefreshExternalCollectionProgressResponse response;
status = client->GetRefreshExternalCollectionProgress(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

<!-- category: File Resources; action: CREATE; addedSince: v3.0.x -->
