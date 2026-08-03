# DropSnapshot()

This operation permanently deletes a snapshot. Once dropped, the snapshot data cannot be recovered.

```go
func (c *Client) DropSnapshot(ctx context.Context, opt DropSnapshotOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := client.NewDropSnapshotOption(snapshotName, collectionName).
    WithDbName(dbName string)

err := client.DropSnapshot(option)
```

**PARAMETERS:**

- **snapshotName** (*string*) - 

    The name of the snapshot to drop.

- **collectionName** (*string*) - 

    The name of the collection the snapshot belongs to.

**BUILDER METHODS:**

- `WithDbName(dbName string)`

    This sets the name of the database to which the specified collection belongs.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success. Returns an error if the snapshot does not exist or the operation fails.

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

option := milvusclient.NewDropSnapshotOption("backup_20260401", "my_collection")

err = cli.DropSnapshot(ctx, option)
if err != nil {
	// handle error
}

fmt.Println("Snapshot dropped successfully")
```
