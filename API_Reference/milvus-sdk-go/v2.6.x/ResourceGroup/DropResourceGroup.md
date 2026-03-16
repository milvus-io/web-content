# DropResourceGroup()

This operation drops a resource group.

```go
func (c *Client) DropResourceGroup(ctx context.Context, opt DropResourceGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropResourceGroupOption(name)

err := client.DropResourceGroup(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

      The name of the resource group.

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

err = cli.DropResourceGroup(ctx, milvusclient.NewDropResourceGroupOption("my_rg"))
if err != nil {
	// handle error
}
```
