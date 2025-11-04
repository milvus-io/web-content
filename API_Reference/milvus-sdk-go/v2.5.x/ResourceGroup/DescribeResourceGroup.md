# DescribeResourceGroup()

This method describes a resource group in detail.

```go
func (c *Client) DescribeResourceGroup(ctx context.Context, opt DescribeResourceGroupOption, callOptions ...grpc.CallOption) (*entity.ResourceGroup, error)
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>opt</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><a href="./v2-ResourceGroup-DescribeResourceGroup#describeresourcegroupoption"><code>DescribeResourceGroupOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DescribeResourceGroupOption

This is an interface type. The `describeResourceGroupOption` struct type implements this interface type. 

You can use the `NewDescribeResourceGroupOption()` function to get the concrete implementation.

### NewDescribeResourceGroupOption

The signature of this method is as follows:

```go
func NewDescribeResourceGroupOption(name string) *describeResourceGroupOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the target resource group.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## entity.ResourceGroup

The `entity.ResourceGroup` struct type is as follows:

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

## entity.ResourceGroupConfig

The `entity.ResourceGroupConfig` struct type is as follows:

```go
type ResourceGroupConfig struct {
    Requests     ResourceGroupLimit
    Limits       ResourceGroupLimit
    TransferFrom []*ResourceGroupTransfer
    TransferTo   []*ResourceGroupTransfer
    NodeFilter   ResourceGroupNodeFilter
}
```

## entity.ResourceGroupLimit

The `entity.ResourceGroupLimit` struct type is as follows:

```go
type ResourceGroupLimit struct {
    NodeNum int32
}
```

## entity.ResourceGroupNodeFilter

The `entity.ResourceGroupNodeFilter` struct type is as follows:

```go
type ResourceGroupNodeFilter struct {
    NodeLabels map[string]string
}
```

## entity.ResourceGroupTransfer

The `entity.ResourceGroupTransfer` struct type is as follows:

```go
type ResourceGroupTransfer struct {
    ResourceGroup string
}
```

## Return

`*entity.ResourceGroup`

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

rg, err := cli.DescribeResourceGroup(ctx, milvusclient.NewDescribeResourceGroupOption("my_rg"))
if err != nil {
    // handle error
}
fmt.Println(rg)
```

