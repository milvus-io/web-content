# GetExportSnapshotState()

This operation queries the status and progress of an asynchronous snapshot export job.

```go
func (c *Client) GetExportSnapshotState(ctx context.Context, opt GetExportSnapshotStateOption, callOptions ...grpc.CallOption) (*milvuspb.ExportSnapshotInfo, error)
```

## Request Syntax

```go
option := milvusclient.NewGetExportSnapshotStateOption(jobID)

info, err := cli.GetExportSnapshotState(ctx, option)
```

**PARAMETERS:**

- **jobID** (*int64*)

    The job ID returned by `ExportSnapshot()`.

**BUILDER METHODS:**

- `NewGetExportSnapshotStateOption(jobID int64)`

    Creates a new option for the export job to query.

**RETURN TYPE:**

*milvuspb.ExportSnapshotInfo, error*

**RETURNS:**

The durable state of the specified export snapshot job. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

info, err := cli.GetExportSnapshotState(ctx, milvusclient.NewGetExportSnapshotStateOption(jobID))
if err != nil {
	// handle error
}

fmt.Printf("Export state: %v\n", info.GetState())
```
