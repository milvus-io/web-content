# ListResourceGroups()

This operation lists the names of all resource groups in the cluster.

```go
func (c *Client) ListResourceGroups(ctx context.Context, opt ListResourceGroupsOption, callOptions ...grpc.CallOption) ([]string, error)
```

## Request Syntax

```go
option := milvusclient.NewListResourceGroupsOption()

result, err := client.ListResourceGroups(ctx, option)
```

**BUILDER METHODS:**

- `NewListResourceGroupsOption()`

    Creates a new option to list all resource groups.

**RETURN TYPE:**

*[]string, error*

**RETURNS:**

The names of all resource groups. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
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

rgs, err := cli.ListResourceGroups(ctx, milvusclient.NewListResourceGroupsOption())
if err != nil {
	// handle error
}
fmt.Println(rgs)
```
