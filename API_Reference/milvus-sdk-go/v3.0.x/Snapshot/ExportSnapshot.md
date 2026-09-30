# ExportSnapshot()

This operation exports a snapshot to object storage. The export runs asynchronously — use `GetExportSnapshotState()` to monitor progress.

```go
func (c *Client) ExportSnapshot(ctx context.Context, opt ExportSnapshotOption, callOptions ...grpc.CallOption) (int64, error)
```

## Request Syntax

```go
option := milvusclient.NewExportSnapshotOption(name, collectionName, targetS3Path).
    WithDbName(dbName).
    WithExternalSpec(externalSpec).
    WithRequestTimeout(timeout)

jobID, err := cli.ExportSnapshot(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

    The name of the snapshot to export.

- **collectionName** (*string*)

    The name of the collection the snapshot was taken from.

- **targetS3Path** (*string*)

    The object storage path where the snapshot data is exported.

**BUILDER METHODS:**

- `NewExportSnapshotOption(name string, collectionName string, targetS3Path string)`

    Creates a new option to export a snapshot.

- `WithDbName(dbName string)`

    Sets the database name for the collection.

- `WithExternalSpec(externalSpec string)`

    Sets the external storage specification (e.g., custom endpoint credentials) used for the export.

- `WithRequestTimeout(timeout time.Duration)`

    Sets the timeout for the export request. Default: `120 * time.Second`.

**RETURN TYPE:**

*int64, error*

**RETURNS:**

The export job ID on success. Use this ID with `GetExportSnapshotState()` to track the export progress. Returns an error if the operation fails.

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

jobID, err := cli.ExportSnapshot(ctx, milvusclient.NewExportSnapshotOption("my_snapshot", "quick_setup", "s3://my-bucket/export/"))
if err != nil {
	// handle error
}

fmt.Printf("Export job started: %d\n", jobID)
```
