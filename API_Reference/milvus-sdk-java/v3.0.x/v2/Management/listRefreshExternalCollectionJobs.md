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

**RETURN TYPE:**

*ListRefreshExternalCollectionJobsResp*

**RETURNS:**

A **ListRefreshExternalCollectionJobsResp** object that wraps `List<RefreshExternalCollectionJobInfo>` accessible via `getJobs()`.

- `getJobs()` (*List\<RefreshExternalCollectionJobInfo\>*) -

    The refresh jobs that match the request filter. Each **RefreshExternalCollectionJobInfo** has the same shape as the entry returned by `getRefreshExternalCollectionProgress()`:

    - `getJobId()` (*long*) -

        The job identifier.

    - `getCollectionName()` (*String*) -

        The target collection name.

    - `getState()` (*String*) -

        The current job state (e.g., `"PENDING"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`).

    - `getProgress()` (*int*) -

        The completion percentage (0-100).

    - `getReason()` (*String*) -

        The failure reason if `state` is `"FAILED"`; empty otherwise.

    - `getExternalSource()` (*String*) -

        The external source used by the job.

    - `getExternalSpec()` (*String*) -

        The external source specification used by the job.

    - `getStartTime()` (*long*) -

        The job start timestamp (epoch milliseconds).

    - `getEndTime()` (*long*) -

        The job end timestamp (epoch milliseconds), or 0 if still running.

**EXCEPTIONS