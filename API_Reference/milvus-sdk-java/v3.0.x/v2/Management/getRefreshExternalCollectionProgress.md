# getRefreshExternalCollectionProgress()

This operation returns the progress and current state of a previously started external collection refresh job.

```java
public GetRefreshExternalCollectionProgressResp getRefreshExternalCollectionProgress(GetRefreshExternalCollectionProgressReq request)
```

## Request Syntax

```java
getRefreshExternalCollectionProgress(GetRefreshExternalCollectionProgressReq.builder()
    .jobId(long jobId)
    .build()
);
```

**BUILDER METHODS:**

- `jobId(long jobId)` -

    **[REQUIRED]**

    The job ID returned by `refreshExternalCollection()`.

**RETURNS:**

*GetRefreshExternalCollectionProgressResp*

The response wraps a single `RefreshExternalCollectionJobInfo` accessible via `getJobInfo()`. Fields on the job info:

- `jobId` (*long*) - The job identifier.

- `collectionName` (*String*) - The target collection name.

- `state` (*String*) - The current job state (e.g., `"PENDING"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`).

- `progress` (*int*) - The completion percentage (0–100).

- `reason` (*String*) - Failure reason if `state` is `"FAILED"`; empty otherwise.

- `externalSource` (*String*) - The external source used by the job.

- `startTime` (*long*) - The job start timestamp (epoch milliseconds).

- `endTime` (*long*) - The job end timestamp (epoch milliseconds), or 0 if still running.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.utility.request.GetRefreshExternalCollectionProgressReq;
import io.milvus.v2.service.utility.response.GetRefreshExternalCollectionProgressResp;
import io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo;

GetRefreshExternalCollectionProgressResp resp = client.getRefreshExternalCollectionProgress(
    GetRefreshExternalCollectionProgressReq.builder()
        .jobId(jobId)
        .build()
);
RefreshExternalCollectionJobInfo info = resp.getJobInfo();
System.out.println(info.getState() + " " + info.getProgress() + "%");
```
