# ListResourceGroups()

This operation lists all resource groups in the Milvus instance.

```go
func (c *Client) ListResourceGroups(ctx context.Context, opt ListResourceGroupsOption, callOptions ...grpc.CallOption) ([]string, error)
```

## Request Syntax

```go
option := milvusclient.NewListResourceGroupsOption()

result, err := client.ListResourceGroups(ctx, option)
```

**RETURN TYPE:**

*[]string, error*

**RETURNS:**

A list of names. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

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

rgNames, err := cli.ListResourceGroups(ctx, milvusclient.NewListResourceGroupsOption())
if err != nil {
	// handle error
}
fmt.Println(rgNames)
```
