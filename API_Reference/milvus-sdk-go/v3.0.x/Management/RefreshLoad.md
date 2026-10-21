# RefreshLoad()

This operation reloads a collection to include newly inserted data in search results.

```go
func (c *Client) RefreshLoad(ctx context.Context, option RefreshLoadOption, callOptions ...grpc.CallOption) (LoadTask, error)
```

## Request Syntax

```go
option := milvusclient.NewRefreshLoadOption(collectionName)

result, err := client.RefreshLoad(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

**RETURN TYPE:**

*LoadTask, error*

**RETURNS:**

An async task returned by LoadCollection/LoadPartitions. Call Await() to block until loading completes.

```go
type LoadTask struct {
    // contains unexported task state
}
```

**METHODS:**

- `Await(ctx context.Context) error`

    Blocks until the async operation completes or the context is cancelled. Returns an error if the operation fails.

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

collectionName := `customized_setup_1`

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

loadTask, err := cli.RefreshLoad(ctx, milvusclient.NewRefreshLoadOption(collectionName))
if err != nil {
	// handle err
}
err = loadTask.Await(ctx)
if err != nil {
	// handler err
}
```
