# RefreshExternalCollectionJobInfo

Describes one external-collection refresh job, as returned by `listRefreshExternalCollectionJobs()` and `getRefreshExternalCollectionProgress()`.

```java
class io.milvus.v2.service.utility.response.RefreshExternalCollectionJobInfo
```

**METHODS:**

- **getJobId()** (*long*) -

    The ID of the refresh job.

- **getCollectionName()** (*String*) -

    The name of the external collection being refreshed.

- **getState()** (*String*) -

    The refresh job state.

- **getProgress()** (*int*) -

    The refresh progress percentage.

- **getReason()** (*String*) -

    The failure reason when the refresh failed.

- **getExternalSource()** (*String*) -

    The external source the collection is refreshed from.

- **getExternalSpec()** (*String*) -

    The external specification of the collection.

- **getStartTime()** (*long*) -

    The start timestamp of the refresh job.

- **getEndTime()** (*long*) -

    The end timestamp of the refresh job.

## Example

```java
for (RefreshExternalCollectionJobInfo job : resp.getJobInfos()) {
    System.out.println(job.getJobId() + ": " + job.getState() + ", " + job.getProgress() + "%");
}
```
