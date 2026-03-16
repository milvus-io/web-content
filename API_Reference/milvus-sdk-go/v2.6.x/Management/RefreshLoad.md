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

A LoadTask that can be used to wait for the load operation to complete. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
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
