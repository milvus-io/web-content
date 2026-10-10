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

**RETURN TYPE:**

*GetRefreshExternalCollectionProgressResp*

**RETURNS:**

A **GetRefreshExternalCollectionProgressResp** object that wraps a single **RefreshExternalCollectionJobInfo** accessible via `getJobInfo()`.

- `getJobInfo()` (*RefreshExternalCollectionJobInfo*) -

    The refresh job information. Each **RefreshExternalCollectionJobInfo** has the following getters:

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