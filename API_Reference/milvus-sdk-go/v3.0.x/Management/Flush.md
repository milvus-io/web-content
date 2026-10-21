# Flush()

This operation flushes all inserted data to persistent storage, ensuring data durability.

```go
func (c *Client) Flush(ctx context.Context, option FlushOption, callOptions ...grpc.CallOption) (*FlushTask, error)
```

## Request Syntax

```go
option := milvusclient.NewFlushOption(collName)

result, err := client.Flush(ctx, option)
```

**PARAMETERS:**

- **collName** (*string*)

    The coll name.

**RETURN TYPE:**

*FlushTask, error*

**RETURNS:**

An async task returned by Flush. Call Await() to block until flushing completes.

```go
type FlushTask struct {
}
```

**METHODS:**

- `Await(ctx context.Context) error`

    Blocks until the async operation completes or the context is cancelled. Returns an error if the operation fails.

- `GetFlushStats() segIDs []int64, flushSegIDs []int64, flushTs uint64, channelCheckpoints map[string]*msgpb.MsgPosition`

    Returns flush statistics including segment IDs and flush timestamp.

**ERROR HANDLING:**

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

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

collectionName := `customized_setup_1`

task, err := cli.Flush(ctx, milvusclient.NewFlushOption(collectionName))
if err != nil {
	// handle err
}

err = task.Await(ctx)
if err != nil {
	// handle err
}
```
