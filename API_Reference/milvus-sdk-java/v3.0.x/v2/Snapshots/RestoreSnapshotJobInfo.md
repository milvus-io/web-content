# RestoreSnapshotJobInfo

Describes one snapshot-restore job, as returned by `listRestoreSnapshotJobs()` and `getRestoreSnapshotState()`.

```java
class io.milvus.v2.service.snapshot.response.RestoreSnapshotJobInfo
```

**METHODS:**

- **getJobId()** (*Long*) -

    The ID of the restore job.

- **getSnapshotName()** (*String*) -

    The name of the snapshot being restored.

- **getDbName()** (*String*) -

    The name of the database the snapshot belongs to.

- **getCollectionName()** (*String*) -

    The name of the collection being restored.

- **getState()** (*String*) -

    The restore state. One of the `RestoreSnapshotJobInfo.STATE_*` constants: `RestoreSnapshotNone`, `RestoreSnapshotPending`, `RestoreSnapshotExecuting`, `RestoreSnapshotCompleted`, or `RestoreSnapshotFailed`.

- **getProgress()** (*Integer*) -

    The restore progress percentage.

- **getReason()** (*String*) -

    The failure reason when the restore failed.

- **getStartTime()** (*Long*) -

    The start timestamp of the restore job.

- **getTimeCost()** (*Long*) -

    The elapsed time of the restore job.

## Example

```java
for (RestoreSnapshotJobInfo job : resp.getJobInfos()) {
    System.out.println(job.getJobId() + ": " + job.getState() + ", " + job.getProgress() + "%");
}
```
