# RefreshExternalCollectionJobInfo

Information of an external-collection refresh job, as returned by `ListRefreshExternalCollectionJobs()` and `GetRefreshExternalCollectionProgress()`.

```csharp
public sealed class RefreshExternalCollectionJobInfo
{
    public long JobId { get; }
    public string CollectionName { get; }
    public RefreshExternalCollectionState State { get; }
    public long Progress { get; }
    public string Reason { get; }
    public string ExternalSource { get; }
    public long StartTime { get; }
    public long EndTime { get; }
    public string ExternalSpec { get; }
}
```

**METHODS / PROPERTIES:**

- `JobId` (*long*) -

    The job identifier.

- `CollectionName` (*string*) -

    The name of the collection being refreshed.

- `State` (*RefreshExternalCollectionState*) -

    The current state of the refresh job.

- `Progress` (*long*) -

    The refresh progress in percent (0 to 100).

- `Reason` (*string*) -

    The failure reason of the job, empty when the job has not failed.

- `ExternalSource` (*string*) -

    The external source used for this job.

- `StartTime` (*long*) -

    The start timestamp of the job (Unix epoch in milliseconds), 0 if not started.

- `EndTime` (*long*) -

    The end timestamp of the job (Unix epoch in milliseconds), 0 if not completed.

- `ExternalSpec` (*string*) -

    The external spec used for this job.
# RefreshExternalCollectionState

This enum represents the state of an external-collection refresh job.

```csharp
public enum RefreshExternalCollectionState
{
    Pending = 0,
    InProgress = 1,
    Completed = 2,
    Failed = 3,
}
```

**VALUES:**

- **Pending** (0) -

- **InProgress** (1) -

- **Completed** (2) -

- **Failed** (3) -

