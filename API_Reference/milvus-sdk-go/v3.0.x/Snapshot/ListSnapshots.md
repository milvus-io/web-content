# ListSnapshots()

This operation lists all snapshot names for a specified collection.

```go
func (c *Client) ListSnapshots(ctx context.Context, opt ListSnapshotsOption, callOptions ...grpc.CallOption) ([]string, error)
```

## Request Syntax

```go
option := milvusclient.NewListSnapshotsOption(collectionName).
    WithDbName(dbName)

result, err := cli.ListSnapshots(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*) -

    The name of the target collection.

**BUILDER METHODS:**

- `WithCollectionName(collectionName string)`

    This sets the name of the target collection.

- `WithDbName(dbName string)`

    This sets the database name. If not set, the default database is used.

**RETURN TYPE:**

*[]string, error*

**RETURNS:**

A list of snapshot names. Returns an error if the operation fails.

**ERROR HANDLING:**

- **error**

    Check err != nil for failure details.

## Example

```go
import (
	"log"
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
	log.Fatal(err)
}

defer cli.Close(ctx)

option := milvusclient.NewListSnapshotsOption("my_collection")

snapshots, err := cli.ListSnapshots(ctx, option)
if err != nil {
	// handle error
}

fmt.Println(snapshots)
```
