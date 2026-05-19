# listRefreshExternalCollectionJobs()

This operation lists all external-collection refresh jobs, optionally filtered by collection name.

```java
public ListRefreshExternalCollectionJobsResp listRefreshExternalCollectionJobs(ListRefreshExternalCollectionJobsReq request)
```

## Request Syntax

```java
listRefreshExternalCollectionJobs(ListRefreshExternalCollectionJobsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The collection name to filter by. If empty, jobs across all collections in the database are returned.

**RETURNS:**

*ListRefreshExternalCollectionJobsResp*

The response wraps `List<RefreshExternalCollectionJobInfo>` accessible via `getJobs()`. Each job info entry exposes `jobId`, `collectionName`, `state`, `progress`, `reason`, `externalSource`, `startTime`, and `endTime` — the same shape as the entry returned by `getRefreshExternalCollectionProgress()`.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.utility.request.ListRefreshExternalCollectionJobsReq;
import io.milvus.v2.service.utility.response.ListRefreshExternalCollectionJobsResp;
import io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo;

ListRefreshExternalCollectionJobsResp resp = client.listRefreshExternalCollectionJobs(
    ListRefreshExternalCollectionJobsReq.builder()
        .collectionName("my_collection")
        .build()
);
for (RefreshExternalCollectionJobInfo job : resp.getJobs()) {
    System.out.println(job.getJobId() + " " + job.getState());
}
```
