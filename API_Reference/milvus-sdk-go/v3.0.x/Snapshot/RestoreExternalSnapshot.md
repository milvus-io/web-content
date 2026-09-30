# RestoreExternalSnapshot()

This operation restores an external snapshot to a target collection. The restore runs asynchronously — use `GetRestoreSnapshotState()` to monitor progress.

```go
func (c *Client) RestoreExternalSnapshot(ctx context.Context, opt RestoreExternalSnapshotOption, callOptions ...grpc.CallOption) (int64, error)
```

## Request Syntax

```go
option := milvusclient.NewRestoreExternalSnapshotOption(targetCollectionName, snapshotMetadataURI).
    WithDbName(dbName).
    WithExternalSpec(externalSpec).
    WithRequestTimeout(timeout)

jobID, err := cli.RestoreExternalSnapshot(ctx, option)
```

**PARAMETERS:**

- **targetCollectionName** (*string*)

    The name of the target collection to restore into.

- **snapshotMetadataURI** (*string*)

    The URI of the snapshot metadata to restore.

**BUILDER METHODS:**

- `NewRestoreExternalSnapshotOption(targetCollectionName string, snapshotMetadataURI string)`

    Creates a new option to restore an external snapshot.

- `WithDbName(dbName string)`

    Sets the database name for the target collection.

- `WithExternalSpec(externalSpec string)`

    Sets the external storage specification (e.g., custom endpoint credentials) used for the restore.

- `WithRequestTimeout(timeout time.Duration)`

    Sets the timeout for the restore request. Default: `120 * time.Second`.

**RETURN TYPE:**

*int64, error*

**RETURNS:**

The restore job ID on success. Use this ID with `GetRestoreSnapshotState()` to track the restore progress. Returns an error if the operation fails.

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

jobID, err := cli.RestoreExternalSnapshot(ctx, milvusclient.NewRestoreExternalSnapshotOption("restored_collection", "s3://my-bucket/snapshots/backup/"))
if err != nil {
	// handle error
}

fmt.Printf("Restore job started: %d\n", jobID)
```
