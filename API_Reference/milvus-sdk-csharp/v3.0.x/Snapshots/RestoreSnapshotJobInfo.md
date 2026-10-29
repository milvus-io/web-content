# RestoreSnapshotJobInfo

Information of a snapshot-restore job, as returned by `ListRestoreSnapshotJobs()` and `GetRestoreSnapshotState()`.

```csharp
public sealed class RestoreSnapshotJobInfo
{
    public long JobId { get; }
    public string SnapshotName { get; }
    public string DbName { get; }
    public string CollectionName { get; }
    public RestoreSnapshotState State { get; }
    public int Progress { get; }
    public string Reason { get; }
    public ulong StartTime { get; }
    public ulong TimeCost { get; }
}
```

**PARAMETERS:**

- `JobId` (*long*) -

    The ID of the restore job.

- `SnapshotName` (*string*) -

    The name of the snapshot being restored.

- `DbName` (*string*) -

    The database being restored into.

- `CollectionName` (*string*) -

    The collection being restored into.

- `State` (*RestoreSnapshotState*) -

    The current state of the restore job.

- `Progress` (*int*) -

    The progress percentage of the restore job (0-100).

- `Reason` (*string*) -

    The reason for failure, when the job failed.

- `StartTime` (*ulong*) -

    The start timestamp of the restore job, in milliseconds.

- `TimeCost` (*ulong*) -

    The time cost of the restore job, in milliseconds.

## RestoreSnapshotState

This enum represents the state of a snapshot-restore job.

```csharp
public enum RestoreSnapshotState
{
    None = 0,
    Pending = 1,
    Executing = 2,
    Completed = 3,
    Failed = 4
}
```

**Constants:**

- **None** (0)

    The restore state is undefined.

- **Pending** (1)

    The restore job has been created and is waiting to start.

- **Executing** (2)

    The restore job is currently executing.

- **Completed** (3)

    The restore job has completed.

- **Failed** (4)

    The restore job has failed.
