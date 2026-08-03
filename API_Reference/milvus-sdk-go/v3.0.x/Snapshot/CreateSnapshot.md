# CreateSnapshot()

This operation creates a point-in-time snapshot of a collection. Use snapshots to back up collection data and metadata for disaster recovery or migration.

```go
func (c *Client) CreateSnapshot(ctx context.Context, opt CreateSnapshotOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := client.NewCreateSnapshotOption(snapshotName, collectionName).
    WithDescription(description string).
    WithDbName(dbName string)

err := client.CreateSnapshot(option)
```

**PARAMETERS:**

- **snapshotName** (*string*) - 

    The name of the snapshot to create. This must be unique within the collection.

- **collectionName** (*string*) - 

    The name of the collection to snapshot.

**BUILDER METHODS:**

- `WithDescription(description string)`

    This sets an optional human-readable description for the snapshot.

- `WithDbName(dbName string)`

    This sets the database name. If not set, the default database is used.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success. Returns an error if the collection does not exist, the snapshot name is already taken, or the operation fails for any other reason.

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

option := milvusclient.NewCreateSnapshotOption("backup_20260418", "my_collection").
	WithDescription("Daily backup before schema change")

err = cli.CreateSnapshot(ctx, option)
if err != nil {
	// handle error
}

fmt.Println("Snapshot created successfully")
```
