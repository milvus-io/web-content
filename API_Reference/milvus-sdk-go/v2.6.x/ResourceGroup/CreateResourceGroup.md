# CreateResourceGroup()

This operation creates a new resource group for isolating compute resources.

```go
func (c *Client) CreateResourceGroup(ctx context.Context, opt CreateResourceGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewCreateResourceGroupOption(name).
    WithNodeRequest(nodeRequest).
    WithNodeLimit(nodeLimit)

err := client.CreateResourceGroup(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

    The name of the resource group.

**OPTION METHODS:**

- `WithNodeRequest(nodeRequest int)`

    Sets the node request for the operation.

- `WithNodeLimit(nodeLimit int)`

    Sets the node limit for the operation.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error describing what went wrong.

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

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

err = cli.CreateResourceGroup(ctx, milvusclient.NewCreateResourceGroupOption("my_rg"))
if err != nil {
	// handle error
}
```
