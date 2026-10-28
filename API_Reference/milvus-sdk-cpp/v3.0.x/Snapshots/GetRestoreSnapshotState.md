# GetRestoreSnapshotState()

This operation gets restore-snapshot job state. Use it to poll restore progress and failure reasons.

```cpp
Status GetRestoreSnapshotState(const GetRestoreSnapshotStateRequest& request, GetRestoreSnapshotStateResponse& response)
```

## Request Syntax

```cpp
auto request = milvus::GetRestoreSnapshotStateRequest()
    .WithJobID(job_id);
```

**REQUEST METHODS:**

- `WithJobID(int64_t job_id)`

    Sets the ID of the restore-snapshot job to poll.

- `SetJobID(int64_t job_id)`

    Set the restore job identifier.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the operation succeeded. The restore job information is carried in the response object.

- **response** (*GetRestoreSnapshotStateResponse*) -

    - **JobInfo** (*const RestoreSnapshotJobInfo&*)

        Get the restore job information.
        See [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md).

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

        - **State** (*RestoreSnapshotStateCode*) -

            Current state of the restore job.
            See [RestoreSnapshotStateCode](RestoreSnapshotStateCode.md).

        - **TimeCost** (*uint64_t*) -

            Elapsed time of the restore job in milliseconds.

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

auto request = milvus::GetRestoreSnapshotStateRequest()
    .WithJobID(job_id);
milvus::GetRestoreSnapshotStateResponse response;
status = client->GetRestoreSnapshotState(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
