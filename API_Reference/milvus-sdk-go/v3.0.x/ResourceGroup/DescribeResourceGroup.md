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

    The node capacity of the resource group.

- **NumAvailableNode** (*int32*)

    The number of available nodes in the resource group.

- **NumLoadedReplica** (*map[string]int32*)

    The number of loaded replicas per collection.

- **NumOutgoingNode** (*map[string]int32*)

    The number of outgoing nodes per collection.

- **NumIncomingNode** (*map[string]int32*)

    The number of incoming nodes per collection.

- **Config** (*[ResourceGroupConfig](ResourceGroupConfig.md)*)

    The configuration of the resource group.

- **Nodes** (*[]NodeInfo*)

    The list of nodes in the resource group.

## NodeInfo

Represents a node in a resource group.

```go
type NodeInfo struct {
    NodeID   int64
    Address  string
    HostName string
}
```

**PARAMETERS:**

- **NodeID** (*int64*)

    The unique identifier of the node.

- **Address** (*string*)

    The address of the node.

- **HostName** (*string*)

    The host name of the node.

**ERROR HANDLING:**

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

rg, err := cli.DescribeResourceGroup(ctx, milvusclient.NewDescribeResourceGroupOption("my_rg"))
if err != nil {
	// handle error
}
fmt.Println(rg)
```
