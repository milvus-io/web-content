# RefreshExternalCollectionJobInfo

This type contains information about a refresh external collection job.

```go
type RefreshExternalCollectionJobInfo struct {
    JobID          int64
    CollectionName string
    State          RefreshExternalCollectionState
    Progress       int64
    Reason         string
    ExternalSource string
    StartTime      int64
    EndTime        int64
}
```

**FIELDS:**

- **JobID** (*int64*) -
The unique identifier of the refresh job.

- **CollectionName** (*string*) -
The name of the collection being refreshed.

- **State** (*[RefreshExternalCollectionState](RefreshExternalCollectionState.md)*) -
The current state of the refresh job.

- **Progress** (*int64*) -
The progress percentage of the refresh job.

- **Reason** (*string*) -
Additional information or reason for the current state.

- **ExternalSource** (*string*) -
The external data source identifier.

- **StartTime** (*int64*) -
The Unix timestamp when the job started.

- **EndTime** (*int64*) -
The Unix timestamp when the job completed.

