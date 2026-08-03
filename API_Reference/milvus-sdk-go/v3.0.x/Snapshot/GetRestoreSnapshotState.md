# GetRestoreSnapshotState()

This operation queries the status and progress of an asynchronous restore snapshot job.

```go
func (c *Client) GetRestoreSnapshotState(ctx context.Context, opt GetRestoreSnapshotStateOption, callOptions ...grpc.CallOption) (*milvuspb.RestoreSnapshotInfo, error)
```

## Request Syntax

```go
option := client.NewGetRestoreSnapshotStateOption(jobID)

result, err := client.GetRestoreSnapshotState(option)
```

**PARAMETERS:**

- **JobId** (*int64*) -

    The job ID returned by `RestoreSnapshot()`.

**RETURN TYPE:**

*milvuspb.RestoreSnapshotInfo, error*

**RETURNS:**

A RestoreSnapshotInfo object recording the details of the specified restore snapshot job.

```go
type RestoreSnapshotInfo struct {
    JobId          int64
    SnapshotName   string
    DbName         string
    CollectionName string
    State          RestoreSnapshotState
    Progress       int64
    Reason         string
    StartTime      int64
    TimeCost       int64
}
```

**PARAMETERS:**

- **jobID** (*int64*)

    The restore job ID.

- **SnapshotName** (*string*) -

    The snapshot name being restored.

- **DbName** (*string*) -

    The target database name.

- **CollectionName** (*string*) -

    The target collection name.

- **State** (*RestoreSnapshotState*) -

    Current state. Possible values: *RestoreSnapshotNone*, *RestoreSnapshotPending*, *RestoreSnapshotExecuting*, *RestoreSnapshotCompleted*, *RestoreSnapshotFailed*.

- **Progress** (*int64*) -

    Progress percentage (0-100).

- **Reason** (*string*) -

    Error reason if the job failed.

- **StartTime** (*int64*) -

    Start timestamp in milliseconds.

- **TimeCost** (*int64*) -

    Time cost in milliseconds.

**EXCEPTIONS:**

- **error**

    Check err != nil for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal(err)
}

defer cli.Close(ctx)

option := milvusclient.NewGetRestoreSnapshotStateOption(12345)

info, err := cli.GetRestoreSnapshotState(ctx, option)
if err != nil {
	// handle error
}

fmt.Println(info.GetState())
fmt.Println(info.GetProgress())
```
