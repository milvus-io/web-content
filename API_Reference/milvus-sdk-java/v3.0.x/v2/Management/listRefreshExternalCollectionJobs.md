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

A **ListRefreshExternalCollectionJobsResp** object that wraps `List<RefreshExternalCollectionJobInfo>` accessible via `getJobs()`. The object has the following fields:

- **jobs** (*List\<RefreshExternalCollectionJobInfo\>*) -

    The refresh jobs that match the request filter. Each **RefreshExternalCollectionJobInfo** has the same shape as the entry returned by `getRefreshExternalCollectionProgress()`:

    - **jobId** (*long*) -

        The job identifier.

    - **collectionName** (*String*) -

        The target collection name.

    - **state** (*String*) -

        The current job state (e.g., `"PENDING"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`).

    - **progress** (*int*) -

        The completion percentage (0-100).

    - **reason** (*String*) -

        The failure reason if `state` is `"FAILED"`; empty otherwise.

    - **externalSource** (*String*) -

        The external source used by the job.

    - **externalSpec** (*String*) -

        The external source specification used by the job.

    - **startTime** (*long*) -

        The job start timestamp (epoch milliseconds).

    - **endTime** (*long*) -

        The job end timestamp (epoch milliseconds), or 0 if still running.

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
