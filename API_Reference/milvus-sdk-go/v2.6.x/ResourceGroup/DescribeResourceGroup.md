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

*entity.ResourceGroup, error*

**RETURNS:**

The resource group description including node configurations and capacity. Returns an error if the operation fails.

```go
type ResourceGroup struct {
    Name             string
    Capacity         int32
    NumAvailableNode int32
    NumLoadedReplica map[string]int32
    NumOutgoingNode  map[string]int32
    NumIncomingNode  map[string]int32
    Config           *ResourceGroupConfig
    Nodes            []NodeInfo
}
```

**PARAMETERS:**

- **Name** (*string*)

    The name of the resource group.

- **Capacity** (*int32*)

    The total node capacity of the resource group.

- **NumAvailableNode** (*int32*)

    The number of available query nodes.

- **NumLoadedReplica** (*map[string]int32*)

    The number of loaded replicas per collection.

- **NumOutgoingNode** (*map[string]int32*)

    The number of query nodes transferred out to each resource group.

- **NumIncomingNode** (*map[string]int32*)

    The number of query nodes transferred in from each resource group.

- **Config** (*[ResourceGroupConfig](ResourceGroupConfig.md)*)

    The resource group configuration.

- **Nodes** (*[]NodeInfo*)

    The query nodes in the resource group. Each node has:

    - **NodeID** (*int64*)

        The query node ID.

    - **Address** (*string*)

        The node address.

    - **HostName** (*string*)

        The node host name.

**ERROR HANDLING:**

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
