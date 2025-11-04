# UpdateResourceGroup()

This method updates the configuration of a resource group.

```go
func (c *Client) UpdateResourceGroup(ctx context.Context, opt UpdateResourceGroupOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-ResourceGroup-UpdateResourceGroup#updateresourcegroupoption"><code>UpdateResourceGroupOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## UpdateResourceGroupOption

This is an interface type. The `updateResourceGroupOption` struct type implements this interface type. 

You can use the `NewUpdateResourceGroupOption()` function to get the concrete implementation.

### NewUpdateResourceGroupOption

The signature of this method is as follows:

```go
func NewUpdateResourceGroupOption(name string, resourceGroupConfig *entity.ResourceGroupConfig) *updateResourceGroupOption
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
   <tr>
     <td><p><code>resourceGroupConfig</code></p></td>
     <td><p>Configuration of the target resource group.</p></td>
     <td><p><a href="./v2-ResourceGroup-DescribeResourceGroup#entityresourcegroupconfig"><code>*entity.ResourceGroupConfig</code></a></p></td>
   </tr>
</table>

## Return

Null

## Example

```go
import (
        "context"
        "github.com/milvus-io/milvus/client/v2/entity"
        "github.com/milvus-io/milvus/client/v2/milvusclient"
)

err = cli.UpdateResourceGroup(ctx, milvusclient.NewUpdateResourceGroupOption("my_rg", &entity.ResourceGroupConfig{
Requests: entity.ResourceGroupLimit{NodeNum: 10},
Limits:   entity.ResourceGroupLimit{NodeNum: 10},
NodeFilter: entity.ResourceGroupNodeFilter{
    NodeLabels: map[string]string{"my_label1": "a"},
},
}))
if err != nil {
    // handle error
}
```

