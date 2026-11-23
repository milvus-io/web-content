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

*&ast;[entity.RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md)*

**RETURNS:**

A **RefreshExternalCollectionJobInfo** object that records the details of the specified external collection refresh job. See [RefreshExternalCollectionJobInfo](RefreshExternalCollectionJobInfo.md).

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

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
