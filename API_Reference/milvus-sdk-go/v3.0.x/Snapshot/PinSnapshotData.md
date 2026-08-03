# PinSnapshotData()

This operation pins snapshot data for a collection, preventing it from being garbage collected. Returns a pin ID that can be used to unpin the data later.

```go
func (c *Client) PinSnapshotData(ctx context.Context, opt PinSnapshotDataOption, callOptions ...grpc.CallOption) (int64, error)
```

## Request Syntax

```go
option := milvusclient.NewPinSnapshotDataOption("my_snapshot", "my_collection").
    WithDbName("my_db").
    WithTTL(3600)

pinID, err := cli.PinSnapshotData(ctx, option)
```

**PARAMETERS:**

- **opt** (*PinSnapshotDataOption*) -

    The options for pinning snapshot data.

**BUILDER METHODS:**

- `NewPinSnapshotDataOption(name string, collectionName string)`
This creates an option to pin snapshot data for the specified collection.

- `WithDbName(dbName string)`
This sets the database name for the collection.

- `WithTTL(ttlSeconds int64)`
This sets the time-to-live for the pin in seconds.

**RETURN TYPE:**

*int64, error*

**RETURNS:**

The pin ID on success, or an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check err != nil for failure details.

## Example

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

pinID, err := cli.PinSnapshotData(ctx, milvusclient.NewPinSnapshotDataOption("my_snapshot", "quick_setup"))
if err != nil {
	log.Fatal("failed to pin snapshot data: ", err.Error())
}

fmt.Println("Pin ID:", pinID)
```
