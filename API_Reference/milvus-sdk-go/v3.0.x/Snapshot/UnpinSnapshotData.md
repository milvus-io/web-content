# UnpinSnapshotData()

This operation unpins previously pinned snapshot data, allowing garbage collection to reclaim the files.

```go
func (c *Client) UnpinSnapshotData(ctx context.Context, opt UnpinSnapshotDataOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewUnpinSnapshotDataOption(pinID)

err := cli.UnpinSnapshotData(ctx, option)
```

**PARAMETERS:**

- **pinID** (*int64*)

    The pin ID returned by `PinSnapshotData()`.

**BUILDER METHODS:**

- `NewUnpinSnapshotDataOption(pinID int64)`

    Creates a new option for the pin to release.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"

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

err = cli.UnpinSnapshotData(ctx, milvusclient.NewUnpinSnapshotDataOption(pinID))
if err != nil {
	// handle error
}
```
