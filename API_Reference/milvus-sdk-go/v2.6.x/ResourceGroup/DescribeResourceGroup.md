# DescribeResourceGroup()

This operation returns detailed information about a resource group, including node capacity and replica distribution.

```go
func (c *Client) DescribeResourceGroup(ctx context.Context, opt DescribeResourceGroupOption, callOptions ...grpc.CallOption) (*entity.ResourceGroup, error)
```

## Request Syntax

```go
option := milvusclient.NewDescribeResourceGroupOption(name)

result, err := client.DescribeResourceGroup(ctx, option)
```

**PARAMETERS:**

- **name** (*string*)

      The name of the resource group.

**RETURN TYPE:**

**entity.ResourceGroup, error*

**RETURNS:**

The resource group description including node configurations and capacity. Returns an error if the operation fails.

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

rg, err := cli.DescribeResourceGroup(ctx, milvusclient.NewDescribeResourceGroupOption("my_rg"))
if err != nil {
	// handle error
}
fmt.Println(rg)
```
