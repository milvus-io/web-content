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

**RETURNS:**

*GetRestoreSnapshotStateResp*

A **GetRestoreSnapshotStateResp** object containing restore job state, progress, reason, timing, and collection metadata. The object has the following fields:

- **jobInfo** (*RestoreSnapshotJobInfo*) -

    The restore job information. Each **RestoreSnapshotJobInfo** has the following fields:

    - **jobId** (*Long*) -

        The ID of the restore job.

    - **snapshotName** (*String*) -

        The name of the snapshot to restore.

    - **dbName** (*String*) -

        The name of the database.

    - **collectionName** (*String*) -

        The name of the collection.

    - **state** (*String*) -

        The state of the restore job.

    - **progress** (*Integer*) -

        The progress of the restore job, expressed as a percentage.

    - **reason** (*String*) -

        The reason the restore job failed, if any.

    - **startTime** (*Long*) -

        The start time of the restore job.

    - **timeCost** (*Long*) -

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
