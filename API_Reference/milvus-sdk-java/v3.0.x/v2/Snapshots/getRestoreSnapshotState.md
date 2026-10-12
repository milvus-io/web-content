# getRestoreSnapshotState()

This operation gets the state and progress of a restore snapshot job.

```java
public GetRestoreSnapshotStateResp getRestoreSnapshotState(GetRestoreSnapshotStateReq request)
```

## Request Syntax

```java
getRestoreSnapshotState(GetRestoreSnapshotStateReq.builder()
    .jobId(Long jobId)
    .build()
)
```

**BUILDER METHODS:**

- `jobId(Long jobId)`

    The restore snapshot job ID returned by `restoreSnapshot()`.

**RETURN TYPE:**

*GetRestoreSnapshotStateResp*

**RETURNS:**

A **GetRestoreSnapshotStateResp** object containing restore job state, progress, reason, timing, and collection metadata.

- `getJobInfo()` (*RestoreSnapshotJobInfo*) -

    The restore job information. Each **RestoreSnapshotJobInfo** has the following getters:

    - `getJobId()` (*Long*) -

        The ID of the restore job.

    - `getSnapshotName()` (*String*) -

        The name of the snapshot to restore.

    - `getDbName()` (*String*) -

        The name of the database.

    - `getCollectionName()` (*String*) -

        The name of the collection.

    - `getState()` (*String*) -

        The state of the restore job.

    - `getProgress()` (*Integer*) -

        The progress of the restore job, expressed as a percentage.

    - `getReason()` (*String*) -

        The reason the restore job failed, if any.

    - `getStartTime()` (*Long*) -

        The start time of the restore job.

    - `getTimeCost()` (*Long*) -

        The time cost of the restore job, in seconds.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception is raised when required parameters are missing, numeric parameters are out of range, or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.service.snapshot.request.GetRestoreSnapshotStateReq;
import io.milvus.v2.service.snapshot.response.GetRestoreSnapshotStateResp;

GetRestoreSnapshotStateReq request = GetRestoreSnapshotStateReq.builder()
    .jobId(123456789L)
    .build();

GetRestoreSnapshotStateResp response = client.getRestoreSnapshotState(request);
```
