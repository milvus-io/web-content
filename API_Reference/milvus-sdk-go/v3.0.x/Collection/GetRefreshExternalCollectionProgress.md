# GetRefreshExternalCollectionProgress()

This operation returns the progress of a specified external collection refresh job.

```go
func (c *Client) GetRefreshExternalCollectionProgress(ctx context.Context, option GetRefreshExternalCollectionProgressOption, callOptions ...grpc.CallOption) (*entity.RefreshExternalCollectionJobInfo, error)
```

## Request Syntax

```go
option := client.NewGetRefreshExternalCollectionProgressOption(jobID)

result, err := client.GetRefreshExternalCollectionProgress(option)
```

**PARAMETERS:**

- **jobID** (*int64*) -

    The job ID returned by `refresh_external_collection()`.

**RETURN TYPE:**

*&ast;entity.RefreshExternalCollectionJobInfo*

**RETURNS:**

A type struct that records the details of the specified external collection refresh job.

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

PARAMETERS:

**PARAMETERS:**

- **JobID** (*int64*) -

    The job ID specified in the current request.

- **CollectionName** (*string*) -

    The name of the external collection specified in `RefreshExternalCollection()`.

- **State** (*string*) -

    The current state of the specified job. Possible values are:

    - RefreshPending

    - RefreshInProgress

    - RefreshFailed

    - RefreshCompleted

- **Progress** (*int64*) -

    The current progress of the specified job. The value is an integer ranging from 0 to 100.

- **Reason** (*string*) -

    The error prompt if the refresh operation failed. It is an empty string in normal cases.

- **ExternalSource** (*string*) -

    The external source URI specified in `RefreshExternalCollection()`.

- **StartTime** (*int64*) -

    The timestamp in milliseconds at which the specified job starts.

- **EndTime** (*int64*) -  

    The timestamp in milliseconds at which the specified job ends.

## Examples:

```go
refreshResult, err := client.RefreshExternalCollection(ctx,
    client.NewRefreshExternalCollectionOption("test_collection"))

jobID := refreshResult.JobID

for {
    progress, _ := client.GetRefreshExternalCollectionProgress(ctx,
        client.NewGetRefreshExternalCollectionProgressOption(jobID))

    fmt.Printf("State: %s\n", progress.State)

    if progress.State == entity.RefreshStateCompleted {
        fmt.Println("Refresh completed!")
        break
    }
    if progress.State == entity.RefreshStateFailed {
        fmt.Printf("Refresh failed: %s\n", progress.Reason)
        break
    }
    time.Sleep(2 * time.Second)
}
```
