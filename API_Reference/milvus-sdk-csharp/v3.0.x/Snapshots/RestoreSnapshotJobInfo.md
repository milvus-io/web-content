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

**METHODS / PROPERTIES:**

- `JobId` (*long*) -

    The ID of the restore job.

- `Name` (*string*) -

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
# RestoreSnapshotState

This enum represents the state of a snapshot-restore job.

```csharp
public enum RestoreSnapshotState
{
    None = 0,
    Pending = 1,
    Executing = 2,
    Completed = 3,
    Failed = 4,
}
```

**VALUES:**

- **None** (0) -

- **Pending** (1) -

- **Executing** (2) -

- **Completed** (3) -

- **Failed** (4) -

