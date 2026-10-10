# listRestoreSnapshotJobs()

This operation lists restore snapshot jobs, optionally scoped to a database and collection.

```java
public ListRestoreSnapshotJobsResp listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq request)
```

## Request Syntax

```java
listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the collection. If omitted, the current database is used.

- `collectionName(String collectionName)`

    The name of the collection associated with the snapshot operation.

**RETURN TYPE:**

*ListRestoreSnapshotJobsResp*

**RETURNS:**

A **ListRestoreSnapshotJobsResp** object containing the restore snapshot jobs that match the request filter.

- `getJobs()` (*List\<RestoreSnapshotJobInfo\>*) -

    The restore jobs that match the request filter. Each **RestoreSnapshotJobInfo** has the following getters:

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

**EXCEPTIONS